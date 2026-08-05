import * as XLSX from 'xlsx';
import { CHART_OF_ACCOUNTS } from '../constants/baselines';

/**
 * Parses uploaded Hotel Maluri Excel File (.xlsx)
 * Supports Management Reports ('2026', '2026 AC') and General Ledger files.
 */
export async function parseHotelMaluriExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const sheetNames = workbook.SheetNames;
        console.log('Ingested sheets:', sheetNames);

        // Check if Management Report or GL
        if (sheetNames.includes('2026') || sheetNames.includes('2026 AC')) {
          const parsedMonths = parseManagementReport(workbook);
          resolve({ type: 'MANAGEMENT_REPORT', months: parsedMonths });
        } else if (sheetNames.includes('Sheet') || sheetNames.includes('GL')) {
          const parsedGL = parseGeneralLedger(workbook);
          resolve({ type: 'GENERAL_LEDGER', glData: parsedGL });
        } else {
          // Fallback parsing sheet 0
          const firstSheet = workbook.Sheets[sheetNames[0]];
          const json = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          resolve({ type: 'GENERIC', rows: json });
        }
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

function parseManagementReport(workbook) {
  const sheet = workbook.Sheets['2026'] || workbook.Sheets['2026 AC'] || workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Column mapping (Col 4 = Jan, Col 5 = Feb, ..., Col 9 = Jun, Col 10 = Jul, etc.)
  const monthColumns = [
    { key: '2026-01', name: 'January 2026', col: 4 },
    { key: '2026-02', name: 'February 2026', col: 5 },
    { key: '2026-03', name: 'March 2026', col: 6 },
    { key: '2026-04', name: 'April 2026', col: 7 },
    { key: '2026-05', name: 'May 2026', col: 8 },
    { key: '2026-06', name: 'June 2026', col: 9 },
    { key: '2026-07', name: 'July 2026', col: 10 },
    { key: '2026-08', name: 'August 2026', col: 11 },
    { key: '2026-09', name: 'September 2026', col: 12 },
    { key: '2026-10', name: 'October 2026', col: 13 },
    { key: '2026-11', name: 'November 2026', col: 14 },
    { key: '2026-12', name: 'December 2026', col: 15 }
  ];

  const monthMap = {};
  monthColumns.forEach(m => {
    monthMap[m.key] = {
      monthKey: m.key,
      monthName: m.name,
      roomsAvailable: 0,
      roomsSold: 0,
      occupancyPct: 0,
      adr: 0,
      revpar: 0,
      roomRevenueTotal: 0,
      roomRevenueSC: 0,
      roomRevenueNSC: 0,
      roomExtraCharges: 0,
      guestLaundry: 0,
      sewerage: 0,
      gas: 0,
      electricity: 0,
      water: 0,
      itSupportSC: 5400,
      parkingBGD: 1940,
      gajah3Rent: 2500,
      banquetRevenue: 0,
      netProfit: 0,
      renovationCapex: []
    };
  });

  // Traverse rows
  rows.forEach((r, idx) => {
    if (!r || r.length === 0) return;
    
    const label = String(r[0] || r[2] || '').trim().toUpperCase();
    const accCode = String(r[1] || r[3] || '').trim();

    monthColumns.forEach(m => {
      const val = parseFloat(r[m.col]) || 0;

      if (label.includes('ROOMS AVAILABLE')) monthMap[m.key].roomsAvailable = val;
      if (label.includes('ROOM SOLD')) monthMap[m.key].roomsSold = val;
      if (label.includes('AVERAGE RATE') || label.includes('AVERAGE RATE (ADR)')) monthMap[m.key].adr = val;
      if (label.includes('REV PAR')) monthMap[m.key].revpar = val;
      
      if (accCode === CHART_OF_ACCOUNTS.ROOM_REVENUE_TOTAL) monthMap[m.key].roomRevenueTotal = val;
      if (accCode === CHART_OF_ACCOUNTS.ROOM_REVENUE_SC) monthMap[m.key].roomRevenueSC = val;
      if (accCode === CHART_OF_ACCOUNTS.ROOM_REVENUE_NSC) monthMap[m.key].roomRevenueNSC = val;
      if (accCode === CHART_OF_ACCOUNTS.ROOM_EXTRA_CHARGES) monthMap[m.key].roomExtraCharges = val;
      if (accCode === CHART_OF_ACCOUNTS.LAUNDRY_GUEST) monthMap[m.key].guestLaundry = val;
      
      if (accCode === CHART_OF_ACCOUNTS.UTILITIES_SEWERAGE) monthMap[m.key].sewerage = val;
      if (accCode === CHART_OF_ACCOUNTS.UTILITIES_GAS) monthMap[m.key].gas = val;
      if (accCode === CHART_OF_ACCOUNTS.UTILITIES_ELECTRICITY) monthMap[m.key].electricity = val;
      if (accCode === CHART_OF_ACCOUNTS.UTILITIES_WATER) monthMap[m.key].water = val;
      
      if (accCode === CHART_OF_ACCOUNTS.BANQUET_REVENUE) monthMap[m.key].banquetRevenue = val;
      if (label === 'NET PROFIT' || label === 'NET PROFIT AFTER TAXATION') monthMap[m.key].netProfit = val;
    });
  });

  // Calculate Occupancy %, ADR, RevPAR if not directly found
  Object.values(monthMap).forEach(m => {
    if (m.roomsAvailable > 0) {
      m.occupancyPct = parseFloat(((m.roomsSold / m.roomsAvailable) * 100).toFixed(2));
    }
    if (m.roomsSold > 0 && m.adr === 0) {
      m.adr = parseFloat((m.roomRevenueTotal / m.roomsSold).toFixed(2));
    }
    if (m.roomsAvailable > 0 && m.revpar === 0) {
      m.revpar = parseFloat((m.roomRevenueTotal / m.roomsAvailable).toFixed(2));
    }
  });

  return Object.values(monthMap).filter(m => m.roomsAvailable > 0 || m.roomRevenueTotal > 0 || m.sewerage > 0);
}

function parseGeneralLedger(workbook) {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  const renovationItems = [];
  let currentAcc = '';

  rows.forEach(r => {
    if (!r || r.length === 0) return;
    const firstCol = String(r[0] || '').trim();

    if (firstCol.includes('Acc. No.:')) {
      currentAcc = firstCol;
    }

    if (currentAcc.includes('200-1000') && r.length >= 7) {
      const dateVal = r[0];
      const vendor = r[2];
      const desc = r[3];
      const drAmount = parseFloat(r[5]) || 0;

      if (drAmount > 0 && desc && vendor) {
        renovationItems.push({
          date: dateVal,
          vendor: vendor,
          docNo: r[1],
          description: desc,
          amount: drAmount
        });
      }
    }
  });

  return { renovationCapex: renovationItems };
}

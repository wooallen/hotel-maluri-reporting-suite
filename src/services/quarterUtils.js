/**
 * Hotel Maluri Quarterly Aggregation & Financial Analysis Utilities
 */

export function getQuarterKeyFromMonth(monthKey) {
  if (!monthKey) return null;
  // If already a quarter key (e.g. Q1-2026)
  if (monthKey.startsWith('Q')) return monthKey;
  
  const parts = monthKey.split('-');
  if (parts.length < 2) return null;
  const year = parts[0];
  const monthNum = parseInt(parts[1], 10);
  const qNum = Math.ceil(monthNum / 3);
  return `Q${qNum}-${year}`;
}

export function getQuarterName(quarterKey) {
  if (!quarterKey) return '';
  if (!quarterKey.startsWith('Q')) return quarterKey;
  
  const [qStr, year] = quarterKey.split('-');
  const qNum = qStr.replace('Q', '');
  const labels = {
    '1': `Q1 ${year} (Jan - Mar)`,
    '2': `Q2 ${year} (Apr - Jun)`,
    '3': `Q3 ${year} (Jul - Sep)`,
    '4': `Q4 ${year} (Oct - Dec)`
  };
  return labels[qNum] || `${quarterKey}`;
}

export function aggregateMonthsToQuarter(months, quarterKey) {
  if (!months || months.length === 0) return null;

  const quarterName = getQuarterName(quarterKey);
  const isH1Baseline = months.every(m => m.isH1Baseline);

  const roomsAvailable = months.reduce((sum, m) => sum + (m.roomsAvailable || 0), 0);
  const roomsSold = months.reduce((sum, m) => sum + (m.roomsSold || 0), 0);
  const occupancyPct = roomsAvailable > 0 ? (roomsSold / roomsAvailable) * 100 : 0;

  const roomRevenueTotal = months.reduce((sum, m) => sum + (m.roomRevenueTotal || 0), 0);
  const roomRevenueSC = months.reduce((sum, m) => sum + (m.roomRevenueSC || 0), 0);
  const roomRevenueNSC = months.reduce((sum, m) => sum + (m.roomRevenueNSC || 0), 0);
  const roomExtraCharges = months.reduce((sum, m) => sum + (m.roomExtraCharges || 0), 0);
  const guestLaundry = months.reduce((sum, m) => sum + (m.guestLaundry || 0), 0);
  const roomDirectCost = months.reduce((sum, m) => sum + (m.roomDirectCost || 0), 0);
  const otaCommissionBooking = months.reduce((sum, m) => sum + (m.otaCommissionBooking || 0), 0);

  const adr = roomsSold > 0 ? roomRevenueTotal / roomsSold : 0;
  const revpar = roomsAvailable > 0 ? roomRevenueTotal / roomsAvailable : 0;

  const payrollSalary = months.reduce((sum, m) => sum + (m.payrollSalary || 0), 0);
  const payrollEPF = months.reduce((sum, m) => sum + (m.payrollEPF || 0), 0);
  const payrollSocsoEis = months.reduce((sum, m) => sum + (m.payrollSocsoEis || 0), 0);
  const outsourcedLabour = months.reduce((sum, m) => sum + (m.outsourcedLabour || 0), 0);
  const staffWelfare = months.reduce((sum, m) => sum + (m.staffWelfare || 0), 0);
  const totalPayroll = months.reduce((sum, m) => sum + (m.totalPayroll || 0), 0);

  const sewerage = months.reduce((sum, m) => sum + (m.sewerage || 0), 0);
  const gas = months.reduce((sum, m) => sum + (m.gas || 0), 0);
  const electricity = months.reduce((sum, m) => sum + (m.electricity || 0), 0);
  const water = months.reduce((sum, m) => sum + (m.water || 0), 0);
  const security = months.reduce((sum, m) => sum + (m.security || 0), 0);
  const itSupportSC = months.reduce((sum, m) => sum + (m.itSupportSC || 0), 0);
  const parkingBGD = months.reduce((sum, m) => sum + (m.parkingBGD || 0), 0);
  const gajah3Rent = months.reduce((sum, m) => sum + (m.gajah3Rent || 0), 0);

  const banquetRevenue = months.reduce((sum, m) => sum + (m.banquetRevenue || 0), 0);
  const serambiFB = months.reduce((sum, m) => sum + (m.serambiFB || 0), 0);
  const breakfastPackage = months.reduce((sum, m) => sum + (m.breakfastPackage || 0), 0);
  const netProfit = months.reduce((sum, m) => sum + (m.netProfit || 0), 0);

  const renovationCapex = months.flatMap(m => m.renovationCapex || []);

  return {
    monthKey: quarterKey, // used as identifier
    quarterKey,
    monthName: quarterName,
    quarterName,
    isQuarter: true,
    isH1Baseline,
    monthsCount: months.length,
    months,
    roomsAvailable,
    roomsSold,
    occupancyPct,
    adr,
    revpar,
    roomRevenueTotal,
    roomRevenueSC,
    roomRevenueNSC,
    roomExtraCharges,
    guestLaundry,
    roomDirectCost,
    otaCommissionBooking,
    payrollSalary,
    payrollEPF,
    payrollSocsoEis,
    outsourcedLabour,
    staffWelfare,
    totalPayroll,
    sewerage,
    gas,
    electricity,
    water,
    security,
    itSupportSC,
    parkingBGD,
    gajah3Rent,
    banquetRevenue,
    serambiFB,
    breakfastPackage,
    netProfit,
    renovationCapex
  };
}

export function getAllQuarters(allMonths) {
  if (!allMonths || allMonths.length === 0) return [];
  const groups = {};
  
  allMonths.forEach(m => {
    const qKey = getQuarterKeyFromMonth(m.monthKey);
    if (qKey) {
      if (!groups[qKey]) groups[qKey] = [];
      groups[qKey].push(m);
    }
  });

  const quarterKeys = Object.keys(groups).sort();
  return quarterKeys.map(qKey => aggregateMonthsToQuarter(groups[qKey], qKey));
}

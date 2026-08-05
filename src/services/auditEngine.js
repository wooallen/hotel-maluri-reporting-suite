import { FIXED_BASELINES } from '../constants/baselines';

/**
 * Hotel Maluri Financial Audit Engine
 * Evaluates monthly financial data against baseline parameters & rule thresholds.
 */
export function runFinancialAudit(monthData, prevMonthData = null) {
  const alerts = [];
  
  // ----------------------------------------------------
  // Module 1: Room Division & Yield Tracking
  // ----------------------------------------------------
  const currentSold = monthData.roomsSold || 0;
  const prevSold = prevMonthData ? prevMonthData.roomsSold : null;
  const currentAdr = monthData.adr || 0;
  const prevAdr = prevMonthData ? prevMonthData.adr : null;
  
  let yieldAnomaly = false;
  if (prevSold !== null && prevAdr !== null && prevAdr > 0) {
    const soldDiffPct = ((currentSold - prevSold) / prevSold) * 100;
    const adrDiffPct = ((currentAdr - prevAdr) / prevAdr) * 100;
    
    // Rule: Volume UP (rooms sold increased) but ADR dropped by > 2%
    if (soldDiffPct > 0 && adrDiffPct < -2.0) {
      yieldAnomaly = true;
      alerts.push({
        id: 'YIELD-INVERTED',
        type: 'WARNING',
        category: 'Room Yield',
        title: 'Inverted Yield Anomaly Alert',
        message: `Volume increased (+${soldDiffPct.toFixed(1)}% sold room nights), but ADR dropped by ${Math.abs(adrDiffPct).toFixed(2)}% (RM ${prevAdr.toFixed(2)} -> RM ${currentAdr.toFixed(2)}).`,
        recommendation: 'Audit OTA discount channels, package inclusions, and group pricing for rate dilution.'
      });
    }
  }

  // ----------------------------------------------------
  // Module 2: Utility & Infrastructure Auditing
  // ----------------------------------------------------
  const sewerage = monthData.sewerage || 0;
  const gas = monthData.gas || 0;
  
  // Sewerage Missing Accrual Alert (H1 Baseline = RM 5,967.60)
  if (sewerage < (FIXED_BASELINES.SEWERAGE_MONTHLY * 0.5)) {
    alerts.push({
      id: 'UTILITY-SEWERAGE-MISSING',
      type: 'CRITICAL',
      category: 'Utility Audit',
      title: 'Missing Accrual Alert: Sewerage (904-U004)',
      message: `Sewerage expense recorded at RM ${sewerage.toFixed(2)}, which is ${((1 - sewerage / FIXED_BASELINES.SEWERAGE_MONTHLY) * 100).toFixed(1)}% below the fixed H1 run-rate baseline of RM ${FIXED_BASELINES.SEWERAGE_MONTHLY.toFixed(2)}.`,
      recommendation: 'Verify whether vendor invoice is pending entry or unrecorded. Accrue liability immediately to prevent artificial profit inflation.'
    });
  }

  // Gas Missing Accrual Alert
  if (gas < (FIXED_BASELINES.GAS_MIN_MONTHLY * 0.5)) {
    alerts.push({
      id: 'UTILITY-GAS-LOW',
      type: 'CRITICAL',
      category: 'Utility Audit',
      title: 'Missing Accrual Alert: Utilities-Gas (904-U005)',
      message: `Gas expense recorded at RM ${gas.toFixed(2)}, severely below the baseline minimum run-rate of RM ${FIXED_BASELINES.GAS_MIN_MONTHLY.toFixed(2)}.`,
      recommendation: 'Check utility meter reading or confirm invoice status with kitchen operations.'
    });
  }

  // Energy Capex Tracking
  const capexItems = monthData.renovationCapex || [];
  const hvacCapex = capexItems.filter(item => 
    item.description && (
      item.description.toLowerCase().includes('fcu') ||
      item.description.toLowerCase().includes('air cond') ||
      item.description.toLowerCase().includes('valve') ||
      item.description.toLowerCase().includes('wiring')
    )
  );

  // ----------------------------------------------------
  // Module 3: Fixed Overhead & Vendor Contract Monitoring
  // ----------------------------------------------------
  const itSupport = monthData.itSupportSC || 0;
  const parkingCost = monthData.parkingBGD || 0;

  if (Math.abs(itSupport - FIXED_BASELINES.IT_SUPPORT_SC_SYSTEMS) > 0.01) {
    alerts.push({
      id: 'VENDOR-IT-VARIANCE',
      type: 'INFO',
      category: 'Vendor Audit',
      title: 'SC Systems Contract Run-Rate Variance',
      message: `IT Support charge recorded at RM ${itSupport.toFixed(2)} vs fixed H1 baseline of RM ${FIXED_BASELINES.IT_SUPPORT_SC_SYSTEMS.toFixed(2)}.`,
      recommendation: 'Confirm whether volume-tiered renegotiations or employee assignment updates were activated.'
    });
  }

  if (Math.abs(parkingCost - FIXED_BASELINES.PARKING_BGD_ACCESS) > 0.01) {
    alerts.push({
      id: 'VENDOR-PARKING-VARIANCE',
      type: 'INFO',
      category: 'Vendor Audit',
      title: 'BGD Access Parking System Variance',
      message: `Parking cashless charge-out recorded at RM ${parkingCost.toFixed(2)} vs H1 baseline of RM ${FIXED_BASELINES.PARKING_BGD_ACCESS.toFixed(2)}.`,
      recommendation: 'Verify transaction volume fees or equipment maintenance charges.'
    });
  }

  // ----------------------------------------------------
  // Module 4: Ancillary Revenue Margin Watch
  // ----------------------------------------------------
  const guestLaundry = monthData.guestLaundry || 0;
  const roomExtraCharges = monthData.roomExtraCharges || 0;
  const occupancyPct = monthData.occupancyPct || 0;

  if (prevMonthData) {
    const occDiff = occupancyPct - prevMonthData.occupancyPct;
    const laundryDiff = guestLaundry - prevMonthData.guestLaundry;
    if (occDiff > 5 && laundryDiff <= 0) {
      alerts.push({
        id: 'ANCILLARY-LAUNDRY-LAG',
        type: 'WARNING',
        category: 'Ancillary Watch',
        title: 'Guest Laundry Yield Lag',
        message: `Occupancy increased by ${occDiff.toFixed(1)}%, but guest laundry revenue remained flat or declined (RM ${guestLaundry.toFixed(2)}).`,
        recommendation: 'Promote express guest laundry and valet services at front desk check-in.'
      });
    }
  }

  return {
    alerts,
    yieldAnomaly,
    hvacCapexCount: hvacCapex.length,
    hvacCapexTotal: hvacCapex.reduce((sum, item) => sum + (item.amount || 0), 0)
  };
}

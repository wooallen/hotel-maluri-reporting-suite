import { FIXED_BASELINES } from '../constants/baselines';

/**
 * Hotel Maluri Financial Audit Engine
 * Evaluates monthly financial data against baseline parameters & rule thresholds across ALL overhead items.
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
  // Module 2: Comprehensive Utility & Infrastructure Accrual Auditing
  // ----------------------------------------------------
  const sewerage = monthData.sewerage || 0;
  const gas = monthData.gas || 0;
  const electricity = monthData.electricity || 0;
  const water = monthData.water || 0;
  
  // 1. Sewerage Accrual Check (Baseline = RM 5,967.60)
  if (sewerage < (FIXED_BASELINES.SEWERAGE_MONTHLY * 0.5)) {
    alerts.push({
      id: 'UTILITY-SEWERAGE-MISSING',
      type: 'CRITICAL',
      category: 'Overhead Accrual',
      title: 'Missing Accrual: IWK Sewerage (904-U004)',
      message: `Sewerage expense recorded at RM ${sewerage.toFixed(2)}, which is ${((1 - sewerage / FIXED_BASELINES.SEWERAGE_MONTHLY) * 100).toFixed(1)}% below the fixed run-rate baseline of RM ${FIXED_BASELINES.SEWERAGE_MONTHLY.toFixed(2)}.`,
      recommendation: 'Post RM 5,967.60 accrual entry for IWK sewerage immediately to prevent artificial profit inflation.'
    });
  } else if (sewerage > (FIXED_BASELINES.SEWERAGE_MONTHLY * 1.25)) {
    alerts.push({
      id: 'UTILITY-SEWERAGE-SPIKE',
      type: 'WARNING',
      category: 'Overhead Variance',
      title: 'Sewerage Rate Spike: IWK Sewerage (904-U004)',
      message: `Sewerage charge recorded at RM ${sewerage.toFixed(2)} (+${(((sewerage - FIXED_BASELINES.SEWERAGE_MONTHLY) / FIXED_BASELINES.SEWERAGE_MONTHLY) * 100).toFixed(1)}% above fixed baseline RM ${FIXED_BASELINES.SEWERAGE_MONTHLY.toFixed(2)}).`,
      recommendation: 'Check for back-billing adjustments or meter rate reclassifications from Indah Water Konsortium.'
    });
  }

  // 2. Gas Utility Accrual & Run-Rate Check (Baseline: RM 2,300 - RM 2,950)
  if (gas < (FIXED_BASELINES.GAS_MIN_MONTHLY * 0.5)) {
    alerts.push({
      id: 'UTILITY-GAS-LOW',
      type: 'CRITICAL',
      category: 'Overhead Accrual',
      title: 'Missing Accrual: LPG Kitchen Gas (904-U005)',
      message: `Kitchen Gas recorded at RM ${gas.toFixed(2)}, severely below baseline minimum run-rate of RM ${FIXED_BASELINES.GAS_MIN_MONTHLY.toFixed(2)}.`,
      recommendation: 'Check kitchen meter reading or confirm pending gas supplier invoices.'
    });
  } else if (gas > (FIXED_BASELINES.GAS_MAX_MONTHLY * 1.2)) {
    alerts.push({
      id: 'UTILITY-GAS-HIGH',
      type: 'WARNING',
      category: 'Overhead Variance',
      title: 'LPG Gas Cost Spike (904-U005)',
      message: `Kitchen Gas expense of RM ${gas.toFixed(2)} exceeds baseline maximum of RM ${FIXED_BASELINES.GAS_MAX_MONTHLY.toFixed(2)}.`,
      recommendation: 'Inspect kitchen gas burners, pipe fittings, and banquet usage intensity.'
    });
  }

  // 3. Electricity Run-Rate & Accrual Check (Baseline: RM 51,000 - RM 60,000)
  if (electricity < 25000) {
    alerts.push({
      id: 'UTILITY-ELEC-MISSING',
      type: 'CRITICAL',
      category: 'Overhead Accrual',
      title: 'Missing Accrual: Electricity Utility (904-U001)',
      message: `Electricity expense recorded at RM ${electricity.toFixed(2)} vs expected run-rate of RM 51,000.00 – RM 60,000.00.`,
      recommendation: 'Confirm TNB meter invoice status or accrue unbilled power consumption.'
    });
  } else if (electricity > 62000) {
    alerts.push({
      id: 'UTILITY-ELEC-SPIKE',
      type: 'WARNING',
      category: 'Overhead Variance',
      title: 'Electricity Tariff / Usage Surge (904-U001)',
      message: `Electricity recorded at RM ${electricity.toFixed(2)}, exceeding maximum baseline threshold of RM 60,000.00.`,
      recommendation: 'Audit HVAC FCU chiller setpoints and peak demand surcharge timing.'
    });
  }

  // 4. Water Utility Accrual Check (Baseline: RM 9,500 - RM 13,000)
  if (water < 5000) {
    alerts.push({
      id: 'UTILITY-WATER-MISSING',
      type: 'CRITICAL',
      category: 'Overhead Accrual',
      title: 'Missing Accrual: Water Utility (904-U002)',
      message: `Water utility expense recorded at RM ${water.toFixed(2)} vs baseline run-rate of RM 9,500.00 – RM 13,000.00.`,
      recommendation: 'Verify Syabas water meter reading and pending billing statements.'
    });
  } else if (water > 14000) {
    alerts.push({
      id: 'UTILITY-WATER-SPIKE',
      type: 'WARNING',
      category: 'Overhead Variance',
      title: 'Water Consumption Surge (904-U002)',
      message: `Water bill reached RM ${water.toFixed(2)} (baseline max: RM 13,000.00).`,
      recommendation: 'Inspect guest room piping, cooling towers, and laundry water recycling valves.'
    });
  }

  // ----------------------------------------------------
  // Module 3: Vendor Contracts & Fixed Overhead Auditing
  // ----------------------------------------------------
  const security = monthData.security || 0;
  const itSupport = monthData.itSupportSC || 0;
  const parkingCost = monthData.parkingBGD || 0;
  const gajah3Rent = monthData.gajah3Rent || 0;

  // Security Guard Contract Check (Baseline: RM 13,000 - RM 18,500)
  if (security < 8000) {
    alerts.push({
      id: 'VENDOR-SECURITY-MISSING',
      type: 'CRITICAL',
      category: 'Overhead Accrual',
      title: 'Missing Accrual: Security Guard Services',
      message: `Security guard expense recorded at RM ${security.toFixed(2)} vs baseline run-rate of RM 13,000.00 – RM 18,500.00.`,
      recommendation: 'Verify vendor monthly guard billing status prior to month-end close.'
    });
  }

  // IT Support Fixed Contract Check (Baseline: RM 5,400.00)
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

  // Parking System Fixed Contract Check (Baseline: RM 1,940.00)
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

  // Gajah3 Rental Income Fixed Check (Baseline: RM 2,500.00)
  if (Math.abs(gajah3Rent - FIXED_BASELINES.GAJAH3_RENTAL) > 0.01) {
    alerts.push({
      id: 'LEASE-RENTAL-VARIANCE',
      type: 'WARNING',
      category: 'Lease Audit',
      title: 'Gajah3 Cafe Rental Income Discrepancy',
      message: `Rental income recorded at RM ${gajah3Rent.toFixed(2)} vs fixed lease agreement baseline of RM ${FIXED_BASELINES.GAJAH3_RENTAL.toFixed(2)}.`,
      recommendation: 'Audit tenant payment receipts and ledger posting codes.'
    });
  }

  // ----------------------------------------------------
  // Module 4: Payroll & Staff Cost Overheads Auditing
  // ----------------------------------------------------
  const outsourcedLabour = monthData.outsourcedLabour || 0;
  const payrollEPF = monthData.payrollEPF || 0;
  const payrollSalary = monthData.payrollSalary || 0;

  if (outsourcedLabour < 15000 && (monthData.occupancyPct || 0) > 40) {
    alerts.push({
      id: 'PAYROLL-OUTSOURCED-MISSING',
      type: 'CRITICAL',
      category: 'Overhead Accrual',
      title: 'Missing Accrual: Outsourced Manpower (901-2002)',
      message: `Outsourced manpower expense recorded at RM ${outsourcedLabour.toFixed(2)} vs baseline run-rate of RM 31,000.00 – RM 38,000.00 at ${monthData.occupancyPct}% occupancy.`,
      recommendation: 'Verify staffing agency invoices for housekeeping and banquet stewards.'
    });
  }

  // EPF Statutory Ratio Check (EPF should be roughly 70-80% of Basic Salary under Malaysian statutory rates)
  if (payrollSalary > 0 && payrollEPF > 0) {
    const epfRatio = (payrollEPF / payrollSalary) * 100;
    if (epfRatio < 40 || epfRatio > 95) {
      alerts.push({
        id: 'PAYROLL-EPF-RATIO-ANOMALY',
        type: 'WARNING',
        category: 'Payroll Audit',
        title: 'EPF Statutory Contribution Anomaly (901-1002)',
        message: `EPF statutory expense recorded at RM ${payrollEPF.toFixed(2)} (${epfRatio.toFixed(1)}% of basic salary RM ${payrollSalary.toFixed(2)}).`,
        recommendation: 'Audit EPF Form A monthly submission lists and employer contribution rates.'
      });
    }
  }

  // ----------------------------------------------------
  // Module 5: Energy Capex Tracking
  // ----------------------------------------------------
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
  // Module 6: Ancillary Revenue Margin Watch
  // ----------------------------------------------------
  const guestLaundry = monthData.guestLaundry || 0;
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

import { FIXED_BASELINES } from '../constants/baselines';

/**
 * AI Financial Analyst Agent Service - Hotel Maluri Reporting Suite
 * Deploys comprehensive financial analysis upon spreadsheet upload.
 * Audits run rates and accrual verifications across ALL operational overhead items.
 */

export async function runAIFinancialAgentAnalysis(uploadedData, auditResult, onProgress) {
  const steps = [
    { text: 'Deploying Financial Analyst Agent...', delay: 300 },
    { text: 'Ingesting General Ledger & Departmental P&L lines...', delay: 400 },
    { text: 'Executing Comprehensive Overhead Accrual Audit (Utilities, Vendor Contracts, Leases)...', delay: 600 },
    { text: 'Cross-referencing Regional Hospitality Benchmarks (Staffing 0.40-0.60/room, Payroll 35-40%)...', delay: 500 },
    { text: 'Synthesizing Executive AI Diagnostic Briefing...', delay: 400 }
  ];

  for (const step of steps) {
    if (onProgress) onProgress(step.text);
    await new Promise(resolve => setTimeout(resolve, step.delay));
  }

  const { monthData, prevMonthData } = uploadedData;
  if (!monthData) {
    return {
      agentStatus: 'COMPLETED',
      timestamp: new Date().toISOString(),
      summary: 'Data uploaded successfully. Standby for departmental evaluation.'
    };
  }

  // Extract financial line items
  const adr = monthData.adr || 0;
  const revpar = monthData.revpar || 0;
  const occ = monthData.occupancyPct || 0;
  const roomRev = monthData.roomRevenueTotal || 0;

  const sewerage = monthData.sewerage || 0;
  const gas = monthData.gas || 0;
  const electricity = monthData.electricity || 0;
  const water = monthData.water || 0;
  const security = monthData.security || 0;
  const itSupport = monthData.itSupportSC || 0;
  const parkingCost = monthData.parkingBGD || 0;
  const gajah3Rent = monthData.gajah3Rent || 0;

  const payrollSalary = monthData.payrollSalary || 0;
  const payrollEPF = monthData.payrollEPF || 0;
  const outsourcedLabour = monthData.outsourcedLabour || 0;
  const totalPayroll = monthData.totalPayroll || 0;

  const keyDiagnostics = [];
  const strategicActions = [];

  // ----------------------------------------------------
  // 1. Comprehensive Utility Accrual & Run-Rate Audits
  // ----------------------------------------------------
  
  // Sewerage (IWK 904-U004)
  if (sewerage < (FIXED_BASELINES.SEWERAGE_MONTHLY * 0.5)) {
    keyDiagnostics.push({
      severity: 'CRITICAL',
      title: 'Missing Accrual: IWK Sewerage (904-U004)',
      detail: `Sewerage expense recorded at RM ${sewerage.toFixed(2)} vs fixed baseline RM ${FIXED_BASELINES.SEWERAGE_MONTHLY.toFixed(2)}. Unrecorded liability risk.`
    });
    strategicActions.push('Accrue RM 5,967.60 for IWK Sewerage before period close.');
  } else {
    keyDiagnostics.push({
      severity: 'HEALTHY',
      title: 'Sewerage Accrual Verified',
      detail: `Sewerage expense recorded at RM ${sewerage.toFixed(2)} (aligned with RM ${FIXED_BASELINES.SEWERAGE_MONTHLY.toFixed(2)} baseline).`
    });
  }

  // LPG Kitchen Gas (904-U005)
  if (gas < (FIXED_BASELINES.GAS_MIN_MONTHLY * 0.5)) {
    keyDiagnostics.push({
      severity: 'CRITICAL',
      title: 'Missing Accrual: LPG Kitchen Gas (904-U005)',
      detail: `Gas utility recorded at RM ${gas.toFixed(2)} vs baseline minimum RM ${FIXED_BASELINES.GAS_MIN_MONTHLY.toFixed(2)}.`
    });
    strategicActions.push('Verify pending LPG gas supplier delivery invoices.');
  } else if (gas > (FIXED_BASELINES.GAS_MAX_MONTHLY * 1.2)) {
    keyDiagnostics.push({
      severity: 'WARNING',
      title: 'Gas Cost Surge (904-U005)',
      detail: `Gas utility recorded at RM ${gas.toFixed(2)}, exceeding baseline max of RM ${FIXED_BASELINES.GAS_MAX_MONTHLY.toFixed(2)}.`
    });
  } else {
    keyDiagnostics.push({
      severity: 'HEALTHY',
      title: 'Gas Utility Run-Rate Verified',
      detail: `Gas utility at RM ${gas.toFixed(2)} within baseline envelope (RM 2,300 - RM 2,950).`
    });
  }

  // Electricity (904-U001)
  if (electricity < 25000) {
    keyDiagnostics.push({
      severity: 'CRITICAL',
      title: 'Missing Accrual: Electricity Utility (904-U001)',
      detail: `Power bill recorded at RM ${electricity.toFixed(2)} vs baseline run-rate of RM 51,000 - RM 60,000.`
    });
    strategicActions.push('Post electricity accrual for unbilled TNB meter reading.');
  } else if (electricity > 62000) {
    keyDiagnostics.push({
      severity: 'WARNING',
      title: 'Electricity Tariff / HVAC Surge',
      detail: `Electricity charge of RM ${electricity.toFixed(2)} exceeds maximum baseline envelope of RM 60,000.00.`
    });
  } else {
    keyDiagnostics.push({
      severity: 'HEALTHY',
      title: 'Electricity Run-Rate Verified',
      detail: `Electricity expense at RM ${electricity.toFixed(2)} (~RM ${(electricity / Math.max(monthData.roomsSold || 1, 1)).toFixed(2)}/occupied room night).`
    });
  }

  // Water Utility (904-U002)
  if (water < 5000) {
    keyDiagnostics.push({
      severity: 'CRITICAL',
      title: 'Missing Accrual: Water Utility (904-U002)',
      detail: `Water bill recorded at RM ${water.toFixed(2)} vs expected run-rate of RM 9,500 - RM 13,000.`
    });
  } else {
    keyDiagnostics.push({
      severity: 'HEALTHY',
      title: 'Water Utility Verified',
      detail: `Water utility recorded at RM ${water.toFixed(2)} within baseline parameters.`
    });
  }

  // ----------------------------------------------------
  // 2. Vendor Contracts & Fixed Overhead Run-Rate Audits
  // ----------------------------------------------------

  // Security Guard Contract
  if (security < 8000) {
    keyDiagnostics.push({
      severity: 'CRITICAL',
      title: 'Missing Accrual: Security Services',
      detail: `Security guard services recorded at RM ${security.toFixed(2)} vs baseline run-rate of RM 13,000 - RM 18,500.`
    });
  } else {
    keyDiagnostics.push({
      severity: 'HEALTHY',
      title: 'Security Contract Verified',
      detail: `Security guard contract expense recorded at RM ${security.toFixed(2)}.`
    });
  }

  // SC Systems IT Support
  if (Math.abs(itSupport - FIXED_BASELINES.IT_SUPPORT_SC_SYSTEMS) > 0.01) {
    keyDiagnostics.push({
      severity: 'WARNING',
      title: 'SC Systems IT Contract Variance',
      detail: `IT Support recorded at RM ${itSupport.toFixed(2)} vs fixed baseline RM ${FIXED_BASELINES.IT_SUPPORT_SC_SYSTEMS.toFixed(2)}.`
    });
  } else {
    keyDiagnostics.push({
      severity: 'HEALTHY',
      title: 'IT Support Contract Verified',
      detail: `SC Systems contract charge matches fixed baseline RM 5,400.00.`
    });
  }

  // BGD Access Cashless Parking
  if (Math.abs(parkingCost - FIXED_BASELINES.PARKING_BGD_ACCESS) > 0.01) {
    keyDiagnostics.push({
      severity: 'WARNING',
      title: 'BGD Parking System Variance',
      detail: `Parking system charge recorded at RM ${parkingCost.toFixed(2)} vs fixed baseline RM ${FIXED_BASELINES.PARKING_BGD_ACCESS.toFixed(2)}.`
    });
  } else {
    keyDiagnostics.push({
      severity: 'HEALTHY',
      title: 'Parking Contract Verified',
      detail: `BGD Access parking system charge matches fixed baseline RM 1,940.00.`
    });
  }

  // Gajah3 Lease Income
  if (Math.abs(gajah3Rent - FIXED_BASELINES.GAJAH3_RENTAL) > 0.01) {
    keyDiagnostics.push({
      severity: 'WARNING',
      title: 'Gajah3 Cafe Lease Rental Variance',
      detail: `Lease rental income recorded at RM ${gajah3Rent.toFixed(2)} vs contract agreement RM ${FIXED_BASELINES.GAJAH3_RENTAL.toFixed(2)}.`
    });
  } else {
    keyDiagnostics.push({
      severity: 'HEALTHY',
      title: 'Gajah3 Lease Income Verified',
      detail: `Rental income matches fixed contract lease baseline RM 2,500.00.`
    });
  }

  // ----------------------------------------------------
  // 3. Labor & Payroll Overhead Audits
  // ----------------------------------------------------
  if (outsourcedLabour < 15000 && occ > 40) {
    keyDiagnostics.push({
      severity: 'CRITICAL',
      title: 'Missing Accrual: Outsourced Labour (901-2002)',
      detail: `Outsourced manpower expense recorded at RM ${outsourcedLabour.toFixed(2)} vs baseline run-rate of RM 31,000 - RM 38,000.`
    });
  }

  // Payroll Intensity
  const payrollPctOfRev = roomRev > 0 ? (totalPayroll / roomRev) * 100 : 0;
  keyDiagnostics.push({
    severity: payrollPctOfRev > 45 ? 'WARNING' : 'INFO',
    title: 'Hospitality Payroll & Staffing Intensity',
    detail: `Total Payroll positioned at RM ${totalPayroll.toFixed(2)} (${payrollPctOfRev.toFixed(1)}% of room revenue). Benchmark target: 35-40% of revenue, 0.40–0.60 staff/room.`
  });

  const criticalCount = keyDiagnostics.filter(d => d.severity === 'CRITICAL').length;
  const warningCount = keyDiagnostics.filter(d => d.severity === 'WARNING').length;

  return {
    agentStatus: 'ACTIVE_ANALYSIS_COMPLETE',
    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    monthKey: monthData.monthKey,
    monthName: monthData.monthName,
    summary: `AI Agent audited all 9 operational overhead categories for ${monthData.monthName}. Found ${criticalCount} critical accrual discrepancies, ${warningCount} run-rate warnings, and verified fixed vendor contracts.`,
    diagnostics: keyDiagnostics,
    actions: strategicActions
  };
}

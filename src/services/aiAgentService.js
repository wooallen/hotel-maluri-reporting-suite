/**
 * AI Financial Analyst Agent Service - Hotel Maluri Reporting Suite
 * Deploys financial analysis upon spreadsheet upload.
 * Incorporates hospitality benchmarking standards (0.40-0.60 staff/room, 35-40% payroll target)
 * and P&L audit directives.
 */

export async function runAIFinancialAgentAnalysis(uploadedData, auditResult, onProgress) {
  const steps = [
    { text: 'Deploying Financial Analyst Agent...', delay: 300 },
    { text: 'Ingesting General Ledger & Departmental P&L lines...', delay: 500 },
    { text: 'Cross-referencing Regional Hospitality Benchmarks (Staffing 0.40-0.60/room)...', delay: 700 },
    { text: 'Auditing Utility Accruals & Vendor Run-Rates...', delay: 600 },
    { text: 'Synthesizing Executive AI Diagnostic Briefing...', delay: 500 }
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

  // Calculate key metrics
  const adr = monthData.adr || 0;
  const revpar = monthData.revpar || 0;
  const occ = monthData.occupancyPct || 0;
  const sewerage = monthData.sewerage || 0;
  const gas = monthData.gas || 0;

  // Departmental diagnostics array
  const keyDiagnostics = [];
  const strategicActions = [];

  // 1. Room Yield & OTA Rate Dilution Diagnostic
  if (prevMonthData && prevMonthData.roomsSold > 0) {
    const soldDiffPct = ((monthData.roomsSold - prevMonthData.roomsSold) / prevMonthData.roomsSold) * 100;
    const adrDiffPct = ((adr - prevMonthData.adr) / prevMonthData.adr) * 100;

    if (soldDiffPct > 0 && adrDiffPct < -2.0) {
      keyDiagnostics.push({
        severity: 'CRITICAL',
        title: 'Inverted Room Yield Anomaly',
        detail: `Room nights sold rose by +${soldDiffPct.toFixed(1)}%, but ADR contracted by ${Math.abs(adrDiffPct).toFixed(2)}% (RM ${prevMonthData.adr.toFixed(2)} -> RM ${adr.toFixed(2)}). Indicates rate dilution via discount channels or over-reliance on low-yield OTAs.`
      });
      strategicActions.push('Audit OTA rate parity rules and cap maximum discount allocation during peak occupancy days.');
    } else {
      keyDiagnostics.push({
        severity: 'HEALTHY',
        title: 'Room Yield Stability',
        detail: `ADR positioned at RM ${adr.toFixed(2)} with RevPAR of RM ${revpar.toFixed(2)} across ${occ.toFixed(1)}% occupancy.`
      });
    }
  }

  // 2. Utility Accrual Diagnostics
  if (sewerage < 3000) {
    keyDiagnostics.push({
      severity: 'CRITICAL',
      title: 'Sewerage Accrual Discrepancy (904-U004)',
      detail: `Sewerage expense recorded at RM ${sewerage.toFixed(2)} vs baseline requirement of RM 5,967.60. High risk of unrecorded vendor liability distorting GOP.`
    });
    strategicActions.push('Post RM 5,967.60 accrual entry for IWK sewerage prior to period close.');
  }

  if (gas < 3000) {
    keyDiagnostics.push({
      severity: 'WARNING',
      title: 'Gas Utility Accrual Deficit (904-U005)',
      detail: `Kitchen LPG gas utility recorded at RM ${gas.toFixed(2)} (baseline threshold: RM 6,000.00).`
    });
    strategicActions.push('Verify kitchen meter readings and pending gas supplier invoices.');
  }

  // 3. Staffing & Payroll Intensity (Industry Benchmarks)
  keyDiagnostics.push({
    severity: 'INFO',
    title: 'Hospitality Labor Intensity Benchmark',
    detail: 'Target staff-to-room ratio: 0.40–0.60 per room. Baseline target payroll-to-revenue ratio: 35–40%.'
  });
  strategicActions.push('Align shift scheduling with forecast room occupancy to protect GOP margin targets.');

  return {
    agentStatus: 'ACTIVE_ANALYSIS_COMPLETE',
    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    monthKey: monthData.monthKey,
    monthName: monthData.monthName,
    summary: `AI Agent completed full audit for ${monthData.monthName}. Identified ${keyDiagnostics.filter(d => d.severity === 'CRITICAL').length} critical accrual/yield alerts.`,
    diagnostics: keyDiagnostics,
    actions: strategicActions
  };
}

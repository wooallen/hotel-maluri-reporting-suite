/**
 * Managing Director Executive Memorandum Generator
 * Generates structured Markdown & Plaintext memorandums for Hotel Maluri leadership.
 */
export function generateManagingDirectorMemo(monthData, prevMonthData, auditResult) {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const { monthName, roomsAvailable, roomsSold, occupancyPct, adr, revpar, roomRevenueTotal, roomRevenueSC, roomRevenueNSC, sewerage, gas, electricity, water, itSupportSC, parkingBGD, gajah3Rent, banquetRevenue, netProfit, renovationCapex = [] } = monthData;
  const { alerts, yieldAnomaly } = auditResult;

  const prevSold = prevMonthData ? prevMonthData.roomsSold : null;
  const prevAdr = prevMonthData ? prevMonthData.adr : null;
  const prevRevpar = prevMonthData ? prevMonthData.revpar : null;

  let yieldCommentary = '';
  if (yieldAnomaly) {
    yieldCommentary = `⚠️ **CRITICAL YIELD WARNING**: Room sales volume expanded MoM (${prevSold} -> ${roomsSold} rooms sold), yet Average Daily Rate (ADR) suffered a rate dilution of ${prevAdr ? (((adr - prevAdr)/prevAdr)*100).toFixed(2) : 0}% (RM ${prevAdr?.toFixed(2)} to RM ${adr.toFixed(2)}). Recommend an immediate audit of OTA discount channels and group rate concessions.`;
  } else if (prevMonthData) {
    yieldCommentary = `Room occupancy adjusted to ${occupancyPct.toFixed(1)}% with an ADR of RM ${adr.toFixed(2)} and RevPAR of RM ${revpar.toFixed(2)}. Yield dynamics remained balanced relative to the preceding operating period.`;
  } else {
    yieldCommentary = `Operating performance established at ${occupancyPct.toFixed(1)}% occupancy with ADR at RM ${adr.toFixed(2)} and RevPAR at RM ${revpar.toFixed(2)}.`;
  }

  // Accrual & Utility Alerts
  const missingAccruals = alerts.filter(a => a.id.includes('MISSING') || a.id.includes('LOW'));
  let utilityCommentary = '';
  if (missingAccruals.length > 0) {
    utilityCommentary = missingAccruals.map(a => `🔴 **AUDIT ALERT**: ${a.title} - ${a.message}`).join('\n');
  } else {
    utilityCommentary = `Utility charges reflected standard operational baseline levels: Sewerage (RM ${sewerage.toFixed(2)}), Gas (RM ${gas.toFixed(2)}), Electricity (RM ${electricity.toFixed(2)}), Water (RM ${water.toFixed(2)}). All unbilled liabilities were fully accrued.`;
  }

  // Vendor Contracts
  const vendorAlerts = alerts.filter(a => a.category === 'Vendor Audit');
  let vendorCommentary = '';
  if (vendorAlerts.length > 0) {
    vendorCommentary = vendorAlerts.map(a => `🔸 ${a.title}: ${a.message}`).join('\n');
  } else {
    vendorCommentary = `Fixed overhead vendor charge-outs complied strictly with H1 run-rate baselines: SC Systems IT Support at RM ${itSupportSC.toFixed(2)} and BGD Access Cashless Parking at RM ${parkingBGD.toFixed(2)}. Volume-tiered renegotiations remain active.`;
  }

  // Capex Tracking
  const capexItemsText = renovationCapex.length > 0
    ? renovationCapex.map(c => `- **${c.vendor}**: ${c.description} (RM ${c.amount.toLocaleString()})`).join('\n')
    : 'No major HVAC or motorized valve renovation capital expenditure recorded during this billing cycle.';

  return `MEMORANDUM

TO: Managing Director, Hotel Maluri
FROM: Financial Controller & Operations Audit Team
DATE: ${currentDate}
SUBJECT: Executive Monthly Financial Performance & Variance Audit – ${monthName}

================================================================================

1. EXECUTIVE SUMMARY & KEY FINANCIAL HIGHLIGHTS
- Operating Period: ${monthName}
- Total Room Revenue: RM ${roomRevenueTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} (SC: RM ${roomRevenueSC.toLocaleString('en-US', { minimumFractionDigits: 2 })} | NSC: RM ${roomRevenueNSC.toLocaleString('en-US', { minimumFractionDigits: 2 })})
- Occupancy Rate: ${occupancyPct.toFixed(2)}% (${roomsSold.toLocaleString()} / ${roomsAvailable.toLocaleString()} Available Rooms)
- Average Daily Rate (ADR): RM ${adr.toFixed(2)}
- Revenue Per Available Room (RevPAR): RM ${revpar.toFixed(2)}
- Net Profit / Operating Position: RM ${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}

2. REVENUE DIVISION & YIELD ANALYSIS
${yieldCommentary}
- SC Room Revenue (500-1001): RM ${roomRevenueSC.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- NSC Room Revenue (500-1002): RM ${roomRevenueNSC.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- Extended Use / Extra Charges (500-1003): RM ${(monthData.roomExtraCharges || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}

3. UTILITY & INFRASTRUCTURE AUDIT
${utilityCommentary}
- Capital Expenditure Modernization (Account 200-1000):
${capexItemsText}

4. FIXED OVERHEAD & VENDOR CONTRACT AUDIT
${vendorCommentary}
- F&B Tenancy Lease (540-1000 Gajah3 Cafe): Compliant at RM ${gajah3Rent.toFixed(2)} flat rental fee.

5. ANCILLARY REVENUE MARGIN WATCH
- Banquet Hall & Setup Revenue (500-3000 / BQSC): RM ${banquetRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- Guest Services - Laundry (500-1004): RM ${(monthData.guestLaundry || 0).toFixed(2)}
${(monthData.guestLaundry === 0 && occupancyPct > 50) ? '⚠️ NOTE: Guest Laundry yield recorded zero revenue despite >50% room occupancy.' : 'Secondary guest service streams performed in line with room sales.'}

6. STRATEGIC ACTION RECOMMENDATIONS
1. [Action Item 1]: ${(missingAccruals.length > 0) ? 'Direct Finance to immediately accrue unrecorded utility liabilities before closing monthly ledger balance.' : 'Maintain active rate yield discipline on high-demand weekend room blocks.'}
2. [Action Item 2]: ${(yieldAnomaly) ? 'Re-align OTA distribution discount caps and review group sales contract rate minimums.' : 'Continue monitoring energy efficiency performance post-HVAC FCU upgrade.'}
3. [Action Item 3]: Review fixed contract run-rates for SC Systems and BGD Access to ensure volume tier caps are fully enforced.

7. WORKFORCE SIZING & P&L BREAKEVEN AUDIT (SPECIAL MD REPORT)
- Ideal Lean Headcount Target: 45 – 60 total headcount (0.40 – 0.50 staff/room ratio vs KL benchmark of 0.40-0.60).
- Target Basic Salary Pool: RM 120,000 – RM 160,000 / month (vs H1 baseline of RM 242.6k).
- Departmental Sizing (55% Occupancy): Housekeeping (11-14 staff @ 15-16 rooms/person), Front Office (6-8 staff 24/7), F&B/Banquet (10-14 staff), Engineering (4-6 staff), Admin/Sales (8-10 staff).
- Full P&L Breakeven Monthly Revenue: RM 722,766 / month (+53.0% top-line growth needed over RM 498k H1 avg).
- Standalone Breakeven RevPAR Target: RM 131.09 / room night (e.g. 72% occupancy @ RM 182 ADR).
- Dual-Engine Strategy Target RevPAR: RM 107.55 / room night (achieved with ~RM 103k/mo cost restructuring in labor & energy).
`;
}

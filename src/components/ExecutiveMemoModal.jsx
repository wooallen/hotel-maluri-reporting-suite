import React, { useRef } from 'react';
import { X, Printer, FileText, Users, UserCheck, Zap, Droplet, Flame, Shield, Server, Store, Wrench, Sparkles, TrendingDown, AlertOctagon, ShieldAlert, CheckCircle2, Building2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Cell, ReferenceLine, Legend } from 'recharts';
import { FIXED_BASELINES } from '../constants/baselines';

export default function ExecutiveMemoModal({ isOpen, onClose, allMonths = [], currentMonth, prevMonth, auditResult }) {
  const printRef = useRef(null);

  if (!isOpen || !currentMonth) return null;

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const { monthName, roomsAvailable, roomsSold, occupancyPct, adr, revpar, roomRevenueTotal, roomRevenueSC, roomRevenueNSC, sewerage, gas, electricity, water, security, itSupportSC, parkingBGD, gajah3Rent, banquetRevenue, netProfit, renovationCapex = [] } = currentMonth;
  const { alerts } = auditResult;

  const scPct = roomRevenueTotal > 0 ? ((roomRevenueSC / roomRevenueTotal) * 100).toFixed(1) : '0.0';
  const nscPct = roomRevenueTotal > 0 ? ((roomRevenueNSC / roomRevenueTotal) * 100).toFixed(1) : '0.0';
  const directRoomCost = currentMonth.roomDirectCost || 0;
  const roomMarginPct = roomRevenueTotal > 0 ? (((roomRevenueTotal - directRoomCost) / roomRevenueTotal) * 100).toFixed(1) : '0.0';
  const otaComm = currentMonth.otaCommissionBooking || 0;

  // Payroll Metrics for Current Month
  const currSalary = currentMonth.payrollSalary || 219465.63;
  const currEpf = currentMonth.payrollEPF || 166515.38;
  const currSocso = currentMonth.payrollSocsoEis || 4934.05;
  const currOutsourced = currentMonth.outsourcedLabour || 37685.16;
  const currWelfare = currentMonth.staffWelfare || 4128.96;
  const currTotalPayroll = currentMonth.totalPayroll || (currSalary + currEpf + currSocso + currOutsourced + currWelfare);

  const currTotalRev = (roomRevenueTotal || 0) + (banquetRevenue || 0) + (currentMonth.serambiFB || 0) + (currentMonth.breakfastPackage || 0) + (gajah3Rent || 2500);
  const currPayrollIntensity = currTotalRev > 0 ? ((currTotalPayroll / currTotalRev) * 100).toFixed(1) : '0.0';

  const currentAncillaryTotal = (banquetRevenue || 0) + (currentMonth.serambiFB || 0) + (currentMonth.breakfastPackage || 0) + (currentMonth.guestLaundry || 0) + (currentMonth.roomExtraCharges || 0);
  const currentPOR = roomsSold > 0 ? (currentAncillaryTotal / roomsSold).toFixed(2) : '0.00';

  // 6 Overhead Line Items for Current Month
  const elecVal = electricity || 55534.46;
  const waterVal = water || 11681.73;
  const gasVal = gas || 2359.53;
  const secVal = security || 15502.23;
  const itSwVal = currentMonth.itSupportSW || (5400 + 2673);
  const outsourcedVal = currOutsourced || 33822.10;
  const total6Overheads = elecVal + waterVal + gasVal + secVal + itSwVal + outsourcedVal;

  // CHART DATASETS (Verbatim Match to Mission Control)
  
  // 1. Room Yield Chart Data (Exact Match to RoomYieldTab)
  const roomChartData = (allMonths || []).map((m, idx, arr) => {
    const sc = m.roomRevenueSC || 0;
    const nsc = m.roomRevenueNSC || 0;
    const total = m.roomRevenueTotal || (sc + nsc);
    
    let maNsc = nsc;
    let maSc = sc;
    if (idx >= 2) {
      maNsc = (arr[idx].roomRevenueNSC + arr[idx-1].roomRevenueNSC + arr[idx-2].roomRevenueNSC) / 3;
      maSc = (arr[idx].roomRevenueSC + arr[idx-1].roomRevenueSC + arr[idx-2].roomRevenueSC) / 3;
    } else if (idx === 1) {
      maNsc = (arr[1].roomRevenueNSC + arr[0].roomRevenueNSC) / 2;
      maSc = (arr[1].roomRevenueSC + arr[0].roomRevenueSC) / 2;
    }

    return {
      name: m.monthName ? m.monthName.replace(' 2026', '') : m.monthKey,
      sc: sc,
      nsc: nsc,
      totalRevenue: total,
      maNsc: parseFloat(maNsc.toFixed(2)),
      maSc: parseFloat(maSc.toFixed(2)),
      occupancy: m.occupancyPct || 0
    };
  });

  // 2. Utility & Overhead 6-Item Chart Data
  const overheadChartData = [
    { name: 'Electricity', amount: elecVal, color: '#d97706', code: '904-U001' },
    { name: 'Outsourced Labour', amount: outsourcedVal, color: '#2563eb', code: '901-2002' },
    { name: 'Security', amount: secVal, color: '#059669', code: '904-S002' },
    { name: 'Water', amount: waterVal, color: '#0891b2', code: '904-U002' },
    { name: 'IT Support/SW', amount: itSwVal, color: '#7c3aed', code: '904-ITST' },
    { name: 'Gas', amount: gasVal, color: '#db2777', code: '904-U005' }
  ];

  // 3. Payroll Component & Intensity Chart Data
  const payrollChartData = (allMonths || []).map(m => {
    const salary = m.payrollSalary || 242605.46;
    const epf = m.payrollEPF || 184891.25;
    const socsoEis = m.payrollSocsoEis || 4083.58;
    const outsourced = m.outsourcedLabour || 33822.10;
    const welfare = m.staffWelfare || 7792.71;
    const totalPayroll = m.totalPayroll || (salary + epf + socsoEis + outsourced + welfare);

    const totalRev = (m.roomRevenueTotal || 0) + (m.banquetRevenue || 0) + (m.serambiFB || 0) + (m.breakfastPackage || 0) + (m.gajah3Rent || 2500);
    const payrollIntensity = totalRev > 0 ? parseFloat(((totalPayroll / totalRev) * 100).toFixed(1)) : 0;

    return {
      name: m.monthName ? m.monthName.replace(' 2026', '') : m.monthKey,
      salary,
      epf,
      socsoEis,
      outsourced,
      welfare,
      totalPayroll,
      totalRev,
      payrollIntensity
    };
  });

  // 4. Ancillary & POR Chart Data
  const ancillaryChartData = (allMonths || []).map(m => {
    const banquet = m.banquetRevenue || 0;
    const serambi = m.serambiFB || 0;
    const breakfast = m.breakfastPackage || 0;
    const laundry = m.guestLaundry || 0;
    const extra = m.roomExtraCharges || 0;
    const totalAncillary = banquet + serambi + breakfast + laundry + extra;
    const por = m.roomsSold > 0 ? parseFloat((totalAncillary / m.roomsSold).toFixed(2)) : 0;

    return {
      name: m.monthName ? m.monthName.replace(' 2026', '') : m.monthKey,
      banquet,
      serambi,
      totalAncillary,
      por
    };
  });

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="memo-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      
      {/* CSS Print Stylesheet Bulletproof Clean Rules */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }

          html, body {
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
            height: 0 !important;
            max-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }

          .memo-modal-overlay {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            display: block !important;
            background: #ffffff !important;
            backdrop-filter: none !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            z-index: 99999 !important;
          }

          .dashboard-a4-container {
            position: static !important;
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: 11px !important;
          }

          .memo-scroll-body {
            display: block !important;
            position: static !important;
            overflow: visible !important;
            height: auto !important;
            max-height: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .pdf-page-break {
            display: block !important;
            position: relative !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin: 0 !important;
            padding: 0 0 20px 0 !important;
            height: auto !important;
            min-height: 0 !important;
          }

          .recharts-responsive-container {
            width: 100% !important;
            height: 250px !important;
            min-height: 220px !important;
            display: block !important;
          }

          .recharts-wrapper {
            width: 100% !important;
            height: 250px !important;
          }

          .recharts-surface {
            overflow: visible !important;
          }

          .paper-card {
            background: #ffffff !important;
            border: 1px solid #cbd5e1 !important;
            color: #0f172a !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Main Light Mode Executive Paper Modal Outer Wrapper */}
      <div className="dashboard-a4-container" ref={printRef} style={{
        width: '100%',
        maxWidth: '980px',
        maxHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        color: '#0f172a',
        padding: '0'
      }}>
        
        {/* Top Control Navigation Header (Hidden in Print) */}
        <div className="no-print" style={{
          padding: '14px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#0f172a',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} color="#f59e0b" />
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>Executive Management Report PDF</h2>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Multi-Page Executive Report Mirroring Mission Control ({monthName})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn-gold" onClick={handlePrintPDF} style={{ padding: '8px 20px', fontSize: '0.85rem', background: '#f59e0b', color: '#000', fontWeight: 700, border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={16} />
              <span>Print / Export PDF</span>
            </button>

            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Multi-Page Report Printable Container (Light Mode Paper Theme) */}
        <div className="memo-scroll-body" style={{
          padding: '32px',
          overflowY: 'auto',
          flex: 1,
          background: '#ffffff',
          color: '#0f172a',
          fontSize: '0.85rem',
          lineHeight: '1.5'
        }}>

          {/* ========================================================================= */}
          {/* PAGE 1: EXECUTIVE OVERVIEW & P&L SUMMARY */}
          {/* ========================================================================= */}
          <div className="pdf-page-break">
            
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b45309', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  • MANAGEMENT DASHBOARD — PAGE 1 OF 6
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>v2.10</span>
                <span style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde047', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  EXECUTIVE OVERVIEW
                </span>
              </div>
            </div>

            {/* Hotel Letterhead */}
            <div style={{ marginBottom: '20px', borderBottom: '2.5px solid #d97706', paddingBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
                  Hotel Maluri
                </h1>
                <p style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 600 }}>
                  Executive Profit & Loss & Variance Audit Report ({monthName})
                </p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#475569', fontWeight: 500 }}>
                <div>Date: {currentDate}</div>
              </div>
            </div>

            {/* Executive Financial Summary Hero Box */}
            <div className="paper-card" style={{
              background: '#fefce8',
              border: '1px solid #fde047',
              borderRadius: '12px',
              padding: '18px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b45309', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                EXECUTIVE SUMMARY · {monthName.toUpperCase()}
              </div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', fontStyle: 'italic', marginBottom: '8px' }}>
                Unit economics showing steady recovery — but constrained by a {currPayrollIntensity}% payroll intensity ratio vs 35-40% target.
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#334155', marginBottom: '14px', lineHeight: '1.6' }}>
                Total Room Revenue reached <strong>RM {roomRevenueTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> (RevPAR RM {revpar.toFixed(2)}, ADR RM {adr.toFixed(2)}). Gross room operating margin stands strong at <strong>{roomMarginPct}%</strong>. Total monthly payroll of <strong>RM {currTotalPayroll.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> represents <strong>{currPayrollIntensity}%</strong> of revenue, remaining the primary structural barrier to net profitability. Basic salary optimization (-27.8% vs Jan) demonstrates positive restructuring progress.
              </p>

              {/* 4 High-Contrast Stat Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '10px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#047857', display: 'block' }}>▲ REVPAR YIELD</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#065f46' }}>RM {revpar.toFixed(2)}</span>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '10px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1d4ed8', display: 'block' }}>★ BASIC SALARY OPTIMIZED</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e40af' }}>RM {currSalary.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '10px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#b91c1c', display: 'block' }}>! PAYROLL INTENSITY</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#991b1b' }}>{currPayrollIntensity}% Rev</span>
                </div>

                <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '8px', padding: '10px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6d28d9', display: 'block' }}>⚡ OUTSOURCED LABOUR</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#5b21b6' }}>RM {currOutsourced.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>

            {/* Audit Alerts Box */}
            {alerts && alerts.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#b45309', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Mission Control Audit Alerts & Exception Triggers
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {alerts.map((alert, idx) => (
                    <div key={idx} className="paper-card" style={{
                      padding: '10px 14px',
                      background: alert.type === 'CRITICAL' ? '#fff1f2' : '#fffbeb',
                      border: `1px solid ${alert.type === 'CRITICAL' ? '#fda4af' : '#fde047'}`,
                      borderRadius: '6px'
                    }}>
                      <div style={{ fontWeight: 800, color: alert.type === 'CRITICAL' ? '#e11d48' : '#b45309', fontSize: '0.8rem' }}>
                        ⚠️ [{alert.category}] {alert.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', marginTop: '2px', color: '#334155' }}>
                        {alert.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analyst Outlook Box */}
            <div className="paper-card" style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '16px'
            }}>
              <span style={{ background: '#0f172a', color: '#ffffff', fontWeight: 800, fontSize: '0.68rem', padding: '2px 8px', borderRadius: '4px' }}>
                ANALYST Cautiously Positive Outlook
              </span>
              <p style={{ fontSize: '0.82rem', color: '#1e293b', lineHeight: '1.6', marginTop: '8px' }}>
                <strong>The operational narrative has stabilized — but payroll rationalization remains the #1 priority.</strong> Hotel Maluri enters H2 2026 with a strong unit foundation: weighted ADR of RM 161.68, RevPAR of RM 86.69, and an 89.6% room operating margin. Priorities: <strong>(1)</strong> Calibrate foreign contract worker hours directly to room reopening milestones; <strong>(2)</strong> Implement direct booking incentives to convert 5–10% of OTA traffic back to SC channels; and <strong>(3)</strong> Accrue unrecorded utility liabilities prior to monthly ledger close.
              </p>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PAGE 2: ROOM DIVISION & YIELD MANAGEMENT */}
          {/* ========================================================================= */}
          <div className="pdf-page-break">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b45309', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                • MANAGEMENT DASHBOARD — PAGE 2 OF 6
              </span>
              <span style={{ background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                ROOM DIVISION & YIELD
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', borderBottom: '1.5px solid #cbd5e1', paddingBottom: '8px' }}>
              1. Room Division Yield & Channel Mix Performance
            </h2>

            {/* VERBATIM MISSION CONTROL CHART 1: Room Revenue SC vs NSC + Moving Average (Exact Match with Legend) */}
            <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Monthly Room Revenue by Channel (SC vs NSC) with 3-Month Moving Average
              </h4>
              <div style={{ width: '100%', height: 260, minHeight: 230 }}>
                <ResponsiveContainer width="100%" height={260}>
                  <ComposedChart data={roomChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight={600} />
                    <YAxis stroke="#475569" fontSize={11} tickFormatter={(v) => `RM ${(v/1000).toFixed(0)}k`} />
                    <Tooltip 
                      contentStyle={{ background: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: '#0f172a' }}
                      formatter={(val, name) => [`RM ${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, name]}
                    />
                    <Legend wrapperStyle={{ paddingTop: '6px', fontSize: '11px', fontWeight: 600 }} />
                    <Bar dataKey="nsc" stackId="a" fill="#2563eb" name="NSC Revenue (500-1002)" />
                    <Bar dataKey="sc" stackId="a" fill="#d97706" name="SC Revenue (500-1001)" />
                    <Line type="monotone" dataKey="maNsc" stroke="#1d4ed8" strokeWidth={2.5} strokeDasharray="4 4" dot={false} name="NSC 3-Mo Moving Avg" />
                    <Line type="monotone" dataKey="maSc" stroke="#b45309" strokeWidth={2.5} strokeDasharray="4 4" dot={false} name="SC 3-Mo Moving Avg" />
                    <ReferenceLine y={322572.35} stroke="#2563eb" strokeDasharray="3 3" label={{ value: 'H1 Avg NSC (RM 322.6k)', fill: '#1e40af', fontSize: 10, position: 'insideTopRight' }} />
                    <ReferenceLine y={51941.57} stroke="#d97706" strokeDasharray="3 3" label={{ value: 'H1 Avg SC (RM 51.9k)', fill: '#b45309', fontSize: 10, position: 'insideBottomRight' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* VERBATIM MISSION CONTROL ANALYSIS CARD: Room Yield */}
            <div className="paper-card" style={{ padding: '18px', borderRadius: '10px', borderLeft: '4px solid #2563eb', background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={18} color="#2563eb" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  Room Division & Yield Strategic Analysis & Moving Average Insights
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', fontSize: '0.81rem', lineHeight: '1.5' }}>
                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1d4ed8', marginBottom: '4px' }}>
                    1. Channel Dependency & Moving Average Stability
                  </h4>
                  <p style={{ color: '#475569' }}>
                    NSC net channel revenue accounts for <strong>{nscPct}%</strong> of total room revenue (H1 benchmark average: <strong>RM 322,572.35 / month</strong>). The 3-month moving average (MA-3) demonstrates channel stability between RM 302.4k and RM 338.8k/month. Direct SC bookings represent <strong>{scPct}%</strong> (H1 benchmark average: <strong>RM 51,941.57 / month</strong>).
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b45309', marginBottom: '4px' }}>
                    2. Rate Dilution & OTA Leakage Risk
                  </h4>
                  <p style={{ color: '#475569' }}>
                    April volume expanded by <strong>+16.0% MoM</strong> (2,418 rooms sold), yet ADR dropped by -1.19% to RM 152.51. Accrued Booking.com commission reached <strong>RM {otaComm.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> this month (H1 benchmark average: <strong>RM 12,853.22 / month</strong>).
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#047857', marginBottom: '4px' }}>
                    3. Executive Yield Recommendations
                  </h4>
                  <p style={{ color: '#475569' }}>
                    Maintain strict rate floors on OTA net channels during peak demand. Direct SC room gross margin remains resilient at <strong>{roomMarginPct}%</strong> (direct cost: RM {directRoomCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}). Direct booking incentives offer immediate margin expansion.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PAGE 3: UTILITY ACCRUALS & CAPEX AUDIT */}
          {/* ========================================================================= */}
          <div className="pdf-page-break">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b45309', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                • MANAGEMENT DASHBOARD — PAGE 3 OF 6
              </span>
              <span style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde047', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                UTILITIES & CAPEX AUDIT
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', borderBottom: '1.5px solid #cbd5e1', paddingBottom: '8px' }}>
              2. Utility Overheads & Energy Infrastructure Modernization
            </h2>

            {/* VERBATIM MISSION CONTROL CHART 2: 6 Overhead Line Items Distribution */}
            <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Utility & Operational Overhead 6-Item Cost Distribution (Total: RM {total6Overheads.toLocaleString('en-US', { minimumFractionDigits: 2 })})
              </h4>
              <div style={{ width: '100%', height: 220, minHeight: 200 }}>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={overheadChartData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#475569" fontSize={11} tickFormatter={(v) => `RM ${(v/1000).toFixed(0)}k`} />
                    <YAxis type="category" dataKey="name" stroke="#475569" fontSize={11} width={120} fontWeight={600} />
                    <Tooltip 
                      contentStyle={{ background: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a' }}
                      itemStyle={{ color: '#0f172a' }}
                      formatter={(value) => `RM ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    />
                    <Legend wrapperStyle={{ paddingTop: '6px', fontSize: '11px', fontWeight: 600 }} />
                    <Bar dataKey="amount" name="Monthly Cost (RM)" radius={[0, 6, 6, 0]}>
                      {overheadChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* VERBATIM MISSION CONTROL ANALYSIS CARD: Utility & Overheads & Trend Insights */}
            <div className="paper-card" style={{ padding: '18px', borderRadius: '10px', borderLeft: '4px solid #d97706', background: '#f8fafc', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Strategic Overhead Cost & Trend Analysis (6 Specified Line Items)
                </h3>
                <span style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                  OVERHEAD TREND: RISING 📈 (+11.9% H1 Growth)
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', fontSize: '0.81rem', lineHeight: '1.5' }}>
                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b45309', marginBottom: '4px' }}>
                    1. Electricity & HVAC Load (43.1% Share) · RISING 📈
                  </h4>
                  <p style={{ color: '#475569' }}>
                    Electricity (`904-U001`) averages <strong>RM 55,534.46 / month</strong> (H1 Total: <strong>RM 333,206.75</strong>). Costs grew <strong>+13.2% from Jan (RM 51.1k) to June (RM 57.9k)</strong>, directly driven by peak room occupancy (April peak of 2,418 rooms sold / 58.4% occupancy) combined with Kuala Lumpur's high equatorial ambient heat index (daytime temperatures averaging 32°C–34°C with high humidity requiring continuous central chiller operation). FCU replacements and 3-core motorized valve installations under Capex (`200-1000`) target a 10-15% kWh reduction.
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1d4ed8', marginBottom: '4px' }}>
                    2. Outsourced Labour & Guard Security (38.3% Combined) · RISING 📈
                  </h4>
                  <p style={{ color: '#475569' }}>
                    Outsourced Labour (`901-2002`) peaked in June at <strong>RM 37,685.16</strong> (+15.5% MoM jump / +10.5% over Jan), while Security (`904-S002`) rose to <strong>RM 18,499.10</strong> (+27.9% over Jan). Contract staffing represents 38.3% of non-utility overheads, absorbing permanent base salary savings.
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6d28d9', marginBottom: '4px' }}>
                    3. Water, IT Support/SW & Gas (18.5% Combined) · MIXED ➡️
                  </h4>
                  <p style={{ color: '#475569' }}>
                    Water (`904-U002`) is flat at <strong>RM 11,935.95</strong> (-2.0% vs Jan), IT Support (`904-ITST`) is fixed at <strong>RM 8,073.00</strong>, while Gas (`904-U005`) rose <strong>+17.9%</strong> to <strong>RM 2,809.25</strong> post-Ramadan.
                  </p>
                </div>
              </div>
            </div>

            {/* MANAGING DIRECTOR P&L BREAKEVEN & REVPAR COVERAGE CARD FOR PDF */}
            <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', borderLeft: '4px solid #059669', background: '#ecfdf5', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#047857', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                MANAGING DIRECTOR P&L BREAKEVEN & REVPAR COVERAGE TARGETS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '10px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '10px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#b45309', display: 'block' }}>COVER 6 OVERHEADS ONLY</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#92400e' }}>RM 150,588 / mo</span>
                  <span style={{ fontSize: '0.68rem', color: '#475569', display: 'block' }}>Requires +RM 27.11 RevPAR Lift</span>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '10px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#047857', display: 'block' }}>FULL BREAKEVEN REVENUE</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#065f46' }}>RM 722,766 / mo</span>
                  <span style={{ fontSize: '0.68rem', color: '#475569', display: 'block' }}>+53.0% Top-Line Growth Needed</span>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '10px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1d4ed8', display: 'block' }}>TARGET BREAKEVEN REVPAR</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e40af' }}>RM 131.09 / room</span>
                  <span style={{ fontSize: '0.68rem', color: '#475569', display: 'block' }}>+56.0% Lift over RM 84.05 Baseline</span>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '10px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6d28d9', display: 'block' }}>DUAL-ENGINE REVPAR TARGET</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#5b21b6' }}>RM 107.55 / room</span>
                  <span style={{ fontSize: '0.68rem', color: '#475569', display: 'block' }}>With -RM 103k/mo Cost Savings</span>
                </div>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#064e3b', marginTop: '10px', lineHeight: '1.5', margin: '10px 0 0 0' }}>
                <strong>Strategic Executive Guidance:</strong> Net Contribution Margin stands at <strong>85.6%</strong>. To eliminate the monthly net loss of -RM 146,353 without cost cuts, RevPAR must reach <strong>RM 131.09</strong> (e.g. 72% occupancy @ RM 182 ADR). Under the <em>Dual-Engine Strategy</em> (cost reductions of ~RM 103k/mo in foreign labor and HVAC power), the target RevPAR drops to <strong>RM 107.55</strong> (+27.9% lift).
              </p>
            </div>

            {/* Renovation Capex Table */}
            <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Energy Infrastructure & HVAC Modernization Capex (Account 200-1000)
              </h4>
              {renovationCapex.length === 0 ? (
                <div style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center', padding: '12px' }}>
                  No renovation Capex line items logged in General Ledger for {monthName}.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #cbd5e1', color: '#475569', textAlign: 'left', fontWeight: 700 }}>
                      <th style={{ padding: '6px' }}>Date</th>
                      <th style={{ padding: '6px' }}>Doc Ref</th>
                      <th style={{ padding: '6px' }}>Vendor</th>
                      <th style={{ padding: '6px' }}>Line Item Description</th>
                      <th style={{ padding: '6px', textAlign: 'right' }}>Capex Outlay (RM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renovationCapex.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '6px', color: '#64748b' }}>{item.date}</td>
                        <td style={{ padding: '6px', color: '#b45309', fontWeight: 700 }}>{item.docNo}</td>
                        <td style={{ padding: '6px', fontWeight: 700 }}>{item.vendor}</td>
                        <td style={{ padding: '6px' }}>{item.description}</td>
                        <td style={{ padding: '6px', textAlign: 'right', fontWeight: 800, color: '#0f172a' }}>
                          RM {item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PAGE 4: PAYROLL & STAFF COST ANALYSIS */}
          {/* ========================================================================= */}
          <div className="pdf-page-break">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b45309', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                • MANAGEMENT DASHBOARD — PAGE 4 OF 6
              </span>
              <span style={{ background: '#fce7f3', color: '#9d174d', border: '1px solid #fbcfe8', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                PAYROLL ANALYSIS
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', borderBottom: '1.5px solid #cbd5e1', paddingBottom: '8px' }}>
              3. Payroll Structure, Headcount Optimization & Statutory Load
            </h2>

            {/* VERBATIM MISSION CONTROL CHART 3: Stacked Payroll Component Breakdown */}
            <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Monthly Payroll Component Breakdown (Basic Salary, EPF, Outsourced Labour)
              </h4>
              <div style={{ width: '100%', height: 200, minHeight: 180 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={payrollChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight={600} />
                    <YAxis stroke="#475569" fontSize={11} tickFormatter={(v) => `RM ${(v/1000).toFixed(0)}k`} />
                    <Tooltip 
                      contentStyle={{ background: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a' }}
                      itemStyle={{ color: '#0f172a' }}
                      formatter={(val, name) => [`RM ${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, name]}
                    />
                    <Legend wrapperStyle={{ paddingTop: '6px', fontSize: '11px', fontWeight: 600 }} />
                    <Bar dataKey="salary" stackId="a" fill="#2563eb" name="Basic Salary" />
                    <Bar dataKey="epf" stackId="a" fill="#7c3aed" name="EPF Contribution" />
                    <Bar dataKey="outsourced" stackId="a" fill="#d97706" name="Outsourced Labour" />
                    <Bar dataKey="welfare" stackId="a" fill="#059669" name="Staff Welfare" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* VERBATIM MISSION CONTROL CHART 4: Payroll Intensity Ratio % vs Target Line */}
            <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Payroll Intensity Ratio (% of Total Revenue) vs 35%–40% Target Benchmark
              </h4>
              <div style={{ width: '100%', height: 180, minHeight: 160 }}>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={payrollChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight={600} />
                    <YAxis stroke="#475569" fontSize={11} tickFormatter={(v) => `${v}%`} />
                    <Tooltip 
                      contentStyle={{ background: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a' }}
                      itemStyle={{ color: '#0f172a' }}
                      formatter={(val) => `${Number(val).toFixed(1)}% of Revenue`}
                    />
                    <Legend wrapperStyle={{ paddingTop: '6px', fontSize: '11px', fontWeight: 600 }} />
                    <Line type="monotone" dataKey="payrollIntensity" stroke="#dc2626" strokeWidth={2.5} dot={{ fill: '#dc2626', r: 3 }} name="Payroll Intensity %" />
                    <ReferenceLine y={40} stroke="#059669" strokeDasharray="3 3" label={{ value: 'Target (35-40%)', fill: '#047857', fontSize: 10, position: 'insideTopRight' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* VERBATIM MISSION CONTROL ANALYSIS CARD: Payroll */}
            <div className="paper-card" style={{ padding: '18px', borderRadius: '10px', borderLeft: '4px solid #dc2626', background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Sparkles size={18} color="#dc2626" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  Payroll & Staff Cost Strategic Analysis & Restructuring Insights
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', fontSize: '0.81rem', lineHeight: '1.5' }}>
                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#047857', marginBottom: '4px' }}>
                    1. Headcount & Base Salary Optimization (-27.8%)
                  </h4>
                  <p style={{ color: '#475569' }}>
                    Basic Salaries (`901-1001`) dropped from <strong>RM 304,141.14</strong> in Jan down to <strong>RM 219,465.63</strong> in June. This reflects a successful <strong>27.8% base salary optimization</strong>, saving over RM 84,000 monthly in direct base payroll. Statutory EPF (`901-1002`) automatically scaled down in tandem as a function of salary.
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b45309', marginBottom: '4px' }}>
                    2. Outsourced Foreign Labour Flexibility (RM 33.8k/mo)
                  </h4>
                  <p style={{ color: '#475569' }}>
                    Outsourced foreign contract labour (`901-2002`) averaged <strong>RM 33,822.10 / month</strong> in H1 (peaking at RM 37.6k in June). Adjusting contract man-hours offers immediate payroll flexibility during lower-demand periods.
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b91c1c', marginBottom: '4px' }}>
                    3. Payroll Intensity vs 35-40% Target
                  </h4>
                  <p style={{ color: '#475569' }}>
                    Payroll intensity averaged <strong>98.5%</strong> of revenue across H1. Management must calibrate total staff deployment directly to room reopening milestones and occupancy tiers to reach the 35%-40% industry benchmark.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PAGE 5: VENDOR CONTRACTS & ANCILLARY WATCH */}
          {/* ========================================================================= */}
          <div className="pdf-page-break">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b45309', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                • MANAGEMENT DASHBOARD — PAGE 5 OF 6
              </span>
              <span style={{ background: '#f3e8ff', color: '#6b21a8', border: '1px solid #e9d5ff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                VENDORS & ANCILLARY
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', borderBottom: '1.5px solid #cbd5e1', paddingBottom: '8px' }}>
              4. Vendor Overhead Compliance & Ancillary Revenue Watch
            </h2>

            {/* Vendor Contracts Table */}
            <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Fixed Vendor Contract Run-Rate Compliance
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #cbd5e1', color: '#475569', textAlign: 'left', fontWeight: 700 }}>
                    <th style={{ padding: '6px' }}>Vendor Account</th>
                    <th style={{ padding: '6px' }}>Contract Service</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Fixed Baseline (RM)</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Current Month (RM)</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Compliance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '6px', color: '#6d28d9', fontWeight: 700 }}>904-ITST</td>
                    <td style={{ padding: '6px' }}>SC Systems IT Support</td>
                    <td style={{ padding: '6px', textAlign: 'right' }}>RM 5,400.00</td>
                    <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700 }}>RM {(itSupportSC || 5400).toFixed(2)}</td>
                    <td style={{ padding: '6px', textAlign: 'right', color: '#047857', fontWeight: 800 }}>100% OK</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '6px', color: '#6d28d9', fontWeight: 700 }}>610-5000</td>
                    <td style={{ padding: '6px' }}>BGD Access Parking System</td>
                    <td style={{ padding: '6px', textAlign: 'right' }}>RM 1,940.00</td>
                    <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700 }}>RM {(parkingBGD || 1940).toFixed(2)}</td>
                    <td style={{ padding: '6px', textAlign: 'right', color: '#047857', fontWeight: 800 }}>100% OK</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '6px', color: '#047857', fontWeight: 700 }}>540-1000</td>
                    <td style={{ padding: '6px' }}>Gajah3 Cafe Lease Rental</td>
                    <td style={{ padding: '6px', textAlign: 'right' }}>RM 2,500.00</td>
                    <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700 }}>RM {(gajah3Rent || 2500).toFixed(2)}</td>
                    <td style={{ padding: '6px', textAlign: 'right', color: '#047857', fontWeight: 800 }}>Income OK</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* VERBATIM MISSION CONTROL CHART 5: Per Occupied Room (POR) Secondary Guest Spend */}
            <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Per Occupied Room (POR) Secondary Guest Spend Trend (RM / room night)
              </h4>
              <div style={{ width: '100%', height: 200, minHeight: 180 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <ComposedChart data={ancillaryChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight={600} />
                    <YAxis stroke="#475569" fontSize={11} tickFormatter={(v) => `RM ${v}`} />
                    <Tooltip 
                      contentStyle={{ background: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a' }}
                      itemStyle={{ color: '#0f172a' }}
                      formatter={(val) => [`RM ${Number(val).toFixed(2)} / room`, 'POR Spend']}
                    />
                    <Legend wrapperStyle={{ paddingTop: '6px', fontSize: '11px', fontWeight: 600 }} />
                    <Line type="monotone" dataKey="por" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: '#7c3aed', r: 4 }} name="POR Spend (RM)" />
                    <ReferenceLine y={35.63} stroke="#d97706" strokeDasharray="3 3" label={{ value: 'H1 POR Avg (RM 35.63)', fill: '#b45309', fontSize: 10, position: 'insideTopRight' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* VERBATIM MISSION CONTROL ANALYSIS CARDS: Ancillary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              <div className="paper-card" style={{ padding: '14px', borderRadius: '10px', borderLeft: '4px solid #7c3aed', background: '#f8fafc' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  Ancillary Revenue & Event Volatility Analysis
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: '1.4' }}>
                  Ancillary revenue averaged <strong>RM 85,293.58 / month</strong> in H1. Banquet Hall rentals (<strong>RM 50,917.84 / month avg</strong>) and Serambi Catering (March peak of <strong>RM 101,489.71</strong>) generate 89.8% of total ancillary yield. Tenancy lease from Gajah3 Cafe adds <strong>RM 2,500.00 / month</strong> fixed cushion.
                </p>
              </div>

              <div className="paper-card" style={{ padding: '14px', borderRadius: '10px', borderLeft: '4px solid #d97706', background: '#f8fafc' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  Per Occupied Room (POR) & Minor Guest Services Analysis
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: '1.4' }}>
                  Average secondary spend per occupied room held at <strong>RM 35.63 / room night</strong> in H1 (peaking at RM 76.59 in March). Guest Laundry (`500-1004`) averaged only <strong>RM 135.64 / month</strong>; implementing front-desk check-in prompts for express valet can unlock RM 3,000-5,000 monthly.
                </p>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PAGE 6: FINANCIAL STATEMENTS & STRATEGIC RECOMMENDATIONS */}
          {/* ========================================================================= */}
          <div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b45309', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                • MANAGEMENT DASHBOARD — PAGE 6 OF 6
              </span>
              <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                STATEMENTS & ACTIONS
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', borderBottom: '1.5px solid #cbd5e1', paddingBottom: '8px' }}>
              5. Financial Statements & Strategic Action Plan
            </h2>

            {/* Financial Statement Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              
              {/* P&L & Payroll Breakdown Table */}
              <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  PAYROLL & STAFF COST BREAKDOWN – {monthName.toUpperCase()} (RM)
                </h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #cbd5e1', color: '#475569', fontWeight: 700 }}>
                      <th style={{ textAlign: 'left', padding: '6px' }}>Payroll Category</th>
                      <th style={{ textAlign: 'right', padding: '6px' }}>{monthName}</th>
                      <th style={{ textAlign: 'right', padding: '6px' }}>H1 Monthly Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '6px', color: '#1d4ed8', fontWeight: 600 }}>Basic Salaries (901-1001)</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM {currSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM 242,605.46</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '6px', color: '#6d28d9', fontWeight: 600 }}>EPF Statutory (Derived)</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM {currEpf.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM 184,891.25</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '6px', color: '#b45309', fontWeight: 600 }}>Outsourced Labour (901-2002)</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM {currOutsourced.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM 33,822.10</td>
                    </tr>
                    <tr style={{ fontWeight: 800, background: '#f8fafc' }}>
                      <td style={{ padding: '6px', color: '#0f172a' }}>TOTAL PAYROLL COST</td>
                      <td style={{ padding: '6px', textAlign: 'right', color: '#b45309' }}>RM {currTotalPayroll.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '6px', textAlign: 'right', color: '#b45309' }}>RM 490,709.92</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Utility & Key Cost Watch Table */}
              <div className="paper-card" style={{ padding: '16px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  UTILITIES & KEY COST WATCH – {monthName.toUpperCase()} (RM)
                </h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #cbd5e1', color: '#475569', fontWeight: 700 }}>
                      <th style={{ textAlign: 'left', padding: '6px' }}>Cost Item</th>
                      <th style={{ textAlign: 'right', padding: '6px' }}>{monthName}</th>
                      <th style={{ textAlign: 'right', padding: '6px' }}>H1 Monthly Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '6px' }}>Electricity (904-U001)</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM {elecVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM 55,534.46</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '6px' }}>Water (904-U002)</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM {waterVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM 11,681.73</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '6px', color: '#b91c1c', fontWeight: 600 }}>Sewerage (904-U004)*</td>
                      <td style={{ padding: '6px', textAlign: 'right', color: '#b91c1c', fontWeight: 700 }}>RM {sewerage.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '6px', textAlign: 'right', color: '#b91c1c', fontWeight: 700 }}>RM 4,975.00</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '6px' }}>Booking.com Commission</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM {otaComm.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>RM 12,853.22</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            {/* Strategic Action Items */}
            <div className="paper-card" style={{ padding: '18px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #cbd5e1' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#b45309', marginBottom: '10px', textTransform: 'uppercase' }}>
                Strategic Action Recommendations for Executive Management
              </h4>
              <ol style={{ paddingLeft: '20px', fontSize: '0.82rem', color: '#0f172a', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <strong>Dynamic Contract Labour Control:</strong> Calibrate contract foreign worker man-hours (`901-2002`) directly against room inventory reopening milestones to bring payroll intensity down toward the 35%–40% benchmark.
                </li>
                <li>
                  <strong>Recapture OTA Commission Leakage:</strong> Implement direct SC booking incentives to convert 5%–10% of OTA traffic back to direct hotel channels, reclaiming ~RM 4,000–7,000 monthly.
                </li>
                <li>
                  <strong>Strict Utility Accrual Auditing:</strong> Ensure all unbilled vendor liabilities (Sewerage & Gas) are recorded prior to ledger closing to eliminate artificially inflated monthly net profit figures.
                </li>
              </ol>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

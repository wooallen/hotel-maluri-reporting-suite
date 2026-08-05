import React, { useState } from 'react';
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Line, ComposedChart, ReferenceLine } from 'recharts';
import { BedDouble, Percent, DollarSign, PieChart, ArrowUpRight, TrendingUp, ShieldAlert, Sparkles, Target, Zap } from 'lucide-react';

export default function RoomYieldTab({ allMonths, currentMonth }) {
  if (!currentMonth) return null;

  const [showMovingAvg, setShowMovingAvg] = useState(true);

  // Compute 3-Month Moving Averages & Data points
  const chartData = allMonths.map((m, idx) => {
    let maSc = m.roomRevenueSC;
    let maNsc = m.roomRevenueNSC;

    if (idx === 1) {
      maSc = (allMonths[0].roomRevenueSC + allMonths[1].roomRevenueSC) / 2;
      maNsc = (allMonths[0].roomRevenueNSC + allMonths[1].roomRevenueNSC) / 2;
    } else if (idx >= 2) {
      maSc = (allMonths[idx-2].roomRevenueSC + allMonths[idx-1].roomRevenueSC + allMonths[idx].roomRevenueSC) / 3;
      maNsc = (allMonths[idx-2].roomRevenueNSC + allMonths[idx-1].roomRevenueNSC + allMonths[idx].roomRevenueNSC) / 3;
    }

    return {
      name: m.monthName ? m.monthName.replace(' 2026', '') : m.monthKey,
      adr: m.adr,
      revpar: m.revpar,
      occ: m.occupancyPct,
      sc: m.roomRevenueSC,
      nsc: m.roomRevenueNSC,
      total: m.roomRevenueTotal,
      maSc: parseFloat(maSc.toFixed(2)),
      maNsc: parseFloat(maNsc.toFixed(2)),
      otaComm: m.otaCommissionBooking || 0
    };
  });

  const scPct = ((currentMonth.roomRevenueSC / currentMonth.roomRevenueTotal) * 100).toFixed(1);
  const nscPct = ((currentMonth.roomRevenueNSC / currentMonth.roomRevenueTotal) * 100).toFixed(1);
  const directRoomCost = currentMonth.roomDirectCost || 0;
  const roomMarginPct = (((currentMonth.roomRevenueTotal - directRoomCost) / currentMonth.roomRevenueTotal) * 100).toFixed(1);
  const otaComm = currentMonth.otaCommissionBooking || 0;
  const otaShareOfSC = currentMonth.roomRevenueSC > 0 ? ((otaComm / currentMonth.roomRevenueSC) * 100).toFixed(1) : '0.0';

  // H1 Averages
  const avgScH1 = 51941.57;
  const avgNscH1 = 322572.35;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      
      {/* Top Deep-Dive Key Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* H1 Avg NSC & SC Card */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>H1 AVERAGE NSC & SC</span>
            <PieChart size={18} color="#f59e0b" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
            <span className="metric-value" style={{ fontSize: '1.25rem', color: '#3b82f6' }}>
              RM 322.6k NSC
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            H1 SC Avg: RM 51,941.57 / mo (13.4%)
          </div>
        </div>

        {/* Room Operating Margin */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ROOM OPERATING MARGIN</span>
            <Percent size={18} color="#10b981" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '4px' }}>
            {roomMarginPct}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Direct Expenses: RM {directRoomCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        {/* OTA Commission Expense */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>BOOKING.COM COMMISSION</span>
            <DollarSign size={18} color="#8b5cf6" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '4px' }}>
            RM {otaComm.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            H1 Avg Commission: RM 12,853.22 / mo
          </div>
        </div>

      </div>

      {/* Stacked Revenue Mix Chart (SC vs NSC) with Moving Average & Reference Lines */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              SC & NSC Room Revenue with 3-Month Moving Average Overlay
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Monthly comparison of SC & NSC revenues overlaid with 3-month moving averages (MA-3) and H1 baseline averages
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem' }}>
            <button 
              onClick={() => setShowMovingAvg(!showMovingAvg)}
              style={{
                background: showMovingAvg ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: showMovingAvg ? '#fbbf24' : 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {showMovingAvg ? '✓ MA-3 Trend On' : '+ Show MA-3 Trend'}
            </button>
          </div>
        </div>

        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `RM ${(v/1000).toFixed(0)}k`} />
              <Tooltip 
                contentStyle={{ background: '#121826', borderColor: '#f59e0b', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value, name) => [`RM ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, name]}
              />
              <Bar dataKey="nsc" stackId="a" fill="#3b82f6" name="NSC Revenue (500-1002)" />
              <Bar dataKey="sc" stackId="a" fill="#f59e0b" name="SC Revenue (500-1001)" />
              
              {showMovingAvg && (
                <>
                  <Line type="monotone" dataKey="maNsc" stroke="#60a5fa" strokeWidth={2.5} strokeDasharray="4 4" dot={false} name="NSC 3-Mo Moving Avg" />
                  <Line type="monotone" dataKey="maSc" stroke="#fbbf24" strokeWidth={2.5} strokeDasharray="4 4" dot={false} name="SC 3-Mo Moving Avg" />
                </>
              )}

              <ReferenceLine y={avgNscH1} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'H1 Avg NSC (RM 322.6k)', fill: '#60a5fa', fontSize: 11, position: 'insideTopRight' }} />
              <ReferenceLine y={avgScH1} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'H1 Avg SC (RM 51.9k)', fill: '#fbbf24', fontSize: 11, position: 'insideBottomRight' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DEDICATED SEPARATE CARD: Room Division & Yield Strategic Analysis Card */}
      <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #f59e0b', background: 'rgba(18, 24, 38, 0.85)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '8px', borderRadius: '8px' }}>
            <Sparkles size={20} color="#f59e0b" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
              Room Division & Yield Strategic Analysis & Moving Average Insights
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              In-depth executive analysis placed directly below the room yield trend graph
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', fontSize: '0.86rem', lineHeight: '1.6' }}>
          
          {/* Analysis Column 1 */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#3b82f6', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PieChart size={16} /> 1. Channel Dependency & Moving Average Stability
            </h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              Non-Service Chargeable (NSC) revenue represents <strong>83.3%</strong> of total room revenue (H1 Average: <strong>RM 322,572.35 / month</strong>), demonstrating that Hotel Maluri's volume is heavily reliant on OTAs and net corporate contracts. 
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              The 3-month moving average (MA-3) for NSC stabilizes between <strong>RM 302.4k and RM 338.8k</strong>, showing steady base volume. Meanwhile, direct SC revenue MA-3 stabilizes at <strong>RM 50.0k – RM 57.1k</strong>.
            </p>
          </div>

          {/* Analysis Column 2 */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f59e0b', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={16} /> 2. Rate Dilution & OTA Leakage Risk
            </h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              In April 2026, room night volume surged by <strong>+16.0% MoM</strong> (2,085 to 2,418 rooms sold), yet ADR dropped from RM 154.34 to RM 152.51 due to rate dilution on net discount channels.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              Booking.com commissions averaged <strong>RM 12,853.22 / month</strong> (H1 total: <strong>RM 77,119.33</strong>), absorbing nearly a quarter of all direct SC room earnings.
            </p>
          </div>

          {/* Analysis Column 3 */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#10b981', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target size={16} /> 3. Executive Yield Strategy Recommendations
            </h4>
            <ul style={{ color: 'var(--text-muted)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Enforce dynamic rate floors during peak windows to protect RevPAR.</li>
              <li>Offer direct booking incentives (free late check-out) to shift 5-10% OTA volume back to SC channels.</li>
              <li>Maintain strict house-keeping cost controls to preserve the <strong>89.6% room operating margin</strong>.</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Breakdown Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
          SC & NSC Moving Average Table – H1 2026
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Month</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>SC Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>SC 3-Mo MA</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>NSC Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>NSC 3-Mo MA</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((d, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{d.name}</td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#f59e0b' }}>
                    RM {d.sc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#fbbf24' }}>
                    RM {d.maSc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#3b82f6' }}>
                    RM {d.nsc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#60a5fa' }}>
                    RM {d.maNsc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700, background: 'rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '12px', color: '#ffffff' }}>H1 PERIOD AVERAGE</td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#f59e0b' }}>
                  RM 51,941.57
                </td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#fbbf24' }}>
                  RM 51,941.57
                </td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#3b82f6' }}>
                  RM 322,572.35
                </td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#60a5fa' }}>
                  RM 322,572.35
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

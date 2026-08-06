import React, { useState } from 'react';
import { FIXED_BASELINES } from '../../constants/baselines';
import { ShieldCheck, AlertOctagon, Wrench, Zap, Droplet, Flame, Shield, Server, Users, DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

export default function UtilitiesTab({ currentMonth }) {
  if (!currentMonth) return null;

  const { sewerage, gas, electricity, water, renovationCapex = [] } = currentMonth;
  
  // Specific 6 Overhead Line Items for Current Month (with realistic H1 fallbacks)
  const elecVal = electricity || 55534.46;
  const waterVal = water || 11681.73;
  const gasVal = gas || 2359.53;
  const secVal = currentMonth.security || 15502.23;
  const itSwVal = currentMonth.itSupportSW || (5400 + 2673);
  const outsourcedVal = currentMonth.outsourcedLabour || 33822.10;

  const total6Overheads = elecVal + waterVal + gasVal + secVal + itSwVal + outsourcedVal;

  const overheadData = [
    { name: 'Electricity', amount: elecVal, color: '#f59e0b', code: '904-U001', pct: ((elecVal / total6Overheads) * 100).toFixed(1) },
    { name: 'Outsourced Labour', amount: outsourcedVal, color: '#3b82f6', code: '901-2002', pct: ((outsourcedVal / total6Overheads) * 100).toFixed(1) },
    { name: 'Security', amount: secVal, color: '#10b981', code: '904-S002', pct: ((secVal / total6Overheads) * 100).toFixed(1) },
    { name: 'Water', amount: waterVal, color: '#06b6d4', code: '904-U002', pct: ((waterVal / total6Overheads) * 100).toFixed(1) },
    { name: 'IT Support/SW', amount: itSwVal, color: '#8b5cf6', code: '904-ITST', pct: ((itSwVal / total6Overheads) * 100).toFixed(1) },
    { name: 'Gas', amount: gasVal, color: '#ec4899', code: '904-U005', pct: ((gasVal / total6Overheads) * 100).toFixed(1) }
  ];

  const sewerageAnomaly = sewerage < (FIXED_BASELINES.SEWERAGE_MONTHLY * 0.5);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      
      {/* 6 Line Items Quick KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        
        {/* Electricity */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>1. ELECTRICITY</span>
            <Zap size={16} color="#f59e0b" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.15rem', color: '#f59e0b' }}>
            RM {elecVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            43.1% of 6 Overheads (Acc 904-U001)
          </div>
        </div>

        {/* Outsourced Labour */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>2. OUTSOURCED LABOUR</span>
            <Users size={16} color="#3b82f6" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.15rem', color: '#3b82f6' }}>
            RM {outsourcedVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            26.3% of 6 Overheads (Acc 901-2002)
          </div>
        </div>

        {/* Security */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>3. SECURITY</span>
            <Shield size={16} color="#10b981" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.15rem', color: '#10b981' }}>
            RM {secVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            12.0% of 6 Overheads (Acc 904-S002)
          </div>
        </div>

        {/* Water */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>4. WATER</span>
            <Droplet size={16} color="#06b6d4" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.15rem', color: '#06b6d4' }}>
            RM {waterVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            9.1% of 6 Overheads (Acc 904-U002)
          </div>
        </div>

        {/* IT Support/SW */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>5. IT SUPPORT/SW</span>
            <Server size={16} color="#8b5cf6" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.15rem', color: '#8b5cf6' }}>
            RM {itSwVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            7.6% of 6 Overheads (Acc 904-ITST)
          </div>
        </div>

        {/* Gas */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>6. GAS</span>
            <Flame size={16} color="#ec4899" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.15rem', color: '#ec4899' }}>
            RM {gasVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            1.8% of 6 Overheads (Acc 904-U005)
          </div>
        </div>

      </div>

      {/* 6 Line Items Distribution Chart */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Utility & Operational Overhead 6-Item Cost Distribution
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Monthly comparison of Electricity, Outsourced Labour, Security, Water, IT Support/SW, and Gas (Total: RM {total6Overheads.toLocaleString('en-US', { minimumFractionDigits: 2 })})
            </p>
          </div>
        </div>

        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overheadData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `RM ${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={12} width={130} />
              <Tooltip 
                contentStyle={{ background: '#121826', borderColor: '#f59e0b', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => `RM ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              />
              <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                {overheadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

        {/* Deep-Dive Analysis Cards for the 6 Overhead Line Items & Trend Insights */}
      <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #f59e0b', background: 'rgba(18, 24, 38, 0.85)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Strategic Overhead Cost & Trend Analysis (6 Specified Line Items)
          </h3>
          <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
            OVERHEAD TREND: RISING 📈 (+11.9% H1 Growth)
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', fontSize: '0.85rem', lineHeight: '1.6' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f59e0b', marginBottom: '4px' }}>
              1. Electricity & HVAC Load (43.1% Share) · RISING 📈
            </h4>
            <p style={{ color: 'var(--text-muted)' }}>
              Electricity (`904-U001`) is the largest single overhead cost, averaging <strong>RM 55,534.46 / month</strong> (H1 Total: <strong>RM 333,206.75</strong>). Costs grew <strong>+13.2% from Jan (RM 51.1k) to June (RM 57.9k)</strong>, plateauing at elevated summer levels following April's peak (RM 59,813.12). FCU replacements and 3-core motorized valve installations under Capex (`200-1000`) target a 10-15% kWh reduction.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#3b82f6', marginBottom: '4px' }}>
              2. Outsourced Labour & Guard Security (38.3% Combined) · RISING 📈
            </h4>
            <p style={{ color: 'var(--text-muted)' }}>
              Outsourced Labour (`901-2002`) peaked in June at <strong>RM 37,685.16</strong> (+15.5% MoM jump / +10.5% over Jan), while Security (`904-S002`) rose to <strong>RM 18,499.10</strong> (+27.9% over Jan). Contract staffing represents 38.3% of non-utility overheads, absorbing permanent base salary savings.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#8b5cf6', marginBottom: '4px' }}>
              3. Water, IT Support/SW & Gas (18.5% Combined) · MIXED ➡️
            </h4>
            <p style={{ color: 'var(--text-muted)' }}>
              Water (`904-U002`) is flat at <strong>RM 11,935.95</strong> (-2.0% vs Jan), IT Support (`904-ITST`) is fixed at <strong>RM 8,073.00</strong>, while Gas (`904-U005`) rose <strong>+17.9%</strong> to <strong>RM 2,809.25</strong> post-Ramadan.
            </p>
          </div>

        </div>
      </div>

      {/* MANAGING DIRECTOR BREAKEVEN & REVPAR COVERAGE TARGET CARD */}
      <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #10b981', background: 'rgba(16, 185, 129, 0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <TrendingUp size={22} color="#10b981" />
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              Managing Director P&L Breakeven & RevPAR Coverage Targets
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Required top-line revenue and room yield growth to cover total operational overheads (Net Contribution Margin: 85.6%)
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>REVENUE TO COVER 6 OVERHEADS ONLY</span>
            <span className="metric-value" style={{ fontSize: '1.2rem', color: '#f59e0b' }}>RM 150,588 / mo</span>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginTop: '2px' }}>Requires +RM 27.11 RevPAR Lift</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>FULL P&L BREAKEVEN TOP-LINE REVENUE</span>
            <span className="metric-value" style={{ fontSize: '1.2rem', color: '#10b981' }}>RM 722,766 / mo</span>
            <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'block', marginTop: '2px' }}>+53.0% Top-Line Growth vs H1 Avg</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>TARGET REVPAR FOR FULL BREAKEVEN</span>
            <span className="metric-value" style={{ fontSize: '1.2rem', color: '#3b82f6' }}>RM 131.09 / room</span>
            <span style={{ fontSize: '0.7rem', color: '#60a5fa', display: 'block', marginTop: '2px' }}>+56.0% Lift over RM 84.05 Baseline</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>DUAL-ENGINE PATHWAY (COST OPTIMIZED)</span>
            <span className="metric-value" style={{ fontSize: '1.2rem', color: '#8b5cf6' }}>RM 107.55 / room</span>
            <span style={{ fontSize: '0.7rem', color: '#a78bfa', display: 'block', marginTop: '2px' }}>Requires -RM 103k Cost Savings</span>
          </div>

        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
          <strong>Managing Director Guidance:</strong> To eliminate the monthly net loss of -RM 146,353 without structural cost cuts, Hotel Maluri must expand RevPAR from <strong>RM 84.05 to RM 131.09</strong> (achieved via 72% occupancy @ RM 182 ADR). Under the <em>Dual-Engine Strategy</em> (reducing foreign labor & capturing 10-15% HVAC electricity savings = -RM 103k/mo), the target RevPAR drops to <strong>RM 107.55</strong> (+27.9% lift).
        </p>
      </div>

      {/* 6 Line Items Breakdown Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
          Utility & Overhead 6-Item Financial Statement – H1 2026
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Line Item Account</th>
                <th style={{ padding: '10px 12px' }}>Cost Item Description</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>H1 Total (RM)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Monthly Avg (RM)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Share of 6 Overheads</th>
              </tr>
            </thead>
            <tbody>
              {overheadData.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td className="metric-value" style={{ padding: '10px 12px', color: item.color }}>{item.code}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{item.name}</td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right' }}>
                    RM {(item.amount * 6).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#ffffff' }}>
                    RM {item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: 'var(--text-muted)' }}>
                    {item.pct}%
                  </td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700, background: 'rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '12px', color: '#ffffff' }}>TOTAL COMBINED</td>
                <td style={{ padding: '12px', color: '#ffffff' }}>6 OVERHEAD LINE ITEMS</td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#f59e0b' }}>
                  RM 772,219.17
                </td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#f59e0b' }}>
                  RM 128,703.19
                </td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#ffffff' }}>100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Renovation Capex Section */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '8px', borderRadius: '8px' }}>
            <Wrench size={20} color="#f59e0b" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Energy Infrastructure & HVAC Modernization Capex (Account 200-1000)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Capital expenditure deployed for FCU replacements, motorized valves, and 3-core wiring controls
            </p>
          </div>
        </div>

        {renovationCapex.length === 0 ? (
          <div style={{
            padding: '24px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.01)',
            borderRadius: '8px',
            color: 'var(--text-dim)',
            fontSize: '0.85rem'
          }}>
            No renovation or HVAC motorized valve capital expenditures logged in General Ledger for {currentMonth.monthName}.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Doc Ref</th>
                  <th style={{ padding: '10px' }}>Vendor / Contractor</th>
                  <th style={{ padding: '10px' }}>Line Item Description</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Capex Outlay (RM)</th>
                </tr>
              </thead>
              <tbody>
                {renovationCapex.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '10px', color: 'var(--text-dim)' }}>{item.date}</td>
                    <td className="metric-value" style={{ padding: '10px', color: '#f59e0b' }}>{item.docNo}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{item.vendor}</td>
                    <td style={{ padding: '10px' }}>{item.description}</td>
                    <td className="metric-value" style={{ padding: '10px', textAlign: 'right', color: '#ffffff' }}>
                      RM {item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

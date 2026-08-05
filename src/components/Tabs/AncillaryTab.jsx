import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, ComposedChart, Bar } from 'recharts';
import { Store, Utensils, Shirt, Clock, TrendingUp, Sparkles, DollarSign, AlertTriangle, ShieldCheck, Target } from 'lucide-react';

export default function AncillaryTab({ allMonths = [], currentMonth }) {
  if (!currentMonth) return null;

  const [showMovingAvg, setShowMovingAvg] = useState(true);
  const { gajah3Rent = 2500, banquetRevenue = 0, guestLaundry = 0, roomExtraCharges = 0, occupancyPct = 0, roomsSold = 0 } = currentMonth;

  // H1 Benchmark Averages
  const avgAncillaryH1 = 85293.58;
  const avgPorH1 = 35.63;

  // Chart data with 3-Month Moving Average
  const chartData = (allMonths || []).map((m, idx) => {
    const totalAncillary = (m.banquetRevenue || 0) + (m.serambiFB || 0) + (m.breakfastPackage || 0) + (m.guestLaundry || 0) + (m.roomExtraCharges || 0);
    const por = m.roomsSold > 0 ? (totalAncillary / m.roomsSold) : 0;

    let maAncillary = totalAncillary;
    let maPor = por;

    if (idx === 1) {
      const prevTotal = (allMonths[0].banquetRevenue || 0) + (allMonths[0].serambiFB || 0) + (allMonths[0].breakfastPackage || 0) + (allMonths[0].guestLaundry || 0) + (allMonths[0].roomExtraCharges || 0);
      const prevPor = allMonths[0].roomsSold > 0 ? (prevTotal / allMonths[0].roomsSold) : 0;
      maAncillary = (prevTotal + totalAncillary) / 2;
      maPor = (prevPor + por) / 2;
    } else if (idx >= 2) {
      const t0 = (allMonths[idx-2].banquetRevenue || 0) + (allMonths[idx-2].serambiFB || 0) + (allMonths[idx-2].breakfastPackage || 0) + (allMonths[idx-2].guestLaundry || 0) + (allMonths[idx-2].roomExtraCharges || 0);
      const t1 = (allMonths[idx-1].banquetRevenue || 0) + (allMonths[idx-1].serambiFB || 0) + (allMonths[idx-1].breakfastPackage || 0) + (allMonths[idx-1].guestLaundry || 0) + (allMonths[idx-1].roomExtraCharges || 0);
      const p0 = allMonths[idx-2].roomsSold > 0 ? (t0 / allMonths[idx-2].roomsSold) : 0;
      const p1 = allMonths[idx-1].roomsSold > 0 ? (t1 / allMonths[idx-1].roomsSold) : 0;
      maAncillary = (t0 + t1 + totalAncillary) / 3;
      maPor = (p0 + p1 + por) / 3;
    }

    return {
      name: m.monthName ? m.monthName.replace(' 2026', '') : m.monthKey,
      banquet: m.banquetRevenue || 0,
      serambi: m.serambiFB || 0,
      bfPackage: m.breakfastPackage || 0,
      extra: m.roomExtraCharges || 0,
      laundry: m.guestLaundry || 0,
      total: totalAncillary,
      maAncillary: parseFloat(maAncillary.toFixed(2)),
      por: parseFloat(por.toFixed(2)),
      maPor: parseFloat(maPor.toFixed(2)),
      sold: m.roomsSold
    };
  });

  const currentAncillaryTotal = (banquetRevenue || 0) + (currentMonth.serambiFB || 0) + (currentMonth.breakfastPackage || 0) + (guestLaundry || 0) + (roomExtraCharges || 0);
  const currentPOR = roomsSold > 0 ? (currentAncillaryTotal / roomsSold).toFixed(2) : '0.00';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      
      {/* Top Deep-Dive Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Total Ancillary Revenue */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL ANCILLARY YIELD</span>
            <DollarSign size={18} color="#f59e0b" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.3rem', color: '#f59e0b', marginBottom: '4px' }}>
            RM {currentAncillaryTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            H1 Monthly Avg: RM 85,293.58 / mo
          </div>
        </div>

        {/* Per Occupied Room (POR) Ancillary Spend */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ANCILLARY SPEND POR</span>
            <TrendingUp size={18} color="#8b5cf6" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.3rem', color: '#8b5cf6', marginBottom: '4px' }}>
            RM {currentPOR} / Room
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            H1 Average POR: RM 35.63 / Room
          </div>
        </div>

        {/* Gajah3 Cafe Lease */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>TENANCY LEASE (GAJAH3)</span>
            <Store size={18} color="#10b981" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '4px' }}>
            RM {(gajah3Rent || 2500).toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Fixed Monthly Rental (Acc 540-1000)
          </div>
        </div>

      </div>

      {/* Total Ancillary Revenue Chart with Moving Average & H1 Average Line */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Ancillary Revenue & 3-Month Moving Average (MA-3)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Total monthly ancillary yield overlaid with 3-month moving average and H1 period benchmark (RM 85.3k)
            </p>
          </div>
          <button 
            onClick={() => setShowMovingAvg(!showMovingAvg)}
            style={{
              background: showMovingAvg ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: showMovingAvg ? '#a78bfa' : 'var(--text-muted)',
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

        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `RM ${(v/1000).toFixed(0)}k`} />
              <Tooltip 
                contentStyle={{ background: '#121826', borderColor: '#8b5cf6', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value, name) => [`RM ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, name]}
              />
              <Bar dataKey="total" fill="#8b5cf6" opacity={0.7} name="Total Ancillary Revenue" />
              
              {showMovingAvg && (
                <Line type="monotone" dataKey="maAncillary" stroke="#a78bfa" strokeWidth={3} dot={{ fill: '#a78bfa', r: 4 }} name="3-Mo Moving Avg" />
              )}

              <ReferenceLine y={avgAncillaryH1} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'H1 Avg Ancillary (RM 85.3k)', fill: '#f59e0b', fontSize: 11, position: 'insideTopRight' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DEDICATED SEPARATE CARD 1: Ancillary Revenue & Event Volatility Analysis */}
      <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #8b5cf6', background: 'rgba(18, 24, 38, 0.85)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '8px', borderRadius: '8px' }}>
            <Sparkles size={20} color="#8b5cf6" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
              Ancillary Revenue & Event Volatility Analysis (Placed Directly Below Graph)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              In-depth executive commentary on secondary stream run-rates, banquet events, and moving averages
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', fontSize: '0.86rem', lineHeight: '1.6' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#8b5cf6', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Utensils size={16} /> 1. Banquet Hall & Catering Domination (89.8%)
            </h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              Total monthly ancillary revenue averaged <strong>RM 85,293.58 / month</strong> in H1 (totalling <strong>RM 511,761.49</strong>). 
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              Banquet Hall rentals (averaging <strong>RM 50,917.84/mo</strong>) and Serambi F&B catering (averaging <strong>RM 25,668.76/mo</strong>) combine for <strong>89.8%</strong> of all secondary earnings. March recorded a massive <strong>RM 101,489.71</strong> catering yield spike under Serambi F&B.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#10b981', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Store size={16} /> 2. Tenancy Lease Stability & Moving Averages
            </h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              The outsourced Gajah3 Cafe lease provides a reliable <strong>RM 2,500.00 / month</strong> flat rental income, serving as a zero-expense cash cushion.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              The 3-month moving average (MA-3) for total ancillary yield peaked at <strong>RM 107,798.24 / month</strong> in April before normalizing to <strong>RM 71,214.72 / month</strong> in June.
            </p>
          </div>

        </div>
      </div>

      {/* Per Occupied Room (POR) Trend Chart */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Per Occupied Room (POR) Ancillary Spend</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Secondary spend per guest room night with H1 baseline benchmark line (RM 35.63 / room)
            </p>
          </div>
        </div>

        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `RM ${v}`} />
              <Tooltip 
                contentStyle={{ background: '#121826', borderColor: '#8b5cf6', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => `RM ${Number(value).toFixed(2)} / Room`}
              />
              <Line type="monotone" dataKey="por" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} name="Ancillary Spend POR" />
              <ReferenceLine y={avgPorH1} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'H1 Avg POR (RM 35.63)', fill: '#10b981', fontSize: 11, position: 'insideTopRight' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DEDICATED SEPARATE CARD 2: Per Occupied Room (POR) & Minor Guest Services Analysis */}
      <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #10b981', background: 'rgba(18, 24, 38, 0.85)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '8px', borderRadius: '8px' }}>
            <TrendingUp size={20} color="#10b981" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
              Per Occupied Room (POR) & Minor Guest Services Analysis (Placed Directly Below Graph)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Executive commentary on guest spending elasticity, laundry underperformance, and early check-in yields
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', fontSize: '0.86rem', lineHeight: '1.6' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#10b981', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={16} /> 1. Guest Spend POR Trajectory
            </h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              H1 Per Occupied Room (POR) spend averaged <strong>RM 35.63 / room night</strong>. 
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              During event peak periods (March), POR spend surged to <strong>RM 76.59 / room</strong>, while quiet months like May saw POR drop to <strong>RM 17.93</strong>. Early check-in / extended use fees (`500-1003`) provide a steady supplementary yield averaging <strong>RM 1,851.04 / month</strong>.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f43f5e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} /> 2. Guest Laundry Inelasticity Alert & Remedy
            </h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              Guest Laundry (`500-1004`) averaged only <strong>RM 135.64 / month</strong> (less than 6 sen per guest room night), recording <strong>RM 0.00</strong> in March despite 2,085 rooms sold.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              <strong>Executive Recommendation:</strong> Introduce front-desk prompts for express laundry at check-in to capture an estimated <strong>RM 3,000 – RM 5,000 / month</strong> in uncaptured high-margin guest service revenue.
            </p>
          </div>

        </div>
      </div>

      {/* Moving Average Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
          Ancillary Revenue Moving Average Table – H1 2026
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Month</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ancillary Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>3-Mo Moving Avg</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ancillary Spend POR</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>POR 3-Mo MA</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((d, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{d.name}</td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#8b5cf6' }}>
                    RM {d.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#a78bfa' }}>
                    RM {d.maAncillary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#10b981' }}>
                    RM {d.por.toFixed(2)}
                  </td>
                  <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#34d399' }}>
                    RM {d.maPor.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700, background: 'rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '12px', color: '#ffffff' }}>H1 PERIOD AVERAGE</td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#8b5cf6' }}>
                  RM 85,293.58
                </td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#a78bfa' }}>
                  RM 85,293.58
                </td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#10b981' }}>
                  RM 35.63
                </td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#34d399' }}>
                  RM 35.63
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

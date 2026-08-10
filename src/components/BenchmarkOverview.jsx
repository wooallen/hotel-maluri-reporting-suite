import React from 'react';
import { Building2, TrendingDown, AlertTriangle, CheckCircle, Target, Sparkles, ArrowRight, ShieldAlert, Award } from 'lucide-react';

export const KL_4STAR_BENCHMARKS = [
  {
    metric: 'Occupancy Rate',
    hotelVal: '53.62%',
    benchmarkVal: '68.50%',
    variance: '-14.88 pts',
    status: 'BELOW_TARGET',
    detail: '14,363 rooms sold out of 26,788 room nights available'
  },
  {
    metric: 'Average Daily Rate (ADR)',
    hotelVal: 'RM 161.68',
    benchmarkVal: 'RM 265.00',
    variance: '-RM 103.32 (-39.0%)',
    status: 'BELOW_TARGET',
    detail: 'Deep rate discount relative to KL 4-star midscale peer group'
  },
  {
    metric: 'RevPAR Yield',
    hotelVal: 'RM 86.69',
    benchmarkVal: 'RM 181.53',
    variance: '-RM 94.84 (-52.2%)',
    status: 'BELOW_TARGET',
    detail: 'Compound yield deficit from occupancy and pricing shortfalls'
  },
  {
    metric: 'Payroll-to-Revenue Ratio',
    hotelVal: '50.55%',
    benchmarkVal: '35.00%',
    variance: '+15.55 pts (+37.5% excess)',
    status: 'CRITICAL',
    detail: 'RM 1.46M staff cost on RM 2.88M revenue; primary deficit driver'
  },
  {
    metric: 'Staffing Density',
    hotelVal: '~0.60 staff/room',
    benchmarkVal: '0.45 staff/room',
    variance: '+0.15 staff/room',
    status: 'WARNING',
    detail: 'Target 67 FTEs for 148 rooms vs current labor allocation'
  },
  {
    metric: 'Net Margin / GOP',
    hotelVal: '-30.46%',
    benchmarkVal: '+32.50% GOP',
    variance: '-62.96 pts',
    status: 'CRITICAL',
    detail: '-RM 877,109.62 net loss for current period 6M YTD 2026'
  },
  {
    metric: 'F&B & Banquet Share',
    hotelVal: '17.36%',
    benchmarkVal: '28.00%',
    variance: '-10.64 pts',
    status: 'WARNING',
    detail: 'Underutilized banquet hall & F&B revenue contribution'
  }
];

export const OPERATIONAL_RECOMMENDATIONS = [
  {
    id: 1,
    title: '1. Rate & ADR Restructuring Strategy',
    icon: Target,
    priority: 'HIGH PRIORITY',
    color: '#3b82f6',
    action: 'Elevate ADR from RM 161.68 toward the RM 210.00 – RM 240.00 target envelope.',
    description: 'Recalibrate corporate and OTA tier rates to capture 4-star market pricing. A RM 40 ADR increase at current occupancy yields ~RM 574,000 incremental revenue annually with near-zero marginal cost.'
  },
  {
    id: 2,
    title: '2. Payroll & Labor Right-Sizing',
    icon: ShieldAlert,
    priority: 'CRITICAL',
    color: '#ef4444',
    action: 'Reduce payroll intensity from 50.55% down to the 35.0% target ceiling.',
    description: 'Implement demand-matched flexible shift schedules and optimize staff-to-room ratio to 0.45 staff/room (~67 FTEs for 148 rooms). Adjust contract worker hours directly to monthly room occupancy milestones.'
  },
  {
    id: 3,
    title: '3. F&B & Banquet Revenue Expansion',
    icon: Award,
    priority: 'MEDIUM PRIORITY',
    color: '#10b981',
    action: 'Increase F&B + Banquet revenue contribution from 17.36% to 25.0%–28.0%.',
    description: 'Re-activate local corporate banquet packages, meeting room rentals, and promote outsource dining partnerships (e.g. Gajah3 Cafe lease expansion) to balance over-reliance on rooms revenue.'
  }
];

export default function BenchmarkOverview() {
  return (
    <div className="glass-card" style={{
      padding: '22px 26px',
      marginBottom: '24px',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
      border: '1px solid rgba(245, 158, 11, 0.3)',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
      borderRadius: '12px'
    }}>
      
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <Building2 size={22} color="#f59e0b" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Kuala Lumpur 4-Star Hotel Industry Benchmarking</span>
              <span style={{ fontSize: '0.68rem', background: '#f59e0b', color: '#000', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                NotebookLM Ingested
              </span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
              Current Period Operational & Financial Comparison: Hotel Maluri vs. KL 4-Star Peer Group (YTD 2026)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <Sparkles size={14} color="#60a5fa" />
          <span style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 600 }}>Active Benchmark Audit</span>
        </div>
      </div>

      {/* Grid of Key Benchmark Metrics Cards */}
      <div style={{

        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {KL_4STAR_BENCHMARKS.map((item, idx) => {
          const isCritical = item.status === 'CRITICAL';
          const isWarning = item.status === 'WARNING';
          const badgeBg = isCritical ? 'rgba(239, 68, 68, 0.15)' : isWarning ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)';
          const badgeColor = isCritical ? '#f87171' : isWarning ? '#fbbf24' : '#60a5fa';
          const borderColor = isCritical ? 'rgba(239, 68, 68, 0.3)' : isWarning ? 'rgba(245, 158, 11, 0.3)' : 'rgba(59, 130, 246, 0.3)';

          return (
            <div key={idx} style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '12px 14px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{item.metric}</span>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  background: badgeBg,
                  color: badgeColor,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: `1px solid ${borderColor}`
                }}>
                  {item.variance}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>{item.hotelVal}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                  vs {item.benchmarkVal} <span style={{ fontSize: '0.68rem', color: '#475569' }}>(Target)</span>
                </span>
              </div>


              <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Detailed Benchmark Comparison Table */}
      <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '20px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#60a5fa', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <Building2 size={16} color="#60a5fa" />
          <span>Kuala Lumpur 4-Star Hotel Benchmark Comparison Table (YTD 2026)</span>
        </h4>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', color: '#e2e8f0' }}>
            <thead>
              <tr style={{ background: 'rgba(30, 41, 59, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px', fontWeight: 700, color: '#93c5fd' }}>Performance Metric</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, color: '#ffffff' }}>Hotel Maluri (YTD 2026)</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, color: '#cbd5e1' }}>KL 4-Star Benchmark Target</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, color: '#f87171' }}>Variance</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, color: '#fbbf24' }}>Operational Status</th>

              </tr>
            </thead>
            <tbody>
              {KL_4STAR_BENCHMARKS.map((b, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: '#ffffff' }}>{b.metric}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 800, color: '#60a5fa' }}>{b.hotelVal}</td>
                  <td style={{ padding: '8px 12px', color: '#cbd5e1' }}>{b.benchmarkVal}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 700, color: b.status === 'CRITICAL' ? '#f87171' : b.status === 'WARNING' ? '#fbbf24' : '#60a5fa' }}>
                    {b.variance}
                  </td>
                  <td style={{ padding: '8px 12px', fontSize: '0.75rem', color: '#94a3b8' }}>{b.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Operational Recommendations Sub-Section */}

      <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f59e0b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <Target size={18} color="#f59e0b" />
          <span>Key Strategic Operational Recommendations</span>
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {OPERATIONAL_RECOMMENDATIONS.map(rec => {
            const Icon = rec.icon;
            return (
              <div key={rec.id} style={{
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: `${rec.color}20`, padding: '6px', borderRadius: '6px', border: `1px solid ${rec.color}40` }}>
                      <Icon size={16} color={rec.color} />
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{rec.title}</span>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, background: `${rec.color}25`, color: rec.color, padding: '2px 6px', borderRadius: '4px', border: `1px solid ${rec.color}40` }}>
                    {rec.priority}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: rec.color, marginBottom: '6px' }}>
                  {rec.action}
                </div>
                <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                  {rec.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

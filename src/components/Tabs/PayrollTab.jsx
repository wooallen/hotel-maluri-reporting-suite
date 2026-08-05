import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, ReferenceLine } from 'recharts';
import { Users, DollarSign, Percent, TrendingDown, AlertOctagon, ShieldAlert, Sparkles, UserCheck, Briefcase } from 'lucide-react';

export default function PayrollTab({ allMonths = [], currentMonth }) {
  if (!currentMonth) return null;

  const [showBenchMark, setShowBenchMark] = useState(true);

  // Process Payroll Chart Data
  const chartData = (allMonths || []).map(m => {
    const salary = m.payrollSalary || 242605.46;
    const epf = m.payrollEPF || 184891.25;
    const socsoEis = m.payrollSocsoEis || 4083.58;
    const outsourced = m.outsourcedLabour || 33822.10;
    const welfare = m.staffWelfare || 7792.71;
    const totalPayroll = m.totalPayroll || (salary + epf + socsoEis + outsourced + welfare);

    // Calculate total revenue for payroll intensity
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

  const currSalary = currentMonth.payrollSalary || 219465.63;
  const currEpf = currentMonth.payrollEPF || 166515.38;
  const currOutsourced = currentMonth.outsourcedLabour || 37685.16;
  const currTotalPayroll = currentMonth.totalPayroll || (currSalary + currEpf + currOutsourced + 4934.05 + 4128.96);

  const currTotalRev = (currentMonth.roomRevenueTotal || 0) + (currentMonth.banquetRevenue || 0) + (currentMonth.serambiFB || 0) + (currentMonth.breakfastPackage || 0) + (currentMonth.gajah3Rent || 2500);
  const currIntensity = currTotalRev > 0 ? ((currTotalPayroll / currTotalRev) * 100).toFixed(1) : '0.0';

  const roomsSold = currentMonth.roomsSold || 2397;
  const porPayroll = roomsSold > 0 ? (currTotalPayroll / roomsSold).toFixed(2) : '0.00';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      
      {/* Top Strategic KPI Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Total Payroll & Staff Cost */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL MONTHLY PAYROLL</span>
            <Users size={18} color="#f59e0b" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.3rem', color: '#f59e0b', marginBottom: '4px' }}>
            RM {currTotalPayroll.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            H1 Monthly Avg: RM 490,709.92 / mo
          </div>
        </div>

        {/* Basic Salary */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>BASIC SALARIES (901-1001)</span>
            <DollarSign size={18} color="#3b82f6" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.3rem', color: '#3b82f6', marginBottom: '4px' }}>
            RM {currSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981' }}>
            ▼ 27.8% optimization vs Jan (RM 304.1k)
          </div>
        </div>

        {/* Outsourced Contract Labour */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>OUTSOURCED LABOUR (901-2002)</span>
            <UserCheck size={18} color="#8b5cf6" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.3rem', color: '#8b5cf6', marginBottom: '4px' }}>
            RM {currOutsourced.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Flexible Foreign Worker Staffing
          </div>
        </div>

        {/* Payroll Intensity % */}
        <div className="glass-card" style={{ padding: '20px', borderColor: parseFloat(currIntensity) > 50 ? 'rgba(244, 63, 94, 0.4)' : 'var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>PAYROLL INTENSITY %</span>
            <Percent size={18} color={parseFloat(currIntensity) > 50 ? '#f43f5e' : '#10b981'} />
          </div>
          <div className="metric-value" style={{ fontSize: '1.3rem', color: parseFloat(currIntensity) > 50 ? '#f43f5e' : '#10b981', marginBottom: '4px' }}>
            {currIntensity}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Hospitality Target: 35.0% – 40.0%
          </div>
        </div>

      </div>

      {/* Stacked Payroll Component Chart */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Monthly Payroll & Staff Cost Component Breakdown
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Stacked analysis of Basic Salaries, EPF (function of salary), SOCSO/EIS, Outsourced Labour, and Staff Benefits
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '2px' }}></span>
              Basic Salary
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '2px' }}></span>
              EPF Contribution
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '2px' }}></span>
              Outsourced Labour
            </span>
          </div>
        </div>

        <div style={{ width: '100%', height: 270 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `RM ${(v/1000).toFixed(0)}k`} />
              <Tooltip 
                contentStyle={{ background: '#121826', borderColor: '#f59e0b', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value, name) => [`RM ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, name]}
              />
              <Bar dataKey="salary" stackId="a" fill="#3b82f6" name="Basic Salary" />
              <Bar dataKey="epf" stackId="a" fill="#8b5cf6" name="EPF Contribution (Statutory)" />
              <Bar dataKey="outsourced" stackId="a" fill="#f59e0b" name="Outsourced Labour" />
              <Bar dataKey="welfare" stackId="a" fill="#10b981" name="Staff Welfare & Benefits" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payroll Intensity vs Benchmark Line Chart */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Payroll Intensity Ratio (% of Total Revenue)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Comparing Hotel Maluri payroll-to-revenue ratio against the 35% – 40% industry benchmark target
            </p>
          </div>
          <button 
            onClick={() => setShowBenchMark(!showBenchMark)}
            style={{
              background: showBenchMark ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              color: showBenchMark ? '#fecdd3' : 'var(--text-muted)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {showBenchMark ? '✓ Target Line On' : '+ Show Target Line'}
          </button>
        </div>

        <div style={{ width: '100%', height: 230 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                contentStyle={{ background: '#121826', borderColor: '#f43f5e', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => `${Number(value).toFixed(1)}% of Revenue`}
              />
              <Line type="monotone" dataKey="payrollIntensity" stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e', r: 4 }} name="Payroll Intensity %" />
              {showBenchMark && (
                <ReferenceLine y={40} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Industry Target (35-40%)', fill: '#10b981', fontSize: 11, position: 'insideTopRight' }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DEDICATED SEPARATE CARD: Strategic Payroll Analysis Card */}
      <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #f43f5e', background: 'rgba(18, 24, 38, 0.85)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', padding: '8px', borderRadius: '8px' }}>
            <Sparkles size={20} color="#f43f5e" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
              Payroll & Staff Cost Strategic Analysis & Restructuring Insights
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Executive analysis on fixed payroll intensity, headcount optimization, and flexible contract labour
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', fontSize: '0.86rem', lineHeight: '1.6' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#10b981', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingDown size={16} /> 1. Headcount & Base Salary Optimization (-27.8%)
            </h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              Basic Salaries (`901-1001`) dropped from <strong>RM 304,141.14</strong> in January down to <strong>RM 219,465.63</strong> in June. This reflects a successful <strong>27.8% base salary optimization</strong>, saving over RM 84,000 monthly in direct base payroll. Note that statutory EPF (`901-1002`) automatically scaled down in tandem as a direct function of basic salaries.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f59e0b', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserCheck size={16} /> 2. Outsourced Foreign Labour Flexibility (RM 33.8k/mo)
            </h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              Outsourced foreign contract labour (`901-2002`) averaged <strong>RM 33,822.10 / month</strong> in H1 (peaking at RM 37.6k in June). Because contract worker hours are variable, adjusting contract man-hours offers immediate payroll flexibility during lower-demand periods.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f43f5e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={16} /> 3. Structural Barrier: Payroll Intensity vs 35-40% Target
            </h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              As identified in the executive dashboard, total payroll intensity averaged <strong>98.5%</strong> of total revenue across H1. To achieve consistent net profitability, management must calibrate total staff deployment directly to room reopening milestones and occupancy tiers.
            </p>
          </div>

        </div>
      </div>

      {/* Detailed Payroll Breakdown Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
          Detailed Payroll & Staff Cost Financial Statement – H1 2026
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Line Item Account</th>
                <th style={{ padding: '10px 12px' }}>Description</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>H1 Total (RM)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Monthly Avg (RM)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Share of Staff Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td className="metric-value" style={{ padding: '10px 12px', color: '#3b82f6' }}>901-1001</td>
                <td style={{ padding: '10px 12px', fontWeight: 600 }}>Basic Salaries</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right' }}>RM 1,455,632.75</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#ffffff' }}>RM 242,605.46</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', color: 'var(--text-muted)' }}>49.4%</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td className="metric-value" style={{ padding: '10px 12px', color: '#8b5cf6' }}>901-1002</td>
                <td style={{ padding: '10px 12px', fontWeight: 600 }}>EPF Employer Statutory (Function of Salary)</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right' }}>RM 1,109,347.48</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#ffffff' }}>RM 184,891.25</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', color: 'var(--text-muted)' }}>37.7%</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td className="metric-value" style={{ padding: '10px 12px', color: '#f59e0b' }}>901-2002</td>
                <td style={{ padding: '10px 12px', fontWeight: 600 }}>Outsourced Contract Labour (Foreign Workers)</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right' }}>RM 202,932.58</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#ffffff' }}>RM 33,822.10</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', color: 'var(--text-muted)' }}>6.9%</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td className="metric-value" style={{ padding: '10px 12px', color: '#10b981' }}>901-1003/04</td>
                <td style={{ padding: '10px 12px', fontWeight: 600 }}>SOCSO & EIS Statutory Contributions</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right' }}>RM 24,501.45</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#ffffff' }}>RM 4,083.58</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', color: 'var(--text-muted)' }}>0.8%</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td className="metric-value" style={{ padding: '10px 12px', color: '#06b6d4' }}>901-3000s</td>
                <td style={{ padding: '10px 12px', fontWeight: 600 }}>Staff Welfare, Housing, Canteen & Uniforms</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right' }}>RM 46,756.28</td>
                <td className="metric-value" style={{ padding: '10px 12px', textAlign: 'right', color: '#ffffff' }}>RM 7,792.71</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', color: 'var(--text-muted)' }}>1.6%</td>
              </tr>

              <tr style={{ fontWeight: 700, background: 'rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '12px', color: '#ffffff' }}>TOTAL COMBINED</td>
                <td style={{ padding: '12px', color: '#ffffff' }}>PAYROLL & STAFF EXPENDITURE</td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#f59e0b' }}>RM 2,944,259.53</td>
                <td className="metric-value" style={{ padding: '12px', textAlign: 'right', color: '#f59e0b' }}>RM 490,709.92</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#ffffff' }}>100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

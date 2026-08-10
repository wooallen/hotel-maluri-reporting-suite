// Hotel Maluri Executive Financial Reporting Suite - Production Deployment v1.0.1
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import MetricsOverview from './components/MetricsOverview';
import AuditAlertsBanner from './components/AuditAlertsBanner';
import UploadDropzone from './components/UploadDropzone';
import ExecutiveMemoModal from './components/ExecutiveMemoModal';
import RoomYieldTab from './components/Tabs/RoomYieldTab';
import UtilitiesTab from './components/Tabs/UtilitiesTab';
import VendorContractsTab from './components/Tabs/VendorContractsTab';
import AncillaryTab from './components/Tabs/AncillaryTab';
import PayrollTab from './components/Tabs/PayrollTab';

import BenchmarkOverview from './components/BenchmarkOverview';

import { H1_2026_MONTHLY_DATA } from './constants/baselines';
import { runFinancialAudit } from './services/auditEngine';
import { getAllQuarters } from './services/quarterUtils';
import { BedDouble, ShieldAlert, Server, Store, Users, Cpu, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [allMonths, setAllMonths] = useState(H1_2026_MONTHLY_DATA);
  const [selectedPeriodKey, setSelectedPeriodKey] = useState('2026-06');
  const [activeTab, setActiveTab] = useState('ROOM_YIELD');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [agentAnalysis, setAgentAnalysis] = useState(null);

  // Compute Quarterly Datasets dynamically
  const allQuarters = useMemo(() => {
    return getAllQuarters(allMonths);
  }, [allMonths]);

  // Selected Period Data (Month or Quarter)
  const isQuarterSelected = selectedPeriodKey.startsWith('Q');
  
  const currentPeriod = useMemo(() => {
    if (isQuarterSelected) {
      const q = allQuarters.find(q => q.quarterKey === selectedPeriodKey);
      return q || allQuarters[allQuarters.length - 1];
    }
    const m = allMonths.find(m => m.monthKey === selectedPeriodKey);
    return m || allMonths[allMonths.length - 1];
  }, [selectedPeriodKey, allMonths, allQuarters, isQuarterSelected]);

  const prevPeriod = useMemo(() => {
    if (!currentPeriod) return null;
    if (currentPeriod.isQuarter) {
      const idx = allQuarters.findIndex(q => q.quarterKey === currentPeriod.quarterKey);
      return idx > 0 ? allQuarters[idx - 1] : null;
    }
    const idx = allMonths.findIndex(m => m.monthKey === currentPeriod.monthKey);
    return idx > 0 ? allMonths[idx - 1] : null;
  }, [currentPeriod, allMonths, allQuarters]);

  // Backward compatibility alias for single month references
  const currentMonth = currentPeriod;
  const prevMonth = prevPeriod;

  // Run Audit Engine on Selected Period
  const auditResult = useMemo(() => {
    return currentPeriod ? runFinancialAudit(currentPeriod, prevPeriod) : { alerts: [] };
  }, [currentPeriod, prevPeriod]);

  // Handle Uploaded Spreadsheet Data
  const handleDataUploaded = (ingestedResult) => {
    if (ingestedResult.agentAnalysis) {
      setAgentAnalysis(ingestedResult.agentAnalysis);
    }
    if (ingestedResult.type === 'MANAGEMENT_REPORT') {
      const newMonths = ingestedResult.months;
      setAllMonths(prev => {
        const merged = [...prev];
        newMonths.forEach(nm => {
          const idx = merged.findIndex(m => m.monthKey === nm.monthKey);
          if (idx !== -1) {
            merged[idx] = { ...merged[idx], ...nm, isH1Baseline: false };
          } else {
            merged.push({ ...nm, isH1Baseline: false });
          }
        });
        merged.sort((a, b) => a.monthKey.localeCompare(b.monthKey));
        return merged;
      });

      if (newMonths.length > 0) {
        setSelectedPeriodKey(newMonths[newMonths.length - 1].monthKey);
      }
    }
  };

  return (
    <div className="app-main-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Main Mission Control Dashboard UI (Hidden when printing Executive Memo) */}
      <div className="no-print">
        {/* Header */}
        <Header 
          selectedPeriodKey={selectedPeriodKey}
          selectedPeriod={currentPeriod}
          availableMonths={allMonths}
          availableQuarters={allQuarters}
          onSelectPeriod={(key) => setSelectedPeriodKey(key)}
          onOpenUpload={() => setIsUploadOpen(true)}
          onOpenMemo={() => setIsMemoOpen(true)}
        />

        {/* AI Agent Analysis Live Briefing Banner (Shows when Agent runs on upload) */}
        {agentAnalysis && (
          <div className="glass-card" style={{
            padding: '18px 22px',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
            borderColor: 'rgba(59, 130, 246, 0.4)',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                  <Cpu size={20} color="#60a5fa" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>AI Financial Analyst Agent Deployed</span>
                    <Sparkles size={14} color="#f59e0b" />
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Executed at {agentAnalysis.timestamp} • Departmental P&L & Benchmark Audit for {agentAnalysis.monthName}
                  </p>
                </div>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#3b82f6', color: '#fff', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                Agent Analysis Active
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '12px' }}>
              {agentAnalysis.summary}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {agentAnalysis.diagnostics.map((diag, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ fontSize: '0.82rem', color: diag.severity === 'CRITICAL' ? '#f43f5e' : '#60a5fa', display: 'block', marginBottom: '2px' }}>
                    {diag.title}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {diag.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Alerts Banner */}
        <AuditAlertsBanner alerts={auditResult.alerts} />

        {/* Kuala Lumpur 4-Star Hotel Benchmarking & Strategic Recommendations */}
        <BenchmarkOverview currentPeriod={currentPeriod} />

        {/* Top KPI Metrics Bar */}
        <MetricsOverview monthData={currentPeriod} auditResult={auditResult} />

        {/* Navigation Tabs Container */}
        <div className="tab-bar-container">
          <button 
            className={`tab-btn ${activeTab === 'ROOM_YIELD' ? 'active' : ''}`}
            onClick={() => setActiveTab('ROOM_YIELD')}
          >
            <BedDouble size={16} />
            <span>Room Yield & Channel Mix</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'UTILITIES' ? 'active' : ''}`}
            onClick={() => setActiveTab('UTILITIES')}
          >
            <ShieldAlert size={16} />
            <span>Utility & Operational Overheads</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'PAYROLL' ? 'active' : ''}`}
            onClick={() => setActiveTab('PAYROLL')}
          >
            <Users size={16} />
            <span>Payroll & Staff Costs</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'VENDOR_CONTRACTS' ? 'active' : ''}`}
            onClick={() => setActiveTab('VENDOR_CONTRACTS')}
          >
            <Server size={16} />
            <span>Vendor Contract Run-Rates</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'ANCILLARY' ? 'active' : ''}`}
            onClick={() => setActiveTab('ANCILLARY')}
          >
            <Store size={16} />
            <span>Ancillary Revenue & POR</span>
          </button>
        </div>

        {/* Active Tab View */}
        <main>
          {activeTab === 'ROOM_YIELD' && (
            <RoomYieldTab 
              allMonths={currentPeriod?.isQuarter ? currentPeriod.months : allMonths}
              currentMonth={currentMonth}
              prevMonth={prevMonth}
              auditResult={auditResult}
            />
          )}

          {activeTab === 'UTILITIES' && (
            <UtilitiesTab 
              allMonths={currentPeriod?.isQuarter ? currentPeriod.months : allMonths}
              currentMonth={currentMonth}
              prevMonth={prevMonth}
              auditResult={auditResult}
            />
          )}

          {activeTab === 'PAYROLL' && (
            <PayrollTab 
              allMonths={currentPeriod?.isQuarter ? currentPeriod.months : allMonths}
              currentMonth={currentMonth}
              prevMonth={prevMonth}
              auditResult={auditResult}
            />
          )}

          {activeTab === 'VENDOR_CONTRACTS' && (
            <VendorContractsTab 
              currentMonth={currentMonth}
              auditResult={auditResult}
            />
          )}

          {activeTab === 'ANCILLARY' && (
            <AncillaryTab 
              allMonths={currentPeriod?.isQuarter ? currentPeriod.months : allMonths}
              currentMonth={currentMonth}
              prevMonth={prevMonth}
              auditResult={auditResult}
            />
          )}
        </main>

        {/* Accounting & Financial Derivation Footnote Card for Mission Control */}
        <div className="glass-card" style={{
          marginTop: '28px',
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
          borderColor: 'rgba(245, 158, 11, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <BookOpen size={18} color="#f59e0b" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f59e0b', margin: 0 }}>
                  Mission Control Accounting Footnote: Derivation of Revenue & Staff Costs
                </h4>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: 0 }}>
                  Authoritative Chart of Accounts (COA) Mapping & Mathematical Calculation Methodology
                </p>
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
              GL COA v2.10
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', fontSize: '0.8rem', lineHeight: '1.6' }}>
            
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '6px', fontSize: '0.84rem' }}>
                📈 1. Revenue Metrics Derivation
              </strong>
              <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>
                  <strong>Total Operating Revenue:</strong> Room Rev (<code style={{ color: '#93c5fd' }}>GL 500-1000</code>: SC <code style={{ color: '#93c5fd' }}>500-1001</code> + NSC <code style={{ color: '#93c5fd' }}>500-1002</code>) + F&B (<code style={{ color: '#93c5fd' }}>500-SR01</code> Serambi + <code style={{ color: '#93c5fd' }}>500-BF01</code> Breakfast + <code style={{ color: '#93c5fd' }}>500-3000</code> Banquet) + Tenancy Lease (<code style={{ color: '#93c5fd' }}>540-1000</code> Gajah3 @ RM 2,500/mo) + Ancillary (<code style={{ color: '#93c5fd' }}>500-1004</code> Laundry + <code style={{ color: '#93c5fd' }}>500-1003</code> Extra Charges).
                </li>
                <li>
                  <strong>Average Daily Rate (ADR):</strong> Total Room Revenue (<code style={{ color: '#93c5fd' }}>500-1000</code>) ÷ Rooms Sold.
                </li>
                <li>
                  <strong>RevPAR:</strong> Total Room Revenue (<code style={{ color: '#93c5fd' }}>500-1000</code>) ÷ Total Rooms Available (or Occupancy % × ADR).
                </li>
              </ul>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <strong style={{ color: '#c084fc', display: 'block', marginBottom: '6px', fontSize: '0.84rem' }}>
                👥 2. Staff Costs & Payroll Derivation
              </strong>
              <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>
                  <strong>Total Monthly Payroll:</strong> Basic Salaries (<code style={{ color: '#e9d5ff' }}>GL 901-1001</code>) + Employer EPF Pension (<code style={{ color: '#e9d5ff' }}>GL 901-1002</code>) + SOCSO/EIS Statutory (<code style={{ color: '#e9d5ff' }}>GL 901-1003/1004</code>) + Outsourced Contract Labour (<code style={{ color: '#e9d5ff' }}>GL 901-2002</code>) + Staff Welfare (<code style={{ color: '#e9d5ff' }}>GL 901-WELF</code>).
                </li>
                <li>
                  <strong>Payroll Cost Intensity (%):</strong> (Total Monthly Payroll ÷ Total Combined Operating Revenue) × 100.
                </li>
                <li>
                  <strong>KL 4-Star Industry Benchmark Target:</strong> <strong style={{ color: '#34d399' }}>35.0% – 40.0%</strong> of Revenue (Staffing Density: <strong>0.40 – 0.50 staff/room</strong>).
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Upload Spreadsheet Modal */}
      <UploadDropzone 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDataUploaded={handleDataUploaded}
      />

      {/* Executive Memo Printable Modal */}
      <ExecutiveMemoModal 
        isOpen={isMemoOpen}
        onClose={() => setIsMemoOpen(false)}
        allMonths={allMonths}
        allQuarters={allQuarters}
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        auditResult={auditResult}
      />

    </div>
  );
}

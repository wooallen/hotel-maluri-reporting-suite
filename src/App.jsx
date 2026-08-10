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
import { BedDouble, ShieldAlert, Server, Store, Users, Cpu, Sparkles } from 'lucide-react';

export default function App() {
  const [allMonths, setAllMonths] = useState(H1_2026_MONTHLY_DATA);
  const [selectedMonthKey, setSelectedMonthKey] = useState('2026-06');
  const [activeTab, setActiveTab] = useState('ROOM_YIELD');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [agentAnalysis, setAgentAnalysis] = useState(null);

  // Selected Month Data
  const selectedIndex = allMonths.findIndex(m => m.monthKey === selectedMonthKey);
  const currentMonth = selectedIndex !== -1 ? allMonths[selectedIndex] : allMonths[allMonths.length - 1];
  const prevMonth = selectedIndex > 0 ? allMonths[selectedIndex - 1] : null;

  // Run Audit Engine
  const auditResult = useMemo(() => {
    return currentMonth ? runFinancialAudit(currentMonth, prevMonth) : { alerts: [] };
  }, [currentMonth, prevMonth]);

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
        setSelectedMonthKey(newMonths[newMonths.length - 1].monthKey);
      }
    }
  };

  return (
    <div className="app-main-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Main Mission Control Dashboard UI (Hidden when printing Executive Memo) */}
      <div className="no-print">
        {/* Header */}
        <Header 
          selectedMonth={currentMonth}
          availableMonths={allMonths}
          onSelectMonth={(key) => setSelectedMonthKey(key)}
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
                    <span>AI Financial Analyst Agent Deployed & Deployed</span>
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
        <BenchmarkOverview />

        {/* Top KPI Metrics Bar */}
        <MetricsOverview monthData={currentMonth} auditResult={auditResult} />

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
              allMonths={allMonths}
              currentMonth={currentMonth}
              prevMonth={prevMonth}
              auditResult={auditResult}
            />
          )}

          {activeTab === 'UTILITIES' && (
            <UtilitiesTab 
              allMonths={allMonths}
              currentMonth={currentMonth}
              prevMonth={prevMonth}
              auditResult={auditResult}
            />
          )}

          {activeTab === 'PAYROLL' && (
            <PayrollTab 
              allMonths={allMonths}
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
              allMonths={allMonths}
              currentMonth={currentMonth}
              prevMonth={prevMonth}
              auditResult={auditResult}
            />
          )}
        </main>
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
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        auditResult={auditResult}
      />

    </div>
  );
}

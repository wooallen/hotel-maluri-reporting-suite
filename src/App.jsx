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

import { H1_2026_MONTHLY_DATA } from './constants/baselines';
import { runFinancialAudit } from './services/auditEngine';
import { BedDouble, ShieldAlert, Server, Store, Users } from 'lucide-react';

export default function App() {
  const [allMonths, setAllMonths] = useState(H1_2026_MONTHLY_DATA);
  const [selectedMonthKey, setSelectedMonthKey] = useState('2026-06');
  const [activeTab, setActiveTab] = useState('ROOM_YIELD');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);

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
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
      
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

        {/* Audit Alerts Banner */}
        <AuditAlertsBanner alerts={auditResult.alerts} />

        {/* Top KPI Metrics Bar */}
        <MetricsOverview monthData={currentMonth} auditResult={auditResult} />

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          margin: '20px 0',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
          overflowX: 'auto'
        }}>
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
              allMonths={allMonths}
              currentMonth={currentMonth}
              prevMonth={prevMonth}
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

      {/* Spreadsheet Import Dropzone Modal */}
      <UploadDropzone 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDataUploaded={handleDataUploaded}
      />

      {/* Verbatim Executive PDF Report Modal */}
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

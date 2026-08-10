import React from 'react';
import { Building2, UploadCloud, FileText, CalendarRange } from 'lucide-react';

export default function Header({ 
  selectedPeriodKey, 
  selectedPeriod,
  availableMonths = [], 
  availableQuarters = [],
  onSelectPeriod, 
  onOpenUpload, 
  onOpenMemo
}) {
  const isQuarterMode = selectedPeriod ? selectedPeriod.isQuarter : false;

  return (
    <header className="glass-card header-wrapper" style={{ padding: '16px 24px', marginBottom: '24px', borderRadius: '16px' }}>
      <div className="header-flex-container">
        
        {/* Brand & Title */}
        <div className="header-brand-container">
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Building2 size={24} color="#090d16" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
                HOTEL MALURI
              </h1>
              <span className="gold-badge">Mission Control H2</span>
              {isQuarterMode ? (
                <span style={{ fontSize: '0.72rem', background: '#3b82f6', color: '#ffffff', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CalendarRange size={12} />
                  Quarterly Analysis Mode
                </span>
              ) : (
                <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.1)', color: '#94a3b8', fontWeight: 600, padding: '3px 8px', borderRadius: '6px' }}>
                  Monthly Analysis Mode
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Financial Ingestion, Variance Audit & Managing Director Reporting Suite
            </p>
          </div>
        </div>

        {/* Action Controls Panel */}
        <div className="header-action-container">
          
          {/* Timeframe Selector Dropdown (Quarterly + Monthly) */}
          <select 
            value={selectedPeriodKey || ''} 
            onChange={(e) => onSelectPeriod(e.target.value)}
            className="month-select-btn"
            style={{ minWidth: '220px' }}
          >
            <optgroup label="📊 Quarterly Reports (Jan-Mar, Apr-Jun)">
              {availableQuarters.map(q => (
                <option key={q.quarterKey} value={q.quarterKey}>
                  {q.quarterName} {q.isH1Baseline ? '(H1 Baseline)' : '(Ingested)'}
                </option>
              ))}
            </optgroup>

            <optgroup label="📅 Monthly Reports">
              {availableMonths.map(m => (
                <option key={m.monthKey} value={m.monthKey}>
                  {m.monthName} {m.isH1Baseline ? '(H1 Baseline)' : '(Ingested)'}
                </option>
              ))}
            </optgroup>
          </select>

          {/* Upload Button */}
          <button className="btn-outline header-btn" onClick={onOpenUpload}>
            <UploadCloud size={18} color="#f59e0b" />
            <span>Upload Spreadsheet</span>
          </button>

          {/* Executive Memo Button */}
          <button className="btn-gold header-btn" onClick={onOpenMemo}>
            <FileText size={18} />
            <span>Executive Memo {isQuarterMode ? '(Quarterly)' : '(Monthly)'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}

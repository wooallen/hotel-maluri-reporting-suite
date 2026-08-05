import React from 'react';
import { Building2, UploadCloud, FileText, Sparkles, RefreshCw } from 'lucide-react';

export default function Header({ 
  selectedMonth, 
  availableMonths, 
  onSelectMonth, 
  onOpenUpload, 
  onOpenMemo,
  onResetBaseline
}) {
  return (
    <header className="glass-card" style={{ padding: '16px 28px', marginBottom: '24px', borderRadius: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Building2 size={24} color="#090d16" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
                HOTEL MALURI
              </h1>
              <span className="gold-badge">Mission Control H2</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Monthly Financial Ingestion, Variance Audit & Managing Director Reporting Suite
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Month Selector */}
          <select 
            value={selectedMonth ? selectedMonth.monthKey : ''} 
            onChange={(e) => onSelectMonth(e.target.value)}
            style={{
              background: 'rgba(18, 24, 38, 0.9)',
              color: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {availableMonths.map(m => (
              <option key={m.monthKey} value={m.monthKey}>
                {m.monthName} {m.isH1Baseline ? '(H1 Baseline)' : '(Ingested)'}
              </option>
            ))}
          </select>

          {/* Upload Button */}
          <button className="btn-outline" onClick={onOpenUpload}>
            <UploadCloud size={18} color="#f59e0b" />
            <span>Upload Spreadsheet</span>
          </button>

          {/* Executive Memo Button */}
          <button className="btn-gold" onClick={onOpenMemo}>
            <FileText size={18} />
            <span>Executive Memo</span>
          </button>
        </div>

      </div>
    </header>
  );
}

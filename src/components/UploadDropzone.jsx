import React, { useState } from 'react';
import { UploadCloud, FileCheck, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { parseHotelMaluriExcel } from '../services/excelIngestion';

export default function UploadDropzone({ isOpen, onClose, onDataUploaded }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleFile = async (file) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setErrorMsg('Please upload a valid Excel spreadsheet (.xlsx)');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const result = await parseHotelMaluriExcel(file);
      setIsProcessing(false);
      setSuccessMsg(`Successfully parsed "${file.name}"!`);
      setTimeout(() => {
        onDataUploaded(result);
        onClose();
        setSuccessMsg(null);
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      setErrorMsg(`Failed to parse file: ${err.message}`);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '540px',
        padding: '32px',
        position: 'relative'
      }}>
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
          Upload Monthly Financial Spreadsheet
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Ingest General Ledger (.xlsx) or Departmental P&L files for H2 2026 (July – December).
        </p>

        {/* Drop Zone Box */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          style={{
            border: isDragging ? '2px dashed var(--gold-primary)' : '2px dashed var(--border-subtle)',
            borderRadius: '12px',
            padding: '36px 20px',
            textAlign: 'center',
            background: isDragging ? 'var(--gold-glow)' : 'rgba(255, 255, 255, 0.02)',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onClick={() => document.getElementById('file-input-elem').click()}
        >
          <input 
            type="file" 
            id="file-input-elem" 
            style={{ display: 'none' }} 
            accept=".xlsx, .xls"
            onChange={(e) => e.target.files.length && handleFile(e.target.files[0])}
          />
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              padding: '16px',
              borderRadius: '50%',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <UploadCloud size={32} color="#f59e0b" />
            </div>
          </div>

          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>
            {isProcessing ? 'Processing & Executing Financial Audits...' : 'Click to Browse or Drag & Drop File'}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            Supports Hotel Maluri Management Reports and General Ledger (.xlsx)
          </p>
        </div>

        {/* Status Messages */}
        {errorMsg && (
          <div style={{
            marginTop: '16px',
            background: 'var(--accent-rose-glow)',
            border: '1px solid var(--accent-rose)',
            color: '#fecdd3',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.85rem'
          }}>
            <AlertTriangle size={18} color="#f43f5e" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            marginTop: '16px',
            background: 'var(--accent-emerald-glow)',
            border: '1px solid var(--accent-emerald)',
            color: '#a7f3d0',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.85rem'
          }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span>{successMsg}</span>
          </div>
        )}

      </div>
    </div>
  );
}

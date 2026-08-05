import React from 'react';
import { AlertOctagon, AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AuditAlertsBanner({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="glass-card" style={{
        padding: '16px 20px',
        marginBottom: '24px',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        background: 'rgba(16, 185, 129, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <CheckCircle2 size={20} color="#10b981" />
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#a7f3d0' }}>
            All Mission Control Audit Checks Passed
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            No missing utility accruals, rate dilution anomalies, or vendor run-rate breaches detected for this operating period.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {alerts.map((alert, idx) => {
        const isCritical = alert.type === 'CRITICAL';
        const isWarning = alert.type === 'WARNING';
        
        const bgColor = isCritical ? 'rgba(244, 63, 94, 0.1)' : (isWarning ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)');
        const borderColor = isCritical ? 'rgba(244, 63, 94, 0.4)' : (isWarning ? 'rgba(245, 158, 11, 0.4)' : 'rgba(59, 130, 246, 0.4)');
        const iconColor = isCritical ? '#f43f5e' : (isWarning ? '#f59e0b' : '#3b82f6');
        const IconComponent = isCritical ? AlertOctagon : (isWarning ? AlertTriangle : Info);

        return (
          <div key={idx} className="glass-card" style={{
            padding: '14px 18px',
            background: bgColor,
            borderColor: borderColor,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px'
          }}>
            <div style={{ marginTop: '2px' }}>
              <IconComponent size={20} color={iconColor} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: isCritical ? '#f43f5e' : (isWarning ? '#f59e0b' : '#3b82f6'),
                  color: '#000'
                }}>
                  {alert.category}
                </span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>
                  {alert.title}
                </h4>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                {alert.message}
              </p>

              {alert.recommendation && (
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  💡 <strong>Action Required:</strong> {alert.recommendation}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

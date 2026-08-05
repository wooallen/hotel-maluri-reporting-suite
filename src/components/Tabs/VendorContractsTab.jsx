import React from 'react';
import { FIXED_BASELINES } from '../../constants/baselines';
import { Server, Car, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function VendorContractsTab({ currentMonth }) {
  if (!currentMonth) return null;

  const { itSupportSC, parkingBGD } = currentMonth;
  const itVariance = Math.abs(itSupportSC - FIXED_BASELINES.IT_SUPPORT_SC_SYSTEMS) > 0.01;
  const parkingVariance = Math.abs(parkingBGD - FIXED_BASELINES.PARKING_BGD_ACCESS) > 0.01;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
          Fixed Overhead & Vendor Contract Compliance Audit
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Verifies monthly vendor charge-outs against fixed H1 run-rates to audit volume-tiered renegotiations and scope compliance.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          {/* Vendor 1: SC Systems */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${itVariance ? 'rgba(245,158,11,0.5)' : 'var(--border-subtle)'}`,
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '10px', borderRadius: '10px' }}>
                  <Server size={22} color="#3b82f6" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>SC SYSTEMS SDN BHD</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IT Expenditure / Employee Assignment</p>
                </div>
              </div>
              <span className="gold-badge" style={{ background: itVariance ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)', color: itVariance ? '#f59e0b' : '#10b981' }}>
                {itVariance ? 'Variance Detected' : 'Compliance Match'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>H1 Fixed Run-Rate</span>
                <div className="metric-value" style={{ color: '#ffffff', fontSize: '1.1rem' }}>
                  RM {FIXED_BASELINES.IT_SUPPORT_SC_SYSTEMS.toFixed(2)}
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Recorded Charge-Out</span>
                <div className="metric-value" style={{ color: itVariance ? '#f59e0b' : '#10b981', fontSize: '1.1rem' }}>
                  RM {itSupportSC.toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(9, 13, 22, 0.6)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {itVariance ? <AlertTriangle size={16} color="#f59e0b" /> : <CheckCircle2 size={16} color="#10b981" />}
              <span>
                {itVariance
                  ? `Variance of RM ${(itSupportSC - FIXED_BASELINES.IT_SUPPORT_SC_SYSTEMS).toFixed(2)} from baseline run-rate.`
                  : 'Charge-out matches exact fixed monthly contract rate of RM 5,400.00.'}
              </span>
            </div>
          </div>

          {/* Vendor 2: BGD Access */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${parkingVariance ? 'rgba(245,158,11,0.5)' : 'var(--border-subtle)'}`,
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '10px', borderRadius: '10px' }}>
                  <Car size={22} color="#10b981" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>BGD ACCESS SDN BHD</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cashless Parking System Charge-Out</p>
                </div>
              </div>
              <span className="gold-badge" style={{ background: parkingVariance ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)', color: parkingVariance ? '#f59e0b' : '#10b981' }}>
                {parkingVariance ? 'Variance Detected' : 'Compliance Match'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>H1 Fixed Run-Rate</span>
                <div className="metric-value" style={{ color: '#ffffff', fontSize: '1.1rem' }}>
                  RM {FIXED_BASELINES.PARKING_BGD_ACCESS.toFixed(2)}
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Recorded Charge-Out</span>
                <div className="metric-value" style={{ color: parkingVariance ? '#f59e0b' : '#10b981', fontSize: '1.1rem' }}>
                  RM {parkingBGD.toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(9, 13, 22, 0.6)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {parkingVariance ? <AlertTriangle size={16} color="#f59e0b" /> : <CheckCircle2 size={16} color="#10b981" />}
              <span>
                {parkingVariance
                  ? `Variance of RM ${(parkingBGD - FIXED_BASELINES.PARKING_BGD_ACCESS).toFixed(2)} from baseline run-rate.`
                  : 'Charge-out matches exact fixed monthly contract rate of RM 1,940.00.'}
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

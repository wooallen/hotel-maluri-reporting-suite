import React from 'react';
import { DollarSign, BedDouble, TrendingUp, TrendingDown, Percent, AlertCircle } from 'lucide-react';

export default function MetricsOverview({ currentMonth, prevMonth, auditResult }) {
  if (!currentMonth) return null;

  const { occupancyPct, adr, revpar, roomRevenueTotal, netProfit } = currentMonth;
  const prevAdr = prevMonth ? prevMonth.adr : null;
  const prevRevpar = prevMonth ? prevMonth.revpar : null;
  const prevOcc = prevMonth ? prevMonth.occupancyPct : null;

  const adrDiffPct = (prevAdr && prevAdr > 0) ? (((adr - prevAdr) / prevAdr) * 100) : null;
  const revparDiffPct = (prevRevpar && prevRevpar > 0) ? (((revpar - prevRevpar) / prevRevpar) * 100) : null;
  const occDiffPct = (prevOcc && prevOcc > 0) ? (occupancyPct - prevOcc) : null;

  const cards = [
    {
      title: 'TOTAL ROOM REVENUE',
      value: `RM ${roomRevenueTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'SC + NSC Combined',
      icon: DollarSign,
      iconColor: '#f59e0b',
      badge: currentMonth.isH1Baseline ? 'Baseline Data' : 'H2 Ingested'
    },
    {
      title: 'OCCUPANCY RATE',
      value: `${occupancyPct.toFixed(2)}%`,
      subtitle: `${currentMonth.roomsSold.toLocaleString()} / ${currentMonth.roomsAvailable.toLocaleString()} Rooms`,
      icon: Percent,
      iconColor: '#3b82f6',
      trend: occDiffPct !== null ? `${occDiffPct >= 0 ? '+' : ''}${occDiffPct.toFixed(1)}% MoM` : null,
      trendUp: occDiffPct >= 0
    },
    {
      title: 'AVERAGE DAILY RATE (ADR)',
      value: `RM ${adr.toFixed(2)}`,
      subtitle: 'Room Revenue / Rooms Sold',
      icon: BedDouble,
      iconColor: '#10b981',
      trend: adrDiffPct !== null ? `${adrDiffPct >= 0 ? '+' : ''}${adrDiffPct.toFixed(2)}% MoM` : null,
      trendUp: adrDiffPct >= 0,
      warning: auditResult.yieldAnomaly
    },
    {
      title: 'REVPAR',
      value: `RM ${revpar.toFixed(2)}`,
      subtitle: 'Room Revenue / Available',
      icon: TrendingUp,
      iconColor: '#8b5cf6',
      trend: revparDiffPct !== null ? `${revparDiffPct >= 0 ? '+' : ''}${revparDiffPct.toFixed(2)}% MoM` : null,
      trendUp: revparDiffPct >= 0
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    }}>
      {cards.map((card, i) => {
        const IconComponent = card.icon;
        return (
          <div key={i} className="glass-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            
            {card.warning && (
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: 'var(--accent-rose)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderBottomLeftRadius: '8px'
              }}>
                RATE DILUTION ALERT
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                {card.title}
              </span>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <IconComponent size={18} color={card.iconColor} />
              </div>
            </div>

            <div className="metric-value" style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '4px' }}>
              {card.value}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>{card.subtitle}</span>
              
              {card.trend && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontWeight: 600,
                  color: card.trendUp ? '#10b981' : '#f43f5e'
                }}>
                  {card.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {card.trend}
                </span>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}

import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8' },
    emerald: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399' },
    cyan: { bg: 'rgba(6, 182, 212, 0.15)', text: '#22d3ee' },
    amber: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24' },
    rose: { bg: 'rgba(244, 63, 94, 0.15)', text: '#f87171' }
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className="metric-card">
      <div className="metric-icon" style={{ background: scheme.bg, color: scheme.text }}>
        {Icon && <Icon size={26} />}
      </div>
      <div>
        <div className="metric-val">{value}</div>
        <div className="metric-label">{title}</div>
        {subtitle && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{subtitle}</div>}
      </div>
    </div>
  );
}

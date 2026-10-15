import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <GraduationCap size={18} color="var(--indigo-500)" />
          <strong style={{ color: 'var(--text-primary)' }}>SkillGate – Smart Entrance & Learning Portal</strong>
        </div>
        <p>College Assignment Full-Stack Web Application Project • Built with React, Node.js, Express & MySQL</p>
      </div>
    </footer>
  );
}

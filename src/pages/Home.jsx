import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, FileText, CheckSquare, BrainCircuit, BarChart3, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="container">
      {/* Hero Banner */}
      <div className="card" style={{ padding: '3.5rem 2.5rem', textAlign: 'center', marginBottom: '3rem', background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(79, 70, 229, 0.15))', border: '1px solid rgba(99, 102, 241, 0.3)', boxShadow: 'var(--shadow-glow)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 'var(--radius-full)', color: '#818cf8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <GraduationCap size={16} /> Admissions & Skill Evaluation Platform 2026
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
          Welcome to <span style={{ background: 'linear-gradient(135deg, #6366f1, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SkillGate</span>
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          SkillGate helps students apply, take small entrance challenges, and lets staff analyze performance seamlessly.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/apply" className="btn btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '1.05rem' }}>
            Apply Now <ArrowRight size={18} />
          </Link>
          <Link to="/entrance-test" className="btn btn-emerald" style={{ padding: '0.85rem 1.8rem', fontSize: '1.05rem' }}>
            Take Entrance Test <CheckSquare size={18} />
          </Link>
          <Link to="/staff/login" className="btn btn-secondary" style={{ padding: '0.85rem 1.8rem', fontSize: '1.05rem' }}>
            Staff Login <ShieldCheck size={18} />
          </Link>
        </div>
      </div>

      {/* Purpose & Value Proposition */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Platform Purpose & Workflow</h2>
          <p style={{ color: 'var(--text-secondary)' }}>A complete end-to-end portal designed for both prospective students and academic staff</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="card">
            <div style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', marginBottom: '1rem' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>1. Student Application</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Students enter personal details, course interests, and college information with real-time validation to generate a unique Application ID (e.g. SG-2026-1001).
            </p>
          </div>

          <div className="card">
            <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', marginBottom: '1rem' }}>
              <CheckSquare size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>2. Aptitude Entrance Test</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              A 10-question multiple choice test evaluating logical reasoning, number patterns, and basic math. Server-side evaluation ensures security and accuracy.
            </p>
          </div>

          <div className="card">
            <div style={{ width: '48px', height: '48px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee', marginBottom: '1rem' }}>
              <BrainCircuit size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>3. Problem-Solving Challenge</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Interactive mini-puzzles requiring students to find missing numbers, resolve logic sequences, and answer mathematical precedence questions.
            </p>
          </div>
        </div>
      </div>

      {/* Staff Analytics Overview Section */}
      <div className="card" style={{ padding: '2.5rem', background: 'rgba(17, 24, 39, 0.8)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <span className="badge badge-indigo" style={{ marginBottom: '1rem' }}>
              <ShieldCheck size={14} /> Staff Administration Section
            </span>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Staff Performance Analytics</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              Staff members can log in securely using JWT authentication to monitor applicant metrics, score distributions, and problem-solving accuracy in real time.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="var(--emerald-500)" /> View total applicants & course interest breakdown
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="var(--emerald-500)" /> Track average & highest entrance aptitude scores
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="var(--emerald-500)" /> Search & filter student records by name or email
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="var(--emerald-500)" /> Inspect individual student performance profiles
              </li>
            </ul>
          </div>

          <div style={{ background: 'rgba(11, 15, 25, 0.9)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sample Dashboard Metrics</span>
              <BarChart3 size={18} color="var(--indigo-500)" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Applicants</span>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#818cf8' }}>24 Applicants</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Average Entrance Score</span>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#34d399' }}>8.2 / 10 (82%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Problem Solving Accuracy</span>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#22d3ee' }}>85.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { X, User, Mail, Phone, BookOpen, Building, Award, CheckCircle2, XCircle, Brain, Calendar } from 'lucide-react';

export default function StudentDetailModal({ student, onClose }) {
  if (!student) return null;

  const {
    applicationId,
    name,
    email,
    phone,
    courseInterest,
    college,
    age,
    createdAt,
    entranceTest,
    problemChallenges
  } = student;

  const getGradeBadge = (percentage) => {
    if (percentage === null || percentage === undefined) return <span className="badge badge-amber">Pending Test</span>;
    if (percentage >= 80) return <span className="badge badge-emerald">High Distinction ({percentage}%)</span>;
    if (percentage >= 60) return <span className="badge badge-indigo">Qualified ({percentage}%)</span>;
    return <span className="badge badge-rose">Under Review ({percentage}%)</span>;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h2 style={{ fontSize: '1.4rem' }}>{name}</h2>
              <span className="badge badge-indigo">{applicationId}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
              Detailed Applicant Performance Profile
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Student Background Information */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail size={16} color="var(--indigo-500)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{email}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Phone size={16} color="var(--indigo-500)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{phone}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen size={16} color="var(--indigo-500)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Course Interest</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{courseInterest}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Building size={16} color="var(--indigo-500)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>College / School</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{college} (Age: {age})</div>
            </div>
          </div>
        </div>

        {/* Entrance Test Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} color="var(--indigo-500)" /> Aptitude Entrance Test Score
          </h3>

          {entranceTest ? (
            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {entranceTest.score} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>/ {entranceTest.totalQuestions} Marks</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Completed: {new Date(entranceTest.completedAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
                <div>{getGradeBadge(entranceTest.percentage)}</div>
              </div>
              <div className="progress-container" style={{ marginTop: '1rem' }}>
                <div className="progress-fill" style={{ width: `${entranceTest.percentage}%` }}></div>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">Student has not attempted the entrance aptitude test yet.</div>
          )}
        </div>

        {/* Problem Solving Section */}
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Brain size={18} color="var(--emerald-500)" /> Problem Solving Mini-Challenges Log
          </h3>

          {problemChallenges && problemChallenges.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {problemChallenges.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Challenge #{idx + 1}</span>
                    {item.isCorrect ? (
                      <span className="badge badge-emerald"><CheckCircle2 size={12} /> Correct</span>
                    ) : (
                      <span className="badge badge-rose"><XCircle size={12} /> Incorrect</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.5rem' }}>{item.question}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Submitted Answer: <code style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{item.submittedAnswer}</code>
                    {!item.isCorrect && (
                      <span style={{ marginLeft: '0.75rem' }}>
                        (Expected: <code style={{ color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>{item.expectedAnswer}</code>)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">No problem solving challenges submitted yet.</div>
          )}
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

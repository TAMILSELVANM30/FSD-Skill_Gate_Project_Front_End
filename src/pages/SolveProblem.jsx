import React, { useState, useEffect } from 'react';
import { getProblemChallenges, submitProblemAnswer, getStudentById } from '../services/api';
import { BrainCircuit, CheckCircle2, XCircle, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';

export default function SolveProblem() {
  const [challenges, setChallenges] = useState([]);
  const [activeStudent, setActiveStudent] = useState(null);
  const [studentIdInput, setStudentIdInput] = useState('');
  const [answers, setAnswers] = useState({});
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('skillgate_current_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.id || parsed.applicationId)) {
          setActiveStudent(parsed);
          setStudentIdInput(parsed.applicationId || parsed.id);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getProblemChallenges();
      if (res.success) {
        setChallenges(res.challenges || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch problem challenges.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyStudent = async (e) => {
    e.preventDefault();
    if (!studentIdInput.trim()) {
      setError('Please enter your Application ID.');
      return;
    }
    setError('');
    try {
      const res = await getStudentById(studentIdInput.trim());
      if (res.success && res.student) {
        setActiveStudent(res.student);
        localStorage.setItem('skillgate_current_student', JSON.stringify(res.student));
      }
    } catch (err) {
      setError('Application record not found. Please verify your Application ID or submit an application first.');
    }
  };

  const handleInputChange = (challengeId, value) => {
    setAnswers({
      ...answers,
      [challengeId]: value
    });
  };

  const handleSubmitAnswer = async (challengeId) => {
    if (!activeStudent) {
      setError('Please verify your Application ID before submitting answers.');
      return;
    }

    const val = answers[challengeId];
    if (val === undefined || String(val).trim() === '') {
      alert('Please type an answer before submitting.');
      return;
    }

    setSubmittingId(challengeId);
    setError('');

    try {
      const res = await submitProblemAnswer({
        student_id: activeStudent.id || activeStudent.applicationId,
        challenge_id: challengeId,
        submitted_answer: val.trim()
      });

      if (res.success) {
        setStatuses({
          ...statuses,
          [challengeId]: {
            isCorrect: res.isCorrect,
            message: res.message
          }
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to submit problem answer.');
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '840px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Solve Problem Mini-Challenges</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Demonstrate your analytical reasoning and problem solving skills with mini logical puzzles.
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* Student Verification Box */}
      {!activeStudent ? (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={20} color="var(--indigo-500)" /> Student Verification
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Please enter your Application ID to record problem-solving challenges under your profile.
          </p>
          <form onSubmit={handleVerifyStudent} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="form-input"
              style={{ flex: 1, minWidth: '240px' }}
              placeholder="Enter Application ID (e.g. SG-2026-XXXX)"
              value={studentIdInput}
              onChange={(e) => setStudentIdInput(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Verify Student ID</button>
          </form>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: '2rem', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>{activeStudent.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ID: {activeStudent.applicationId || activeStudent.id}</div>
            </div>
          </div>
          <span className="badge badge-emerald">Ready for Challenges</span>
        </div>
      )}

      {/* Challenges List */}
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading problem challenges...</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {challenges.map((c, index) => {
            const status = statuses[c.id];

            return (
              <div key={c.id} className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-indigo">Problem Challenge #{index + 1}</span>
                  {status && (
                    status.isCorrect ? (
                      <span className="badge badge-emerald"><CheckCircle2 size={12} /> Correct</span>
                    ) : (
                      <span className="badge badge-rose"><XCircle size={12} /> Incorrect</span>
                    )
                  )}
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  {c.question}
                </h3>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ flex: 1, minWidth: '220px' }}
                    placeholder="Enter your answer..."
                    value={answers[c.id] || ''}
                    onChange={(e) => handleInputChange(c.id, e.target.value)}
                  />
                  <button
                    onClick={() => handleSubmitAnswer(c.id)}
                    className="btn btn-primary"
                    disabled={submittingId === c.id || !activeStudent}
                  >
                    {submittingId === c.id ? 'Checking...' : 'Submit Answer'}
                  </button>
                </div>

                {/* Feedback status badge */}
                {status && (
                  <div style={{ marginTop: '1rem' }} className={status.isCorrect ? 'alert alert-success' : 'alert alert-error'}>
                    {status.isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    <span>{status.message}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

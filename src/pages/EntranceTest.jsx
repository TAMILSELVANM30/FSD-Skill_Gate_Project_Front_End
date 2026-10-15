import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEntranceQuestions, submitEntranceTest, getStudentById } from '../services/api';
import { CheckSquare, AlertCircle, ArrowRight, Award, CheckCircle2, Clock, HelpCircle, UserCheck } from 'lucide-react';

export default function EntranceTest() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [studentIdInput, setStudentIdInput] = useState('');
  const [activeStudent, setActiveStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  // Check stored student application on load
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
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getEntranceQuestions();
      if (data.success) {
        setQuestions(data.questions || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load entrance questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyStudent = async (e) => {
    e.preventDefault();
    if (!studentIdInput.trim()) {
      setError('Please enter your Application ID or Student ID.');
      return;
    }
    setError('');
    try {
      const res = await getStudentById(studentIdInput.trim());
      if (res.success && res.student) {
        setActiveStudent(res.student);
        localStorage.setItem('skillgate_current_student', JSON.stringify(res.student));
        // If student already has test result
        if (res.student.entranceTest) {
          setResult({
            studentId: res.student.id,
            applicationId: res.student.applicationId,
            studentName: res.student.name,
            score: res.student.entranceTest.score,
            totalQuestions: res.student.entranceTest.total_questions,
            percentage: res.student.entranceTest.percentage
          });
        }
      }
    } catch (err) {
      setError('Application record not found. Please verify your Application ID or submit a new application first.');
    }
  };

  const handleSelectOption = (questionId, optionKey) => {
    setAnswers({
      ...answers,
      [questionId]: optionKey
    });
  };

  const handleSubmitTest = async () => {
    if (!activeStudent) {
      setError('Please verify your Application ID before submitting the test.');
      return;
    }

    const answeredCount = Object.keys(answers).length;
    if (answeredCount < questions.length) {
      if (!window.confirm(`You have answered ${answeredCount} of ${questions.length} questions. Submit test now?`)) {
        return;
      }
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await submitEntranceTest({
        student_id: activeStudent.id || activeStudent.applicationId,
        answers
      });

      if (res.success) {
        setResult(res.result);
      }
    } catch (err) {
      setError(err.message || 'Failed to evaluate test answers.');
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progressPct = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <div className="container" style={{ maxWidth: '840px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Entrance Aptitude Assessment</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Complete 10 multiple-choice questions evaluating logical reasoning and aptitude skills.
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* Student Verification Header */}
      {!activeStudent ? (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={20} color="var(--indigo-500)" /> Verify Student Application
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Please enter your Application ID (e.g. <code>SG-2026-1001</code>) to link your test score. If you haven't applied yet, <Link to="/apply">click here to apply</Link>.
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
            <button type="submit" className="btn btn-primary">Verify & Proceed</button>
          </form>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: '2rem', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>{activeStudent.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ID: {activeStudent.applicationId || activeStudent.id} • {activeStudent.courseInterest}</div>
            </div>
          </div>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }} onClick={() => setActiveStudent(null)}>
            Change ID
          </button>
        </div>
      )}

      {/* Test Evaluation Result View */}
      {result ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(99, 102, 241, 0.15))', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <Award size={36} />
          </div>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Entrance Assessment Complete!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Result recorded for student <strong>{result.studentName}</strong> ({result.applicationId}).
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <div style={{ background: 'rgba(11, 15, 25, 0.8)', padding: '1.5rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Score</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                {result.score} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ {result.totalQuestions}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(11, 15, 25, 0.8)', padding: '1.5rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Percentage</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: result.percentage >= 60 ? '#34d399' : '#f87171', fontFamily: 'var(--font-heading)' }}>
                {result.percentage}%
              </div>
            </div>
          </div>

          <div>
            <Link to="/solve-problem" className="btn btn-emerald" style={{ padding: '0.85rem 1.8rem', fontSize: '1.05rem' }}>
              Continue to Solve Problem Challenge <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      ) : (
        /* MCQ Question Paper Deck */
        <div>
          {loading ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Loading entrance questions deck...</p>
            </div>
          ) : (
            <div>
              {/* Progress Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Answered: {answeredCount} / {questions.length} Questions
                </span>
                <span className="badge badge-indigo">
                  <Clock size={12} style={{ marginRight: '4px' }} /> Timed Assessment
                </span>
              </div>

              <div className="progress-container" style={{ marginBottom: '2rem' }}>
                <div className="progress-fill" style={{ width: `${progressPct}%` }}></div>
              </div>

              {/* Questions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {questions.map((q, index) => (
                  <div key={q.id} className="card" style={{ border: answers[q.id] ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span style={{ background: answers[q.id] ? 'var(--indigo-600)' : 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>
                        {index + 1}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: '1.4' }}>
                        {q.question}
                      </h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', paddingLeft: '2.25rem' }}>
                      {['A', 'B', 'C', 'D'].map((optKey) => {
                        const optText = q.options[optKey];
                        const isSelected = answers[q.id] === optKey;

                        return (
                          <button
                            key={optKey}
                            type="button"
                            onClick={() => handleSelectOption(q.id, optKey)}
                            style={{
                              padding: '0.8rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                              border: isSelected ? '1px solid #6366f1' : '1px solid var(--border-color)',
                              color: isSelected ? 'white' : 'var(--text-secondary)',
                              textAlign: 'left',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              transition: 'all 0.15s ease',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.95rem'
                            }}
                          >
                            <span style={{
                              fontWeight: 700,
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              background: isSelected ? '#6366f1' : 'rgba(255,255,255,0.08)',
                              color: isSelected ? 'white' : 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.8rem'
                            }}>
                              {optKey}
                            </span>
                            <span>{optText}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Action */}
              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <button
                  onClick={handleSubmitTest}
                  className="btn btn-emerald"
                  style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem' }}
                  disabled={submitting || !activeStudent}
                >
                  {submitting ? 'Evaluating Test Answers...' : 'Submit Entrance Test'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

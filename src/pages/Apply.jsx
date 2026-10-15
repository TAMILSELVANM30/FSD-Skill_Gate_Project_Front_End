import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { applyStudent } from '../services/api';
import { FileText, ArrowRight, CheckCircle2, AlertCircle, User, Mail, Phone, BookOpen, Building, Calendar } from 'lucide-react';

export default function Apply() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course_interest: 'Computer Science & Engineering',
    college: '',
    age: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Front-end Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.college.trim() || !formData.age) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum < 15 || ageNum > 100) {
      setError('Please enter a valid age between 15 and 100.');
      return;
    }

    setLoading(true);

    try {
      const res = await applyStudent(formData);
      if (res.success) {
        setSubmittedData(res.student);
        // Store in localStorage for seamless flow
        localStorage.setItem('skillgate_current_student', JSON.stringify(res.student));
      }
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '720px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Student Entrance Application</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Fill out your details to apply and receive your unique Application ID.</p>
      </div>

      {submittedData ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(16, 185, 129, 0.15))', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Application Submitted Successfully!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Welcome, <strong>{submittedData.name}</strong>. Your student application has been recorded in the database.
          </p>

          <div style={{ background: 'rgba(11, 15, 25, 0.8)', border: '1px border var(--border-color)', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Application ID</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#818cf8', fontFamily: 'var(--font-heading)' }}>{submittedData.applicationId}</div>
          </div>

          <div>
            <Link to="/entrance-test" className="btn btn-emerald" style={{ padding: '0.85rem 1.8rem', fontSize: '1.05rem' }}>
              Proceed to Entrance Test <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                <User size={14} style={{ display: 'inline', marginRight: '4px' }} /> Full Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Rohan Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} /> Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. rohan.sharma@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  <Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="course_interest">
                <BookOpen size={14} style={{ display: 'inline', marginRight: '4px' }} /> Course Interest *
              </label>
              <select
                id="course_interest"
                name="course_interest"
                className="form-select"
                value={formData.course_interest}
                onChange={handleChange}
                required
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="college">
                  <Building size={14} style={{ display: 'inline', marginRight: '4px' }} /> College / School Name *
                </label>
                <input
                  id="college"
                  type="text"
                  name="college"
                  className="form-input"
                  placeholder="e.g. City Higher Secondary School"
                  value={formData.college}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="age">
                  <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} /> Age *
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  min="15"
                  max="100"
                  className="form-input"
                  placeholder="e.g. 19"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={loading}>
                {loading ? 'Submitting Application...' : 'Submit Application & Continue'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

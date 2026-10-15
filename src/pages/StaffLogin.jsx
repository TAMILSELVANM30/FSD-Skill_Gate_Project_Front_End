import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { staffLogin } from '../services/api';
import { ShieldCheck, Lock, Mail, AlertCircle, Info } from 'lucide-react';

export default function StaffLogin({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin@skillgate.edu');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please enter your staff username/email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await staffLogin({ username: username.trim(), password });
      if (res.success && res.token) {
        localStorage.setItem('skillgate_staff_token', res.token);
        localStorage.setItem('skillgate_staff_user', JSON.stringify(res.staff));
        onLoginSuccess(res.staff);
        navigate('/staff/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid staff login credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '460px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, var(--indigo-500), var(--indigo-700))', color: 'white', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: 'var(--shadow-glow)' }}>
          <ShieldCheck size={36} />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Staff Portal Login</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Secure access for academic staff and admissions panel.
        </p>
      </div>

      <div className="card">
        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {/* Demo Credentials Box */}
        <div style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '0.9rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#818cf8', marginBottom: '0.3rem' }}>
            <Info size={16} /> Seed Staff Demo Account
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            <strong>Email:</strong> <code>admin@skillgate.edu</code><br />
            <strong>Password:</strong> <code>admin123</code>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="staff_username">
              <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} /> Email / Username
            </label>
            <input
              id="staff_username"
              type="text"
              className="form-input"
              placeholder="e.g. admin@skillgate.edu"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="staff_password">
              <Lock size={14} style={{ display: 'inline', marginRight: '4px' }} /> Password
            </label>
            <input
              id="staff_password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }} disabled={loading}>
            {loading ? 'Authenticating Staff...' : 'Login to Staff Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}

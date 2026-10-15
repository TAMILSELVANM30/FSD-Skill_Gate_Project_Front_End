import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, FileText, CheckSquare, BrainCircuit, ShieldCheck, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar({ staff, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <GraduationCap size={24} />
          </div>
          <span>Skill<span style={{ color: 'var(--indigo-500)' }}>Gate</span></span>
        </Link>

        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/apply" className={isActive('/apply') ? 'active' : ''}>
              <FileText size={16} /> Apply
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/entrance-test" className={isActive('/entrance-test') ? 'active' : ''}>
              <CheckSquare size={16} /> Entrance Test
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/solve-problem" className={isActive('/solve-problem') ? 'active' : ''}>
              <BrainCircuit size={16} /> Solve Problem
            </Link>
          </li>

          {staff ? (
            <>
              <li className="nav-item">
                <Link to="/staff/dashboard" className={isActive('/staff/dashboard') ? 'active staff-badge' : 'staff-badge'}>
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={onLogout} className="btn-secondary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                  <LogOut size={15} /> Logout ({staff.username})
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/staff/login" className={isActive('/staff/login') ? 'active' : ''}>
                <ShieldCheck size={16} /> Staff Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

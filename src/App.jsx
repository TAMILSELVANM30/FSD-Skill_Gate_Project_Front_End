import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Apply from './pages/Apply';
import EntranceTest from './pages/EntranceTest';
import SolveProblem from './pages/SolveProblem';
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';

export default function App() {
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('skillgate_staff_token');
    const userStr = localStorage.getItem('skillgate_staff_user');
    if (token && userStr) {
      try {
        setStaff(JSON.parse(userStr));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('skillgate_staff_token');
    localStorage.removeItem('skillgate_staff_user');
    setStaff(null);
  };

  return (
    <Router>
      <div className="page-wrapper">
        <Navbar staff={staff} onLogout={handleLogout} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/entrance-test" element={<EntranceTest />} />
            <Route path="/solve-problem" element={<SolveProblem />} />
            
            <Route 
              path="/staff/login" 
              element={staff ? <Navigate to="/staff/dashboard" replace /> : <StaffLogin onLoginSuccess={setStaff} />} 
            />
            
            <Route 
              path="/staff/dashboard" 
              element={staff ? <StaffDashboard /> : <Navigate to="/staff/login" replace />} 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

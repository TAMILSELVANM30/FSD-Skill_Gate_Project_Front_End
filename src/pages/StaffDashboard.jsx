import React, { useState, useEffect } from 'react';
import { getStaffDashboard, getStaffStudents, getStaffStudentDetail } from '../services/api';
import MetricCard from '../components/MetricCard';
import StudentDetailModal from '../components/StudentDetailModal';
import { Users, Award, TrendingUp, BrainCircuit, Target, Search, Filter, RefreshCw, Eye, AlertCircle } from 'lucide-react';

export default function StaffDashboard() {
  const [metrics, setMetrics] = useState({
    totalApplicants: 0,
    avgEntranceScore: 0,
    avgEntrancePercentage: 0,
    highestEntranceScore: 0,
    totalProblemsAttempted: 0,
    problemSolvingAccuracy: 0
  });

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [summaryRes, studentsRes] = await Promise.all([
        getStaffDashboard(),
        getStaffStudents(search, courseFilter)
      ]);

      if (summaryRes.success) {
        setMetrics(summaryRes.metrics);
      }

      if (studentsRes.success) {
        setStudents(studentsRes.students || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load staff dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getStaffStudents(search, courseFilter);
      if (res.success) {
        setStudents(res.students || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to search students.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenStudentDetail = async (studentId) => {
    setLoadingDetail(true);
    try {
      const res = await getStaffStudentDetail(studentId);
      if (res.success && res.studentDetails) {
        setSelectedStudent(res.studentDetails);
      }
    } catch (err) {
      alert(err.message || 'Error opening student details.');
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Staff Admissions & Analytics Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Real-time assessment results, applicant metrics, and performance analytics.
          </p>
        </div>
        <button onClick={loadDashboardData} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} /> Refresh Analytics
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="metrics-grid">
        <MetricCard
          title="Total Applicants"
          value={metrics.totalApplicants}
          subtitle="Registered applications"
          icon={Users}
          color="indigo"
        />
        <MetricCard
          title="Avg Entrance Score"
          value={`${metrics.avgEntranceScore} / 10`}
          subtitle={`Average Pct: ${metrics.avgEntrancePercentage}%`}
          icon={Award}
          color="emerald"
        />
        <MetricCard
          title="Highest Entrance Score"
          value={`${metrics.highestEntranceScore} / 10`}
          subtitle="Top aptitude score"
          icon={TrendingUp}
          color="cyan"
        />
        <MetricCard
          title="Problems Attempted"
          value={metrics.totalProblemsAttempted}
          subtitle="Total challenge submissions"
          icon={BrainCircuit}
          color="amber"
        />
        <MetricCard
          title="Problem Accuracy"
          value={`${metrics.problemSolvingAccuracy}%`}
          subtitle="Overall correct rate"
          icon={Target}
          color="rose"
        />
      </div>

      {/* Filter and Table Container */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem' }}>Applicant Entrance & Evaluation Results</h2>

          {/* Search & Filter Bar */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1, maxWidth: '600px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Search by Name, Email, or Application ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '180px' }}
              value={courseFilter}
              onChange={(e) => {
                setCourseFilter(e.target.value);
              }}
            >
              <option value="ALL">All Courses</option>
              <option value="Computer Science & Engineering">Computer Science & Eng</option>
              <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
              <option value="Information Technology">Information Tech</option>
              <option value="Electronics & Communication">Electronics & Comm</option>
              <option value="Mechanical Engineering">Mechanical Eng</option>
            </select>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1rem' }}>
              <Filter size={16} /> Filter
            </button>
          </form>
        </div>

        {/* Results Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            Loading student records...
          </div>
        ) : students.length === 0 ? (
          <div className="alert alert-info">
            No applicant records match your current filter parameters.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Course Interest</th>
                  <th>Entrance Score</th>
                  <th>Entrance %</th>
                  <th>Problem Solving</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st) => (
                  <tr key={st.id}>
                    <td>
                      <span className="badge badge-indigo">{st.applicationId}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{st.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{st.email}</td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{st.courseInterest}</span>
                    </td>
                    <td>
                      {st.entranceScore !== null ? (
                        <strong style={{ color: 'var(--text-primary)' }}>{st.entranceScore} / {st.entranceTotal}</strong>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Not Attempted</span>
                      )}
                    </td>
                    <td>
                      {st.entrancePercentage !== null ? (
                        <span className={st.entrancePercentage >= 60 ? 'badge badge-emerald' : 'badge badge-rose'}>
                          {st.entrancePercentage}%
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>-</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{st.problemResultStatus}</span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {new Date(st.applicationDate).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                        onClick={() => handleOpenStudentDetail(st.id)}
                      >
                        <Eye size={14} /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

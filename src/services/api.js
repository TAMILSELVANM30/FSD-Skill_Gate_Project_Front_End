import {
  mockApplyStudent,
  mockGetStudentById,
  mockGetEntranceQuestions,
  mockSubmitEntranceTest,
  mockGetProblemChallenges,
  mockSubmitProblemAnswer,
  mockStaffLogin,
  mockGetStaffDashboard,
  mockGetStaffStudents,
  mockGetStaffStudentDetail
} from './mockDb';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('skillgate_staff_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Non-JSON response from server');
  }
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data.message || `HTTP Error ${response.status}`;
    throw new Error(errorMsg);
  }
  return data;
}

// Student APIs
export async function applyStudent(payload) {
  try {
    const res = await fetch(`${API_BASE}/students/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable or error occurred. Using client storage fallback:', err.message);
    return mockApplyStudent(payload);
  }
}

export async function getStudentById(id) {
  try {
    const res = await fetch(`${API_BASE}/students/${id}`);
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable. Using client storage fallback:', err.message);
    return mockGetStudentById(id);
  }
}

// Entrance APIs
export async function getEntranceQuestions() {
  try {
    const res = await fetch(`${API_BASE}/entrance/questions`);
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable. Using client storage fallback:', err.message);
    return mockGetEntranceQuestions();
  }
}

export async function submitEntranceTest(payload) {
  try {
    const res = await fetch(`${API_BASE}/entrance/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable. Using client storage fallback:', err.message);
    return mockSubmitEntranceTest(payload);
  }
}

// Problem APIs
export async function getProblemChallenges() {
  try {
    const res = await fetch(`${API_BASE}/problems`);
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable. Using client storage fallback:', err.message);
    return mockGetProblemChallenges();
  }
}

export async function submitProblemAnswer(payload) {
  try {
    const res = await fetch(`${API_BASE}/problems/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable. Using client storage fallback:', err.message);
    return mockSubmitProblemAnswer(payload);
  }
}

// Staff APIs
export async function staffLogin(payload) {
  try {
    const res = await fetch(`${API_BASE}/staff/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable. Using client storage fallback:', err.message);
    return mockStaffLogin(payload);
  }
}

export async function getStaffDashboard() {
  try {
    const res = await fetch(`${API_BASE}/staff/dashboard`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable. Using client storage fallback:', err.message);
    return mockGetStaffDashboard();
  }
}

export async function getStaffStudents(search = '', course = '') {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (course) params.append('course', course);

    const res = await fetch(`${API_BASE}/staff/students?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable. Using client storage fallback:', err.message);
    return mockGetStaffStudents(search, course);
  }
}

export async function getStaffStudentDetail(id) {
  try {
    const res = await fetch(`${API_BASE}/staff/students/${id}`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  } catch (err) {
    console.warn('[SkillGate] Backend not reachable. Using client storage fallback:', err.message);
    return mockGetStaffStudentDetail(id);
  }
}

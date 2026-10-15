// In-browser mock database engine for standalone Vercel / GitHub Pages deployment
// Ensures the frontend works 100% interactively even without an active backend server.

const STORAGE_KEY = 'skillgate_browser_db';

const defaultSeed = {
  staff: [
    { id: 1, username: 'admin', email: 'admin@skillgate.edu', password: 'admin123' }
  ],
  entrance_questions: [
    {
      id: 1,
      question: 'What comes next in the number sequence: 3, 6, 12, 24, ?',
      option_a: '36', option_b: '48', option_c: '42', option_d: '54',
      correct_answer: 'B'
    },
    {
      id: 2,
      question: 'If all Roses are Flowers and some Flowers fade quickly, which statement MUST be true?',
      option_a: 'All roses fade quickly', option_b: 'Some roses may fade quickly', option_c: 'No roses fade quickly', option_d: 'Flowers do not fade',
      correct_answer: 'B'
    },
    {
      id: 3,
      question: 'A car travels 180 km in 3 hours. What is its average speed in km/h?',
      option_a: '50 km/h', option_b: '60 km/h', option_c: '70 km/h', option_d: '80 km/h',
      correct_answer: 'B'
    },
    {
      id: 4,
      question: 'Which number replaces the question mark: 5, 10, 20, 35, 55, ?',
      option_a: '75', option_b: '80', option_c: '85', option_d: '90',
      correct_answer: 'B'
    },
    {
      id: 5,
      question: 'If CODE is written as DPEF, how is GATE written in the same code?',
      option_a: 'HBUF', option_b: 'HCVF', option_c: 'GDUF', option_d: 'HBUG',
      correct_answer: 'A'
    },
    {
      id: 6,
      question: 'What is 15% of 240?',
      option_a: '32', option_b: '36', option_c: '40', option_d: '44',
      correct_answer: 'B'
    },
    {
      id: 7,
      question: 'In a class of 40 students, 60% are females. How many male students are in the class?',
      option_a: '14', option_b: '16', option_c: '18', option_d: '20',
      correct_answer: 'B'
    },
    {
      id: 8,
      question: 'Which data structure operates on a First-In, First-Out (FIFO) basis?',
      option_a: 'Stack', option_b: 'Queue', option_c: 'Tree', option_d: 'Graph',
      correct_answer: 'B'
    },
    {
      id: 9,
      question: 'Evaluate the logical expression: (TRUE AND FALSE) OR (NOT FALSE)',
      option_a: 'TRUE', option_b: 'FALSE', option_c: 'NULL', option_d: 'UNDEFINED',
      correct_answer: 'A'
    },
    {
      id: 10,
      question: 'What is the remainder when 47 is divided by 5?',
      option_a: '1', option_b: '2', option_c: '3', option_d: '4',
      correct_answer: 'B'
    }
  ],
  problem_challenges: [
    { id: 1, question: 'Find the missing number in the sequence: 2, 4, 6, 8, ?', correct_answer: '10' },
    { id: 2, question: 'What is the output of 3 + 4 * 2 in standard mathematical precedence?', correct_answer: '11' },
    { id: 3, question: 'Complete the pattern: A, C, E, G, ?', correct_answer: 'I' },
    { id: 4, question: 'If a train leaves Station A at 10:00 AM traveling at 60 mph, how many miles will it travel by 12:30 PM?', correct_answer: '150' }
  ],
  students: [
    {
      id: 1,
      application_id: 'SG-2026-1001',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      phone: '9876543210',
      course_interest: 'Computer Science & Engineering',
      college: 'National Institute of Tech',
      age: 20,
      created_at: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 2,
      application_id: 'SG-2026-1002',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '9876543211',
      course_interest: 'Artificial Intelligence & Data Science',
      college: 'City Engineering College',
      age: 19,
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  entrance_results: [
    { id: 1, student_id: 1, score: 8, total_questions: 10, percentage: 80.0, completed_at: new Date(Date.now() - 172800000).toISOString() },
    { id: 2, student_id: 2, score: 9, total_questions: 10, percentage: 90.0, completed_at: new Date(Date.now() - 86400000).toISOString() }
  ],
  problem_results: [
    { id: 1, student_id: 1, challenge_id: 1, submitted_answer: '10', is_correct: 1, submitted_at: new Date(Date.now() - 172800000).toISOString() },
    { id: 2, student_id: 1, challenge_id: 2, submitted_answer: '11', is_correct: 1, submitted_at: new Date(Date.now() - 172800000).toISOString() },
    { id: 3, student_id: 2, challenge_id: 1, submitted_answer: '10', is_correct: 1, submitted_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 4, student_id: 2, challenge_id: 2, submitted_answer: '14', is_correct: 0, submitted_at: new Date(Date.now() - 86400000).toISOString() }
  ]
};

function getDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSeed));
      return defaultSeed;
    }
    return JSON.parse(raw);
  } catch {
    return defaultSeed;
  }
}

function saveDb(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving local mock DB:', err);
  }
}

// Student APIs
export function mockApplyStudent(payload) {
  const db = getDb();
  const { name, email, phone, course_interest, college, age } = payload;

  const existing = db.students.find(s => s.email.toLowerCase() === email.trim().toLowerCase());
  if (existing) {
    throw new Error('An application with this email address already exists. Please proceed to the entrance test.');
  }

  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const applicationId = `SG-2026-${randomCode}`;
  const newStudent = {
    id: db.students.length + 1,
    application_id: applicationId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    course_interest: course_interest.trim(),
    college: college.trim(),
    age: parseInt(age, 10),
    created_at: new Date().toISOString()
  };

  db.students.push(newStudent);
  saveDb(db);

  return {
    success: true,
    message: 'Application submitted successfully!',
    student: {
      id: newStudent.id,
      applicationId: newStudent.application_id,
      name: newStudent.name,
      email: newStudent.email,
      courseInterest: newStudent.course_interest
    }
  };
}

export function mockGetStudentById(id) {
  const db = getDb();
  const student = db.students.find(s => String(s.id) === String(id) || s.application_id === String(id));

  if (!student) {
    throw new Error('Student application record not found.');
  }

  const er = db.entrance_results.find(r => r.student_id === student.id);
  const prs = db.problem_results
    .filter(p => p.student_id === student.id)
    .map(p => {
      const ch = db.problem_challenges.find(c => c.id === p.challenge_id);
      return {
        id: p.id,
        submitted_answer: p.submitted_answer,
        is_correct: Boolean(p.is_correct),
        submitted_at: p.submitted_at,
        question: ch ? ch.question : 'Challenge'
      };
    });

  return {
    success: true,
    student: {
      id: student.id,
      applicationId: student.application_id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      courseInterest: student.course_interest,
      college: student.college,
      age: student.age,
      createdAt: student.created_at,
      entranceTest: er ? {
        score: er.score,
        total_questions: er.total_questions,
        percentage: er.percentage,
        completed_at: er.completed_at
      } : null,
      problemResults: prs
    }
  };
}

// Entrance APIs
export function mockGetEntranceQuestions() {
  const db = getDb();
  const sanitized = db.entrance_questions.map(q => ({
    id: q.id,
    question: q.question,
    options: {
      A: q.option_a,
      B: q.option_b,
      C: q.option_c,
      D: q.option_d
    }
  }));

  return {
    success: true,
    totalQuestions: sanitized.length,
    questions: sanitized
  };
}

export function mockSubmitEntranceTest(payload) {
  const db = getDb();
  const { student_id, answers } = payload;

  const student = db.students.find(s => String(s.id) === String(student_id) || s.application_id === String(student_id));
  if (!student) {
    throw new Error('Student application not found. Please apply first.');
  }

  let score = 0;
  const total = db.entrance_questions.length;
  const details = [];

  db.entrance_questions.forEach(q => {
    const selected = answers[q.id] ? String(answers[q.id]).toUpperCase() : null;
    const isCorrect = selected === q.correct_answer.toUpperCase();
    if (isCorrect) score++;
    details.push({ questionId: q.id, selectedOption: selected, isCorrect });
  });

  const percentage = total > 0 ? parseFloat(((score / total) * 100).toFixed(2)) : 0;

  const existingIdx = db.entrance_results.findIndex(r => r.student_id === student.id);
  if (existingIdx !== -1) {
    db.entrance_results[existingIdx] = {
      ...db.entrance_results[existingIdx],
      score,
      total_questions: total,
      percentage,
      completed_at: new Date().toISOString()
    };
  } else {
    db.entrance_results.push({
      id: db.entrance_results.length + 1,
      student_id: student.id,
      score,
      total_questions: total,
      percentage,
      completed_at: new Date().toISOString()
    });
  }

  saveDb(db);

  return {
    success: true,
    message: 'Entrance test evaluated successfully!',
    result: {
      studentId: student.id,
      applicationId: student.application_id,
      studentName: student.name,
      score,
      totalQuestions: total,
      percentage,
      details
    }
  };
}

// Problem APIs
export function mockGetProblemChallenges() {
  const db = getDb();
  return {
    success: true,
    challenges: db.problem_challenges.map(c => ({ id: c.id, question: c.question }))
  };
}

export function mockSubmitProblemAnswer(payload) {
  const db = getDb();
  const { student_id, challenge_id, submitted_answer } = payload;

  const student = db.students.find(s => String(s.id) === String(student_id) || s.application_id === String(student_id));
  if (!student) {
    throw new Error('Student application not found.');
  }

  const challenge = db.problem_challenges.find(c => c.id === Number(challenge_id));
  if (!challenge) {
    throw new Error('Problem challenge not found.');
  }

  const isCorrect = String(submitted_answer).trim().toLowerCase() === String(challenge.correct_answer).trim().toLowerCase();

  db.problem_results.push({
    id: db.problem_results.length + 1,
    student_id: student.id,
    challenge_id: challenge.id,
    submitted_answer: String(submitted_answer).trim(),
    is_correct: isCorrect ? 1 : 0,
    submitted_at: new Date().toISOString()
  });

  saveDb(db);

  return {
    success: true,
    message: isCorrect ? 'Correct answer! Great job.' : 'Incorrect answer. Try reviewing your logic.',
    isCorrect
  };
}

// Staff APIs
export function mockStaffLogin(payload) {
  const db = getDb();
  const identifier = (payload.username || payload.email || '').trim().toLowerCase();
  const password = payload.password;

  const staff = db.staff.find(s => s.username.toLowerCase() === identifier || s.email.toLowerCase() === identifier);
  if (!staff || staff.password !== password) {
    throw new Error('Invalid staff credentials. (Hint: admin@skillgate.edu / admin123)');
  }

  return {
    success: true,
    message: 'Staff authentication successful!',
    token: 'mock_jwt_token_for_vercel_demo',
    staff: {
      id: staff.id,
      username: staff.username,
      email: staff.email
    }
  };
}

export function mockGetStaffDashboard() {
  const db = getDb();
  const totalApplicants = db.students.length;

  const sumScore = db.entrance_results.reduce((acc, curr) => acc + curr.score, 0);
  const sumPct = db.entrance_results.reduce((acc, curr) => acc + curr.percentage, 0);
  const maxScore = db.entrance_results.length > 0 ? Math.max(...db.entrance_results.map(r => r.score)) : 0;
  const avgEntranceScore = db.entrance_results.length > 0 ? parseFloat((sumScore / db.entrance_results.length).toFixed(1)) : 0;
  const avgEntrancePercentage = db.entrance_results.length > 0 ? parseFloat((sumPct / db.entrance_results.length).toFixed(1)) : 0;

  const totalProblemsAttempted = db.problem_results.length;
  const totalCorrect = db.problem_results.filter(p => p.is_correct === 1).length;
  const problemSolvingAccuracy = totalProblemsAttempted > 0 ? parseFloat(((totalCorrect / totalProblemsAttempted) * 100).toFixed(1)) : 0;

  return {
    success: true,
    metrics: {
      totalApplicants,
      avgEntranceScore,
      avgEntrancePercentage,
      highestEntranceScore: maxScore,
      totalProblemsAttempted,
      totalProblemsCorrect: totalCorrect,
      problemSolvingAccuracy
    }
  };
}

export function mockGetStaffStudents(search = '', course = '') {
  const db = getDb();

  let list = db.students.map(s => {
    const er = db.entrance_results.find(r => r.student_id === s.id);
    const prs = db.problem_results.filter(p => p.student_id === s.id);
    const prsCorrect = prs.filter(p => p.is_correct === 1).length;

    return {
      id: s.id,
      applicationId: s.application_id,
      name: s.name,
      email: s.email,
      phone: s.phone,
      courseInterest: s.course_interest,
      college: s.college,
      age: s.age,
      applicationDate: s.created_at,
      entranceScore: er ? er.score : null,
      entranceTotal: er ? er.total_questions : 10,
      entrancePercentage: er ? er.percentage : null,
      problemsAttempted: prs.length,
      problemsCorrect: prsCorrect,
      problemResultStatus: prs.length === 0 ? 'Not Attempted' : `${prsCorrect}/${prs.length} Correct`
    };
  });

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.applicationId.toLowerCase().includes(q)
    );
  }

  if (course && course !== 'ALL') {
    list = list.filter(item => item.courseInterest.toLowerCase() === course.toLowerCase());
  }

  return {
    success: true,
    count: list.length,
    students: list.reverse()
  };
}

export function mockGetStaffStudentDetail(id) {
  const db = getDb();
  const student = db.students.find(s => String(s.id) === String(id) || s.application_id === String(id));
  if (!student) {
    throw new Error('Student record not found.');
  }

  const er = db.entrance_results.find(r => r.student_id === student.id);
  const prs = db.problem_results.filter(p => p.student_id === student.id).map(p => {
    const ch = db.problem_challenges.find(c => c.id === p.challenge_id);
    return {
      id: p.id,
      question: ch ? ch.question : 'Problem Challenge',
      submittedAnswer: p.submitted_answer,
      expectedAnswer: ch ? ch.correct_answer : '',
      isCorrect: Boolean(p.is_correct),
      submittedAt: p.submitted_at
    };
  });

  return {
    success: true,
    studentDetails: {
      id: student.id,
      applicationId: student.application_id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      courseInterest: student.course_interest,
      college: student.college,
      age: student.age,
      createdAt: student.created_at,
      entranceTest: er ? {
        score: er.score,
        totalQuestions: er.total_questions,
        percentage: er.percentage,
        completedAt: er.completed_at
      } : null,
      problemChallenges: prs
    }
  };
}

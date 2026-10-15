# 🎓 SkillGate – Smart Entrance & Learning Portal (Frontend)

SkillGate is a modern college entrance assessment, student application, and staff analytics portal built with React, Vite, and custom CSS.

## 🚀 Instant Deployment to Vercel

This repository is optimized for **1-click zero-config deployment on [Vercel](https://vercel.com/)**:

1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New Project** and import `TAMILSELVANM30/FSD-Skill_Gate_Project_Front_End`.
3. Select **Vite** as Framework (detected automatically).
4. Click **Deploy**.

> **Note on Standalone & Global Deployment**:
> This frontend is equipped with an in-browser storage engine (`localStorage`) as a fallback. When hosted on Vercel without a live backend, all pages (**Apply**, **10-question Aptitude Test**, **Logic Challenges**, and **Staff Portal with Analytics**) work interactively and immediately out of the box!
> If you deploy the backend REST API (e.g., on Render or Railway), simply add `VITE_API_BASE_URL=https://your-backend-url/api` in Vercel's Environment Variables.

---

## 🔑 Staff Demo Credentials
To explore the staff analytics dashboard:
* **Email / Username**: `admin@skillgate.edu` (or `admin`)
* **Password**: `admin123`

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation bar with responsive links
│   │   ├── Footer.jsx               # Portal footer
│   │   ├── MetricCard.jsx           # Dashboard analytics KPI widgets
│   │   └── StudentDetailModal.jsx   # Detailed applicant profile modal
│   ├── pages/
│   │   ├── Home.jsx                 # Platform intro & student/staff workflow
│   │   ├── Apply.jsx                # Student application form
│   │   ├── EntranceTest.jsx         # 10 MCQ aptitude assessment
│   │   ├── SolveProblem.jsx         # Logic & sequence challenges
│   │   ├── StaffLogin.jsx           # Staff authentication page
│   │   └── StaffDashboard.jsx       # Staff metrics, search, and student table
│   ├── services/
│   │   ├── api.js                   # Unified REST API service with fallback
│   │   └── mockDb.js                # In-browser engine for Vercel demo
│   ├── App.jsx                      # React Router routes
│   ├── index.css                    # Design system (Dark Slate theme, glassmorphism)
│   └── main.jsx
├── vercel.json                      # Vercel SPA rewrite configuration
└── vite.config.js
```

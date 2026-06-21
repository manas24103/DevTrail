# DevTrail

DevTrail is an all-in-one performance engine and unified dashboard for competitive programmers. It syncs your profiles across platforms like LeetCode and Codeforces, visualizes your growth with deep analytics, and provides a collaborative space to track questions and discuss algorithms.

---

## 🌟 Key Features

*   **Unified Rating System**: Aggregates your performance across LeetCode, Codeforces, and CodeChef into a single "Codolio Score."
*   **Comprehensive Analytics Dashboard**: Visualize your rating trajectory, problem-solving mastery (Easy/Medium/Hard breakdown), and activity heatmaps.
*   **Question Tracker & Discussions**: A dedicated forum to discuss competitive programming problems, share DP/Graph optimizations, and learn from peers.
*   **Contest Tracking**: Never miss an upcoming global coding event with the built-in event tracker.
*   **Modern Glassmorphism UI**: Beautiful, highly responsive frontend built with Tailwind CSS, featuring custom animations and interactive elements.
*   **Secure Authentication**: JWT-based authentication system with secure cookie management.

---

## 🏗️ Project Architecture

This project is structured as a full-stack application using the **MERN** stack (MongoDB, Express, React, Node.js).

### 🎨 Frontend (`/frontend`)
The frontend is a Single Page Application (SPA) built with Create React App.

*   **Framework**: React.js (v18)
*   **Routing**: `react-router-dom`
*   **Styling**: Tailwind CSS with custom fonts (`Outfit`, `Plus Jakarta Sans`) and CSS custom properties (`index.css`).
*   **State Management**: React Context API (`AuthContext`, `AuthModeContext`).
*   **Data Visualization**: `react-chartjs-2` and `chart.js` for rendering interactive graphs and doughnut charts.
*   **Icons**: `lucide-react`
*   **Core Pages**:
    *   `LandingPage`: Hero section, feature breakdown, and FAQ.
    *   `AuthPage`: Split-panel login/register views.
    *   `DashboardPage`: Authenticated user dashboard with detailed charts.
    *   `DiscussionsPage`: 3-column layout for browsing and posting threads.

### ⚙️ Backend (`/backend`)
The backend is a RESTful API built with Node.js and Express.

*   **Framework**: Express.js (ES Modules)
*   **Database**: MongoDB (via `mongoose`)
*   **Authentication**: `jsonwebtoken` (JWT) and `bcryptjs`
*   **Security & Middleware**: `cors`, `cookie-parser`, custom error handlers.
*   **API Routes**:
    *   `/api/v1/auth`: User registration, login, and profile management.
    *   `/api/v1/dashboard`: Fetches aggregated user statistics and heatmaps.
    *   `/api/v1/leetcode`: API wrappers/scrapers for LeetCode stats.
    *   `/api/v1/codeforces`: API wrappers for Codeforces stats.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   MongoDB instance (local or MongoDB Atlas)

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

Start the backend server in development mode:
```bash
npm run dev
```
*(The backend will run on `http://localhost:5000`)*

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm start
```
*(The frontend will automatically open in your browser at `http://localhost:3000`)*

---

## 🛠️ Scripts & Commands

### Backend
*   `npm start`: Runs the server using node.
*   `npm run dev`: Runs the server using nodemon for hot-reloading.

### Frontend
*   `npm start`: Starts the development server.
*   `npm run build`: Bundles the app into static files for production deployment.

---

## 📜 License
© 2026 DevTrail. All rights reserved.

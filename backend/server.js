import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { join, resolve, dirname } from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import routes
import leetcodeRoutes from './routes/leetcode.routes.js';
import codeforcesRoutes from './routes/codeforces.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';

// Database connection
import connectDB from './config/db.js';
connectDB();

const app = express();

// --- CORS CONFIGURATION ---
const corsOptions = {
  origin: [
    'https://dvmatrics.vercel.app', // Production frontend
    'http://localhost:3000'         // Local frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- API ROUTES ---
app.use('/api/leetcode', leetcodeRoutes);
app.use('/api/codeforces', codeforcesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// --- STATIC FILE SERVING IN PRODUCTION ---
if (process.env.NODE_ENV === 'production') {
  const staticPath = join(__dirname, '../frontend/build');
  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    res.sendFile(resolve(staticPath, 'index.html'));
  });
}

// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

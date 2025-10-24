import express, { json, urlencoded, static as expressStatic } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { join, resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import leetcodeRoutes from './routes/leetcode.routes.js';
import codeforcesRoutes from './routes/codeforces.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';

// Import database connection
import connectDB from './config/db.js';

// Connect to database
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'https://dvmatrics.vercel.app',  // Production frontend
    'http://localhost:3000',         // Local development
    'http://localhost:5173',         // Vite dev server
    'http://127.0.0.1:3000',         // Alternative localhost
    'http://localhost:5000'          // Local backend for testing
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'X-Requested-With',
    'X-Auth-Token'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
  maxAge: 86400,  // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS with the specified options
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Log CORS errors for debugging
app.use((err, req, res, next) => {
  if (err) {
    console.error('CORS Error:', err);
    if (err.name === 'CorsError') {
      return res.status(403).json({ 
        success: false, 
        error: 'Not allowed by CORS',
        details: err.message 
      });
    }
  }
  next();
});

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/leetcode', leetcodeRoutes);
app.use('/api/codeforces', codeforcesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  try {
    // Set static folder
    const staticPath = join(__dirname, '../frontend/build');
    app.use(express.static(staticPath));

    app.get('*', (req, res) => {
      res.sendFile(resolve(staticPath, 'index.html'));
    });
  } catch (error) {
    console.error('Error setting up static files:', error);
  }
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

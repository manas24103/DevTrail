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
const allowedOrigins = [
  'https://devtrail.vercel.app',   // Production frontend
  'http://localhost:3000',         // Local development
  'http://localhost:5173',         // Vite dev server
  'http://127.0.0.1:3000'          // Alternative localhost
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowed list
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      console.error('CORS Error - Blocked Origin:', origin);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,    // Required for cookies, authorization headers with HTTPS
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['set-cookie'],
  maxAge: 86400  // 24 hours
}));

// Handle preflight requests
app.options('*', cors());

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

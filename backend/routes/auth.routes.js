import { Router } from 'express';
const router = Router();
import { register } from '../controllers/registerController.js';
import { login } from '../controllers/login.Controller.js';
import { getCurrentUser } from '../controllers/auth.controller.js';
import { authenticate as protect } from '../middleware/auth.middleware.js';

// Debug middleware
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

router.post('/register', register);
router.post('/login', login);

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes are working!' });
});

// Get current user profile
router.get('/me', protect, getCurrentUser);

export default router;

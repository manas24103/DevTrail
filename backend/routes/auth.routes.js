import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.models';
import { register, login } from '../controllers/authController.js';
import authenticate  from '../middleware/auth.middleware';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d',
  });
};

module.exports = router;

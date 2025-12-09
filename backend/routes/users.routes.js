import { Router } from 'express';
import { authenticate as protect } from '../middleware/auth.middleware.js';
import User from '../models/User.models.js';

const router = Router();

// @route   GET /api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      user.codeforcesHandle = req.body.codeforcesHandle || user.codeforcesHandle;
      user.leetcodeHandle = req.body.leetcodeHandle || user.leetcodeHandle;
      
      if (req.body.preferences) {
        user.preferences = {
          ...user.preferences,
          ...req.body.preferences
        };
      }

      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        codeforcesHandle: updatedUser.codeforcesHandle,
        leetcodeHandle: updatedUser.leetcodeHandle,
        preferences: updatedUser.preferences
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    // This is a placeholder - you would fetch actual stats from the database
    // based on the user's activity and solved problems
    const stats = {
      totalProblemsSolved: 0,
      codeforces: {
        rating: 0,
        problemsSolved: 0,
        rank: ''
      },
      leetcode: {
        problemsSolved: 0,
        easy: 0,
        medium: 0,
        hard: 0
      },
      activity: []
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

import { Router } from 'express';
import { getUpcomingContests } from '../controllers/contests.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

// Apply JWT authentication to all contest routes
router.route('/').get(verifyJWT, getUpcomingContests);

export default router;

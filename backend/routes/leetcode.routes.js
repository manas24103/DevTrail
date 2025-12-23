import { Router } from 'express';
import {
    getLeetCodeDashboard
} from '../controllers/leetcode.Controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/stats').get(verifyJWT, getLeetCodeDashboard);

export default router;
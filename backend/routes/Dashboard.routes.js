import { Router } from 'express';
import { getDashboard } from '../controllers/dashboard.Controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/').get(verifyJWT, getDashboard);

export default router;
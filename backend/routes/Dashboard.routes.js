import { Router } from 'express';
import { getDashboard } from '../controllers/Dashboard.Controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(verifyJWT, getDashboard);

export default router;
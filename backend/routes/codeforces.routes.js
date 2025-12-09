import { Router } from 'express';
import codeforcesController from '../controllers/codeforces.Controller.js';

const router = Router();

// User data endpoints
router.get('/info/:handle', codeforcesController.getUserInfo);
router.get('/rating/:handle', codeforcesController.getUserRating);
router.get('/submissions/:handle', codeforcesController.getUserSubmissions);

export default router;

import { Router } from 'express';
import { getCodeforcesDashboard } from '../controllers/codeforces.Controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const codeforcesRouter = Router();

codeforcesRouter.route('/stats').get(verifyJWT, getCodeforcesDashboard);

export default codeforcesRouter;
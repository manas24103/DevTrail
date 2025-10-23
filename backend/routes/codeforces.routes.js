import { Router } from 'express';
const router = Router();
import codeforcesController from '../controllers/codeforces.Controller.js';

router.get('/:username', codeforcesController.getCodeforcesData);
router.get('/rateLimit', codeforcesController.checkRateLimit);
router.get('/generateApiSignature', codeforcesController.generateApiSignature);
export default router;

import { Router } from 'express';
const router = Router();
import { getCodeforcesData } from '../controllers/codeforces.Controller';

router.get('/:username', getCodeforcesData);
router.get('/rateLimit', checkRateLimit);
router.get('/generateApiSignature', generateApiSignature);
export default router;

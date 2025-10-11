import { Router } from 'express';
const router = Router();
import { getCodeforcesData } from '../controllers/codeforces.Controller';

router.get('/:username', getCodeforcesData);

export default router;

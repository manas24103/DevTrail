import { Router } from 'express';
const router = Router();
import leetcodeController from '../controllers/leetcode.Controller.js';
router.get('/:username', leetcodeController.getUserProfile);

export default router;

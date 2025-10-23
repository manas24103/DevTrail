import express from 'express';
import router from express.Router();
import { getLeetcodeData } from '../controllers/leetcodeController';

router.get('/:username', getLeetcodeData);

export default router;

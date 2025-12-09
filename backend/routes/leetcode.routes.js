import { Router } from 'express';
import leetcodeController from '../controllers/leetcode.Controller.js';

const router = Router();

// User profile & solved problems
router.get('/:username', leetcodeController.getUserProfile);
router.get('/:username/solved', leetcodeController.getUserSolvedProblems);
router.get('/:username/contest/history', leetcodeController.getUserContestHistory);
router.get('/:username/submissions', leetcodeController.getUserSubmissionCalendar);

// Daily challenge and problem data
router.get('/daily', leetcodeController.getDailyChallenge);
router.get('/problems', leetcodeController.getProblems);
router.get('/problem/:titleSlug', leetcodeController.getProblemBySlug);

export default router;

import express from "express";
import leetcodeController from "../controllers/leetcodeService.js";

const router = express.Router();

// GET /api/leetcode/user/:username
router.get("/user/:username", leetcodeController.getUserProfile);

// GET /api/leetcode/user/:username/solved
router.get("/user/:username/solved", leetcodeController.getUserSolvedProblems);

export default router;

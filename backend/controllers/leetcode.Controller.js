import { getLeetcodeStats } from "../services/leetcode.services.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getLeetCodeDashboard = asyncHandler(async (req, res) => {
  const { page = "1", limit = "5" } = req.query;
  const { leetcode: username } = req.user.handles;

  if (!username) {
    throw new ApiError(400, "LeetCode handle not linked");
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const { stats, recentSolved } =
    await getLeetcodeStats(req.user._id, username);

  const safeRecentSolved = Array.isArray(recentSolved) ? recentSolved : [];
  const start = (pageNum - 1) * limitNum;

  return res.status(200).json(
    new ApiResponse(200, {
      stats,
      recentSolved: safeRecentSolved.slice(start, start + limitNum),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: safeRecentSolved.length,
      },
    })
  );
});
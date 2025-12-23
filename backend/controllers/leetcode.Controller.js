import { getLeetCodeStats } from "../services/leetcode.service.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const getLeetCodeDashboard = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { leetcode: username } = req.user.handles;

  if (!username) {
    throw new ApiError(400, "LeetCode handle not linked");
  }

  const { stats, recentSolved } =
    await getLeetCodeStats(req.user._id, username);

  const start = (page - 1) * limit;

  return res.json(
    new ApiResponse(200, {
      stats,
      recentSolved: recentSolved.slice(start, start + limit)
    })
  );
});

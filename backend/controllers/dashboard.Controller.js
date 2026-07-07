import { PlatformStats } from "../models/platformStats.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const stats = await PlatformStats.find({
    userId: req.user._id
  });

  // Only count verified platform stats in aggregation
  const verifiedStats = stats.filter(s => {
    if (s.platform === "leetcode") return !!req.user.handles?.lcVerified;
    if (s.platform === "codeforces") return !!req.user.handles?.cfVerified;
    return true;
  });

  // No verified stats yet
  if (!verifiedStats.length) {
    return res.json(
      new ApiResponse(200, {
        view: "all",
        totalSolved: 0,
        totalContests: 0,
        difficulty: { easy: 0, medium: 0, hard: 0 },
        platforms: {},
        handles: req.user.handles
      })
    );
  }

  let totalSolved = 0;
  let totalContests = 0;
  const difficulty = { easy: 0, medium: 0, hard: 0 };
  const platforms = {};

  for (const s of verifiedStats) {
    // total solved
    totalSolved += s.solvedCount;
    totalContests += (s.contestsCount || 0);

    // overall difficulty
    difficulty.easy += s.difficulty.easy;
    difficulty.medium += s.difficulty.medium;
    difficulty.hard += s.difficulty.hard;

    // platform-wise count
    platforms[s.platform] = {
      solvedCount: s.solvedCount
    };
  }

  return res.status(200).json(
    new ApiResponse(200, {
      view: "all",
      totalSolved,
      totalContests,
      difficulty,
      platforms,
      handles: req.user.handles
    })
  );
});

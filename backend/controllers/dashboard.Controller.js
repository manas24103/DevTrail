import { PlatformStats } from "../models/platformStats.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const stats = await PlatformStats.find({
    userId: req.user._id
  });

  // No stats yet
  if (!stats.length) {
    return res.json(
      new ApiResponse(200, {
        view: "all",
        totalSolved: 0,
        difficulty: { easy: 0, medium: 0, hard: 0 },
        platforms: {}
      })
    );
  }

  let totalSolved = 0;
  const difficulty = { easy: 0, medium: 0, hard: 0 };
  const platforms = {};

  for (const s of stats) {
    // total solved
    totalSolved += s.solvedCount;

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
      difficulty,
      platforms
    })
  );
});

import { getCodeforcesStats } from "../services/codeforces.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const getCodeforcesDashboard = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { codeforces: handle } = req.user.handles;

  if (!handle) {
    throw new ApiError(400, "Codeforces handle not linked");
  }

  const { stats, recentSolved } =
    await getCodeforcesStats(req.user._id, handle);

  const start = (page - 1) * limit;
  const paginatedRecent = recentSolved.slice(start, start + limit);

  return res.json(
    new ApiResponse(200, {
      stats,
      recentSolved: paginatedRecent,
      page,
      limit
    })
  );
});

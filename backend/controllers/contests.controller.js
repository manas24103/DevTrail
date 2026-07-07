import { Contest } from "../models/Contest.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Helper to generate upcoming LeetCode contests dynamically
const getUpcomingLeetCodeContests = () => {
  const contests = [];
  const now = new Date();
  
  // LeetCode Weekly occurs every Sunday at 8:00 AM IST (02:30 UTC)
  for (let i = 0; i < 4; i++) {
    const date = new Date();
    // Days until next Sunday
    const daysUntilSunday = (7 - date.getDay()) % 7;
    date.setDate(date.getDate() + daysUntilSunday + (i * 7));
    date.setHours(8, 0, 0, 0);

    if (date > now) {
      // Find approximate contest number. E.g., Week of July 2026 is around Weekly 450
      const weekCount = Math.floor((date.getTime() - new Date("2024-01-01").getTime()) / (7 * 24 * 60 * 60 * 1000));
      const contestNum = 380 + weekCount;

      contests.push({
        name: `LeetCode Weekly Contest ${contestNum}`,
        platform: 'LEETCODE',
        startTime: date,
        duration: '1 hr 30 mins',
        link: 'https://leetcode.com/contest'
      });
    }
  }

  // LeetCode Biweekly occurs every alternate Saturday at 8:00 PM IST (14:30 UTC)
  for (let i = 0; i < 2; i++) {
    const date = new Date();
    // Days until Saturday
    const daysUntilSaturday = (6 - date.getDay()) % 7;
    date.setDate(date.getDate() + daysUntilSaturday + (i * 14));
    date.setHours(20, 0, 0, 0);

    if (date > now) {
      const weekCount = Math.floor((date.getTime() - new Date("2024-01-01").getTime()) / (14 * 24 * 60 * 60 * 1000));
      const contestNum = 120 + weekCount;

      contests.push({
        name: `LeetCode Biweekly Contest ${contestNum}`,
        platform: 'LEETCODE',
        startTime: date,
        duration: '1 hr 30 mins',
        link: 'https://leetcode.com/contest'
      });
    }
  }

  return contests;
};

// Fetch live upcoming contests from databases or external APIs
export const getUpcomingContests = asyncHandler(async (req, res) => {
  const now = new Date();

  // Try to query Codeforces API for live data
  let codeforcesContests = [];
  try {
    const cfRes = await fetch("https://codeforces.com/api/contest.list");
    const cfData = await cfRes.json();
    
    if (cfData.status === "OK" && Array.isArray(cfData.result)) {
      codeforcesContests = cfData.result
        .filter(c => c.phase === "BEFORE") // upcoming contests
        .map(c => ({
          name: c.name,
          platform: 'CODEFORCES',
          startTime: new Date(c.startTimeSeconds * 1000),
          duration: `${Math.floor(c.durationSeconds / 3600)} hrs`,
          link: 'https://codeforces.com/contests'
        }));
    }
  } catch (err) {
    console.error("Failed to fetch live Codeforces contests:", err);
  }

  // Get calculated LeetCode contests
  const leetcodeContests = getUpcomingLeetCodeContests();

  // Combine and sort by start time
  const mergedContests = [...codeforcesContests, ...leetcodeContests]
    .sort((a, b) => a.startTime - b.startTime);

  // Cache/persist to the database for archival/internal records
  for (const c of mergedContests) {
    await Contest.findOneAndUpdate(
      { name: c.name, platform: c.platform },
      { startTime: c.startTime, duration: c.duration, link: c.link },
      { upsert: true, new: true }
    );
  }

  // Retrieve upcoming list from cache to guarantee Mongoose id format
  const activeContests = await Contest.find({
    startTime: { $gt: now }
  }).sort({ startTime: 1 });

  return res.status(200).json(
    new ApiResponse(200, activeContests)
  );
});

import { PlatformStats } from "../models/platformstats.js";
import { cfRequest } from "../utils/cfClient.js";

const mapCfDifficulty = (rating) => {
  if (!rating) return null;
  if (rating <= 1000) return "easy";
  if (rating <= 1600) return "medium";
  return "hard";
};
export const getCodeforcesStats = async (userId, handle) => {
  // 1️⃣ Check cache
  const cached = await PlatformStats.findOne({
    userId,
    platform: "codeforces"
  });

  if (cached && Date.now() - cached.lastUpdated < 6 * 60 * 60 * 1000) {
    return { stats: cached, recentSolved: [] };
  }

  // 2️⃣ Fetch fresh data
  const [userInfo] = await cfRequest("/user.info", { handles: handle });
  const submissions = await cfRequest("/user.status", { handle });

  // 3️⃣ Compute stats
  const solvedSet = new Set();
  const difficulty = { easy: 0, medium: 0, hard: 0 };
  const recentSolved = [];

  for (const sub of submissions) {
    if (sub.verdict !== "OK") continue;

    const pid = `${sub.problem.contestId}${sub.problem.index}`;
    if (solvedSet.has(pid)) continue;

    solvedSet.add(pid);

    const bucket = mapCfDifficulty(sub.problem.rating);
    if (bucket) difficulty[bucket]++;

    if (recentSolved.length < 10) {
      recentSolved.push({
        name: sub.problem.name,
        rating: sub.problem.rating,
        url: `https://codeforces.com/problemset/problem/${sub.problem.contestId}/${sub.problem.index}`,
        solvedAt: sub.creationTimeSeconds * 1000
      });
    }
  }

  // 4️⃣ Save to DB (cache)
  const stats = await PlatformStats.findOneAndUpdate(
    { userId, platform: "codeforces" },
    {
      rating: userInfo.rating || 0,
      rank: userInfo.rank || "",
      solvedCount: solvedSet.size,
      difficulty,
      status: "success",
      lastUpdated: new Date()
    },
    { upsert: true, new: true }
  );

  return { stats, recentSolved };
};

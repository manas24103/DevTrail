import { PlatformStats } from "../models/platformStats.js";
import { leetcodeRequest } from "../utils/leetcodeClient.js";
import { USER_CONTEST_RANKING_INFO_QUERY, USER_QUESTION_PROGRESS_QUERY , RECENT_AC_SUBMISSIONS_QUERY} from "../utils/GQLQueries.js";

export const getLeetcodeStats = async (userId, username,forceRefresh=false) => {
  // 1️⃣ Check cache (6 hours)
  const cached = await PlatformStats.findOne({
    userId,
    platform: "leetcode",
  });

  if (
    !forceRefresh &&
    cached &&
    cached.lastUpdated &&
    Date.now() - cached.lastUpdated.getTime() < 6 * 60 * 60 * 1000
  ) {
    return {
      stats: cached,
      recentSolved: [],
    };
  }

   // 2️⃣ Fetch difficulty stats
  const ProgressData = await leetcodeRequest(
    USER_QUESTION_PROGRESS_QUERY,
    { userSlug: username }
  );

const accepted =
    ProgressData?.userProfileUserQuestionProgressV2?.numAcceptedQuestions || [];

let solvedCount = 0;
let difficulty = { easy: 0, medium: 0, hard: 0 };

for(const item of accepted){
    solvedCount+=item.count;
    
    if (item.difficulty === "EASY") difficulty.easy = item.count;
    if (item.difficulty === "MEDIUM") difficulty.medium = item.count;
    if (item.difficulty === "HARD") difficulty.hard = item.count;
}

// 3️⃣ Contest rating data
const contestData = await leetcodeRequest(
    USER_CONTEST_RANKING_INFO_QUERY,
    { username }
);
const rating = contestData.userContestRanking?.rating || 0;
const globalRanking = contestData.userContestRanking?.globalRanking || 0;

  // 4️⃣ Recent accepted submissions
const recentData = await leetcodeRequest(
    RECENT_AC_SUBMISSIONS_QUERY,
    { username, limit: 10 }
);
const recentSolved =
    recentData?.recentAcSubmissionList?.map(sub => ({
        title :sub.title,
        slug: sub.titleSlug,
        url: `https://leetcode.com/problems/${sub.titleSlug}`,
        solvedAt: new Date(Number(sub.timestamp) * 1000),
    })) || [];

  // 5️⃣ Store / update platform stats
  const stats = await PlatformStats.findOneAndUpdate(
    {
      userId,
      platform: "leetcode",
    },
    {
      solvedCount,
      difficulty,
      rating: rating,
      rank: globalRanking,
      status: "success",
      lastUpdated: new Date(),
    },
    {
      new: true,
      upsert: true,
    }
  );

  // 6️⃣ Return normalized data
  return {
    stats,
    recentSolved,
  };
};

import axios from "axios";

const BASE_URL = "https://codeforces.com/api";

const cfClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10s
});

// GET /api/codeforces/user/:handle
const getUserInfo = async (req, res) => {

  try {
    const { handle } = req.params;
    if (!handle) {
      return res.status(400).json({ error: 'Codeforces handle is required' });
    }

    const result = await makeRequest("/user.info", { handles: handle });
    
    if (!result || !result[0]) {
      return res.status(404).json({ message: "User not found on Codeforces" });
    }
    
    // Extract and format the user data
    const userData = result[0];
    console.log('[Codeforces] Sending response with user data');
    
    // Get user submissions to count solved problems
    const submissions = await makeRequest("/user.status", { handle });
    const solvedProblems = new Set();
    
    if (submissions && Array.isArray(submissions)) {
      submissions.forEach(submission => {
        if (submission.verdict === 'OK' && submission.problem && submission.problem.contestId) {
          const problemId = `${submission.problem.contestId}${submission.problem.index}`;
          solvedProblems.add(problemId);
        }
      });
    }
    
    res.json({
      handle: userData.handle,
      rating: userData.rating || 0,
      maxRating: userData.maxRating || 0,
      rank: userData.rank || 'unrated',
      maxRank: userData.maxRank || 'unrated',
      contribution: userData.contribution || 0,
      friendOfCount: userData.friendOfCount || 0,
      titlePhoto: userData.titlePhoto || '',
      avatar: userData.avatar || '',
      registrationTimeSeconds: userData.registrationTimeSeconds || 0,
      lastOnlineTimeSeconds: userData.lastOnlineTimeSeconds || 0,
      solvedCount: solvedProblems.size,
      easySolved: 0, // These would need to be calculated based on problem ratings
      mediumSolved: 0, // You can add logic to categorize problems by difficulty
      hardSolved: 0   // based on their ratings if needed
    });
    
  } catch (error) {
    console.error('[Codeforces] Error in getUserInfo:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to fetch user info from Codeforces',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// GET /api/codeforces/rating/:handle
const getUserRating = async (req, res) => {
  try {
    const { handle } = req.params;
    if (!handle) {
      return res.status(400).json({ message: "Handle required" });
    }

    const result = await makeRequest("/user.rating", { handle });
    res.json(result); // array of RatingChange
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/codeforces/submissions/:handle?count=50
const getUserSubmissions = async (req, res) => {
  try {
    const { handle } = req.params;
    const { count = 50 } = req.query;

    if (!handle) {
      return res.status(400).json({ message: "Handle required" });
    }

    const result = await makeRequest("/user.status", {
      handle,
      from: 1,
      count: parseInt(count, 10),
    });

    res.json(result); // array of Submission
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getUserInfo,
  getUserRating,
  getUserSubmissions
};

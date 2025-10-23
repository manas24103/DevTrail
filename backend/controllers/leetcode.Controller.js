import axios from 'axios';
import { RateLimiter } from 'limiter';

// Base URL for the alfa-leetcode-api
const BASE_URL = 'https://alfa-leetcode-api.onrender.com';

// Rate limiting: 10 requests per minute (LeetCode has rate limits)
const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute',
  fireImmediately: true
});

// Helper function to make API requests with rate limiting and error handling
const makeRequest = async (endpoint, params = {}) => {
  try {
    // Wait for rate limiter
    await new Promise(resolve => limiter.removeTokens(1, resolve));
    
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params,
      timeout: 10000, // 10 second timeout
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('LeetCode API request failed:', error.message);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to fetch data from LeetCode API'
    );
  }
};

// Get user profile data
const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Username is required' 
      });
    }

    const data = await makeRequest(`/${username}`);
    res.json({
      status: 'success',
      data
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// Get user's solved problems
const getUserSolvedProblems = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Username is required' 
      });
    }

    const data = await makeRequest(`/${username}/solved`);
    res.json({
      status: 'success',
      data
    });
  } catch (error) {
    console.error('Error in getUserSolvedProblems:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// Get user's contest history
const getUserContestHistory = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Username is required' 
      });
    }

    const data = await makeRequest(`/${username}/contest/history`);
    res.json({
      status: 'success',
      data
    });
  } catch (error) {
    console.error('Error in getUserContestHistory:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// Get daily challenge
const getDailyChallenge = async (req, res) => {
  try {
    const data = await makeRequest('/daily');
    res.json({
      status: 'success',
      data
    });
  } catch (error) {
    console.error('Error in getDailyChallenge:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// Get problems with filters
const getProblems = async (req, res) => {
  try {
    const { difficulty, tags, limit = 10, skip = 0 } = req.query;
    const params = {};
    
    if (difficulty) params.difficulty = difficulty.toUpperCase();
    if (tags) params.tags = tags;
    if (limit) params.limit = parseInt(limit);
    if (skip) params.skip = parseInt(skip);

    const data = await makeRequest('/problems', params);
    res.json({
      status: 'success',
      data
    });
  } catch (error) {
    console.error('Error in getProblems:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// Get user's submission calendar
const getUserSubmissionCalendar = async (req, res) => {
  try {
    const { username } = req.params;
    const { year = new Date().getFullYear() } = req.query;
    
    if (!username) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Username is required' 
      });
    }

    const data = await makeRequest('/userProfileCalendar', { 
      username, 
      year 
    });
    
    res.json({
      status: 'success',
      data
    });
  } catch (error) {
    console.error('Error in getUserSubmissionCalendar:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// Get problem details by title slug
const getProblemBySlug = async (req, res) => {
  try {
    const { titleSlug } = req.params;
    if (!titleSlug) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Problem title slug is required' 
      });
    }

    const data = await makeRequest(`/select?titleSlug=${titleSlug}`);
    res.json({
      status: 'success',
      data
    });
  } catch (error) {
    console.error('Error in getProblemBySlug:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

export default {
  getUserProfile,
  getUserSolvedProblems,
  getUserContestHistory,
  getDailyChallenge,
  getProblems,
  getUserSubmissionCalendar,
  getProblemBySlug
};

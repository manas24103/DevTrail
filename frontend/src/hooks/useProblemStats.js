import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Cache for API responses
const cache = {
  leetCode: {},
  codeforces: {},
  lastUpdated: {}
};

// Maximum age for cached data in milliseconds (5 minutes)
const CACHE_MAX_AGE = 5 * 60 * 1000;

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to process LeetCode data
const processLeetCodeData = (profile, solved) => {
  if (!profile || !solved) return null;
  
  return {
    totalSolved: solved.solvedTotal || 0,
    easySolved: solved.solvedByDifficulty?.easy || 0,
    mediumSolved: solved.solvedByDifficulty?.medium || 0,
    hardSolved: solved.solvedByDifficulty?.hard || 0,
    ranking: profile.ranking || 0,
    rating: profile.rating || 0,
    username: profile.username || 'LeetCode User',
    recentActivity: [],
    avatar: profile.profile?.userAvatar || null,
    platform: 'LeetCode'
  };
};

// Helper function to process Codeforces data
const processCodeforcesData = (data) => {
  if (!data) return null;
  
  return {
    solvedCount: data.solvedCount || 0,
    easySolved: data.easySolved || 0,
    mediumSolved: data.mediumSolved || 0,
    hardSolved: data.hardSolved || 0,
    rank: data.rank || 0,
    rating: data.rating || 0,
    maxRating: data.maxRating || 0,
    maxRank: data.maxRank || 'unrated',
    recentSubmissions: [],
    avatar: data.avatar || null,
    platform: 'Codeforces',
    contribution: data.contribution || 0,
    friendOfCount: data.friendOfCount || 0
  };
};

// Helper function to fetch with retry
const fetchWithRetry = async (url, options = {}, retries = MAX_RETRIES) => {
  try {
    const response = await api.get(url, { ...options, signal: options.signal });
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying ${url}... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const useProblemStats = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalProblems: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    recentActivity: [],
    rank: 0,
    rating: 0,
    loading: true,
    error: null,
    lastUpdated: null,
    platformStats: {
      leetcode: null,
      codeforces: null
    }
  });

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchStats = useCallback(async () => {
    if (!isMounted.current) return;

    console.log('fetchStats called with currentUser:', currentUser);
    
    if ((!currentUser?.leetcodeHandle || !currentUser.leetcodeHandle.trim()) && 
        (!currentUser?.codeforcesHandle || !currentUser.codeforcesHandle.trim())) {
      console.log('No valid handles found, skipping fetch');
      setStats(prev => ({ ...prev, loading: false }));
      return;
    }

    console.log('Fetching coding platform stats for user');
    const controller = new AbortController();
    
    // Set a timeout for the entire operation
    const timeoutId = setTimeout(() => {
      console.warn('Request timed out after 30 seconds');
      controller.abort();
    }, 30000);

    try {
      setStats(prev => ({ 
        ...prev, 
        loading: true, 
        error: null,
        platformStats: {
          leetcode: prev.platformStats.leetcode ? { ...prev.platformStats.leetcode, loading: true } : null,
          codeforces: prev.platformStats.codeforces ? { ...prev.platformStats.codeforces, loading: true } : null
        }
      }));
      
      const now = Date.now();
      const leetcodeKey = currentUser.leetcodeHandle;
      const codeforcesKey = currentUser.codeforcesHandle;
      
      // Check cache first
      const useLeetCodeCache = cache.leetCode[leetcodeKey] && 
                             (now - (cache.lastUpdated.leetcode || 0)) < CACHE_MAX_AGE;
      const useCodeforcesCache = cache.codeforces[codeforcesKey] && 
                               (now - (cache.lastUpdated.codeforces || 0)) < CACHE_MAX_AGE;

      console.log('Cache status:', { useLeetCodeCache, useCodeforcesCache });

      const fetchPromises = [];
      
      // Fetch LeetCode data if not in cache or expired
      if (currentUser?.leetcodeHandle && !useLeetCodeCache) {
        fetchPromises.push(
          Promise.all([
            fetchWithRetry(`/leetcode/${currentUser.leetcodeHandle}`, { signal: controller.signal })
              .then(profile => {
                if (!isMounted.current) return null;
                cache.leetCode[leetcodeKey] = { profile, timestamp: Date.now() };
                return profile;
              })
              .catch(err => {
                console.error('Error fetching LeetCode profile:', err);
                return null;
              }),
            fetchWithRetry(`/leetcode/${currentUser.leetcodeHandle}/solved`, { signal: controller.signal })
              .then(solved => {
                if (!isMounted.current) return null;
                return solved;
              })
              .catch(err => {
                console.error('Error fetching LeetCode solved problems:', err);
                return null;
              })
          ])
        );
      } else if (currentUser?.leetcodeHandle) {
        // Use cached data
        fetchPromises.push(Promise.resolve([
          cache.leetCode[leetcodeKey].profile,
          cache.leetCode[leetcodeKey].solved
        ]));
      } else {
        fetchPromises.push(Promise.resolve([null, null]));
      }

      // Fetch Codeforces data if not in cache or expired
      if (currentUser?.codeforcesHandle && !useCodeforcesCache) {
        fetchPromises.push(
          fetchWithRetry(`/codeforces/info/${currentUser.codeforcesHandle}`, { signal: controller.signal })
            .then(data => {
              if (!isMounted.current) return null;
              cache.codeforces[codeforcesKey] = { ...data, timestamp: Date.now() };
              cache.lastUpdated.codeforces = Date.now();
              return data;
            })
            .catch(err => {
              console.error('Error fetching Codeforces data:', err);
              return null;
            })
        );
      } else if (currentUser?.codeforcesHandle) {
        // Use cached data
        fetchPromises.push(Promise.resolve(cache.codeforces[codeforcesKey]));
      } else {
        fetchPromises.push(Promise.resolve(null));
      }

      // Execute all fetches in parallel
      const [
        [leetCodeProfile, leetCodeSolved],
        codeforcesData
      ] = await Promise.all(fetchPromises);

      console.log('API responses:', {
        leetCodeProfile: !!leetCodeProfile,
        leetCodeSolved: !!leetCodeSolved,
        codeforcesData: !!codeforcesData
      });

      // Process the data
      const leetCodeStats = leetCodeProfile && leetCodeSolved 
        ? processLeetCodeData(leetCodeProfile, leetCodeSolved)
        : null;
        
      const codeforcesStats = codeforcesData
        ? processCodeforcesData(codeforcesData)
        : null;
        
      console.log('Processed stats:', { leetCodeStats, codeforcesStats });

      // Combine the stats
      const combinedStats = {
        totalProblems: (leetCodeStats?.totalSolved || 0) + (codeforcesStats?.solvedCount || 0),
        easy: (leetCodeStats?.easySolved || 0) + (codeforcesStats?.easySolved || 0),
        medium: (leetCodeStats?.mediumSolved || 0) + (codeforcesStats?.mediumSolved || 0),
        hard: (leetCodeStats?.hardSolved || 0) + (codeforcesStats?.hardSolved || 0),
        rank: leetCodeStats?.ranking || codeforcesStats?.rank || 0,
        rating: leetCodeStats?.rating || codeforcesStats?.rating || 0,
        recentActivity: []
      };

      setStats({
        ...combinedStats,
        loading: false,
        error: null
      });
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching stats:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error.response?.data?.message || 'Failed to fetch statistics'
        }));
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Return stats with refetch function (using refetch to match DashboardPage's expectation)
  return { ...stats, refetch: fetchStats };
};

export default useProblemStats;

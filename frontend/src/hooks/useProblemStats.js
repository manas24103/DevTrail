import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

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
    recentActivity: [] // Will be populated separately
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
    recentSubmissions: [] // Will be populated separately
  };
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
    error: null
  });

  const fetchStats = useCallback(async () => {
    console.log('fetchStats called with currentUser:', currentUser);
    
    if ((!currentUser?.leetcodeHandle || !currentUser.leetcodeHandle.trim()) && 
        (!currentUser?.codeforcesHandle || !currentUser.codeforcesHandle.trim())) {
      console.log('No valid handles found, skipping fetch');
      setStats(prev => ({ ...prev, loading: false }));
      return;
    }

    console.log('Fetching coding platform stats for user');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn('Request timed out after 20 seconds');
      controller.abort();
    }, 20000);

    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      
      console.log('Current user handles:', {
        leetcode: currentUser.leetcodeHandle,
        codeforces: currentUser.codeforcesHandle
      });

      console.log('Starting API calls with handles:', {
        leetcode: currentUser.leetcodeHandle,
        codeforces: currentUser.codeforcesHandle
      });

      const [leetCodeProfile, leetCodeSolved, codeforcesData] = await Promise.all([
        // Fetch LeetCode profile if username exists
        currentUser?.leetcodeHandle 
          ? api.get(`/leetcode/${currentUser.leetcodeHandle}`)
              .then(res => {
                console.log('LeetCode profile response:', res.data);
                return res.data;
              })
              .catch(err => {
                console.error('Error fetching LeetCode profile:', err.response?.data || err.message);
                return null;
              })
          : Promise.resolve(null),
          
        // Fetch LeetCode solved problems if username exists
        currentUser?.leetcodeHandle
          ? api.get(`/leetcode/${currentUser.leetcodeHandle}/solved`)
              .then(res => {
                console.log('LeetCode solved problems response:', res.data);
                return res.data;
              })
              .catch(err => {
                console.error('Error fetching LeetCode solved problems:', err.response?.data || err.message);
                return null;
              })
          : Promise.resolve(null),
          
        // Fetch Codeforces data if handle exists
        currentUser?.codeforcesHandle
          ? api.get(`/codeforces/info/${currentUser.codeforcesHandle}`)
              .then(res => {
                console.log('Codeforces API response:', res.data);
                return res.data;
              })
              .catch(err => {
                console.error('Error fetching Codeforces data:', err);
                return null;
              })
          : Promise.resolve(null)
      ]);

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

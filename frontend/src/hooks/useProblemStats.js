import { useState, useEffect, useCallback } from 'react';
import { leetcodeApi, codeforcesApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

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
    if (!currentUser) {
      setStats(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      
      // Fetch data from both LeetCode and Codeforces in parallel
      const [leetcodeData, codeforcesData] = await Promise.all([
        leetcodeApi.getStats().catch(err => {
          console.error('Error fetching LeetCode data:', err);
          return null;
        }),
        currentUser.codeforcesHandle 
          ? codeforcesApi.getStats(currentUser.codeforcesHandle).catch(err => {
              console.error('Error fetching Codeforces data:', err);
              return null;
            })
          : Promise.resolve(null)
      ]);

      // Process LeetCode data
      const leetCodeStats = leetcodeData?.data?.data || {};
      const codeforcesStats = codeforcesData?.data?.data || {};

      // Combine data from both platforms
      const combinedStats = {
        totalProblems: (leetCodeStats.totalSolved || 0) + (codeforcesStats.solvedCount || 0),
        easy: (leetCodeStats.easySolved || 0) + (codeforcesStats.easySolved || 0),
        medium: (leetCodeStats.mediumSolved || 0) + (codeforcesStats.mediumSolved || 0),
        hard: (leetCodeStats.hardSolved || 0) + (codeforcesStats.hardSolved || 0),
        rank: leetCodeStats.ranking || codeforcesStats.rank || 0,
        rating: leetCodeStats.rating || codeforcesStats.rating || 0,
      };

      // Get recent activity from both platforms
      const leetCodeActivity = leetCodeStats.recentActivity?.map(activity => ({
        ...activity,
        platform: 'LeetCode'
      })) || [];

      const codeforcesActivity = codeforcesStats.recentSubmissions?.map(submission => ({
        ...submission,
        platform: 'Codeforces'
      })) || [];

      // Combine and sort activities by date (newest first)
      const recentActivity = [...leetCodeActivity, ...codeforcesActivity]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);

      setStats({
        ...combinedStats,
        recentActivity,
        loading: false,
        error: null
      });
      
    } catch (error) {
      console.error('Error fetching problem stats:', error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Failed to load problem statistics'
      }));
    }
  }, [currentUser]);

  // Initial fetch and refetch when currentUser changes
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refetch = () => {
    fetchStats();
  };

  return { ...stats, refetch };
};

export default useProblemStats;

import { useState, useEffect } from 'react';
import { dashboardApi, leetcodeApi, codeforcesApi } from '../services/api';

// Custom hook to fetch and manage dashboard data
const useProblemStats = () => {
  const [stats, setStats] = useState({
    platformStats: {
      leetcode: null,
      codeforces: null
    },
    totalProblems: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard data
      const dashboardData = await dashboardApi.getDashboard();
      
      // Fetch LeetCode data if handle exists
      let leetcodeData = null;
      if (dashboardData.handles?.leetcode) {
        try {
          leetcodeData = await leetcodeApi.getDashboard();
        } catch (err) {
          console.error('Error fetching LeetCode data:', err);
        }
      }

      // Fetch Codeforces data if handle exists
      let codeforcesData = null;
      if (dashboardData.handles?.codeforces) {
        try {
          codeforcesData = await codeforcesApi.getDashboard();
        } catch (err) {
          console.error('Error fetching Codeforces data:', err);
        }
      }

      // Process and combine the data
      const processedData = {
        platformStats: {
          leetcode: leetcodeData?.stats || null,
          codeforces: codeforcesData?.stats || null,
        },
        totalProblems: (leetcodeData?.stats?.solvedCount || 0) + (codeforcesData?.stats?.solvedCount || 0),
        easy: (leetcodeData?.stats?.difficulty?.easy || 0) + (codeforcesData?.stats?.difficulty?.easy || 0),
        medium: (leetcodeData?.stats?.difficulty?.medium || 0) + (codeforcesData?.stats?.difficulty?.medium || 0),
        hard: (leetcodeData?.stats?.difficulty?.hard || 0) + (codeforcesData?.stats?.difficulty?.hard || 0),
        recentActivity: [
          ...(leetcodeData?.recentSolved || []).map(item => ({
            ...item,
            platform: 'LeetCode',
            timestamp: item.timestamp || new Date().toISOString()
          })),
          ...(codeforcesData?.recentSolved || []).map(item => ({
            ...item,
            platform: 'Codeforces',
            timestamp: item.timestamp || new Date().toISOString()
          }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      };

      setStats(processedData);
    } catch (err) {
      setError(err);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Function to refresh data
  const refreshData = () => {
    return fetchDashboardData();
  };

  return {
    stats,
    loading,
    error,
    refreshData
  };
};

export default useProblemStats;
import { useState, useEffect } from 'react';

export const useProblemStats = () => {
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

  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real app, we would fetch this data from the backend
      // const [statsResponse, activityResponse] = await Promise.all([
      //   problemsApi.getStats(),
      //   problemsApi.getRecentActivity()
      // ]);
      
      // Mock data for now
      const mockStats = {
        totalProblems: 42,
        easy: 20,
        medium: 18,
        hard: 4,
        rank: 1245,
        rating: 1650,
      };
      
      const mockActivity = [
        { id: 1, problem: 'Two Sum', platform: 'LeetCode', date: '2023-10-20', difficulty: 'Easy' },
        { id: 2, problem: 'Add Two Numbers', platform: 'LeetCode', date: '2023-10-19', difficulty: 'Medium' },
        { id: 3, problem: 'Longest Substring Without Repeating Characters', platform: 'LeetCode', date: '2023-10-18', difficulty: 'Medium' },
      ];
      
      setStats({
        ...mockStats,
        recentActivity: mockActivity,
        loading: false
      });
      
    } catch (error) {
      console.error('Error fetching problem stats:', error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Failed to load problem statistics'
      }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const refetch = () => {
    fetchStats();
  };

  return { ...stats, refetch };
};

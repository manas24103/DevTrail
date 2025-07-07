import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getCodeforcesData, getLeetcodeData } from '../services/api';
import PlatformCard from '../components/PlatformCard';
import Graph from '../components/Graph';

const Dashboard = () => {
  const { user } = useAuth();
  const [cfData, setCfData] = useState(null);
  const [lcData, setLcData] = useState(null);
  const [loading, setLoading] = useState({
    codeforces: false,
    leetcode: false,
  });
  const [username, setUsername] = useState({
    codeforces: user?.codeforcesHandle || 'tourist', // Default to user's handle or 'tourist'
    leetcode: user?.leetcodeHandle || 'example',
  });
  const [stats, setStats] = useState({
    totalProblems: 0,
    totalEasy: 0,
    totalMedium: 0,
    totalHard: 0,
  });

  // Update usernames when user data changes
  useEffect(() => {
    if (user) {
      setUsername(prev => ({
        codeforces: user.codeforcesHandle || prev.codeforces,
        leetcode: user.leetcodeHandle || prev.leetcode,
      }));
    }
  }, [user]);

  const fetchCodeforcesData = async (handle) => {
    setLoading(prev => ({ ...prev, codeforces: true }));
    try {
      const response = await getCodeforcesData(handle || username.codeforces);
      setCfData(response.data);
      updateStats('codeforces', response.data);
    } catch (error) {
      console.error('Error fetching Codeforces data:', error);
      setCfData({ error: 'Failed to fetch data' });
    } finally {
      setLoading(prev => ({ ...prev, codeforces: false }));
    }
  };

  const fetchLeetcodeData = async (handle) => {
    setLoading(prev => ({ ...prev, leetcode: true }));
    try {
      const response = await getLeetcodeData(handle || username.leetcode);
      setLcData(response.data);
      updateStats('leetcode', response.data);
    } catch (error) {
      console.error('Error fetching LeetCode data:', error);
      setLcData({ error: 'Failed to fetch data' });
    } finally {
      setLoading(prev => ({ ...prev, leetcode: false }));
    }
  };

  const updateStats = (platform, data) => {
    if (platform === 'codeforces' && data.rating) {
      setStats(prev => ({
        ...prev,
        codeforcesRating: data.rating,
        codeforcesRank: data.rank,
      }));
    } else if (platform === 'leetcode' && data.problemsSolved) {
      setStats(prev => ({
        ...prev,
        totalProblems: (prev.totalProblems || 0) + data.problemsSolved,
        leetCodeSolved: data.problemsSolved,
      }));
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (username.codeforces) {
      fetchCodeforcesData(username.codeforces);
    }
    if (username.leetcode) {
      fetchLeetcodeData(username.leetcode);
    }
  }, []);

  const handleSubmit = (platform) => (e) => {
    e.preventDefault();
    if (platform === 'codeforces') {
      fetchCodeforcesData(username.codeforces);
    } else if (platform === 'leetcode') {
      fetchLeetcodeData(username.leetcode);
    }
  };

  // Generate mock rating history for the graph
  const generateRatingHistory = (currentRating) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const labels = [];
    const values = [];
    
    // Generate data for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      labels.push(months[monthIndex]);
      // Generate a random rating within ±200 of the current rating
      values.push(Math.max(0, currentRating + Math.floor(Math.random() * 400) - 200));
    }
    
    return { labels, values };
  };

  const cfRatingHistory = cfData?.rating ? generateRatingHistory(cfData.rating) : null;

  return (
    <div className="dashboard">
      <h1>Welcome{user ? `, ${user.username}` : ''}!</h1>
      
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Problems Solved</h3>
          <p className="stat-number">{stats.totalProblems}</p>
        </div>
        {stats.codeforcesRating && (
          <div className="stat-card">
            <h3>Codeforces Rating</h3>
            <p className="stat-number">{stats.codeforcesRating}</p>
            <p className="stat-subtext">{stats.codeforcesRank}</p>
          </div>
        )}
        {stats.leetCodeSolved !== undefined && (
          <div className="stat-card">
            <h3>LeetCode Solved</h3>
            <p className="stat-number">{stats.leetCodeSolved}</p>
          </div>
        )}
      </div>
      
      <div className="search-forms">
        <form onSubmit={handleSubmit('codeforces')}>
          <input
            type="text"
            value={username.codeforces}
            onChange={(e) => setUsername(prev => ({ ...prev, codeforces: e.target.value }))}
            placeholder="Codeforces username"
          />
          <button type="submit" disabled={loading.codeforces}>
            {loading.codeforces ? 'Loading...' : 'Search'}
          </button>
        </form>

        <form onSubmit={handleSubmit('leetcode')}>
          <input
            type="text"
            value={username.leetcode}
            onChange={(e) => setUsername(prev => ({ ...prev, leetcode: e.target.value }))}
            placeholder="LeetCode username"
          />
          <button type="submit" disabled={loading.leetcode}>
            {loading.leetcode ? 'Loading...' : 'Search'}
          </button>
        </form>
      </div>

      <div className="platform-cards">
        <div className="card-container">
          <h2>Codeforces</h2>
          <PlatformCard
            title="Codeforces"
            data={cfData}
            loading={loading.codeforces}
          />
          {cfRatingHistory && (
            <Graph
              title="Rating History (Last 6 Months)"
              data={{
                labels: cfRatingHistory.labels,
                values: cfRatingHistory.values,
              }}
            />
          )}
        </div>

        <div className="card-container">
          <h2>LeetCode</h2>
          <PlatformCard
            title="LeetCode"
            data={lcData}
            loading={loading.leetcode}
          />
          {lcData && lcData.problemsSolved && (
            <div className="progress-bars">
              <div className="progress-bar">
                <div 
                  className="progress-fill easy" 
                  style={{ width: `${(lcData.easy / lcData.problemsSolved) * 100}%` }}
                ></div>
                <span>Easy: {lcData.easy}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill medium" 
                  style={{ width: `${(lcData.medium / lcData.problemsSolved) * 100}%` }}
                ></div>
                <span>Medium: {lcData.medium}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill hard" 
                  style={{ width: `${(lcData.hard / lcData.problemsSolved) * 100}%` }}
                ></div>
                <span>Hard: {lcData.hard}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

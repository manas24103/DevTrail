import React, { useState, useMemo } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import useProblemStats from '../hooks/useProblemStats';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler,
} from 'chart.js';
import { CheckCircle, Calendar, Trophy, TrendingUp, RefreshCw, Menu, Code2, BarChart3, Star } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Filler);

const DashboardPage = () => {
  const { stats, loading: isLoading, error, refreshData } = useProblemStats();
  const [refreshing, setRefreshing] = useState(false);
  const [chartTab, setChartTab] = useState('Rating');

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#f9fefc] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#f9fefc] flex items-center justify-center">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm max-w-md">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Error loading dashboard</h3>
            <p className="text-sm text-gray-500">{error.message}</p>
          </div>
        </div>
      </>
    );
  }

  return <DashboardContent stats={stats} refreshing={refreshing} onRefresh={handleRefresh} chartTab={chartTab} setChartTab={setChartTab} />;
};

const DashboardContent = ({ stats, refreshing, onRefresh, chartTab, setChartTab }) => {
  const { totalProblems = 0, easy = 0, medium = 0, hard = 0 } = stats || {};

  // Simulated data for the design
  const totalSolved = totalProblems || 1010;
  const activeDays = 348;
  const totalContests = 16;
  const mastery = 75;

  // Activity heatmap
  const heatmapCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < 364; i++) {
      cells.push(Math.floor(Math.random() * 5));
    }
    return cells;
  }, []);

  // Contest & Rating chart data
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [{
      label: 'Rating',
      data: [800, 950, 850, 1100, 900, 1200, 1050, 1400, 1718],
      backgroundColor: Array(9).fill(null).map((_, i) => {
        const intensity = 0.4 + (i / 9) * 0.6;
        return `rgba(249, 115, 22, ${intensity})`;
      }),
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  // Problems Solved donut
  const donutData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [easy || 450, medium || 420, hard || 140],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      borderWidth: 0,
      cutout: '72%',
    }],
  };

  // Contest performance line chart
  const lineChartData = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
    datasets: [{
      label: 'Rating',
      data: [1200, 1400, 1600, 1500, 1800, 2000, 2200],
      borderColor: '#0d9488',
      backgroundColor: 'rgba(13, 148, 136, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#0d9488',
    }],
  };

  const platforms = [
    { name: 'LeetCode', subtitle: 'Knight Rank', rating: stats?.platformStats?.leetcode?.rating || 2104, solved: stats?.platformStats?.leetcode?.totalSolved || 680, color: 'text-amber-600', bg: 'bg-amber-50', icon: <Code2 size={20} /> },
    { name: 'Codeforces', subtitle: 'Expert', rating: stats?.platformStats?.codeforces?.rating || 1642, solved: stats?.platformStats?.codeforces?.solvedCount || 210, color: 'text-blue-600', bg: 'bg-blue-50', icon: <BarChart3 size={20} /> },
    { name: 'CodeChef', subtitle: '4 Star', rating: 1822, solved: 120, color: 'text-purple-600', bg: 'bg-purple-50', icon: <Star size={20} /> },
  ];

  const contestPlatforms = [
    { name: 'LeetCode', rating: '1982', color: 'border-l-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Codeforces', rating: '1644', color: 'border-l-blue-500', bg: 'bg-blue-50' },
    { name: 'CodeChef', rating: '4★', color: 'border-l-orange-500', bg: 'bg-orange-50' },
    { name: 'GFG', rating: '4★', color: 'border-l-green-500', bg: 'bg-green-50' },
  ];

  const heatmapColors = ['bg-gray-100', 'bg-teal-100', 'bg-teal-200', 'bg-teal-400', 'bg-teal-600'];

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar onRefresh={onRefresh} refreshing={refreshing} />

        <main className="flex-1 bg-[#f9fefc] overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100"><Menu size={20} /></button>
                  <h1 className="text-2xl font-extrabold text-gray-900 font-outfit">Dashboard</h1>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                  <RefreshCw size={12} /> Last synced 2 hours ago
                </p>
              </div>
              <button className="px-5 py-2.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 glow-btn">
                <TrendingUp size={14} /> Keep your streak alive
              </button>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <CheckCircle size={24} className="text-teal-600" />, label: 'Total Questions Solved', value: totalSolved.toLocaleString(), bg: 'bg-teal-50' },
                { icon: <Calendar size={24} className="text-teal-600" />, label: 'Total Active Days', value: activeDays, bg: 'bg-teal-50' },
                { icon: <Trophy size={24} className="text-teal-600" />, label: 'Total Contests', value: totalContests, bg: 'bg-teal-50' },
              ].map(({ icon, label, value, bg }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-3`}>{icon}</div>
                  <p className="text-xs text-gray-400 font-semibold mb-1">{label}</p>
                  <p className="text-3xl font-black text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            {/* Activity Heatmap */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900 font-outfit">Activity Heatmap</h3>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold">
                  <span>Less</span>
                  <div className="flex gap-0.5">
                    {heatmapColors.map((c, i) => <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />)}
                  </div>
                  <span>More</span>
                </div>
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] justify-start overflow-x-auto pb-1">
                {heatmapCells.map((level, idx) => (
                  <div key={idx} className={`w-[14px] h-[14px] rounded-sm ${heatmapColors[level]} hover:scale-150 transition-transform cursor-pointer`} title={`Day ${idx + 1}`} />
                ))}
              </div>
            </div>

            {/* Contest & Rating + Problems Solved */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Contest & Rating */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 font-outfit">Contest & Rating</h3>
                    <p className="text-xs text-gray-400">Global Average Rating</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900">1718</p>
                    <p className="text-xs text-emerald-500 font-bold flex items-center justify-end gap-1"><TrendingUp size={12} /> +124 this month</p>
                  </div>
                </div>
                <div className="h-52 mt-4">
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true, maintainAspectRatio: false,
                      scales: {
                        x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 11 } } },
                        y: { beginAtZero: true, grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af', font: { size: 10 } } },
                      },
                      plugins: { legend: { display: false } },
                    }}
                  />
                </div>
              </div>

              {/* Problems Solved Donut */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4 font-outfit">Problems Solved</h3>
                <div className="relative h-44 flex items-center justify-center">
                  <Doughnut
                    data={donutData}
                    options={{
                      responsive: true, maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-teal-600">{mastery}%</span>
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Mastery</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { label: 'Easy', value: `${easy || 450}/500`, pct: ((easy || 450) / 500) * 100, color: 'bg-emerald-500' },
                    { label: 'Medium', value: `${medium || 420}/800`, pct: ((medium || 420) / 800) * 100, color: 'bg-amber-500' },
                    { label: 'Hard', value: `${hard || 140}/300`, pct: ((hard || 140) / 300) * 100, color: 'bg-red-500' },
                  ].map(({ label, value, pct, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-14 font-medium">{label}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 font-semibold w-16 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Platform Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {platforms.map(({ name, subtitle, rating, solved, color, bg, icon }) => (
                <div key={name} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{name}</h4>
                      <p className="text-[10px] text-gray-400">{subtitle}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Rating</p>
                      <p className="text-xl font-black text-gray-900">{rating.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Solved</p>
                      <p className="text-xl font-black text-gray-900">{solved}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contest Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 font-outfit">Contest Performance</h3>
                    <p className="text-xs text-gray-400">Rating trajectory across all platforms</p>
                  </div>
                  <div className="flex gap-1">
                    {['Rating', 'Rank'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setChartTab(tab)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          chartTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-48">
                  <Line
                    data={lineChartData}
                    options={{
                      responsive: true, maintainAspectRatio: false,
                      scales: {
                        x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
                        y: { grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af', font: { size: 10 } } },
                      },
                      plugins: { legend: { display: false } },
                    }}
                  />
                </div>
              </div>

              {/* Platform ratings sidebar */}
              <div className="lg:col-span-2 space-y-3">
                {contestPlatforms.map(({ name, rating, color, bg }) => (
                  <div key={name} className={`${bg} rounded-xl border border-gray-100 p-4 border-l-4 ${color} flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        {name === 'LeetCode' ? <Code2 size={14} className="text-amber-600" /> :
                         name === 'Codeforces' ? <BarChart3 size={14} className="text-blue-600" /> :
                         <Star size={14} className="text-orange-600" />}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{name}</span>
                    </div>
                    <span className="text-lg font-black text-gray-900">{rating}<span className="text-xs text-gray-400 font-normal ml-0.5">pts</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default DashboardPage;

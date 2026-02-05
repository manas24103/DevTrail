import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import useProblemStats from '../hooks/useProblemStats';
import Header from '../components/Header';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { TrendingUp, Award, Target, Zap } from 'lucide-react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const DashboardPage = () => {
  const { stats, loading: isLoading, error } = useProblemStats();
  
  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
          <div className="glass-card p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <div className="text-red-400 font-semibold">Error loading dashboard</div>
            <div className="text-slate-400 text-sm mt-2">{error.message}</div>
          </div>
        </div>
      </>
    );
  }

  return <DashboardStats stats={stats} isLoading={isLoading} />;
};

const DashboardStats = ({ stats, isLoading }) => {
  const {
    platformStats = { leetcode: null, codeforces: null },
    totalProblems = 0,
    easy = 0,
    medium = 0,
    hard = 0,
  } = stats || {};

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin-reverse" />
          </div>
        </div>
      </>
    );
  }

  const leetcodeSolved = platformStats?.leetcode?.totalSolved || 0;
  const cfSolved = platformStats?.codeforces?.solvedCount || 0;

  const hasDifficultyData = easy + medium + hard > 0;
  const hasPlatformData = leetcodeSolved > 0 || cfSolved > 0;

  const difficultyData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [easy, medium, hard],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const platformData = {
    labels: ['LeetCode', 'Codeforces'],
    datasets: [
      {
        label: 'Problems Solved',
        data: [leetcodeSolved, cfSolved],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 2,
        borderRadius: 12,
      },
    ],
  };

  const weakAreas = [
    { topic: 'Dynamic Programming', score: 62, icon: '🧩' },
    { topic: 'Graphs', score: 55, icon: '🕸️' },
    { topic: 'Greedy', score: 70, icon: '💰' },
    { topic: 'Math', score: 68, icon: '🔢' },
    { topic: 'Strings', score: 74, icon: '📝' },
    { topic: 'Arrays', score: 80, icon: '📊' },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow" />
        </div>

        {/* Grid Pattern */}
        <div 
          className="fixed inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
          {/* Header with Glass Effect */}
          <div className="glass-header p-6 md:p-8 animate-slide-down">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-slate-400 text-sm md:text-base">
                  Track your coding journey across platforms with real-time analytics
                </p>
              </div>
              <button className="glass-button group">
                <Zap className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
                <span>Sync Data</span>
              </button>
            </div>
          </div>

          {/* Enhanced Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              title="Total Solved"
              value={totalProblems}
              icon={<TrendingUp className="w-6 h-6" />}
              gradient="from-indigo-500 to-purple-500"
              delay="0.1s"
            />
            <StatCard
              title="Easy"
              value={easy}
              icon={<span className="text-2xl">✓</span>}
              gradient="from-emerald-500 to-green-500"
              delay="0.2s"
            />
            <StatCard
              title="Medium"
              value={medium}
              icon={<Award className="w-6 h-6" />}
              gradient="from-amber-500 to-orange-500"
              delay="0.3s"
            />
            <StatCard
              title="Hard"
              value={hard}
              icon={<Target className="w-6 h-6" />}
              gradient="from-rose-500 to-red-500"
              delay="0.4s"
            />
          </div>

          {/* Chart Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Difficulty Distribution */}
            <div className="glass-card animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="card-header">
                <div>
                  <h3 className="card-title">Difficulty Distribution</h3>
                  <p className="card-subtitle">
                    Your solved problems across difficulty levels
                  </p>
                </div>
                <div className="glass-badge">
                  <span className="pulse-dot" />
                  Live
                </div>
              </div>
              
              <div className="h-72 flex items-center justify-center p-4">
                {hasDifficultyData ? (
                  <Doughnut
                    data={difficultyData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            color: '#94a3b8',
                            font: { size: 12, weight: '600' },
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle',
                          },
                        },
                        tooltip: {
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          titleColor: '#fff',
                          bodyColor: '#cbd5e1',
                          borderColor: 'rgba(99, 102, 241, 0.5)',
                          borderWidth: 1,
                          padding: 12,
                          displayColors: true,
                          callbacks: {
                            label: (context) => {
                              const label = context.label || '';
                              const value = context.parsed || 0;
                              const total = context.dataset.data.reduce((a, b) => a + b, 0);
                              const percentage = ((value / total) * 100).toFixed(1);
                              return `${label}: ${value} (${percentage}%)`;
                            }
                          }
                        }
                      },
                      cutout: '70%',
                    }}
                  />
                ) : (
                  <EmptyState
                    icon="📊"
                    title="No data yet"
                    subtitle="Start solving problems to see your difficulty breakdown"
                  />
                )}
              </div>
            </div>

            {/* Platform Comparison */}
            <div className="glass-card animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="card-header">
                <div>
                  <h3 className="card-title">Platform Comparison</h3>
                  <p className="card-subtitle">
                    Compare progress across different platforms
                  </p>
                </div>
                <div className="glass-badge">
                  <span className="pulse-dot bg-purple-500" />
                  Active
                </div>
              </div>
              
              <div className="h-72 flex items-center justify-center p-4">
                {hasPlatformData ? (
                  <Bar
                    data={platformData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          grid: { display: false },
                          ticks: { color: '#94a3b8', font: { size: 12, weight: '600' } },
                        },
                        y: {
                          beginAtZero: true,
                          grid: { color: 'rgba(148, 163, 184, 0.1)' },
                          ticks: { color: '#94a3b8', font: { size: 11 } },
                        },
                      },
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          titleColor: '#fff',
                          bodyColor: '#cbd5e1',
                          borderColor: 'rgba(99, 102, 241, 0.5)',
                          borderWidth: 1,
                          padding: 12,
                        }
                      },
                    }}
                  />
                ) : (
                  <EmptyState
                    icon="🔗"
                    title="Connect platforms"
                    subtitle="Link your LeetCode and Codeforces accounts to see analytics"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Focus Areas - Enhanced Design */}
          <div className="glass-card animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="card-header mb-6">
              <div>
                <h3 className="card-title">Focus Areas</h3>
                <p className="card-subtitle">
                  Topics where you can level up your skills
                </p>
              </div>
              <div className="glass-badge">
                <span className="text-xs">6 Topics</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weakAreas.map(({ topic, score, icon }, index) => (
                <div
                  key={topic}
                  className="topic-card group"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="topic-icon">
                        {icon}
                      </div>
                      <span className="text-sm font-semibold text-slate-200">
                        {topic}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-400">
                        {score}%
                      </span>
                      <div className={`mastery-badge ${
                        score >= 75 ? 'bg-emerald-500/20 text-emerald-400' :
                        score >= 60 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-rose-500/20 text-rose-400'
                      }`}>
                        {score >= 75 ? 'Strong' : score >= 60 ? 'Good' : 'Weak'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ 
                        width: `${score}%`,
                        background: score >= 75 
                          ? 'linear-gradient(90deg, #10b981, #34d399)'
                          : score >= 60
                          ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                          : 'linear-gradient(90deg, #ef4444, #f87171)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;900&family=Sora:wght@300;400;500;600;700&display=swap');

          * {
            font-family: 'Sora', sans-serif;
          }

          .glass-header {
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }

          .glass-card {
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 24px;
            padding: 28px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
          }

          .glass-card:hover {
            border-color: rgba(99, 102, 241, 0.3);
            box-shadow: 0 12px 48px rgba(99, 102, 241, 0.2);
          }

          .glass-button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: rgba(99, 102, 241, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            color: #e0e7ff;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .glass-button:hover {
            background: rgba(99, 102, 241, 0.2);
            border-color: rgba(99, 102, 241, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
          }

          .glass-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            color: #c7d2fe;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .pulse-dot {
            width: 6px;
            height: 6px;
            background: #6366f1;
            border-radius: 50%;
            animation: pulse-dot 2s ease-in-out infinite;
          }

          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 24px;
          }

          .card-title {
            font-size: 18px;
            font-weight: 700;
            color: #f1f5f9;
            margin-bottom: 4px;
          }

          .card-subtitle {
            font-size: 13px;
            color: #94a3b8;
          }

          .topic-card {
            background: rgba(30, 41, 59, 0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 16px;
            padding: 20px;
            transition: all 0.3s ease;
            animation: fade-in-up 0.6s ease forwards;
            opacity: 0;
          }

          .topic-card:hover {
            background: rgba(30, 41, 59, 0.6);
            border-color: rgba(99, 102, 241, 0.3);
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          }

          .topic-icon {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 10px;
            font-size: 18px;
            transition: all 0.3s ease;
          }

          .topic-card:hover .topic-icon {
            background: rgba(99, 102, 241, 0.2);
            transform: scale(1.1) rotate(5deg);
          }

          .mastery-badge {
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .progress-container {
            width: 100%;
            height: 8px;
            background: rgba(30, 41, 59, 0.6);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
          }

          .progress-bar {
            height: 100%;
            border-radius: 8px;
            transition: width 1s ease;
            position: relative;
            box-shadow: 0 0 20px currentColor;
          }

          .progress-bar::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 2s infinite;
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(50px, -50px); }
          }

          @keyframes float-delayed {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-50px, 50px); }
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }

          @keyframes slide-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-float {
            animation: float 20s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 25s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          .animate-slide-down {
            animation: slide-down 0.6s ease forwards;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease forwards;
            opacity: 0;
          }

          .animate-spin-reverse {
            animation: spin 1s linear infinite reverse;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
};

const StatCard = ({ title, value, icon, gradient, delay }) => (
  <div 
    className="glass-card group cursor-pointer animate-fade-in-up opacity-0 hover:scale-[1.02]"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          {title}
        </p>
        <p className="text-3xl md:text-4xl font-bold text-white font-['Orbitron']">
          {value}
        </p>
      </div>
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-700/50">
      <div className="flex items-center gap-2 text-xs text-emerald-400">
        <TrendingUp className="w-3 h-3" />
        <span className="font-semibold">+12% from last week</span>
      </div>
    </div>
  </div>
);

const EmptyState = ({ icon, title, subtitle }) => (
  <div className="text-center max-w-xs mx-auto">
    <div className="text-6xl mb-4 opacity-50">{icon}</div>
    <p className="text-base font-semibold text-slate-300 mb-2">{title}</p>
    <p className="text-sm text-slate-500">{subtitle}</p>
  </div>
);

export default DashboardPage;

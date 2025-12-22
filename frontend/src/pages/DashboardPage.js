import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useProblemStats } from '../hooks/useProblemStats';
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
  
  // If there's an error, show an error message
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error loading dashboard data: {error.message}</div>
      </div>
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-200 border-t-indigo-500" />
      </div>
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
          'rgba(34, 197, 94, 0.9)',
          'rgba(245, 158, 11, 0.9)',
          'rgba(239, 68, 68, 0.9)',
        ],
        borderWidth: 0,
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
          'rgba(79, 70, 229, 0.9)',
          'rgba(59, 130, 246, 0.9)',
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const weakAreas = [
    { topic: 'Dynamic Programming', score: 62 },
    { topic: 'Graphs', score: 55 },
    { topic: 'Greedy', score: 70 },
    { topic: 'Math', score: 68 },
    { topic: 'Strings', score: 74 },
    { topic: 'Arrays', score: 80 },
  ];

  return (
    <section className="w-full bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Dashboard Overview
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              A quick snapshot of your coding journey across platforms.
            </p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <StatCard
            title="Total Problems Solved"
            value={totalProblems}
            icon="📊"
            accent="border-indigo-100 bg-indigo-50 text-indigo-600"
          />
          <StatCard
            title="Easy"
            value={easy}
            icon="✅"
            accent="border-emerald-100 bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Medium"
            value={medium}
            icon="⚠️"
            accent="border-amber-100 bg-amber-50 text-amber-600"
          />
          <StatCard
            title="Hard"
            value={hard}
            icon="🔥"
            accent="border-rose-100 bg-rose-50 text-rose-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Difficulty chart */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Difficulty Distribution
              </h3>
              <p className="text-sm text-slate-500">
                How your solved problems are spread across difficulty levels.
              </p>
            </div>
            <div className="h-64 flex items-center justify-center">
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
                          boxWidth: 12,
                          padding: 14,
                        },
                      },
                    },
                    cutout: '60%',
                  }}
                />
              ) : (
                <EmptyState
                  title="No problems solved yet"
                  subtitle="Start solving on LeetCode or Codeforces to see your difficulty breakdown here."
                />
              )}
            </div>
          </div>

          {/* Platform chart */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Platform Comparison
              </h3>
              <p className="text-sm text-slate-500">
                Compare your progress across LeetCode and Codeforces.
              </p>
            </div>
            <div className="h-64 flex items-center justify-center">
              {hasPlatformData ? (
                <Bar
                  data={platformData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: { display: false },
                      },
                      y: {
                        beginAtZero: true,
                        grid: { color: '#E5E7EB' },
                      },
                    },
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              ) : (
                <EmptyState
                  title="No platform data connected"
                  subtitle="Connect your accounts to see how you perform on each platform."
                />
              )}
            </div>
          </div>
        </div>

        {/* Focus areas */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
          <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Focus Areas
              </h3>
              <p className="text-sm text-slate-500">
                Topics where you can improve next. Use this to plan your
                practice.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weakAreas.map(({ topic, score }) => (
              <div
                key={topic}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 md:p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-800">
                    {topic}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600">
                    {score}% mastery
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ title, value, icon, accent }) => (
  <div className="bg-white/90 border border-slate-100 rounded-2xl shadow-sm p-4 md:p-5 transition hover:shadow-md">
    <div className="flex items-center justify-between gap-3">
      <div className="space-y-1">
        <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
          {title}
        </p>
        <p className="text-2xl md:text-3xl font-semibold text-slate-900">
          {value}
        </p>
      </div>
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full ${accent}`}
      >
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  </div>
);

const EmptyState = ({ title, subtitle }) => (
  <div className="text-center max-w-xs mx-auto">
    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-50 text-indigo-500 mb-3">
      📉
    </div>
    <p className="text-sm font-semibold text-slate-900">{title}</p>
    <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
  </div>
);

export default DashboardPage;

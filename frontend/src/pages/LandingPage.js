import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* NAVBAR */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center font-bold text-sm">
              DT
            </div>
            <span className="font-semibold text-lg">DevTrail</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how-it-works" className="hover:text-white">How it works</a>
            <a href="#why" className="hover:text-white">Why DevTrail</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login"
               className="px-4 py-2 text-sm rounded-lg border border-slate-700 hover:border-indigo-500 hover:text-indigo-300 transition">
              Login
            </Link>
            <a href="#get-started"
               className="hidden md:inline-block px-4 py-2 text-sm rounded-lg bg-indigo-500 hover:bg-indigo-400 transition">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-6xl mx-auto px-4 pt-12 pb-16">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center px-3 py-1 rounded-full text-xs border border-indigo-500/40 text-indigo-300 mb-4">
              🔍 Track your coding journey
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              DevTrail – Your Coding Insights & Progress Dashboard
            </h1>
            <p className="text-slate-300 mb-6 text-sm md:text-base">
              DevTrail connects with platforms like <span className="font-semibold">LeetCode</span> and
              <span className="font-semibold"> Codeforces</span> to give you a single dashboard for your
              problems solved, contest ratings, streaks, and weak topics – all in real time.
            </p>

            <div className="flex flex-wrap gap-3 mb-4" id="get-started">
              <Link to="/login"
                 className="px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-sm font-medium transition">
                Get Started – Login
              </Link>
              <a href="#features"
                 className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-sm transition">
                View Features
              </a>
            </div>

            <p className="text-xs text-slate-400">
              No more spreadsheets. No more guessing. Just clear insights about your coding prep.
            </p>
          </div>

          {/* HERO MOCK CARD */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-xs text-slate-400 mb-3">Sample DevTrail Snapshot</p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400">Total Problems Solved</p>
                <p className="text-2xl font-semibold mt-2">324</p>
                <p className="text-[11px] text-emerald-400 mt-1">+28 this week</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400">Contest Rating (CF)</p>
                <p className="text-2xl font-semibold mt-2">1420</p>
                <p className="text-[11px] text-emerald-400 mt-1">+120 this month</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400">Current Streak</p>
                <p className="text-2xl font-semibold mt-2">12 days</p>
                <p className="text-[11px] text-amber-400 mt-1">Almost at 2 weeks!</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400">Weak Topic</p>
                <p className="text-sm font-medium mt-2">Dynamic Programming</p>
                <p className="text-[11px] text-slate-400 mt-1">Solve 5 more to improve.</p>
              </div>
            </div>
            <div className="text-[11px] text-slate-500">
              Live charts and detailed insights once you log in with your coding profiles.
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mt-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">What DevTrail does for you</h2>
          <p className="text-slate-300 text-sm mb-6">
            Think of DevTrail as your personal analytics dashboard for coding practice.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold mb-2">📊 Unified Stats</h3>
              <p className="text-xs text-slate-300">
                Pulls your data from LeetCode and Codeforces into one clean dashboard – problems solved,
                difficulty breakdown, tags, and more.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold mb-2">📈 Real-time Insights</h3>
              <p className="text-xs text-slate-300">
                See how your contest rating, streaks, and daily practice are improving with
                real-time graphs and timelines.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold mb-2">🎯 Weak Area Detection</h3>
              <p className="text-xs text-slate-300">
                Automatically identifies weak topics (like DP, graphs, greedy) so you know exactly
                what to focus on next.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="mt-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">How it works</h2>
          <p className="text-slate-300 text-sm mb-6">
            Get started in under a minute.
          </p>

          <div className="grid md:grid-cols-3 gap-5 text-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Step 1</p>
              <h3 className="font-semibold mb-1">Create / Login to DevTrail</h3>
              <p className="text-xs text-slate-300">
                Click on the login button and sign in using your email to create your DevTrail account.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Step 2</p>
              <h3 className="font-semibold mb-1">Connect Coding Profiles</h3>
              <p className="text-xs text-slate-300">
                Add your LeetCode and Codeforces handles. DevTrail securely fetches your public stats.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Step 3</p>
              <h3 className="font-semibold mb-1">View Live Dashboard</h3>
              <p className="text-xs text-slate-300">
                Get a personalised dashboard with charts, streaks, topic analysis, and progress over time.
              </p>
            </div>
          </div>
        </section>

        {/* WHY DEVTRAIL */}
        <section id="why" className="mt-16 mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Why DevTrail?</h2>
          <p className="text-slate-300 text-sm mb-6">
            Designed for students preparing for internships, placements, and competitive programming.
          </p>

          <div className="grid md:grid-cols-2 gap-5 text-sm mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="font-semibold mb-2">⏱ Save time, stay consistent</h3>
              <p className="text-xs text-slate-300">
                No need to manually track problems in Excel or Notion. DevTrail keeps your history,
                streaks, and growth updated automatically.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="font-semibold mb-2">💼 Interview-ready preparation</h3>
              <p className="text-xs text-slate-300">
                Focus on the right topics, see where you're weak, and show your consistent progress
                when talking to recruiters or mentors.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/login"
               className="inline-block px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-sm font-medium transition">
              Login & View Your Dashboard
            </Link>
            <p className="text-[11px] text-slate-500 mt-2">
              Free for individual users while in beta.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} DevTrail. Built by Manas Gupta.</p>
          <p>Track smarter. Code better.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Calendar, Users, GitBranch, Award, Sparkles, ChevronDown, ChevronUp, Search, RefreshCw, Check, Terminal, MessageSquare, Plus } from 'lucide-react';
import { useAuthMode } from '../contexts/AuthModeContext';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setAuthMode } = useAuthMode();
  const { isAuthenticated } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Ratings for progress bars
  const ratings = { leetcode: 90, codeforces: 65, codechef: 45 };

  // Mock contests
  const [contests] = useState([
    { id: 1, name: 'LeetCode Weekly Contest 403', date: 'Jun 28, 2026', time: '08:00 AM IST' },
    { id: 2, name: 'Codeforces Round 958 (Div. 2)', date: 'Jun 30, 2026', time: '08:05 PM IST' },
    { id: 3, name: 'CodeChef Starters 142', date: 'Jul 02, 2026', time: '08:00 PM IST' },
  ]);

  // Mock discussions
  const discussions = [
    { id: 1, title: 'How to optimize Dijkstra for dense graphs?', author: 'algo_pro', likes: 18, category: 'Algorithms', date: '2 hours ago' },
    { id: 2, title: 'Codeforces Round 957 solutions thread', author: 'code_wizard', likes: 45, category: 'Contests', date: '5 hours ago' },
    { id: 3, title: 'Roadmap to 2000 rating on LeetCode', author: 'lc_master', likes: 32, category: 'Career', date: '1 day ago' },
  ];

  // Activity grid
  const generateActivityCells = () => {
    const cells = [];
    for (let i = 0; i < 168; i++) {
      cells.push((i * 3 + 7) % 5);
    }
    return cells;
  };
  const activityGrid = generateActivityCells();

  const faqs = [
    { q: 'How do I connect my accounts?', a: 'Go to the Unified Rating System widget. Type your profile handle for LeetCode, Codeforces, or GitHub, and click Connect. Our secure crawler indexes your public submissions.' },
    { q: 'Is my data private?', a: 'Absolutely. We only fetch public data through open APIs. We never store your passwords or private credentials.' },
    { q: 'What is the Codolio Score?', a: 'A proprietary normalized metric that calculates a weighted average of your performance across different rating models to deliver a single proficiency indicator.' },
    { q: 'Can I use it for job applications?', a: 'Yes! Many users share their DevTrail profile with recruiters to showcase rating graphs and activity calendars across platforms.' },
  ];

  return (
    <div className="min-h-screen bg-[#f9fefc] font-jakarta">
      <Header />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-[#e6f8f3] via-[#f0fdfa] to-white border-b border-teal-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7 text-left space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold tracking-wide shadow-sm">
              <Sparkles size={14} className="text-teal-600" />
              Trusted by 50,000+ Software Engineers
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] font-outfit">
              Track, Analyze &{' '}
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">Improve</span>
              <br />Your Coding Journey
            </h1>

            <p className="text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed">
              DevTrail is the all-in-one performance engine for competitive programmers. Sync your platforms, visualize your growth, and master your career goals with precision analytics.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#widgets" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-teal-600/10 hover:bg-teal-700 transition-all glow-btn">
                Explore Discussion Page <ArrowRight size={16} />
              </a>
              {isAuthenticated ? (
                <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-teal-100 text-teal-800 text-sm font-bold rounded-xl hover:bg-teal-50 transition-all">
                  Go to Dashboard
                </Link>
              ) : (
                <button onClick={() => { setAuthMode('signup'); navigate('/auth'); }} className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-teal-100 text-teal-800 text-sm font-bold rounded-xl hover:bg-teal-50 transition-all">
                  Track Profile
                </button>
              )}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-4 border-t border-teal-50/60 max-w-md">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-teal-800 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">JD</div>
                <div className="w-9 h-9 rounded-full bg-emerald-700 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">AL</div>
                <div className="w-9 h-9 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">KW</div>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Joined by devs from <span className="text-gray-900 font-bold">Google</span>, <span className="text-gray-900 font-bold">Meta</span>, and <span className="text-gray-900 font-bold">Netflix</span>.
              </p>
            </div>
          </div>

          {/* Right: Browser preview */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-teal-400/10 rounded-[32px] blur-3xl opacity-40 transform -rotate-6 scale-95"></div>
            <div className="relative glass-panel rounded-3xl shadow-2xl shadow-teal-900/5 border border-teal-100/50 p-6 overflow-hidden hover:scale-[1.02] transition-all duration-300">
              {/* Window dots */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <span className="px-3 py-0.5 rounded-full bg-teal-50/50 border border-teal-100/20 text-[10px] text-teal-800 font-bold uppercase tracking-wider">Live Preview</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-teal-50/50">
                    <div className="text-xs text-gray-500 font-semibold mb-1">Codolio Score</div>
                    <div className="text-2xl font-black text-gray-900 flex items-center gap-1.5">840 <TrendingUp size={16} className="text-emerald-500" /></div>
                  </div>
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-teal-50/50">
                    <div className="text-xs text-gray-500 font-semibold mb-1">Global Rank</div>
                    <div className="text-2xl font-black text-gray-900">Top 3.2%</div>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-white/80 rounded-2xl border border-teal-50/50 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-gray-900">Growth Analytics</span>
                    <span className="text-[10px] text-gray-400 font-bold">PAST 6 MONTHS</span>
                  </div>
                  <div className="h-32 w-full">
                    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
                      <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
                      <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
                      <path d="M 0 35 Q 20 28 40 22 T 80 12 T 100 5 L 100 40 L 0 40 Z" fill="url(#chartGrad)" />
                      <path d="M 0 35 Q 20 28 40 22 T 80 12 T 100 5" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="40" cy="22" r="2" fill="#0d9488" />
                      <circle cx="80" cy="12" r="2" fill="#0d9488" />
                      <circle cx="100" cy="5" r="3" fill="#fff" stroke="#0d9488" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== INSIGHTS BANNER ==================== */}
      <section className="py-12 bg-teal-50/20 border-b border-teal-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <h2 className="text-xs text-teal-600 font-extrabold uppercase tracking-widest font-outfit">
            Powerful Insights for Engineers
          </h2>
          <p className="text-2xl font-extrabold text-gray-900 max-w-2xl mx-auto font-outfit">
            Everything you need to benchmark your performance across LeetCode, Codeforces, and more in a single unified dashboard.
          </p>
        </div>
      </section>

      {/* ==================== FEATURES GRID ==================== */}
      <section id="widgets" className="py-16 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">
            All your coding data. One unified dashboard.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Everything you need to benchmark your performance across LeetCode, Codeforces, and more in a single unified view.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Unified Rating */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-6 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Award size={20} /></div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 font-outfit">Unified Rating System</h3>
                  <p className="text-xs text-gray-500">We aggregate your ratings from all platforms into a single Codolio score.</p>
                </div>
              </div>
              <div className="space-y-3 bg-teal-50/30 border border-teal-50/50 p-4 rounded-xl">
                {[
                  { name: 'LeetCode', pct: ratings.leetcode },
                  { name: 'Codeforces', pct: ratings.codeforces },
                  { name: 'CodeChef', pct: ratings.codechef },
                ].map(({ name, pct }) => (
                  <div key={name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-800">{name}</span>
                      <span className="text-teal-700">{pct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Event Tracker */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-6 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><Calendar size={20} /></div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 font-outfit">Event Tracker</h3>
                  <p className="text-xs text-gray-500">Never miss a contest again. Sync all global coding events to your calendar.</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {contests.map((c) => (
                  <div key={c.id} className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-gray-800 truncate max-w-[180px]">{c.name}</div>
                      <div className="text-[10px] text-gray-400 font-medium">{c.date} • {c.time}</div>
                    </div>
                    <div className="flex gap-1.5 text-gray-400">
                      <Calendar size={14} />
                      <Terminal size={14} />
                      <GitBranch size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Collaborative Growth */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-6 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><MessageSquare size={20} /></div>
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900 font-outfit">Collaborative Growth</h3>
                    <p className="text-xs text-gray-500">Join like-minded developers discussing problems, sharing solutions, and helping each other grow.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {discussions.slice(0, 2).map((post) => (
                  <div key={post.id} className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                    <div className="text-xs font-bold text-gray-800 line-clamp-1">{post.title}</div>
                    <div className="flex justify-between text-[9px] text-gray-400 font-medium mt-1">
                      <span>@{post.author} in {post.category}</span>
                      <span>{post.likes} likes • {post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <button
                onClick={() => navigate('/discussions')}
                className="w-full py-2 bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-100/50 rounded-xl text-xs font-bold text-indigo-700 transition-colors flex items-center justify-center gap-1.5"
              >
                Explore Discussions →
              </button>
            </div>
          </div>

          {/* Card 4: Activity Rewinds */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-6 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><GitBranch size={20} /></div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 font-outfit">Activity Rewinds</h3>
                  <p className="text-xs text-gray-500">Beautiful monthly reports that summarize your progress and growth.</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
                <div className="grid grid-flow-col grid-rows-7 gap-1.5 justify-center overflow-x-auto py-1">
                  {activityGrid.map((level, idx) => {
                    const colors = ['bg-gray-100', 'bg-teal-100', 'bg-teal-300', 'bg-teal-500', 'bg-teal-700'];
                    return (
                      <div key={idx} className={`w-3.5 h-3.5 rounded-[3px] ${colors[level]} transition-all duration-300 hover:scale-125 cursor-pointer`} title={`Day ${idx + 1}`} />
                    );
                  })}
                </div>
                <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold px-1.5 pt-3">
                  <span>Less</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-gray-100"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-teal-100"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-teal-300"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-teal-500"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-teal-700"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-16 bg-teal-50/20 border-t border-b border-teal-50/50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-900 font-outfit">How It Works</h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">Synchronize, analyze, and build up your public profile in 3 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 'STEP 01', title: 'Connect Profiles', desc: 'Sync your LeetCode, Codeforces, and GitHub accounts in one click from the rating connector widget.', color: 'text-teal-600' },
              { step: 'STEP 02', title: 'We Analyze Data', desc: 'Our parsing engine processes your ratings, submission consistency, and commits to establish your Codolio index.', color: 'text-teal-600' },
              { step: 'STEP 03', title: 'Track & Improve', desc: 'Get real-time insights, sync upcoming contests, and showcase your achievements to tech recruiters.', color: 'text-rose-500' },
            ].map(({ step, title, desc, color }) => (
              <div key={title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  {step === 'STEP 01' ? <Terminal size={22} /> : step === 'STEP 02' ? <Settings size={22} /> : <TrendingUp size={22} />}
                </div>
                <p className={`text-xs font-extrabold uppercase tracking-wider ${color}`}>{step}</p>
                <h3 className="font-extrabold text-lg text-gray-900 font-outfit">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-16 max-w-4xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-gray-900 font-outfit">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm">Answers to commonly asked questions about profile linking and scores.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                <button onClick={() => setOpenFaqIndex(isOpen ? null : index)} className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none">
                  <span className="font-bold text-gray-900 text-sm">{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} className="text-teal-600 flex-shrink-0" /> : <ChevronDown size={18} className="text-teal-600 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-gray-500 border-t border-gray-50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Helper: Settings icon used inline
function Settings({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

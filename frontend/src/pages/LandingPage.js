import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Calendar, GitBranch, Award, Sparkles, ChevronDown, ChevronUp, Terminal, MessageSquare, Code2, Star, Zap, ExternalLink } from 'lucide-react';
import { useAuthMode } from '../contexts/AuthModeContext';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setAuthMode } = useAuthMode();
  const { isAuthenticated } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Track scroll position for parallax scroll effects
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ratings for progress bars
  const ratings = { leetcode: 90, codeforces: 65, codechef: 45 };

  // Mock contests
  const [contests] = useState([
    { id: 1, name: 'LeetCode Weekly Contest 403', date: 'Jun 28, 2026', time: '08:00 AM IST', status: 'LIVE NOW', color: 'bg-emerald-400' },
    { id: 2, name: 'Codeforces Round 958 (Div. 2)', date: 'Jun 30, 2026', time: '08:05 PM IST', status: 'REGISTRATION OPEN', color: 'bg-[#FF3366]' },
    { id: 3, name: 'CodeChef Starters 142', date: 'Jul 02, 2026', time: '08:00 PM IST', status: 'UPCOMING', color: 'bg-amber-400' },
  ]);

  // Mock discussions
  const discussions = [
    { id: 1, title: 'How to optimize Dijkstra for dense graphs?', author: 'algo_pro', likes: 18, category: 'Algorithms', date: '2 hours ago' },
    { id: 2, title: 'Codeforces Round 957 solutions thread', author: 'code_wizard', likes: 45, category: 'Contests', date: '5 hours ago' },
  ];

  // Activity grid (contribution graph)
  const activityGrid = [];
  for (let i = 0; i < 273; i++) {
    activityGrid.push((i * 4 + 3) % 5);
  }

  const faqs = [
    { q: 'HOW DO I CONNECT MY ACCOUNTS?', a: 'Go to the Unified Rating System widget. Type your profile handle for LeetCode, Codeforces, or GitHub, and click Connect. Our secure crawler indexes your public submissions.' },
    { q: 'IS MY DATA PRIVATE?', a: 'Absolutely. We only fetch public data through open APIs. We never store your passwords or private credentials.' },
    { q: 'WHAT IS THE CODELIO SCORE?', a: 'A proprietary normalized metric that calculates a weighted average of your performance across different rating models to deliver a single proficiency indicator.' },
    { q: 'CAN I USE IT FOR JOB APPLICATIONS?', a: 'Yes! Many users share their DevTrail profile with recruiters to showcase rating graphs and activity calendars across platforms.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] font-jakarta">
      <Header />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden border-b-[3px] border-black bg-[#FAF6F0] min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 w-full flex-1">
          {/* Left Hero */}
          <div className="lg:col-span-7 pt-8 pb-14 lg:pt-10 lg:pb-16 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-black tracking-wider uppercase self-start">
              <Sparkles size={14} className="text-[#FF3366] stroke-[2.5]" />
              TRUSTED BY 50,000+ SOFTWARE ENGINEERS
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4.2rem] font-black tracking-tighter text-black leading-[0.95] font-outfit uppercase">
              TRACK,<br />
              ANALYZE &<br />
              <span className="italic-highlight text-[#FF3366]">IMPROVE</span><br />
              YOUR<br />
              JOURNEY
            </h1>

            <p className="text-base sm:text-lg font-semibold text-black max-w-xl leading-relaxed">
              Connect to the performance engine for competitive programmers and developers. Sync your platforms, visualize your growth, and master your career goals.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => { if (isAuthenticated) navigate('/dashboard'); else { setAuthMode('signup'); navigate('/auth'); } }}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black bg-[#FF3366] text-white text-sm font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
              >
                Start Your Journey <ArrowRight size={16} strokeWidth={3} />
              </button>
              <a
                href="#widgets"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black bg-white text-black text-sm font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
              >
                View Demo
              </a>
            </div>
          </div>

          {/* Right Hero - Browser preview mockup card container */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-8 px-2 lg:px-4 z-10">
            {/* Absolute background element stretching to viewport right edge */}
            <div
              className="absolute top-0 bottom-0 left-0 right-[-2000px] bg-[#E8EAFF] z-0"
              style={{
                backgroundImage: 'url("/hero_bg.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center'
              }}
            />

            {/* Floating outer wrapper for static gentle float */}
            <div className="w-full max-w-[440px] mx-auto animate-float z-10 relative">
              {/* Overlay window with scroll-based parallax translation */}
              <div
                className="relative bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-none w-full"
                style={{
                  transform: `translateY(${Math.max(-60, -scrollY * 0.12)}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                {/* Window dots */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b-[3px] border-black bg-white">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF3366] border border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFD700] border border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400 border border-black"></div>
                  </div>
                  <span className="px-2.5 py-0.5 border border-black rounded-full bg-white text-[8px] font-black text-black">ANALYTICS.DEVTRAIL.APP</span>
                </div>

                <div className="p-4 space-y-3.5 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#FFF0F3] border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <div className="text-[8px] text-gray-500 font-black uppercase">GLOBAL RANK</div>
                      <div className="text-xl font-black text-black">#1,402</div>
                    </div>
                    <div className="bg-[#FFFDF0] border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <div className="text-[8px] text-gray-500 font-black uppercase">POINTS EARNED</div>
                      <div className="text-xl font-black text-black">12,450</div>
                    </div>
                  </div>

                  {/* Chart representation */}
                  <div className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex gap-2 items-stretch">
                      {/* Y-axis Labels */}
                      <div className="flex flex-col justify-between text-[7px] font-black text-black select-none pr-1.5 text-right h-24">
                        <span>10000</span>
                        <span>7500</span>
                        <span>5000</span>
                        <span>2500</span>
                        <span>0</span>
                      </div>

                      {/* Graph Area */}
                      <div className="flex-1 flex flex-col justify-between h-24">
                        <div className="h-20 w-full relative">
                          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                            <defs>
                              <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF3366" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#FF3366" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            {/* Grid lines */}
                            <line x1="0" y1="0" x2="100" y2="0" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="1.5" />
                            <line x1="0" y1="10" x2="100" y2="10" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="1.5" />
                            <line x1="0" y1="20" x2="100" y2="20" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="1.5" />
                            <line x1="0" y1="30" x2="100" y2="30" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="1.5" />
                            <line x1="0" y1="40" x2="100" y2="40" stroke="#000000" strokeWidth="1" />

                            {/* Filled Area */}
                            <path d="M 0 30 L 16.6 30 L 33.3 35 L 50 2 L 66.6 22 L 83.3 20 L 100 24 L 100 40 L 0 40 Z" fill="url(#pinkGrad)" />

                            {/* Line Stroke (Thinned to 1.5) */}
                            <path d="M 0 30 L 16.6 30 L 33.3 35 L 50 2 L 66.6 22 L 83.3 20 L 100 24" fill="none" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="square" />

                            {/* Dots (Thinned/sized down to 1.8) */}
                            <circle cx="16.6" cy="30" r="1.8" fill="#FF3366" stroke="#000000" strokeWidth="1" />
                            <circle cx="33.3" cy="35" r="1.8" fill="#FF3366" stroke="#000000" strokeWidth="1" />
                            <circle cx="50" cy="2" r="1.8" fill="#FF3366" stroke="#000000" strokeWidth="1" />
                            <circle cx="66.6" cy="22" r="1.8" fill="#FF3366" stroke="#000000" strokeWidth="1" />
                            <circle cx="83.3" cy="20" r="1.8" fill="#FF3366" stroke="#000000" strokeWidth="1" />
                            <circle cx="100" cy="24" r="1.8" fill="#FF3366" stroke="#000000" strokeWidth="1" />
                          </svg>
                        </div>
                        {/* X-axis Labels */}
                        <div className="flex justify-between text-[7px] font-black text-black select-none uppercase pt-1">
                          <span className="w-[14.2%] text-center">Mon</span>
                          <span className="w-[14.2%] text-center">Tue</span>
                          <span className="w-[14.2%] text-center">Wed</span>
                          <span className="w-[14.2%] text-center">Thu</span>
                          <span className="w-[14.2%] text-center">Fri</span>
                          <span className="w-[14.2%] text-center">Sat</span>
                          <span className="w-[14.2%] text-center">Sun</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== INSIGHTS BANNER ==================== */}
      <section className="py-12 bg-[#E8EAFF] border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-black font-outfit uppercase italic tracking-tight">
            POWERFUL INSIGHTS FOR ENGINEERS
          </h2>
          <p className="text-sm font-semibold text-gray-500 max-w-xl mx-auto uppercase">
            Everything you need to benchmark your performance across LeetCode, Codeforces, and more in a single unified view.
          </p>
        </div>
      </section>

      {/* ==================== FEATURES GRID ==================== */}
      <section id="widgets" className="py-16 max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Card 1: Unified Rating (Cyan/Lavender Background) */}
          <div className="lg:col-span-7 bg-[#E8EAFF] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <TrendingUp size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg text-black uppercase tracking-tight">UNIFIED RATING SYSTEM</h3>
                  <p className="text-xs font-semibold text-gray-600">We aggregate your ratings from all platforms into a single, proprietary Codelio Score.</p>
                </div>
              </div>

              {/* Progress bars inside card (styled like a browser window mockup) */}
              <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                {/* Window header */}
                <div className="flex items-center gap-1.5 px-3.5 py-2 border-b-2 border-black bg-gray-50">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF3366] border border-black"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700] border border-black"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black"></div>
                </div>

                {/* Window Content */}
                <div className="p-4 space-y-4 bg-white">
                  {[
                    { name: 'LEETCODE', pct: 95, color: 'bg-[#FF3366]', stroke: '#FF3366', wavePath: 'M0 5 Q15 0, 30 10 T60 0 T90 10 T120 5' },
                    { name: 'CODEFORCES', pct: 80, color: 'bg-[#FFD700]', stroke: '#FFD700', wavePath: 'M0 5 Q15 10, 30 0 T60 10 T90 0 T120 5' },
                    { name: 'CODECHEF', pct: 65, color: 'bg-[#0A2540]', stroke: '#0A2540', wavePath: 'M0 5 Q15 0, 30 10 T60 0 T90 10 T120 5' },
                  ].map(({ name, pct, color, stroke, wavePath }) => (
                    <div key={name} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black text-black">
                        <span>{name}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full h-3.5 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
                        <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }} />
                      </div>
                      {/* Wave Line representation */}
                      <div className="h-3 w-28 relative select-none">
                        <svg viewBox="0 0 120 10" className="w-full h-full overflow-visible">
                          <path d={wavePath} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom statistics split */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 items-stretch">
                {/* Left: Stacked list */}
                <div className="flex-1 flex flex-col justify-between gap-2.5">
                  <div className="bg-white border-2 border-black p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2">
                      <Code2 size={16} className="text-[#FF3366] stroke-[2.5]" />
                      <span className="text-[10px] font-black text-black uppercase">PROBLEMS SOLVED</span>
                    </div>
                    <span className="text-sm font-black text-black">1,248</span>
                  </div>
                  <div className="bg-white border-2 border-black p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-[#FFD700] stroke-[2.5]" />
                      <span className="text-[10px] font-black text-black uppercase">CONTESTS PARTICIPATED</span>
                    </div>
                    <span className="text-sm font-black text-black">42</span>
                  </div>
                  <div className="bg-white border-2 border-black p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-[#0A2540] stroke-[2.5]" />
                      <span className="text-[10px] font-black text-black uppercase">CURRENT STREAK</span>
                    </div>
                    <span className="text-sm font-black text-black">15 Days</span>
                  </div>
                </div>

                {/* Right: Circular Overall Dev Core */}
                <div className="bg-white border-[3px] border-black p-4 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[180px]">
                  <span className="text-[9px] font-black text-black uppercase mb-3">OVERALL DEV CORE</span>

                  {/* Circular Donut chart */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#FF3366]"
                        strokeWidth="3.5"
                        strokeDasharray="80, 100"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="text-center">
                      <div className="text-2xl font-black text-black leading-none">842</div>
                      <div className="text-[8px] font-black text-[#FF3366] mt-0.5 uppercase tracking-wider">EXPERT</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-black text-emerald-600 mt-3 select-none flex items-center gap-1">
                    <span>↗</span> +12 this week
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Event Tracker (Yellow Background) */}
          <div className="lg:col-span-5 bg-[#FFD700] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Calendar size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg text-black uppercase tracking-tight">EVENT TRACKER</h3>
                  <p className="text-xs font-semibold text-gray-700">Never miss a contest again. Sync all global coding events to your calendar.</p>
                </div>
              </div>

              {/* 3x3 small cards bento grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { platform: 'LEETCODE', title: 'Weekly Contest 384', date: 'Feb 11, 08:00', desc: '“6 problems in 90 mins.”', diff: 'EASY-HARD', active: false, badgeColor: 'bg-[#FF9F43]' },
                  { platform: 'CODEFORCES', title: 'Div. 2 Round #925', date: 'Feb 12, 14:35', desc: '“Standard rated round.”', diff: 'DIV 2', active: true, badgeColor: 'bg-[#0052CC]', sync: true },
                  { platform: 'LEETCODE', title: 'Biweekly 124', date: 'Feb 17, 19:00', desc: '“Saturday night sprint.”', diff: 'MEDIUM', active: false, badgeColor: 'bg-[#FF9F43]' },
                  { platform: 'CODEFORCES', title: 'Educational #162', date: 'Feb 19, 14:35', desc: '“Focus on techniques.”', diff: 'DIV 2', active: false, badgeColor: 'bg-[#0052CC]' },
                  { platform: 'LEETCODE', title: 'Weekly Contest 385', date: 'Feb 18, 08:00', desc: '“Global ranking update.”', diff: 'RANKED', active: false, badgeColor: 'bg-[#FF9F43]' },
                  { platform: 'CODEFORCES', title: 'Div. 3 Round #928', date: 'Feb 22, 16:35', desc: '“Beginner friendly.”', diff: 'DIV 3', active: false, badgeColor: 'bg-[#0052CC]' },
                  { platform: 'LEETCODE', title: 'Biweekly 125', date: 'Mar 02, 19:00', desc: '“Competitive edge.”', diff: 'HARD', active: false, badgeColor: 'bg-[#FF9F43]' },
                  { platform: 'CODEFORCES', title: 'Global Round 25', date: 'Mar 05, 14:35', desc: '“Large prize pool.”', diff: 'COMBINED', active: false, badgeColor: 'bg-[#0052CC]' },
                  { platform: 'LEETCODE', title: 'Weekly Contest 386', date: 'Mar 08, 08:00', desc: '“Sunday morning grit.”', diff: 'CLASSIC', active: false, badgeColor: 'bg-[#FF9F43]' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`border-2 border-black p-2 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all min-h-[120px] ${item.active ? 'bg-[#FF3366] text-white' : 'bg-white text-black'
                      }`}
                  >
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <span className={`px-1.5 py-0.5 border border-black text-[6px] font-black rounded-sm uppercase ${item.badgeColor} ${item.active ? 'border-white' : 'border-black'}`}>
                          {item.platform}
                        </span>
                        {item.sync && (
                          <Zap size={8} className="text-[#FFD700] fill-[#FFD700] animate-pulse" />
                        )}
                      </div>
                      <div className="text-[9px] font-black tracking-tight leading-tight line-clamp-2">
                        {item.title}
                      </div>
                      <div className={`text-[7px] font-bold ${item.active ? 'text-white' : 'text-gray-500'}`}>
                        {item.date}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-dashed border-gray-300">
                      <div className={`text-[6px] italic leading-tight ${item.active ? 'text-white/95' : 'text-gray-500'}`}>
                        {item.desc}
                      </div>
                      <div className="flex justify-between items-center text-[7px] font-black">
                        <span>{item.diff}</span>
                        <ExternalLink size={8} className={item.active ? 'text-white' : 'text-black'} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Collaborative Growth (Hot Pink Background) */}
          <div className="lg:col-span-5 bg-[#FF3366] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-white flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <MessageSquare size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg text-white uppercase tracking-tight">COLLABORATIVE GROWTH</h3>
                  <p className="text-xs font-semibold text-white uppercase opacity-90">Join discussions, share solutions, and help each other grow.</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {discussions.map((post) => (
                  <div key={post.id} className="bg-white border-2 border-black text-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xs font-black line-clamp-1">{post.title.toUpperCase()}</div>
                    <div className="flex justify-between text-[9px] font-bold text-gray-500 mt-1">
                      <span>@{post.author}</span>
                      <span>{post.likes} LIKES</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t-2 border-black mt-4">
              <button
                onClick={() => navigate('/discussions')}
                className="w-full py-2.5 border-2 border-black bg-white text-black font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
              >
                Explore Discussions →
              </button>
            </div>
          </div>

          {/* Card 4: Activity Rewinds (White Background) */}
          <div className="lg:col-span-7 bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <GitBranch size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg text-black uppercase">ACTIVITY REWINDS</h3>
                  <p className="text-xs font-semibold text-black uppercase opacity-80">Beautiful monthly reports that summarize your progress.</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="grid grid-flow-col grid-rows-7 gap-[3px] justify-center overflow-x-auto py-1">
                  {activityGrid.map((level, idx) => {
                    const colors = ['bg-gray-100', 'bg-[#FFE0E6]', 'bg-[#FF8FA8]', 'bg-[#FF5C7F]', 'bg-[#FF3366]'];
                    return (
                      <div key={idx} className={`w-3.5 h-3.5 border border-black rounded-[1px] ${colors[level]} transition-all duration-150 hover:scale-125 cursor-pointer`} title={`Day ${idx + 1}`} />
                    );
                  })}
                </div>
                <div className="flex justify-between items-center text-[8px] font-black text-black px-1.5 pt-3 uppercase">
                  <span>Less</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-2.5 h-2.5 border border-black bg-gray-100"></div>
                    <div className="w-2.5 h-2.5 border border-black bg-[#FFE0E6]"></div>
                    <div className="w-2.5 h-2.5 border border-black bg-[#FF8FA8]"></div>
                    <div className="w-2.5 h-2.5 border border-black bg-[#FF5C7F]"></div>
                    <div className="w-2.5 h-2.5 border border-black bg-[#FF3366]"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-16 bg-[#FAF6F0] border-t-[3px] border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-black font-outfit uppercase">HOW IT WORKS</h2>
            <p className="text-sm font-semibold text-gray-500 uppercase">Synchronize, analyze, and build up your public profile in 3 steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'CONNECT PROFILES', desc: 'Sync your LeetCode, Codeforces, and GitHub accounts in one click from the rating connector widget.', badgeColor: 'bg-[#E0F2FE]' },
              { step: '02', title: 'WE ANALYZE DATA', desc: 'Our parsing engine processes your ratings, submission consistency, and commits to establish your score.', badgeColor: 'bg-[#FFD700]' },
              { step: '03', title: 'TRACK & IMPROVE', desc: 'Get real-time insights, sync upcoming contests, and showcase your achievements to recruiters.', badgeColor: 'bg-[#FF3366]' },
            ].map(({ step, title, desc, badgeColor }) => (
              <div key={title} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <div className={`w-12 h-12 border-2 border-black rounded-md ${badgeColor} flex items-center justify-center font-outfit font-black text-xl text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  {step}
                </div>
                <h3 className="font-outfit font-black text-lg text-black uppercase">{title}</h3>
                <p className="text-xs font-semibold text-gray-600 leading-relaxed uppercase">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-16 max-w-4xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-black font-outfit uppercase">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-sm font-semibold text-gray-500 uppercase">Answers to commonly asked questions about profile linking and scores.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-gray-50"
                  aria-expanded={isOpen}
                >
                  <span className="font-black text-black text-xs uppercase">{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} className="text-black stroke-[3]" /> : <ChevronDown size={16} className="text-black stroke-[3]" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs font-semibold text-gray-600 border-t-2 border-black bg-white leading-relaxed uppercase">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="py-20 bg-[#FF3366] border-t-[3px] border-black relative overflow-hidden">
        {/* Repeating background text pattern */}
        <div className="absolute inset-0 opacity-10 flex flex-col justify-around select-none pointer-events-none font-outfit font-black text-white uppercase text-3xl tracking-widest leading-none overflow-hidden">
          <div className="whitespace-nowrap -translate-x-12">DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL</div>
          <div className="whitespace-nowrap translate-x-12">DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL</div>
          <div className="whitespace-nowrap -translate-x-6">DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL</div>
          <div className="whitespace-nowrap translate-x-6">DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL DEVTRAIL</div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-5xl sm:text-6xl lg:text-[4.8rem] font-black italic text-white font-outfit uppercase leading-none tracking-normal">
            READY TO{" "}<span className="text-[#FFD700]">DOMINATE?</span>
          </h2>
          <div>
            <button
              onClick={() => { setAuthMode('signup'); navigate('/auth'); }}
              className="inline-flex items-center px-10 py-5 border-2 border-black bg-white text-[#FF3366] text-sm font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

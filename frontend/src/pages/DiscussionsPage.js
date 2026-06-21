import React, { useState } from 'react';
import { Moon, User, Search, MessageSquare, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const CATEGORIES = ['All', 'Technical', 'Career', 'Contests'];

const MOCK_THREADS = [
  {
    id: 1,
    title: 'How to optimize DP solutions for Codeforces Hard Problems?',
    preview: "I've been struggling with memory limits on some of the recent Div 2 problems. Any tips on state reduction?",
    author: 'Alex Rivera', handle: 'arivera', category: 'Technical',
    replies: 24, views: '1.2k', time: '2h ago',
    body: "Hey everyone! I've been hitting memory limit exceeded (MLE) on several recent Dynamic Programming problems. Specifically, I'm looking for advice on:\n\n1. When to use iterative vs recursive DP for memory efficiency.\n2. Common techniques for rolling arrays or bitmask compression.\n3. How to identify states that can be safely discarded.",
    replyList: [
      { author: 'Siddharth Singh', handle: 'siddharthsingh', time: '1h ago', body: "For rolling arrays, always check if your current state dp[i] only depends on dp[i-1]. If so, you can usually reduce the 2D array to 1D using parity or just two rows." },
    ],
  },
  {
    id: 2,
    title: 'How to optimize DP solutions for Codeforces Hard Problems?',
    preview: "I've been struggling with memory limits on some of the recent Div 2 problems. Any tips on state reduction?",
    author: 'Alex Rivera', handle: 'arivera', category: 'Technical',
    replies: 24, views: '1.2k', time: '2h ago',
  },
  {
    id: 3,
    title: 'How to optimize DP solutions for Codeforces Hard Problems?',
    preview: "I've been struggling with memory limits on some of the recent Div 2 problems. Any tips on state reduction?",
    author: 'Alex Rivera', handle: 'arivera', category: 'Technical',
    replies: 24, views: '1.2k', time: '2h ago',
  },
  {
    id: 4,
    title: 'How to optimize DP solutions for Codeforces Hard Problems?',
    preview: "I've been struggling with memory limits on some of the recent Div 2 problems. Any tips on state reduction?",
    author: 'Alex Rivera', handle: 'arivera', category: 'Technical',
    replies: 24, views: '1.2k', time: '2h ago',
  },
  {
    id: 5,
    title: 'How to optimize DP solutions for Codeforces Hard Problems?',
    preview: "I've been struggling with memory limits on some of the recent Div 2 problems. Any tips on state reduction?",
    author: 'Alex Rivera', handle: 'arivera', category: 'Technical',
    replies: 24, views: '1.2k', time: '2h ago',
  },
];

const TRENDING = [
  { tag: '#LeetCode75', posts: '1.2k' },
  { tag: '#DynamicProgramming', posts: '1.2k' },
  { tag: '#SystemDesign', posts: '1.2k' },
  { tag: '#FAANG', posts: '1.2k' },
];

const RELATED = [
  { title: 'Matrix Exponentiation for DP', replies: 12, time: '3h ago' },
  { title: 'Space complexity in Graphs', replies: 8, time: '5h ago' },
];

export default function DiscussionsPage() {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedThread, setSelectedThread] = useState(MOCK_THREADS[0]);
  const [replyTitle, setReplyTitle] = useState('');
  const [replyBody, setReplyBody] = useState('');

  const filteredThreads = MOCK_THREADS.filter((t) =>
    (activeCategory === 'All' || t.category === activeCategory) &&
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9fefc] font-jakarta flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
        <div className="max-w-full mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2.5 text-lg font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </div>
            <span className="font-outfit font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">DevTrail</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors"><Moon size={18} className="text-gray-500" /></button>
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
              <User size={16} className="text-teal-700" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* ==================== LEFT SIDEBAR ==================== */}
        <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 p-5 gap-4 sticky top-14 h-[calc(100vh-56px)]">
          {/* Profile */}
          <div className="flex flex-col items-center text-center gap-2 pb-4 border-b border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 flex items-center justify-center overflow-hidden">
              <User size={36} className="text-teal-700" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">{currentUser?.name || 'Siddharth Singh'}</h3>
            <p className="text-xs text-gray-400">@{currentUser?.email?.split('@')[0] || 'siddharthsingh'}</p>
            <div className="flex gap-2 mt-1">
              <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center"><MessageSquare size={11} className="text-gray-500" /></div>
              <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg></div>
              <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center"><User size={11} className="text-gray-500" /></div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'Discussion', path: '/discussions', active: true },
              { label: 'Analytics', path: '/analytics' },
              { label: 'Contests', path: '/contests' },
            ].map(({ label, path, active }) => (
              <Link key={path} to={path} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${active ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}>
                {label}
              </Link>
            ))}
          </nav>

          <button className="mt-auto w-full py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition-all glow-btn">
            Refresh Data
          </button>
        </aside>

        {/* ==================== MIDDLE: THREAD LIST ==================== */}
        <div className="w-full lg:w-[380px] border-r border-gray-100 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 font-outfit">Discussions</h2>
            {/* Search */}
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            {/* Category Tabs */}
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Thread list */}
          <div className="flex-1 overflow-y-auto">
            {filteredThreads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className={`w-full text-left p-4 border-b border-gray-50 hover:bg-teal-50/30 transition-all flex gap-3 ${
                  selectedThread?.id === thread.id ? 'bg-teal-50/50 border-l-2 border-l-teal-500' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User size={14} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{thread.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">{thread.preview}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-teal-600 font-semibold">
                    <span>{thread.replies} replies</span>
                    <span>{thread.views} views</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 flex-shrink-0">{thread.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ==================== RIGHT: THREAD DETAIL ==================== */}
        <div className="hidden lg:flex flex-col flex-1 bg-[#f9fefc]">
          {selectedThread ? (
            <div className="flex-1 overflow-y-auto p-6">
              {/* Thread header */}
              <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3 font-outfit">{selectedThread.title}</h1>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={14} className="text-gray-500" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-800">{selectedThread.author}</span>
                    <span className="text-sm text-gray-400 ml-1">@{selectedThread.handle}</span>
                  </div>
                  <span className="text-xs text-gray-400">Posted {selectedThread.time} in {selectedThread.category}</span>
                </div>
              </div>

              {/* Thread body */}
              {selectedThread.body && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{selectedThread.body}</p>
                </div>
              )}

              {/* Replies */}
              {selectedThread.replyList?.map((reply, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center">
                      <User size={12} className="text-teal-700" />
                    </div>
                    <span className="text-sm font-bold text-gray-800">{reply.author}</span>
                    <span className="text-xs text-gray-400">{reply.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{reply.body}</p>
                </div>
              ))}

              {/* Post Reply Form */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4 font-outfit">Post a Reply</h3>
                <input
                  type="text"
                  placeholder="Reply title (optional)"
                  value={replyTitle}
                  onChange={(e) => setReplyTitle(e.target.value)}
                  className="w-full px-4 py-2.5 mb-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50"
                />
                <button className="mb-3 px-3 py-1 text-xs font-semibold text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors flex items-center gap-1">
                  <Plus size={12} /> Add Tag
                </button>
                <textarea
                  placeholder="Write your rich-text reply here..."
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 resize-y"
                />
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition-all glow-btn flex items-center gap-2">
                    Post Reply
                  </button>
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {/* Trending */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h4 className="font-bold text-sm text-gray-900 mb-3 text-center font-outfit">Trending</h4>
                  <div className="space-y-2">
                    {TRENDING.map((t) => (
                      <div key={t.tag} className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-teal-600">{t.tag}</span>
                        <span className="text-[10px] text-gray-400">{t.posts} posts</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h4 className="font-bold text-sm text-gray-900 mb-3 text-center font-outfit">Related Threads</h4>
                  <div className="space-y-3">
                    {RELATED.map((r) => (
                      <div key={r.title}>
                        <p className="text-xs font-semibold text-gray-800">{r.title}</p>
                        <p className="text-[10px] text-gray-400">{r.replies} replies • {r.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-teal-50 rounded-2xl border border-teal-100 p-5">
                  <h4 className="font-bold text-sm text-teal-700 mb-3 text-center font-outfit">Your Discussion Stats</h4>
                  <div className="flex justify-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-black text-gray-900">128</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-gray-900">1.4k</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Upvotes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Select a thread to view
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

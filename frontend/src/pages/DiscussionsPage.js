import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Plus, User, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { discussionsApi } from '../services/api';

const CATEGORIES = ['All', 'Technical', 'Career', 'Contests'];

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
  const [selectedThread, setSelectedThread] = useState(null);
  
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal & form states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Technical');
  const [newBody, setNewBody] = useState('');

  // Reply states
  const [replyTitle, setReplyTitle] = useState('');
  const [replyBody, setReplyBody] = useState('');

  // Fetch threads from backend API
  const fetchThreads = async () => {
    try {
      const res = await discussionsApi.getThreads({
        category: activeCategory,
        query: searchQuery
      });
      setThreads(res);
    } catch (err) {
      console.error("Error fetching threads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search trigger
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchThreads();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [activeCategory, searchQuery]);

  // Reply submit handler
  const handlePostReply = async (e) => {
    e.preventDefault();
    if (!replyBody.trim()) return;
    try {
      const updated = await discussionsApi.postReply(selectedThread._id, replyBody);
      setSelectedThread(updated);
      setReplyBody('');
      setReplyTitle('');
      fetchThreads();
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  // Upvote submit handler
  const handleToggleUpvote = async () => {
    if (!selectedThread) return;
    try {
      const updated = await discussionsApi.toggleUpvote(selectedThread._id);
      setSelectedThread(updated);
      fetchThreads();
    } catch (err) {
      console.error("Error toggling upvote:", err);
    }
  };

  // View thread and increment count
  const handleSelectThread = async (thread) => {
    setSelectedThread(thread);
    try {
      const updated = await discussionsApi.incrementViews(thread._id);
      setSelectedThread(updated);
      fetchThreads();
    } catch (err) {
      console.error("Error incrementing views:", err);
    }
  };

  // Create thread submit handler
  const handleCreateThread = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    try {
      const newThread = await discussionsApi.createThread({
        title: newTitle,
        category: newCategory,
        body: newBody
      });
      setShowCreateModal(false);
      setNewTitle('');
      setNewBody('');
      setSelectedThread(newThread);
      fetchThreads();
    } catch (err) {
      console.error("Error creating thread:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white font-jakarta flex flex-col">
      <style>{`
        @keyframes float-random-custom {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(70px, -30px) rotate(15deg) scale(0.9); }
          50% { transform: translate(-30px, 70px) rotate(-15deg) scale(1.1); }
          75% { transform: translate(-70px, -20px) rotate(10deg) scale(0.95); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }
      `}</style>
      <Header />

      <div className="flex flex-1">
        {/* ==================== LEFT SIDEBAR ==================== */}
        <Sidebar />

        {/* ==================== MIDDLE: THREAD LIST ==================== */}
        <div className="w-full lg:w-[380px] border-r-[3px] border-black bg-white flex flex-col">
          <div className="p-4 border-b-2 border-black">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-black text-black font-outfit uppercase">Discussions</h2>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="p-1.5 border-2 border-black bg-[#E0F2FE] hover:bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center rounded"
                title="Create New Thread"
              >
                <Plus size={16} className="stroke-[3]" />
              </button>
            </div>
            {/* Search */}
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="Search threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 brutal-input text-xs"
              />
            </div>
            {/* Category Tabs */}
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 border-2 border-black font-black text-xs transition-all ${
                    activeCategory === cat
                      ? 'bg-[#FF3366] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Thread list */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {isLoading ? (
              <div className="p-8 text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                Loading discussions...
              </div>
            ) : threads.length === 0 ? (
              <div className="p-8 text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                No discussions found
              </div>
            ) : (
              threads.map((thread) => (
                <button
                  key={thread._id}
                  onClick={() => handleSelectThread(thread)}
                  className={`w-full text-left p-4 border-b-2 border-black transition-all flex gap-3 ${
                    selectedThread?._id === thread._id ? 'bg-[#FFF0F3] border-l-4 border-l-[#FF3366]' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-md bg-[#E0F2FE] border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={14} className="text-black stroke-[2.5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-black line-clamp-1 uppercase">{thread.title}</h4>
                    <p className="text-[10px] font-bold text-gray-500 mt-0.5 line-clamp-2 uppercase">
                      {thread.body.substring(0, 80)}{thread.body.length > 80 ? '...' : ''}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-[#FF3366] font-black uppercase">
                      <span>{thread.replies?.length || 0} replies</span>
                      <span>{thread.views || 0} views</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-black flex-shrink-0 uppercase">
                    {new Date(thread.createdAt).toLocaleDateString()}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ==================== RIGHT: THREAD DETAIL ==================== */}
        <div className="hidden lg:flex flex-col flex-1 bg-white">
          {selectedThread ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Thread header */}
              <div className="flex items-center justify-between border-b-2 border-black pb-4">
                <div>
                  <h1 className="text-2xl font-black text-black leading-none mb-3 font-outfit uppercase">{selectedThread.title}</h1>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#FFD700] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                      <User size={14} className="text-black stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-sm font-black text-black">{selectedThread.author?.fullName || selectedThread.author?.username || 'User'}</span>
                      <span className="text-xs font-semibold text-gray-400 ml-1">@{selectedThread.author?.username || 'user'}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">POSTED {new Date(selectedThread.createdAt).toLocaleDateString()} IN {selectedThread.category.toUpperCase()}</span>
                  </div>
                </div>
                {/* Upvote Button */}
                <button 
                  onClick={handleToggleUpvote}
                  className={`px-4 py-2 border-2 border-black font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1.5 uppercase ${
                    selectedThread.upvotes?.includes(currentUser?._id) ? 'bg-[#FF3366] text-white' : 'bg-[#E0F2FE] text-black'
                  }`}
                >
                  👍 UPVOTE ({selectedThread.upvotes?.length || 0})
                </button>
              </div>

              {/* Thread body */}
              {selectedThread.body && (
                <div className="bg-white border-[3px] border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                  {/* Floating drifting backgrounds */}
                  <div 
                    className="absolute text-4xl opacity-[0.25] pointer-events-none select-none z-10"
                    style={{
                      animation: 'float-random-custom 14s ease-in-out infinite',
                      right: '15%',
                      top: '30%'
                    }}
                    aria-hidden="true"
                  >
                    🐘
                  </div>
                  <div 
                    className="absolute text-4xl opacity-[0.25] pointer-events-none select-none z-10"
                    style={{
                      animation: 'float-random-custom 18s ease-in-out infinite',
                      left: '30%',
                      bottom: '15%',
                      animationDelay: '-3s'
                    }}
                    aria-hidden="true"
                  >
                    💀
                  </div>
                  <p className="text-sm font-semibold text-black leading-relaxed whitespace-pre-line uppercase relative z-20">{selectedThread.body}</p>
                </div>
              )}

              {/* Replies */}
              {selectedThread.replies?.map((reply, idx) => (
                <div key={idx} className="bg-white border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                  {/* Floating drift shape */}
                  <div 
                    className="absolute text-3xl opacity-[0.2] pointer-events-none select-none z-10"
                    style={{
                      animation: 'float-random-custom 15s ease-in-out infinite',
                      right: '10%',
                      top: '20%',
                      animationDelay: `-${idx * 3.5}s`
                    }}
                    aria-hidden="true"
                  >
                    {idx % 2 === 0 ? '💀' : '🐘'}
                  </div>
                  <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2 relative z-20">
                    <div className="w-7 h-7 rounded-md bg-[#E0F2FE] border border-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-black">
                      <User size={12} className="text-black stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-black text-black">{reply.author?.fullName || reply.author?.username || 'User'}</span>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">
                      {reply.createdAt ? new Date(reply.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-black leading-relaxed uppercase relative z-20">{reply.body}</p>
                </div>
              ))}

              {/* Post Reply Form */}
              <form onSubmit={handlePostReply} className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <h3 className="text-base font-black text-black font-outfit uppercase">Post a Reply</h3>
                <textarea
                  required
                  placeholder="Write your reply here..."
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 brutal-input text-xs resize-y"
                />
                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-2.5 bg-[#FF3366] border-2 border-black text-white font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
                    Post Reply
                  </button>
                </div>
              </form>

              {/* Bottom Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Trending */}
                <div className="bg-white border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-outfit font-black text-sm text-black mb-3 border-b-2 border-black pb-2 uppercase">Trending</h4>
                  <div className="space-y-2 font-bold text-xs">
                    {TRENDING.map((t) => (
                      <div key={t.tag} className="flex items-center justify-between">
                        <span className="text-[#FF3366] font-black">{t.tag.toUpperCase()}</span>
                        <span className="text-[10px] text-gray-500 uppercase">{t.posts} posts</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related */}
                <div className="bg-white border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-outfit font-black text-sm text-black mb-3 border-b-2 border-black pb-2 uppercase">Related Threads</h4>
                  <div className="space-y-3">
                    {RELATED.map((r) => (
                      <div key={r.title} className="text-xs font-bold">
                        <p className="text-black font-black uppercase line-clamp-1">{r.title}</p>
                        <p className="text-[9px] text-gray-500 uppercase mt-0.5">{r.replies} replies • {r.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-[#FFF0F3] border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center">
                  <h4 className="font-outfit font-black text-sm text-black mb-3 text-center border-b-2 border-black pb-2 uppercase">Your Stats</h4>
                  <div className="flex justify-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-black text-black">{threads.filter(t => t.author?._id === currentUser?._id).length}</p>
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-wide">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-black">
                        {threads.filter(t => t.author?._id === currentUser?._id).reduce((acc, curr) => acc + (curr.upvotes?.length || 0), 0)}
                      </p>
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-wide">Upvotes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ) : (
              <div 
                className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
                style={{
                  backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1.5px, transparent 1.5px)',
                  backgroundSize: '20px 20px',
                  backgroundColor: '#FAF6F0'
                }}
              >
                <div className="max-w-md w-full bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-5 animate-scale-in">
                  {/* Lottie Animation Wrapper Card */}
                  <div className="w-44 h-44 mx-auto bg-[#E0F2FE] border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex items-center justify-center p-2">
                    <DotLottieReact
                      src="https://lottie.host/17e8ce22-cc0d-4dc3-8eeb-27f77a3d738f/WzgFOqKEoP.json"
                      loop
                      autoplay
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-black text-black font-outfit uppercase tracking-tight">
                      Select a Discussion
                    </h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase mt-1 leading-relaxed max-w-sm mx-auto">
                      Click on any discussion thread in the list on the left to read posts, view replies, and contribute to the community!
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      <Footer />

      {/* Create New Thread Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6F0] border-[3px] border-black p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black relative">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-1.5 border-2 border-black bg-white hover:bg-gray-100 rounded text-black flex items-center justify-center"
              aria-label="Close modal"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>
            <h3 className="text-xl font-black text-black font-outfit uppercase mb-4">Create New Thread</h3>
            <form onSubmit={handleCreateThread} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Title</label>
                <input 
                  type="text"
                  required
                  placeholder="E.g., Dijkstra Optimization Tips"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 brutal-input text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2 brutal-input text-xs bg-white font-black"
                >
                  <option value="Technical">TECHNICAL</option>
                  <option value="Career">CAREER</option>
                  <option value="Contests">CONTESTS</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Content</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write your discussion content here..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full px-4 py-2 brutal-input text-xs resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border-2 border-black bg-white text-black text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 uppercase"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 border-2 border-black bg-[#FF3366] text-white text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase"
                >
                  CREATE THREAD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

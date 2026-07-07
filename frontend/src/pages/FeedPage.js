import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, MessageSquare, Award, BookOpen, ShoppingBag, Tag, Zap, Code2, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Mascot from '../components/Mascot';

const FeedPage = () => {
  const navigate = useNavigate();

  const FEED_ITEMS = [
    {
      id: 1,
      type: 'contest',
      timeLabel: 'in 5 days',
      title: 'Join our next Contest: Weekly Contest 510',
      description: 'Streamline and automate your DSA workflows. Compete with top developers, test your problem-solving speed under pressure, and raise your global ranking. Top 10% receive exclusive profile badges.',
      buttonLabel: 'Register Now',
      color: 'bg-[#FFD700]',
      icon: <Trophy className="w-5 h-5 text-black" />
    },
    {
      id: 2,
      type: 'official',
      timeLabel: '8 days ago',
      author: 'DevTrail Team',
      title: 'Interview Incoming: Choose Your Build',
      description: 'An interview is on the horizon. Algorithms, SQL, system design. What do you tackle first? Everyone has access to the tools, but not everyone develops the judgment to use them. Read our latest curated guide on cracking FAANG system design rounds.',
      buttonLabel: 'Read Article',
      color: 'bg-[#FF3366] text-white',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'community',
      timeLabel: '1 hour ago',
      author: 'varun_kumar_s',
      title: 'Dijkstra Optimization for Dense Graphs',
      description: 'A detailed analysis comparing Fibonacci heaps vs. simple array-based searches. If your graph is dense (E is close to V^2), a simple array implementation runs in O(V^2) and is often faster in practice due to lower constant factors. Discuss solutions here!',
      buttonLabel: 'Join Discussion',
      link: '/discussions',
      color: 'bg-emerald-400',
      icon: <MessageSquare className="w-5 h-5 text-black" />
    },
    {
      id: 4,
      type: 'announcement',
      timeLabel: '3 months ago',
      author: 'DevTrail Team',
      title: 'DevTrail Mobile App Beta Testing',
      description: 'Introducing the DevTrail mobile app, now available for smartphones and tablets. One DevTrail challenge a day keeps your coding skills sharp. Jump in for quick practice, track your daily streak, and browse discussions anywhere.',
      buttonLabel: 'Download App',
      color: 'bg-[#E0F2FE]',
      icon: <Award className="w-5 h-5 text-black" />
    }
  ];

  const SIDEBAR_WIDGETS = {
    course: {
      title: "DSA CRASH COURSE",
      subtitle: "Data Structures & Algorithms",
      desc: "Master coding interviews with our targeted problem preparation plans.",
      actionLabel: "Start Learning",
      bg: "bg-[#FFF0F3]"
    },
    contest: {
      title: "DEVTRAIL CONTESTS",
      desc: "Participate in global mock contests and earn profile badges.",
      actionLabel: "Join Contest",
      bg: "bg-[#FFFDF0]"
    },
    discuss: {
      title: "DISCUSS NOW",
      desc: "Share interview questions and get solutions from 50k+ developers.",
      actionLabel: "Let's Discuss",
      link: "/discussions"
    },
    store: {
      title: "DEVTRAIL STORE",
      desc: "Redeem your DevTrail points for stickers, shirts, and premium perks.",
      points: "1,450 POINTS",
      actionLabel: "Redeem Perks"
    }
  };

  const TRENDING_TAGS = [
    { tag: 'DynamicProgramming', count: '1.2k posts' },
    { tag: 'SystemDesign', count: '950 posts' },
    { tag: 'FAANGInterviews', count: '840 posts' },
    { tag: 'LeetCode75', count: '2.1k posts' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] font-jakarta flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Main Feed Content Area */}
        <main
          className="flex-1 border-l-[3px] border-black overflow-y-auto relative"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            backgroundColor: '#FAF6F0'
          }}
        >
          {/* Decorative shapes */}
          <div className="absolute top-10 left-10 text-6xl font-black text-black opacity-[0.03] select-none animate-float pointer-events-none" aria-hidden="true">
            &lt;/&gt;
          </div>
          <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Left Column: Feed List */}
              <div className="lg:col-span-8 space-y-6">

                {/* Section Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-black font-outfit uppercase tracking-tight">
                      Activity Feed
                    </h2>
                    <p className="text-xs font-bold text-gray-500 uppercase mt-0.5">
                      Curated updates, contests, and trending discussions
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-[#E0F2FE] font-black text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                    <Zap size={12} className="stroke-[3]" /> GENERAL FEED
                  </div>
                </div>

                {/* Feed Items */}
                <div className="space-y-6">
                  {FEED_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border-[3px] border-black p-5 md:p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 relative"
                    >
                      {/* Top Meta info */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-9 h-9 border-2 border-black rounded flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${item.color.split(' ')[0]}`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-black uppercase">
                            {item.author ? `${item.author} posted` : 'DevTrail System'}
                          </p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">
                            {item.timeLabel}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tight mb-2 hover:text-[#FF3366] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs font-semibold text-gray-700 leading-relaxed mb-4 uppercase">
                        {item.description}
                      </p>

                      {/* Action Button */}
                      <div>
                        {item.link ? (
                          <Link
                            to={item.link}
                            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-white text-black text-[10px] font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                          >
                            {item.buttonLabel} <ArrowRight size={12} strokeWidth={3} />
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              if (item.type === 'contest') {
                                navigate('/contests');
                              } else {
                                alert('Feature coming soon in DevTrail Beta!');
                              }
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-white text-black text-[10px] font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                          >
                            {item.buttonLabel} <ArrowRight size={12} strokeWidth={3} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Widgets */}
              <div className="lg:col-span-4 space-y-6">
                <Mascot />

                {/* Promo Card: DSA Crash Course */}
                <div className="border-[3px] border-black bg-[#FFF0F3] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 border-2 border-black bg-[#FF3366] text-white text-[8px] font-black uppercase">
                      PROMOTED
                    </span>
                    <Code2 size={16} className="text-black" />
                  </div>
                  <h3 className="text-base font-black text-black uppercase font-outfit">
                    {SIDEBAR_WIDGETS.course.title}
                  </h3>
                  <p className="text-[10px] font-black text-[#FF3366] mb-1.5 uppercase">
                    {SIDEBAR_WIDGETS.course.subtitle}
                  </p>
                  <p className="text-[10px] font-bold text-gray-500 mb-4 uppercase">
                    {SIDEBAR_WIDGETS.course.desc}
                  </p>
                  <button
                    onClick={() => navigate('/problems')}
                    className="w-full py-2 border-2 border-black bg-[#FF3366] text-white text-[10px] font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                  >
                    {SIDEBAR_WIDGETS.course.actionLabel}
                  </button>
                </div>

                {/* Contest Widget */}
                <div className="border-[3px] border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                    <h3 className="text-xs font-black text-black uppercase">
                      {SIDEBAR_WIDGETS.contest.title}
                    </h3>
                    <Trophy size={14} className="text-black" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 mb-4 uppercase">
                    {SIDEBAR_WIDGETS.contest.desc}
                  </p>
                  <button
                    onClick={() => navigate('/contests')}
                    className="w-full py-2 border-2 border-black bg-white text-black text-[10px] font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                  >
                    {SIDEBAR_WIDGETS.contest.actionLabel}
                  </button>
                </div>

                {/* Discuss Widget */}
                <div className="border-[3px] border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                    <h3 className="text-xs font-black text-black uppercase">
                      {SIDEBAR_WIDGETS.discuss.title}
                    </h3>
                    <MessageSquare size={14} className="text-black" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 mb-4 uppercase">
                    {SIDEBAR_WIDGETS.discuss.desc}
                  </p>
                  <Link
                    to={SIDEBAR_WIDGETS.discuss.link}
                    className="block text-center w-full py-2 border-2 border-black bg-white text-black text-[10px] font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                  >
                    {SIDEBAR_WIDGETS.discuss.actionLabel}
                  </Link>
                </div>

                {/* Store Widget */}
                <div className="border-[3px] border-black bg-[#FFFDF0] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                    <h3 className="text-xs font-black text-black uppercase">
                      {SIDEBAR_WIDGETS.store.title}
                    </h3>
                    <ShoppingBag size={14} className="text-black" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-black bg-[#FFD700] text-black text-[9px] font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase mb-3">
                    {SIDEBAR_WIDGETS.store.points}
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 mb-4 uppercase">
                    {SIDEBAR_WIDGETS.store.desc}
                  </p>
                  <button
                    onClick={() => alert('DevTrail Rewards Store is coming soon in beta!')}
                    className="w-full py-2 border-2 border-black bg-[#FFD700] text-black text-[10px] font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                  >
                    {SIDEBAR_WIDGETS.store.actionLabel}
                  </button>
                </div>

                {/* Trending Tags Widget */}
                <div className="border-[3px] border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                    <h3 className="text-xs font-black text-black uppercase">
                      TRENDING TOPICS
                    </h3>
                    <Tag size={14} className="text-black" />
                  </div>
                  <div className="space-y-2.5">
                    {TRENDING_TAGS.map((t, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px] font-black uppercase">
                        <Link to="/discussions" className="text-gray-700 hover:text-[#FF3366] hover:underline">
                          #{t.tag}
                        </Link>
                        <span className="text-gray-400">
                          {t.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default FeedPage;

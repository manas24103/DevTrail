import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Mascot from '../components/Mascot';
import { Calendar, ExternalLink, Zap } from 'lucide-react';
import { contestsApi } from '../services/api';

const ContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await contestsApi.getContests();
        setContests(res);
      } catch (err) {
        console.error("Error fetching contests:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContests();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    }) + ', ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] font-jakarta flex flex-col relative overflow-hidden">
      <Header />

      <div className="flex flex-1">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Main Contests Content Area */}
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
          <div className="absolute top-40 right-20 w-16 h-16 bg-[#FF3366] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-spin-slow pointer-events-none opacity-40 hidden xl:block" aria-hidden="true" />

          <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">

             {/* CSS Custom Keyframe Animation for drifting backgrounds */}
            <style>{`
              @keyframes float-random-custom {
                0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                25% { transform: translate(80px, -40px) rotate(15deg) scale(0.9); }
                50% { transform: translate(-40px, 80px) rotate(-15deg) scale(1.1); }
                75% { transform: translate(-85px, -30px) rotate(10deg) scale(0.95); }
                100% { transform: translate(0, 0) rotate(0deg) scale(1); }
              }
            `}</style>

            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Event Tracker */}
              <div className="lg:col-span-8">
                {/* Event Tracker Neo-Brutalist Box */}
                <div className="bg-[#FFD700] border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                  
                  {/* Floating drifting background elements */}
                  <div 
                    className="absolute text-5xl opacity-25 pointer-events-none select-none z-10"
                    style={{
                      animation: 'float-random-custom 14s ease-in-out infinite',
                      left: '20%',
                      top: '15%'
                    }}
                    aria-hidden="true"
                  >
                    🐘
                  </div>
                  <div 
                    className="absolute text-4xl opacity-25 pointer-events-none select-none z-10"
                    style={{
                      animation: 'float-random-custom 18s ease-in-out infinite',
                      right: '25%',
                      bottom: '25%',
                      animationDelay: '-4s'
                    }}
                    aria-hidden="true"
                  >
                    💀
                  </div>
                  <div 
                    className="absolute text-4xl opacity-25 pointer-events-none select-none z-10"
                    style={{
                      animation: 'float-random-custom 16s ease-in-out infinite',
                      right: '15%',
                      top: '40%',
                      animationDelay: '-7s'
                    }}
                    aria-hidden="true"
                  >
                    👻
                  </div>

                  {/* Event Tracker Title bar */}
                  <div className="flex items-center gap-5 pb-6 border-b-[3px] border-black">
                    <div className="w-14 h-14 bg-white border-[3px] border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 animate-float">
                      <Calendar className="w-7 h-7 text-black stroke-[2.5]" />
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-black text-black font-outfit uppercase tracking-tight">
                        Event Tracker
                      </h1>
                      <p className="text-xs md:text-sm font-bold text-black uppercase mt-0.5">
                        Never miss a contest again. Sync all global coding events to your calendar.
                      </p>
                    </div>
                  </div>

                  {/* Grid of Contest cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {isLoading ? (
                      <div className="col-span-1 md:col-span-2 text-center py-12 font-black text-black uppercase tracking-wider text-xs bg-white border-2 border-black border-dashed">
                        Loading live contest schedules...
                      </div>
                    ) : contests.length === 0 ? (
                      <div className="col-span-1 md:col-span-2 text-center py-12 font-black text-black uppercase tracking-wider text-xs bg-white border-2 border-black border-dashed">
                        No upcoming contests found. Try sync later!
                      </div>
                    ) : (
                      contests.map((contest, index) => {
                        const isFeatured = index === 0; // First item is highlighted
                        return (
                          <a
                            key={contest._id}
                            href={contest.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 group relative ${
                              isFeatured 
                                ? 'bg-[#FF3366] text-white' 
                                : 'bg-white text-black'
                            }`}
                          >
                            {/* Featured icon overlay */}
                            {isFeatured && (
                              <div className="absolute top-4 right-4">
                                <Zap size={16} className="text-[#FFD700] fill-[#FFD700] stroke-black stroke-2" />
                              </div>
                            )}

                            {/* Card Content */}
                            <div>
                              {/* Platform Badge */}
                              <span className={`inline-flex px-2 py-0.5 border-2 border-black text-[8px] font-black uppercase mb-3 ${
                                isFeatured 
                                  ? 'bg-[#FFD700] text-black' 
                                  : contest.platform === 'LEETCODE' 
                                    ? 'bg-[#FFFDF0] text-black' 
                                    : 'bg-[#E0F2FE] text-black'
                              }`}>
                                {contest.platform}
                              </span>

                              {/* Contest Title */}
                              <h3 className="text-base font-black uppercase font-outfit tracking-tight mb-1">
                                {contest.name}
                              </h3>

                              {/* Contest Date */}
                              <p className={`text-[11px] font-black uppercase ${
                                isFeatured ? 'text-[#FFE0E6]' : 'text-gray-500'
                              }`}>
                                {formatDate(contest.startTime)}
                              </p>
                            </div>

                            {/* Divider and Quote */}
                            <div className="mt-5">
                              <div className={`border-t-2 border-dashed my-3 ${
                                isFeatured ? 'border-[#FF8FA8]' : 'border-gray-200'
                              }`} />
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className={`text-[10px] italic font-semibold ${
                                    isFeatured ? 'text-[#FFF0F3]' : 'text-gray-400'
                                  }`}>
                                    "DURATION: {contest.duration}"
                                  </p>
                                  <p className="text-[10px] font-black uppercase mt-1">
                                    {contest.platform === 'LEETCODE' ? 'OFFICIAL RATINGS' : 'CF ROUND'}
                                  </p>
                                </div>
                                <ExternalLink size={14} className={`stroke-[2.5] ${
                                  isFeatured ? 'text-white' : 'text-black'
                                } group-hover:scale-110 transition-transform`} />
                              </div>
                            </div>

                          </a>
                        );
                      })
                    )}
                  </div>

                </div>
              </div>

              {/* Right Column: Mascot & Tips */}
              <div className="lg:col-span-4 space-y-6">
                <Mascot />
                
                {/* Information Card */}
                <div className="bg-white border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left">
                  <h4 className="text-[11px] font-black text-black uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    💡 CONTEST SYNC INFO
                  </h4>
                  <p className="text-[10px] font-bold text-gray-500 leading-relaxed uppercase">
                    All dates are adjusted dynamically in local time. Make sure to link your platforms profiles under the Settings menu so your dashboard ranking and problem solves can sync immediately after each contest finishes!
                  </p>
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

export default ContestsPage;

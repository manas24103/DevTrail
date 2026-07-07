import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Mascot from '../components/Mascot';
import { Sparkles, Cpu, BrainCircuit } from 'lucide-react';

const ProblemsPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF6F0] font-jakarta flex flex-col relative overflow-hidden">
      <Header />

      <div className="flex flex-1">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Main Problems Content Area */}
        <main 
          className="flex-1 border-l-[3px] border-black overflow-y-auto relative"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            backgroundColor: '#FAF6F0'
          }}
        >
          {/* Floating background shapes */}
          <div className="absolute top-10 left-10 text-6xl font-black text-black opacity-[0.03] select-none animate-float pointer-events-none" aria-hidden="true">
            &lt;/&gt;
          </div>
          
          <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: AI Coming Soon info */}
              <div className="lg:col-span-8">
                {/* AI Coming Soon Neo-Brutalist Box */}
                <div className="w-full bg-[#E0F2FE] border-[3px] border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden animate-scale-in">
                  {/* Decorative background shape */}
                  <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-[#FFD700] border-2 border-black opacity-40 pointer-events-none" />
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-lg bg-[#FF8FA8] border-2 border-black rotate-12 opacity-40 pointer-events-none" />

                  {/* Floating Brain/Sparkles Icon */}
                  <div className="w-20 h-20 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-float">
                    <BrainCircuit className="w-10 h-10 text-[#2D3BFA] stroke-[2.5]" />
                  </div>

                  {/* Badges */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-black tracking-wider uppercase mb-5">
                    <Sparkles size={13} className="text-[#FF3366] fill-[#FF3366]" />
                    FEATURE COMING SOON
                  </div>

                  {/* Header */}
                  <h1 className="text-3xl md:text-5xl font-black text-black font-outfit uppercase tracking-tight mb-4 leading-none">
                    AI-Powered Weak Topic Assistant
                  </h1>

                  {/* Description Paragraph */}
                  <p className="text-sm md:text-base font-bold text-gray-800 uppercase leading-relaxed max-w-2xl mx-auto mb-8">
                    We are actively working on an advanced AI integration for this feature. Soon, you will be able to query the DevTrail AI directly to analyze your submission patterns, identify your weak topics, and receive tailored practice guidelines and suggestions.
                  </p>

                  {/* Highlights/Bullet Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                    <div className="bg-white border-2 border-black p-4 text-left shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2.5 mb-1">
                        <Cpu size={16} className="text-[#FF3366]" />
                        <h3 className="text-xs font-black uppercase text-black">Weakness Analysis</h3>
                      </div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
                        AI crawls your LeetCode and Codeforces history to discover specific data structures and algorithm categories holding you back.
                      </p>
                    </div>

                    <div className="bg-white border-2 border-black p-4 text-left shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2.5 mb-1">
                        <Sparkles size={16} className="text-emerald-500" />
                        <h3 className="text-xs font-black uppercase text-black">Practice Suggestions</h3>
                      </div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
                        Receive direct prompt feedback and custom roadmap recommendations explaining how to tackle your weak spots step-by-step.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Mascot */}
              <div className="lg:col-span-4 space-y-6">
                <Mascot />
                
                {/* Secondary tip card */}
                <div className="bg-white border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left">
                  <h4 className="text-[11px] font-black text-black uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    🤖 MEET THE BOT
                  </h4>
                  <p className="text-[10px] font-bold text-gray-500 leading-relaxed uppercase">
                    Your DevBuddy sync companion automatically reviews your practice schedule to keep you motivated. AI integration will launch directly into beta in the next sprint cycle!
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

export default ProblemsPage;

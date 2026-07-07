import React, { useState, useEffect } from 'react';

const MASCOT_QUOTES = [
  "KEEP CODING, YOU'RE DOING GREAT!",
  "DID YOU PRACTICE ON LEETCODE TODAY?",
  "LINK YOUR GITHUB FOR RECRUITERS!",
  "CODEFORCES RATING UPDATE INCOMING!",
  "KEEP YOUR DEVTRAIL STREAK ALIVE!",
  "ERROR 404: WEAKNESS NOT FOUND!",
  "NEVER MISS A WEEKLY CONTEST!",
  "YOU ARE CAPABLE OF GREAT DEVS!",
  "AI SUGGESTIONS COMING SOON IN BETA!"
];

const Mascot = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % MASCOT_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FFFDF0] border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
      {/* Diagonal stripes header banner */}
      <div 
        className="h-4 border-b-2 border-black absolute top-0 left-0 right-0" 
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #FF3366, #FF3366 10px, #000 10px, #000 20px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Speech Bubble */}
      <div className="mt-4 mb-6 bg-white border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative mx-auto max-w-[220px]">
        <p className="text-[10px] font-black text-black leading-tight uppercase min-h-[30px] flex items-center justify-center">
          {MASCOT_QUOTES[quoteIndex]}
        </p>
        {/* Bubble tail */}
        <div className="w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-black absolute -bottom-2 left-1/2 -translate-x-1/2 rotate-45" />
      </div>

      {/* Neo-Brutalist Coder Mascot Figure */}
      <div className="w-24 h-24 mx-auto my-6 relative flex items-center justify-center animate-wiggle">
        {/* Headphones band */}
        <div className="w-20 h-20 rounded-full border-t-[5px] border-black absolute -top-1" />
        
        {/* Coder Yellow Square Head */}
        <div className="w-16 h-16 bg-[#FFD700] border-[3px] border-black rounded-lg relative flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          
          {/* Retro Sunglasses */}
          <div className="absolute top-4 w-12 h-3.5 flex justify-between px-1">
            <div className="w-5 h-3.5 bg-black border border-black rounded-sm" />
            <div className="w-1.5 h-0.5 bg-black mt-1.5" />
            <div className="w-5 h-3.5 bg-black border border-black rounded-sm" />
          </div>

          {/* Cute blush cheeks */}
          <div className="absolute top-8 left-1.5 w-2.5 h-1.5 bg-[#FF8FA8] rounded-full" />
          <div className="absolute top-8 right-1.5 w-2.5 h-1.5 bg-[#FF8FA8] rounded-full" />

          {/* Smile */}
          <div className="w-3.5 h-2 border-b-[2.5px] border-black rounded-b-full absolute bottom-4" />
        </div>

        {/* Headphones Earcups */}
        <div className="w-4 h-8 bg-[#FF3366] border-[3px] border-black rounded absolute left-1 top-8" />
        <div className="w-4 h-8 bg-[#FF3366] border-[3px] border-black rounded absolute right-1 top-8" />
      </div>

      {/* Mascot Name Badge */}
      <h3 className="text-xs font-black text-black uppercase font-outfit mt-2">
        DevBuddy v1.0
      </h3>
      <p className="text-[9px] font-bold text-gray-500 uppercase mt-0.5">
        Your AI Sync Companion
      </p>
    </div>
  );
};

export default Mascot;

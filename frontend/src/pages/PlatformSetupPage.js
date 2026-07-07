import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Code, Trophy, ArrowRight, Check, X } from 'lucide-react';
import { userApi } from '../services/api';

const PlatformSetupPage = () => {
  const [formData, setFormData] = useState({
    codeforcesHandle: '',
    leetcodeHandle: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await userApi.updateHandles({
        codeforces: formData.codeforcesHandle,
        leetcode: formData.leetcodeHandle
      });
      console.log('Platform handles saved successfully:', response);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to save platform handles. Please try again.');
      console.error('Error saving handles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-jakarta relative overflow-hidden flex flex-col md:flex-row border-[6px] border-black">
      {/* Decorative floating brutal shapes */}
      <div className="absolute top-10 right-20 w-32 h-32 rounded-md bg-[#FFD700] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-float pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-[#E0F2FE] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-float-delayed pointer-events-none" aria-hidden="true" />

      {/* Left Side - Info Section */}
      <div 
        className="w-full md:w-1/2 flex items-center justify-center p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-black relative z-10"
        style={{
          backgroundImage: 'url("/hero_bg.png")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#E8EAFF'
        }}
      >
        <div className="w-full max-w-md bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-float space-y-6 text-center md:text-left">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-[#FFD700] border-[3px] border-black rounded-md flex items-center justify-center mx-auto md:mx-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Code className="w-10 h-10 text-black stroke-[2.5]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-black font-outfit uppercase tracking-tighter">
              CONNECT YOUR PLATFORMS
            </h1>
            <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed">
              Link your competitive programming and development profiles to unlock powerful aggregate analytics and custom growth insights.
            </p>
          </div>

          {/* Core Benefit boxes */}
          <div className="space-y-4">
            {[
              { icon: <Trophy className="w-6 h-6 stroke-[2.5]" />, bg: 'bg-[#FFD700]', title: 'TRACK PROGRESS', desc: 'Monitor your problem-solving metrics across multiple platforms.' },
              { icon: <Check className="w-6 h-6 stroke-[3]" />, bg: 'bg-emerald-400', title: 'GET INSIGHTS', desc: 'Identify weak areas and speed up your algorithms preparation.' },
              { icon: <Zap className="w-6 h-6 stroke-[2.5]" />, bg: 'bg-white', title: 'LEVEL UP', desc: 'Data-driven insights directly targeted to upgrade your skills.' }
            ].map(({ icon, bg, title, desc }) => (
              <div key={title} className="bg-[#FAF6F0] border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-start gap-4">
                <div className={`w-10 h-10 border-2 border-black rounded-md ${bg} flex items-center justify-center text-black flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  {icon}
                </div>
                <div className="text-left">
                  <h3 className="text-black font-black text-[11px] uppercase mb-0.5">{title}</h3>
                  <p className="text-[9px] font-bold text-gray-500 uppercase leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Setup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center mb-8 border-b-2 border-black pb-4">
              <h2 className="text-3xl font-black text-black font-outfit uppercase">PLATFORM SETUP</h2>
              <p className="text-xs font-semibold text-gray-400 uppercase mt-1">Connect your accounts to see all your stats</p>
            </div>
            
            <div className="mb-6">
              <div className="inline-flex items-center bg-[#FFE0E6] border-2 border-black px-4 py-2 font-black text-xs text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                <Code className="w-4 h-4 mr-2 stroke-[2.5]" />
                Optional Setup
              </div>
            </div>

            {error && (
              <div className="border-2 border-black bg-[#FFE0E6] p-4 mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" role="alert">
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-black stroke-[3]" />
                  <p className="text-black text-xs font-black uppercase">{error}</p>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="codeforcesHandle" className="block text-xs font-black text-black uppercase mb-2">
                  Codeforces Handle
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code className="h-5 w-5 text-black stroke-[2.5]" />
                  </div>
                  <input
                    id="codeforcesHandle"
                    name="codeforcesHandle"
                    type="text"
                    className="w-full pl-10 pr-4 py-3 brutal-input text-xs"
                    placeholder="Your Codeforces username"
                    value={formData.codeforcesHandle}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-[10px] font-bold text-gray-400 mt-1.5 uppercase">Optional - You can add this later</p>
              </div>

              <div>
                <label htmlFor="leetcodeHandle" className="block text-xs font-black text-black uppercase mb-2">
                  LeetCode Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Trophy className="h-5 w-5 text-black stroke-[2.5]" />
                  </div>
                  <input
                    id="leetcodeHandle"
                    name="leetcodeHandle"
                    type="text"
                    className="w-full pl-10 pr-4 py-3 brutal-input text-xs"
                    placeholder="Your LeetCode username"
                    value={formData.leetcodeHandle}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-[10px] font-bold text-gray-400 mt-1.5 uppercase">Optional - You can add this later</p>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-black bg-[#FF3366] text-white font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                >
                  {loading ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <span>Save & Continue</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 flex items-center justify-center px-6 py-3.5 border-2 border-black bg-[#E0F2FE] text-black font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                >
                  Skip for now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSetupPage;

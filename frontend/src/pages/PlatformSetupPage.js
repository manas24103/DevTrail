import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Code, Trophy, ArrowRight, Check, X } from 'lucide-react';

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
      // TODO: Store platform handles in backend when authentication is implemented
      console.log('Platform handles:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save platform handles. Please try again.');
      console.error('Error saving handles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Info Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-8">
            <div className="animate-slide-down">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Connect Your Platforms
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Link your coding profiles to unlock powerful analytics and insights
              </p>
            </div>

            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-700/20 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 hover:border-indigo-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Track Progress</h3>
                    <p className="text-slate-400 text-sm">Monitor your problem-solving journey</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-700/20 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 hover:border-indigo-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white shadow-lg">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Get Insights</h3>
                    <p className="text-slate-400 text-sm">Identify weak areas and improve faster</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-700/20 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 hover:border-indigo-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Level Up</h3>
                    <p className="text-slate-400 text-sm">Data-driven approach to skill improvement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Setup Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-700/20 rounded-2xl p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Platform Setup</h2>
                <p className="text-slate-400">Connect your accounts to see all your stats</p>
              </div>
              
              <div className="mb-6">
                <div className="inline-flex items-center bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 px-4 py-2 rounded-lg">
                  <Code className="w-4 h-4 mr-2 text-indigo-300" />
                  <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wide">Optional Setup</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="codeforcesHandle" className="block text-sm font-medium text-slate-300 mb-2">
                    Codeforces Handle
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Code className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                      id="codeforcesHandle"
                      name="codeforcesHandle"
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                      placeholder="Your Codeforces username"
                      value={formData.codeforcesHandle}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Optional - You can add this later</p>
                </div>

                <div>
                  <label htmlFor="leetcodeHandle" className="block text-sm font-medium text-slate-300 mb-2">
                    LeetCode Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Trophy className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                      id="leetcodeHandle"
                      name="leetcodeHandle"
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                      placeholder="Your LeetCode username"
                      value={formData.leetcodeHandle}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Optional - You can add this later</p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border border-indigo-500/50 hover:border-indigo-500/70 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <span>Save & Continue</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 hover:border-indigo-500/50 rounded-xl text-indigo-300 hover:text-indigo-200 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Skip for now
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-500 text-sm">
                  You can always update these later in your profile settings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSetupPage;

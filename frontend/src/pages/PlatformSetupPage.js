import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Zap, Code, Trophy, ArrowRight, Check, X } from 'lucide-react';

const PlatformSetupPage = () => {
  const [formData, setFormData] = useState({
    codeforcesHandle: '',
    leetcodeHandle: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
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
      // Store platform handles in user metadata
      await user.update({
        unsafeMetadata: {
          codeforcesHandle: formData.codeforcesHandle,
          leetcodeHandle: formData.leetcodeHandle
        }
      });

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
              <div className="glass-card p-6 text-left group hover:scale-105 transition-all duration-300">
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

              <div className="glass-card p-6 text-left group hover:scale-105 transition-all duration-300">
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

              <div className="glass-card p-6 text-left group hover:scale-105 transition-all duration-300">
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
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Platform Setup</h2>
                <p className="text-slate-400">Connect your accounts to see all your stats</p>
              </div>
              
              <div className="mb-6">
                <div className="glass-badge mx-auto">
                  <Code className="w-4 h-4 mr-2" />
                  <span>Optional Setup</span>
                </div>
              </div>

              {error && (
                <div className="glass-card bg-red-500/10 border-red-500/20 p-4 mb-6">
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
                      className="glass-input w-full pl-10"
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
                      className="glass-input w-full pl-10"
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
                    className="glass-button-primary flex-1 group"
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
                    className="glass-button-sm flex-1"
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

      <style jsx>{`
        .glass-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 12px 48px rgba(99, 102, 241, 0.2);
        }

        .glass-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #c7d2fe;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .glass-input {
          display: block;
          width: 100%;
          padding: 12px 16px;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .glass-input:focus {
          outline: none;
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .glass-input::placeholder {
          color: #94a3b8;
        }

        .glass-button-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.5);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .glass-button-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9));
          border-color: rgba(99, 102, 241, 0.7);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        .glass-button-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .glass-button-sm {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px;
          color: #e0e7ff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .glass-button-sm:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, -50px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, 50px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default PlatformSetupPage;

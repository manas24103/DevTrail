import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Code, Trophy, ArrowRight, Check, X, Clipboard, ExternalLink } from 'lucide-react';
import { authApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const PlatformSetupPage = () => {
  const { currentUser, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    codeforcesHandle: '',
    leetcodeHandle: ''
  });
  
  const [verificationToken, setVerificationToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [lcVerified, setLcVerified] = useState(false);
  const [cfVerified, setCfVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load verification token and user state on mount
  useEffect(() => {
    const init = async () => {
      try {
        const tokenRes = await authApi.getVerificationToken();
        setVerificationToken(tokenRes.token || tokenRes);
        
        if (currentUser?.handles) {
          setFormData({
            codeforcesHandle: currentUser.handles.codeforces || '',
            leetcodeHandle: currentUser.handles.leetcode || ''
          });
          setLcVerified(!!currentUser.handles.lcVerified);
          setCfVerified(!!currentUser.handles.cfVerified);
        }
      } catch (err) {
        console.error('Error loading setup data:', err);
      }
    };
    init();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyToClipboard = () => {
    if (verificationToken) {
      navigator.clipboard.writeText(verificationToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleVerify = async (platform) => {
    const handle = platform === 'leetcode' ? formData.leetcodeHandle : formData.codeforcesHandle;
    if (!handle.trim()) {
      setError(`Please enter a ${platform === 'leetcode' ? 'LeetCode' : 'Codeforces'} handle to verify.`);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await authApi.verifyHandle(platform, handle.trim());
      const updatedUser = response?.user || response;
      updateUser(updatedUser);
      
      if (platform === 'leetcode') setLcVerified(true);
      if (platform === 'codeforces') setCfVerified(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || `Failed to verify ${platform} handle.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-jakarta relative overflow-hidden flex flex-col md:flex-row border-[6px] border-black">
      {/* Decorative brutal shapes */}
      <div className="absolute top-10 right-20 w-32 h-32 rounded-md bg-[#FFD700] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-float pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-[#E0F2FE] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-float-delayed pointer-events-none" aria-hidden="true" />

      {/* Left Side - Info Section */}
      <div 
        className="w-full md:w-1/2 flex items-center justify-center p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-black relative z-10 animate-fade-in"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px',
          backgroundColor: '#E8EAFF'
        }}
      >
        <div className="w-full max-w-md bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-[#FFD700] border-[3px] border-black rounded-md flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Code className="w-8 h-8 text-black stroke-[2.5]" />
            </div>
            <h1 className="text-3xl font-black text-black font-outfit uppercase tracking-tighter leading-none">
              VERIFY YOUR PROFILES
            </h1>
            <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed">
              We enforce biography verification to prove you own the competitive coding profiles you link to your DevTrail dashboard.
            </p>
          </div>

          {/* Verification Steps Box */}
          <div className="bg-[#FFFDF0] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="text-xs font-black uppercase text-black font-outfit flex items-center gap-2">
              <Zap size={14} className="fill-[#FFD700]" /> STEPS TO VERIFY
            </h3>
            <ol className="list-decimal list-inside text-[10px] font-bold text-gray-600 space-y-2 uppercase leading-normal">
              <li>Copy the verification key shown in the dashboard.</li>
              <li>Paste the key into your external profile settings:
                <ul className="list-disc list-inside pl-4 mt-1 text-gray-500 space-y-1">
                  <li>LeetCode: "About Me" / Biography box</li>
                  <li>Codeforces: "Organization" field</li>
                </ul>
              </li>
              <li>Save changes on their site, then click "Verify" here!</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Right Side - Setup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white relative z-10">
        <div className="w-full max-w-md space-y-6">
          <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center mb-6 border-b-2 border-black pb-4">
              <h2 className="text-2xl font-black text-black font-outfit uppercase tracking-tight">LINK PROFILES</h2>
              <p className="text-xs font-semibold text-gray-400 uppercase mt-1">Verify handles to unlock statistics sync</p>
            </div>

            {/* Verification Key Display Box */}
            <div className="mb-6 bg-[#FAF6F0] border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">YOUR UNIQUE KEY</p>
                <code className="text-xs font-mono font-bold text-black tracking-wider">{verificationToken || 'Generating...'}</code>
              </div>
              <button 
                onClick={copyToClipboard}
                className="p-2 border-2 border-black bg-white hover:bg-gray-50 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1.5 text-[9px] font-black uppercase"
              >
                <Clipboard size={12} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {error && (
              <div className="border-2 border-black bg-[#FFE0E6] p-4 mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-shake" role="alert">
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-black stroke-[3]" />
                  <p className="text-black text-xs font-black uppercase">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* LeetCode Input */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-black uppercase">
                  LeetCode Username
                </label>
                {lcVerified ? (
                  <div className="bg-emerald-50 border-2 border-emerald-500 p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                    <span className="text-xs font-black text-emerald-800 uppercase flex items-center gap-2">
                      <Check size={14} className="stroke-[3]" /> VERIFIED: {formData.leetcodeHandle}
                    </span>
                    <button 
                      onClick={() => setLcVerified(false)} 
                      className="text-[9px] font-black text-gray-500 hover:text-black uppercase underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black stroke-[2.5]" />
                      <input
                        name="leetcodeHandle"
                        type="text"
                        className="w-full pl-9 pr-3 py-2.5 brutal-input text-xs"
                        placeholder="LeetCode Username"
                        value={formData.leetcodeHandle}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      onClick={() => handleVerify('leetcode')}
                      disabled={loading || !formData.leetcodeHandle}
                      className="px-4 py-2.5 border-2 border-black bg-[#FFD700] text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase flex items-center gap-1.5"
                    >
                      Verify
                    </button>
                  </div>
                )}
                {!lcVerified && (
                  <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                    <span>Instructions: Paste key in About Me</span>
                    <a href="https://leetcode.com/profile/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black flex items-center gap-0.5 underline">
                      Go to LeetCode <ExternalLink size={8} />
                    </a>
                  </div>
                )}
              </div>

              {/* Codeforces Input */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-black uppercase">
                  Codeforces Handle
                </label>
                {cfVerified ? (
                  <div className="bg-emerald-50 border-2 border-emerald-500 p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                    <span className="text-xs font-black text-emerald-800 uppercase flex items-center gap-2">
                      <Check size={14} className="stroke-[3]" /> VERIFIED: {formData.codeforcesHandle}
                    </span>
                    <button 
                      onClick={() => setCfVerified(false)} 
                      className="text-[9px] font-black text-gray-500 hover:text-black uppercase underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black stroke-[2.5]" />
                      <input
                        name="codeforcesHandle"
                        type="text"
                        className="w-full pl-9 pr-3 py-2.5 brutal-input text-xs"
                        placeholder="Codeforces Handle"
                        value={formData.codeforcesHandle}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      onClick={() => handleVerify('codeforces')}
                      disabled={loading || !formData.codeforcesHandle}
                      className="px-4 py-2.5 border-2 border-black bg-[#FFD700] text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase flex items-center gap-1.5"
                    >
                      Verify
                    </button>
                  </div>
                )}
                {!cfVerified && (
                  <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                    <span>Instructions: Paste key in Organization</span>
                    <a href="https://codeforces.com/settings/social" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black flex items-center gap-0.5 underline">
                      Go to Codeforces <ExternalLink size={8} />
                    </a>
                  </div>
                )}
              </div>

              {/* Action row */}
              <div className="flex gap-4 pt-4 border-t-2 border-black">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-black bg-[#FF3366] text-white font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
                
                <button
                  onClick={handleSkip}
                  className="px-4 py-3.5 border-2 border-black bg-[#E0F2FE] text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSetupPage;

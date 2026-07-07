import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userApi, authApi } from '../services/api';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { User, Mail, Code2, Link as FileText, GraduationCap, Github, Linkedin, Twitter, Globe, Save, CheckCircle, Sparkles, Clipboard, ExternalLink, Check, X } from 'lucide-react';
import Mascot from '../components/Mascot';

const SettingsPage = () => {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    fullName: '',
    codeforcesHandle: '',
    leetcodeHandle: '',
    about: '',
    education: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
  });

  const [verificationToken, setVerificationToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [lcVerified, setLcVerified] = useState(false);
  const [cfVerified, setCfVerified] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Load current user data on mount
  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        codeforcesHandle: currentUser.handles?.codeforces || '',
        leetcodeHandle: currentUser.handles?.leetcode || '',
        about: currentUser.about || '',
        education: currentUser.education || '',
        github: currentUser.socials?.github || '',
        linkedin: currentUser.socials?.linkedin || '',
        twitter: currentUser.socials?.twitter || '',
        website: currentUser.socials?.website || ''
      });
      setLcVerified(!!currentUser.handles?.lcVerified);
      setCfVerified(!!currentUser.handles?.cfVerified);
    }

    const fetchToken = async () => {
      try {
        const res = await authApi.getVerificationToken();
        setVerificationToken(res.token || res);
      } catch (err) {
        console.error("Error loading verification token:", err);
      }
    };
    fetchToken();
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
      setMessage({ type: 'error', text: `Please enter a ${platform === 'leetcode' ? 'LeetCode' : 'Codeforces'} handle to verify.` });
      return;
    }

    setVerifyLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await authApi.verifyHandle(platform, handle.trim());
      const updatedUser = response?.user || response;
      updateUser(updatedUser);
      
      if (platform === 'leetcode') setLcVerified(true);
      if (platform === 'codeforces') setCfVerified(true);
      setMessage({ type: 'success', text: `${platform === 'leetcode' ? 'LeetCode' : 'Codeforces'} handle verified and linked successfully!` });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || err.message || `Failed to verify ${platform} handle.` });
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // 1. Update Profile fields (fullName, about, education, socials)
      const profileResponse = await userApi.updateProfile({
        fullName: formData.fullName,
        about: formData.about,
        education: formData.education,
        socials: {
          github: formData.github,
          linkedin: formData.linkedin,
          twitter: formData.twitter,
          website: formData.website
        }
      });

      // 2. Update handles (codeforces, leetcode)
      const handlesResponse = await userApi.updateHandles({
        codeforces: formData.codeforcesHandle,
        leetcode: formData.leetcodeHandle
      });

      // Safely extract user data from potential ApiResponse wrappers
      const profileUser = profileResponse?.data || profileResponse;
      const handlesUser = handlesResponse?.data || handlesResponse;

      // Merge and update Context State
      const mergedUser = {
        ...profileUser,
        handles: handlesUser?.handles || profileUser?.handles
      };

      updateUser(mergedUser);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error saving settings:', err);
      setMessage({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to save settings.'
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#FAF6F0] font-jakarta flex flex-col relative overflow-hidden">
      <Header />

      <div className="flex flex-1">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Settings Main Content */}
        <main
          className="flex-1 relative border-l-[3px] border-black overflow-y-auto"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            backgroundColor: '#FAF6F0'
          }}
        >
          {/* Animated floating background shapes */}
          <div className="absolute top-10 left-10 text-6xl font-black text-black opacity-[0.03] select-none animate-float pointer-events-none" aria-hidden="true">
            &lt;/&gt;
          </div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-[#FFD700] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-spin-slow pointer-events-none opacity-40 hidden xl:block" aria-hidden="true" />
          <div className="absolute bottom-24 left-10 w-20 h-20 rounded-full bg-[#E0F2FE] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-float-delayed pointer-events-none opacity-40 hidden xl:block" aria-hidden="true" />

          <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">

            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Left Column: Settings Page Header & Form */}
              <div className="lg:col-span-8 space-y-6">
                {/* Page Header */}
                <div className="flex items-center gap-5 mb-4 border-b-2 border-black pb-5">
                  <div className="w-16 h-16 bg-[#FFD700] border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                    <User size={30} className="text-black stroke-[2.5]" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-black font-outfit uppercase tracking-tight">SETTINGS</h1>
                    <p className="text-xs font-bold text-gray-500 uppercase mt-0.5">Customize your profile, platforms, education and socials</p>
                  </div>
                </div>

                {/* Alert Message */}
                {message.text && (
                  <div className={`mb-6 p-4 border-2 border-black flex items-center gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase text-xs font-black ${message.type === 'error'
                      ? 'bg-[#FFE0E6] text-black'
                      : 'bg-emerald-100 text-emerald-800'
                    }`} role="alert">
                    <CheckCircle size={16} className="stroke-[2.5]" />
                    <span>{message.text}</span>
                  </div>
                )}

                {/* Settings Form */}
                <form onSubmit={handleSubmit} className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8">

                  {/* Section 1: General Info */}
                  <div className="space-y-4">
                    <div className="border-b-2 border-black pb-2">
                      <h2 className="text-sm font-black text-black uppercase font-outfit">General Information</h2>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-black text-black uppercase mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                          className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                        />
                      </div>
                    </div>

                    {/* Email (Read Only) */}
                    <div>
                      <label className="block text-xs font-black text-black uppercase mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="email"
                          value={currentUser?.email || ''}
                          disabled
                          className="w-full px-3 py-2.5 pl-9 border-2 border-black bg-gray-100 text-gray-500 text-xs cursor-not-allowed font-semibold"
                        />
                      </div>
                      <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Email address cannot be changed</p>
                    </div>
                  </div>

                  {/* Section 2: Platform Handles */}
                  <div className="space-y-4">
                    <div className="border-b-2 border-black pb-2 flex items-center justify-between">
                      <h2 className="text-sm font-black text-black uppercase font-outfit">Platform Handles</h2>
                      <span className="text-[10px] font-black text-[#FF3366] uppercase">Ownership verification required</span>
                    </div>

                    {/* Verification Key Display Box */}
                    <div className="bg-[#FFFDF0] border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase">YOUR UNIQUE VERIFICATION KEY</p>
                        <code className="text-xs font-mono font-bold text-black tracking-wider">{verificationToken || 'Generating token...'}</code>
                      </div>
                      <button 
                        type="button"
                        onClick={copyToClipboard}
                        className="px-3 py-1.5 border-2 border-black bg-white hover:bg-gray-50 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1.5 text-[9px] font-black uppercase"
                      >
                        <Clipboard size={12} />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Codeforces */}
                      <div className="space-y-2">
                        <label className="block text-xs font-black text-black uppercase">Codeforces Handle</label>
                        {cfVerified ? (
                          <div className="bg-emerald-50 border-2 border-emerald-500 p-3.5 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                            <span className="text-xs font-black text-emerald-800 uppercase flex items-center gap-2">
                              <Check size={14} className="stroke-[3]" /> CF VERIFIED: {formData.codeforcesHandle}
                            </span>
                            <button 
                              type="button"
                              onClick={() => {
                                setCfVerified(false);
                                setFormData(prev => ({ ...prev, codeforcesHandle: '' }));
                              }} 
                              className="text-[9px] font-black text-gray-500 hover:text-black uppercase underline"
                            >
                              Unlink
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                              <input
                                id="codeforcesHandle"
                                name="codeforcesHandle"
                                type="text"
                                value={formData.codeforcesHandle}
                                onChange={handleChange}
                                placeholder="username"
                                className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleVerify('codeforces')}
                              disabled={verifyLoading || !formData.codeforcesHandle}
                              className="px-4 py-2 border-2 border-black bg-[#FFD700] text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase flex items-center gap-1.5"
                            >
                              Verify
                            </button>
                          </div>
                        )}
                        {!cfVerified && (
                          <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                            <span>Paste key in Organization</span>
                            <a href="https://codeforces.com/settings/social" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black flex items-center gap-0.5 underline">
                              CF Settings <ExternalLink size={8} />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* LeetCode */}
                      <div className="space-y-2">
                        <label className="block text-xs font-black text-black uppercase">LeetCode Username</label>
                        {lcVerified ? (
                          <div className="bg-emerald-50 border-2 border-emerald-500 p-3.5 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                            <span className="text-xs font-black text-emerald-800 uppercase flex items-center gap-2">
                              <Check size={14} className="stroke-[3]" /> LC VERIFIED: {formData.leetcodeHandle}
                            </span>
                            <button 
                              type="button"
                              onClick={() => {
                                setLcVerified(false);
                                setFormData(prev => ({ ...prev, leetcodeHandle: '' }));
                              }} 
                              className="text-[9px] font-black text-gray-500 hover:text-black uppercase underline"
                            >
                              Unlink
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                              <input
                                id="leetcodeHandle"
                                name="leetcodeHandle"
                                type="text"
                                value={formData.leetcodeHandle}
                                onChange={handleChange}
                                placeholder="username"
                                className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleVerify('leetcode')}
                              disabled={verifyLoading || !formData.leetcodeHandle}
                              className="px-4 py-2 border-2 border-black bg-[#FFD700] text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase flex items-center gap-1.5"
                            >
                              Verify
                            </button>
                          </div>
                        )}
                        {!lcVerified && (
                          <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                            <span>Paste key in About Me</span>
                            <a href="https://leetcode.com/profile/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black flex items-center gap-0.5 underline">
                              LC Settings <ExternalLink size={8} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Bio & Education */}
                  <div className="space-y-4">
                    <div className="border-b-2 border-black pb-2">
                      <h2 className="text-sm font-black text-black uppercase font-outfit">About & Education</h2>
                    </div>

                    {/* About / Biography */}
                    <div>
                      <label htmlFor="about" className="block text-xs font-black text-black uppercase mb-1.5">About Section</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-4 text-black" size={16} />
                        <textarea
                          id="about"
                          name="about"
                          value={formData.about}
                          onChange={handleChange}
                          placeholder="Tell us about yourself, your programming interests, or developer goals..."
                          rows={3}
                          className="w-full px-3 py-2.5 pl-9 brutal-input text-xs resize-none"
                        />
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <label htmlFor="education" className="block text-xs font-black text-black uppercase mb-1.5">Education / Institution</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                        <input
                          id="education"
                          name="education"
                          type="text"
                          value={formData.education}
                          onChange={handleChange}
                          placeholder="e.g., Indian Institute of Technology (IIT), Delhi"
                          className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                        />
                      </div>
                      <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Where are you studying now / where did you graduate</p>
                    </div>
                  </div>

                  {/* Section 4: Social Links */}
                  <div className="space-y-4">
                    <div className="border-b-2 border-black pb-2">
                      <h2 className="text-sm font-black text-black uppercase font-outfit">Social Media & Websites</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* GitHub */}
                      <div>
                        <label htmlFor="github" className="block text-xs font-black text-black uppercase mb-1.5">GitHub Profile Link</label>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                          <input
                            id="github"
                            name="github"
                            type="url"
                            value={formData.github}
                            onChange={handleChange}
                            placeholder="https://github.com/username"
                            className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                          />
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label htmlFor="linkedin" className="block text-xs font-black text-black uppercase mb-1.5">LinkedIn Profile Link</label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                          <input
                            id="linkedin"
                            name="linkedin"
                            type="url"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                          />
                        </div>
                      </div>

                      {/* Twitter/X */}
                      <div>
                        <label htmlFor="twitter" className="block text-xs font-black text-black uppercase mb-1.5">Twitter / X Link</label>
                        <div className="relative">
                          <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                          <input
                            id="twitter"
                            name="twitter"
                            type="url"
                            value={formData.twitter}
                            onChange={handleChange}
                            placeholder="https://x.com/username"
                            className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                          />
                        </div>
                      </div>

                      {/* Personal Website */}
                      <div>
                        <label htmlFor="website" className="block text-xs font-black text-black uppercase mb-1.5">Portfolio / Website Link</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                          <input
                            id="website"
                            name="website"
                            type="url"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://myportfolio.com"
                            className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t-2 border-black flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3.5 border-2 border-black bg-[#FF3366] text-white text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 uppercase font-outfit"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save size={14} className="stroke-[3]" /> Save Settings
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

              {/* Right Column: Mascots & Tips */}
              <div className="lg:col-span-4 space-y-6">

                {/* Playful Interactive Coder Mascot */}
                <Mascot />

                {/* Developer Pro Tip Widget */}
                <div className="bg-[#FFF0F3] border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left">
                  <h4 className="text-[11px] font-black text-[#FF3366] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={12} className="fill-[#FF3366]" /> PRO TIP FOR PROS
                  </h4>
                  <p className="text-[9px] font-bold text-gray-600 leading-relaxed uppercase">
                    Connecting your real LeetCode and Codeforces profiles syncs your ratings automatically. Use the Settings page to keep your details updated and let recruiters view your verified progress card!
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

export default SettingsPage;

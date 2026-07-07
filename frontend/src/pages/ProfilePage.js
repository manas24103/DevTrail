import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userApi } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Mail, Code2, Trophy, Save, CheckCircle } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    codeforcesHandle: '',
    leetcodeHandle: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        codeforcesHandle: currentUser.codeforcesHandle || '',
        leetcodeHandle: currentUser.leetcodeHandle || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await userApi.updateProfile(formData);
      updateUser(response.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-[#FF3366] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-black rounded-full animate-spin" />
          </div>
          <p className="text-sm font-black text-black uppercase tracking-wider">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-jakarta flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        {/* Profile Header */}
        <div className="flex items-center gap-5 mb-8 border-b-2 border-black pb-5">
          <div className="w-20 h-20 bg-[#FFD700] border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <User size={36} className="text-black stroke-[3]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-black font-outfit uppercase">PROFILE SETTINGS</h1>
            <p className="text-xs font-bold text-gray-500 uppercase mt-0.5">Manage your account and platform connections</p>
          </div>
        </div>
        
        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 border-2 border-black flex items-center gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
            message.type === 'error' 
              ? 'bg-[#FFE0E6] text-black' 
              : 'bg-emerald-50 text-emerald-800'
          }`} role="alert">
            <CheckCircle size={16} className="stroke-[2.5]" />
            <span className="text-xs font-black uppercase">{message.text}</span>
          </div>
        )}

        {/* Profile Form Card */}
        <div className="bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (disabled) */}
            <div>
              <label className="block text-xs font-black text-black uppercase mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" size={16} />
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border-2 border-black bg-gray-100 text-gray-500 text-xs cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-1.5 uppercase">Email cannot be changed</p>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-black pt-6">
              <h3 className="text-sm font-black text-black mb-1 font-outfit uppercase">Platform Connections</h3>
              <p className="text-[10px] font-bold text-gray-500 mb-4 uppercase">Link your coding platform handles to track your progress</p>
            </div>

            {/* Codeforces Handle */}
            <div>
              <label htmlFor="codeforcesHandle" className="block text-xs font-black text-black uppercase mb-2">
                Codeforces Handle
              </label>
              <div className="relative">
                <Code2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black animate-wiggle" size={16} />
                <input
                  type="text"
                  id="codeforcesHandle"
                  name="codeforcesHandle"
                  value={formData.codeforcesHandle}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 brutal-input text-xs"
                  placeholder="Enter your Codeforces handle"
                />
              </div>
            </div>

            {/* LeetCode Handle */}
            <div>
              <label htmlFor="leetcodeHandle" className="block text-xs font-black text-black uppercase mb-2">
                LeetCode Handle
              </label>
              <div className="relative">
                <Trophy className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" size={16} />
                <input
                  type="text"
                  id="leetcodeHandle"
                  name="leetcodeHandle"
                  value={formData.leetcodeHandle}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 brutal-input text-xs"
                  placeholder="Enter your LeetCode handle"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-xs font-black transition-all ${
                  loading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#FF3366] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <Save size={16} className="stroke-[2.5]" />
                {loading ? 'SAVING...' : 'SAVE CHANGES'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;

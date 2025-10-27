import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userApi } from '../services/api';

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
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={currentUser.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="codeforcesHandle" className="block text-sm font-medium text-gray-700 mb-1">
              Codeforces Handle
            </label>
            <input
              type="text"
              id="codeforcesHandle"
              name="codeforcesHandle"
              value={formData.codeforcesHandle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your Codeforces handle"
            />
          </div>

          <div>
            <label htmlFor="leetcodeHandle" className="block text-sm font-medium text-gray-700 mb-1">
              LeetCode Handle
            </label>
            <input
              type="text"
              id="leetcodeHandle"
              name="leetcodeHandle"
              value={formData.leetcodeHandle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your LeetCode handle"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading 
                  ? 'bg-blue-400' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

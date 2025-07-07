import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from '../utils/axios';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    codeforcesHandle: '',
    leetcodeHandle: '',
    preferences: {
      theme: 'light',
      defaultPlatform: 'all',
    },
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        codeforcesHandle: user.codeforcesHandle || '',
        leetcodeHandle: user.leetcodeHandle || '',
        preferences: {
          theme: user.preferences?.theme || 'light',
          defaultPlatform: user.preferences?.defaultPlatform || 'all',
        },
      });
    }
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage('Profile updated successfully!');
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred while updating your profile');
      console.error('Profile update error:', err);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile Settings</h1>
      
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={onSubmit} className="profile-form">
        <div className="form-section">
          <h3>Platform Handles</h3>
          
          <div className="form-group">
            <label>Codeforces Handle</label>
            <input
              type="text"
              name="codeforcesHandle"
              value={formData.codeforcesHandle}
              onChange={onChange}
              placeholder="Your Codeforces username"
            />
          </div>
          
          <div className="form-group">
            <label>LeetCode Handle</label>
            <input
              type="text"
              name="leetcodeHandle"
              value={formData.leetcodeHandle}
              onChange={onChange}
              placeholder="Your LeetCode username"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Preferences</h3>
          
          <div className="form-group">
            <label>Theme</label>
            <select
              name="preferences.theme"
              value={formData.preferences.theme}
              onChange={onChange}
              className="form-control"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Default Platform</label>
            <select
              name="preferences.defaultPlatform"
              value={formData.preferences.defaultPlatform}
              onChange={onChange}
              className="form-control"
            >
              <option value="all">All Platforms</option>
              <option value="codeforces">Codeforces</option>
              <option value="leetcode">LeetCode</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;

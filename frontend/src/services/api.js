import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getCodeforcesData = (username) =>
  axios.get(`${API_BASE_URL}/codeforces/${username}`);

export const getLeetcodeData = (username) =>
  axios.get(`${API_BASE_URL}/leetcode/${username}`);

const axios = require('axios');

const getCodeforcesData = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    res.json(response.data.result[0]);
  } catch (error) {
    console.error('Error fetching Codeforces data:', error);
    res.status(500).json({ error: 'Failed to fetch Codeforces data' });
  }
};

module.exports = { getCodeforcesData };

import axios from "axios";

const BASE_URL = "https://codeforces.com/api";

// Helper for clean API requests
const makeRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, { 
      params,
      timeout: 10000 // 10 second timeout
    });
    
    if (response.data.status !== "OK") {
      throw new Error(response.data.comment || "Codeforces API error");
    }
    
    return response.data.result;
  } catch (error) {
    console.error("Codeforces API Error:", error.message);
    throw new Error(error.message || "Failed to fetch data from Codeforces");
  }
};

// Get user info
const getUserInfo = async (req, res) => {
  try {
    const { handle } = req.params;
    if (!handle) return res.status(400).json({ message: "Handle required" });

    const data = await makeRequest("/user.info", { handles: handle });
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user rating history
const getUserRating = async (req, res) => {
  try {
    const { handle } = req.params;
    if (!handle) return res.status(400).json({ message: "Handle required" });

    const data = await makeRequest("/user.rating", { handle });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user submissions
const getUserSubmissions = async (req, res) => {
  try {
    const { handle } = req.params;
    const { count = 50 } = req.query;
    
    if (!handle) return res.status(400).json({ message: "Handle required" });

    const data = await makeRequest("/user.status", { 
      handle, 
      from: 1, 
      count: parseInt(count)
    });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getUserInfo,
  getUserRating,
  getUserSubmissions
};

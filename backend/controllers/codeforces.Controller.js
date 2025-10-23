import axios from 'axios';
import { createHash } from 'crypto';

// Rate limiting setup
const RATE_LIMIT_WINDOW = 2000; // 2 seconds
let lastRequestTime = 0;

// Generate API signature for authenticated requests
const generateApiSignature = (method, params, secret) => {
  const rand = Math.random().toString(36).substring(2, 8); // 6 random chars
  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  const toHash = `${rand}/${method}?${paramString}#${secret}`;
  const hash = createHash('sha512').update(toHash).digest('hex');
  
  return rand + hash;
};

// Rate limiting middleware
const checkRateLimit = (req, res, next) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_WINDOW) {
    const waitTime = RATE_LIMIT_WINDOW - timeSinceLastRequest;
    return res.status(429).json({
      status: 'FAILED',
      message: `Too many requests. Please wait ${waitTime}ms before trying again.`
    });
  }
  
  lastRequestTime = now;
  next();
};

const getCodeforcesData = async (req, res) => {
  const { username } = req.params;
  const { lang = 'en' } = req.query;
  
  // Basic validation
  if (!username) {
    return res.status(400).json({
      status: 'FAILED',
      message: 'Username is required'
    });
  }

  try {
    const params = new URLSearchParams({
      handles: username,
      lang,
      // Add apiKey and time if authentication is needed
      // apiKey: process.env.CODEFORCES_API_KEY,
      // time: Math.floor(Date.now() / 1000)
    });

    // Uncomment and modify if you want to use authenticated requests
    // if (process.env.CODEFORCES_API_KEY && process.env.CODEFORCES_SECRET) {
    //   params.append('apiKey', process.env.CODEFORCES_API_KEY);
    //   params.append('time', Math.floor(Date.now() / 1000));
    //   const signature = generateApiSignature(
    //     'user.info',
    //     Object.fromEntries(params),
    //     process.env.CODEFORCES_SECRET
    //   );
    //   params.append('apiSig', signature);
    // }

    const response = await axios.get(`https://codeforces.com/api/user.info?${params}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 seconds timeout
    });

    const { status, result, comment } = response.data;

    if (status === 'OK') {
      return res.json({
        status: 'OK',
        data: result[0] || null
      });
    } else {
      return res.status(400).json({
        status: 'FAILED',
        message: comment || 'Failed to fetch user data'
      });
    }
  } catch (error) {
    console.error('Error fetching Codeforces data:', error);
    
    let statusCode = 500;
    let errorMessage = 'Failed to fetch Codeforces data';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      statusCode = error.response.status;
      errorMessage = error.response.data?.comment || error.response.statusText;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response from Codeforces API';
    }
    
    return res.status(statusCode).json({
      status: 'FAILED',
      message: errorMessage
    });
  }
};

export default { 
  getCodeforcesData,
  checkRateLimit,
  generateApiSignature
};

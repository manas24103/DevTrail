import jwt from 'jsonwebtoken';
import User from '../models/User.models.js';

export const register = async (req, res, next) => {
  try {
    console.log('Register request received:', {
      body: req.body,
      headers: req.headers,
      ip: req.ip,
      method: req.method,
      url: req.url,
    });

    const { username, email, password, codeforcesHandle, leetcodeHandle } = req.body;

    // Validate input
    if (!username || !email || !password || !codeforcesHandle || !leetcodeHandle) {
      console.warn('Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Username, email, password,codeforcesHandle,leetcodeHandle are required',
        timestamp: new Date().toISOString()
      });
    }

    // Check if user already exists (either same email or username)
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      console.warn(`Registration failed: User already exists with email or username`);
      return res.status(400).json({
        success: false,
        message: 'User already exists',
        timestamp: new Date().toISOString()
      });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password,
      codeforcesHandle,
      leetcodeHandle
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    // Convert Mongoose document to plain object
    const userObject = user.toObject();
    const { password: pwd, __v, ...userData } = userObject;

    // Successful registration response
    const response = {
      success: true,
      message: 'User registered successfully',
      token,
      data: {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        codeforcesHandle: userData.codeforcesHandle,
        leetcodeHandle: userData.leetcodeHandle,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      },
      expiresIn: '1d',
      timestamp: new Date().toISOString()
    };

    console.log(`User registered successfully: ${email}`);
    return res.status(201).json(response);
  } catch (error) {
    console.error('Registration failed', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
};

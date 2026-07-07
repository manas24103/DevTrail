import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import { generateAccessAndRefereshTokens } from "./user.controller.js";
import axios from "axios";
import crypto from "crypto";

const googleLogin = asyncHandler(async (req, res) => {
  const { code, redirectUri, mode } = req.body;

  if (!code) {
    throw new ApiError(400, "Google authorization code is required");
  }

  let email, fullName;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new ApiError(500, "Google client ID or client secret not configured on backend server");
  }

  try {
    // Exchange code for Google ID token and access token
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code', code);
    params.append('redirect_uri', redirectUri || `${process.env.FRONTEND_URL}/auth`);
    params.append('grant_type', 'authorization_code');

    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { id_token } = tokenResponse.data;
    if (!id_token) {
      throw new ApiError(400, "Failed to retrieve Google ID token from exchange");
    }

    // Verify Google ID token
    const googleResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
    const payload = googleResponse.data;

    if (payload.aud !== clientId) {
      throw new ApiError(400, "Invalid Google client ID audience mismatch");
    }

    email = payload.email;
    fullName = payload.name;
  } catch (err) {
    console.error("Google OAuth token exchange error details:", err.response?.data || err.message);
    throw new ApiError(400, err.response?.data?.error_description || err.response?.data?.error || err.message || "Failed to verify Google ID token");
  }

  if (!email) {
    throw new ApiError(400, "Could not retrieve email from Google login");
  }

  let user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    if (mode === 'signin') {
      throw new ApiError(404, "No account associated with this email. Please sign up first.");
    }
    const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') || "googleuser";
    let isUnique = false;
    let attempt = 0;
    let generatedUsername = baseUsername;
    while (!isUnique && attempt < 10) {
      const checkUser = await User.findOne({ username: generatedUsername });
      if (!checkUser) {
        isUnique = true;
      } else {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        generatedUsername = `${baseUsername}${randomSuffix}`;
        attempt++;
      }
    }

    const randomPassword = crypto.randomBytes(16).toString('hex');

    user = await User.create({
      fullName,
      username: generatedUsername,
      email: email.toLowerCase(),
      password: randomPassword,
      isVerified: true
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  const options = {
    httpOnly: true,
    secure: true
  };

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        "Logged in with Google successfully"
      )
    );
});

const githubLogin = asyncHandler(async (req, res) => {
  const { code, mode } = req.body;

  if (!code) {
    throw new ApiError(400, "GitHub authorization code is required");
  }

  let email, fullName, username;

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new ApiError(500, "GitHub client ID or client secret not configured on server");
  }

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code
      },
      {
        headers: { Accept: "application/json" }
      }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      throw new ApiError(400, "Invalid authorization code or failed to obtain access token");
    }

    const profileResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const profile = profileResponse.data;
    fullName = profile.name || profile.login;
    username = profile.login;
    email = profile.email;

    if (!email) {
      const emailsResponse = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const primaryEmailObj = emailsResponse.data.find(e => e.primary && e.verified) || emailsResponse.data[0];
      email = primaryEmailObj ? primaryEmailObj.email : null;
    }
  } catch (err) {
    console.error("GitHub OAuth token exchange error details:", err.response?.data || err.message);
    throw new ApiError(400, err.response?.data?.error_description || err.response?.data?.error || err.message || "Failed to authenticate with GitHub");
  }

  if (!email) {
    throw new ApiError(400, "Could not retrieve email from GitHub login");
  }

  let user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    if (mode === 'signin') {
      throw new ApiError(404, "No account associated with this email. Please sign up first.");
    }
    let finalUsername = username ? username.toLowerCase().replace(/[^a-z0-9]/g, '') : "githubuser";
    let isUnique = false;
    let attempt = 0;
    let generatedUsername = finalUsername;
    while (!isUnique && attempt < 10) {
      const checkUser = await User.findOne({ username: generatedUsername });
      if (!checkUser) {
        isUnique = true;
      } else {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        generatedUsername = `${finalUsername}${randomSuffix}`;
        attempt++;
      }
    }

    const randomPassword = crypto.randomBytes(16).toString('hex');

    user = await User.create({
      fullName,
      username: generatedUsername,
      email: email.toLowerCase(),
      password: randomPassword,
      isVerified: true
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  const options = {
    httpOnly: true,
    secure: true
  };

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        "Logged in with GitHub successfully"
      )
    );
});

export { googleLogin, githubLogin };

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendWelcomeEmail, sendPasswordResetEmail } from "../utils/email.js";
//Token generation
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token");
  }
}

//Register controller
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password, codeforcesHandle, leetcodeHandle } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "Full name, email and password are required");
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase()
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Generate unique username if not provided
  let generatedUsername = username;
  if (!generatedUsername) {
    const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') || "user";
    let isUnique = false;
    let attempt = 0;
    generatedUsername = baseUsername;
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
  }

  const user = await User.create({
    fullName,
    username: generatedUsername.toLowerCase(),
    email: email.toLowerCase(),
    password,
    handles: {
      codeforces: codeforcesHandle || '',
      leetcode: leetcodeHandle || ''
    }
  });

  // Send welcome email in background to prevent SMTP latency from blocking HTTP response
  sendWelcomeEmail(user.email, user.fullName).catch(error => {
    console.error('Failed to send welcome email in background:', error);
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Generate tokens for immediate sign-in
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: createdUser,
          accessToken,
          refreshToken
        },
        "User registered successfully and logged in"
      )
    );
});

//Login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({
    email
  }).select("+password");

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
  user.refreshToken = refreshToken;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken, refreshToken
        },
        "User logged in Successfully"
      )
    )
});

//Logout User
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  );

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Implementation for refreshing access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id)

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true
    };

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefereshTokens(user._id);

    user.refreshToken = newRefreshToken;
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken
          },
          "Access token refreshed"
        )
      );

  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

// Implementation for changing current password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  if (oldPassword === newPassword) {
    throw new ApiError(400, "New password must be different from old password");
  }

  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordCorrect = await user.comparePassword(oldPassword)

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword
  user.refreshToken = undefined;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false })

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully. Please login again."))
});

// Implementation for forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const resetToken = crypto.randomBytes(32).toString('hex');


  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    await sendPasswordResetEmail(user.email, resetUrl);
  } catch (error) {
    // rollback token if email fails
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new ApiError(500, "Failed to send password reset email");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset link sent to your email. Please check your inbox."));
});

// Get Profile controller
const getProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.user, "User profile retrieved successfully")
  );
});

// Update Profile controller
const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, about, education, socials } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (fullName) user.fullName = fullName;
  if (about !== undefined) user.about = about;
  if (education !== undefined) user.education = education;

  if (socials) {
    if (user.socials === undefined) {
      user.socials = {};
    }
    if (socials.github !== undefined) user.socials.github = socials.github;
    if (socials.linkedin !== undefined) user.socials.linkedin = socials.linkedin;
    if (socials.twitter !== undefined) user.socials.twitter = socials.twitter;
    if (socials.website !== undefined) user.socials.website = socials.website;
  }

  await user.save({ validateBeforeSave: false });

  const updatedUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "Profile updated successfully")
  );
});

// Update handles controller
const updateHandles = asyncHandler(async (req, res) => {
  const { codeforces, leetcode, codechef, gfg } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.handles === undefined) {
    user.handles = {};
  }

  if (codeforces !== undefined) user.handles.codeforces = codeforces;
  if (leetcode !== undefined) user.handles.leetcode = leetcode;
  if (codechef !== undefined) user.handles.codechef = codechef;
  if (gfg !== undefined) user.handles.gfg = gfg;

  await user.save({ validateBeforeSave: false });

  const updatedUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "Handles updated successfully")
  );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  forgotPassword,
  getProfile,
  updateProfile,
  updateHandles,
  generateAccessAndRefereshTokens
};
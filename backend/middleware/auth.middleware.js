import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/User.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try{
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
      if(!token){
        throw new ApiError(401, "Unauthorized request")
        
      }
      
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      
      const user = await User.findById(decodedToken._id).select("-password -refreshToken");
      
      if(!user){
        throw new ApiError(401, "Invalid access token");
      }
      
      req.user = user;
      
      // Update last activity asynchronously without blocking the request
      User.findByIdAndUpdate(user._id, { lastActivity: new Date() }).catch(err => {
        console.error("Failed to update user lastActivity:", err.message);
      });

      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
});

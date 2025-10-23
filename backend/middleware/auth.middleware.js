import jwtPkg from 'jsonwebtoken';
const { verify, TokenExpiredError } = jwtPkg;
import User from '../models/User.models.js';

// authentication middleware to verify jwt token 
export async function authenticate(req,res,next) {
    try {
      const authHeader=req.header('authorization');

      if(!authHeader){
        return res.status(401).json({
          success:false,
          message:'Unauthorized'
        });
      }

      if(!authHeader.startsWith('Bearer ')){
        return res.status(401).json({
          success:false,
          message:'Invalid token'
        });
      }

      const token=authHeader.split(' ')[1];

      if(!process.env.JWT_SECRET){
        return res.status(500).json({
          success:false,
          message:'Internal server error'
        });
      }

      try{
        const decoded =verify(token,process.env.JWT_SECRET);
        console.log('Token decoded',decoded);
        
        const user=await User.findById(decoded.id);
        if(!user){
          return res.status(401).json({
            success:false,
            message:'User not found'
          });
        }

        req.user=user.toObject();
        next();
      }
     catch (error) {
      console.error('Authentication failed',error);

      if(error instanceof TokenExpiredError){
        return res.status(401).json({
          success:false,
          message:'Token expired'
        });
      }

      return res.status(401).json({
        success:false,
        message:'Invalid token'
      });
    }
  }
  catch(error) {
    console.error('Authentication failed',error);
    return res.status(500).json({
      success:false,
      message:'Internal server error'
    });
  } 
}

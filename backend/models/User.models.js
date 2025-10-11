import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: {type: String,required: true,unique: true,trim: true,lowercase: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  codeforcesHandle: { type: String, default: '' },
  leetcodeHandle: { type: String, default: ''},
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    defaultPlatform: {
      type: String,
      enum: ['codeforces', 'leetcode', 'all'],
      default: 'all'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

//Method to generate JWT token

const User = mongoose.model('User', userSchema);
userSchema.method.genrateAuthTaken=function(){
  if(!process.env.JWT_SECRET){
    throw new error('JWT_SECRET is not configured');
  }
  return jwt.sign(
    {
      userId:this.id,
    },
    
      process.env.JWT_SECRET,
      {expiresIn:'1d'}    
  );
};

const user=mongoose.model.user || mongoose.model('user',userSchema);
export default user;
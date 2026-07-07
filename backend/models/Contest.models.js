import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    enum: ['LEETCODE', 'CODEFORCES', 'CODECHEF', 'OTHER'],
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Contest = mongoose.model('Contest', contestSchema);

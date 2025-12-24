import mongoose from 'mongoose';

const platformStatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['codeforces', 'leetcode', 'codechef', 'gfg'],
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  rank: {
    type: String,
    default: ''
  },
  solvedCount: {
    type: Number,
    default: 0
  },
  difficulty:{
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'pending'
  },
  errorMessage:{
    type: String,
    default: ''
  },
  lastUpdated: {
    type: Date,
  }
}, { timestamps: true });

platformStatsSchema.index({ userId: 1, platform: 1 }, { unique: true });

export const PlatformStats = mongoose.model('PlatformStats', platformStatsSchema);
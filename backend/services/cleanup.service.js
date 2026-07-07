import { User } from "../models/User.models.js";
import { PlatformStats } from "../models/platformStats.js";
import { Thread } from "../models/Thread.models.js";

// Clean up function to delete inactive accounts
export const performInactivityCleanup = async () => {
  console.log("\n=================== INACTIVITY CLEANUP START ===================");
  try {
    // 365 days cutoff
    const cutoff = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    
    // Find users inactive for more than 365 days
    const inactiveUsers = await User.find({ lastActivity: { $lt: cutoff } }).select("_id email fullName");
    console.log(`[Cleanup] Found ${inactiveUsers.length} inactive users matching cutoff date: ${cutoff.toISOString()}`);

    for (const u of inactiveUsers) {
      console.log(`[Cleanup] Purging inactive user account: ${u.fullName} (${u.email})`);

      // 1. Delete associated stats
      const statsRes = await PlatformStats.deleteMany({ userId: u._id });
      console.log(`[Cleanup] Purged ${statsRes.deletedCount} platform stats records.`);

      // 2. Delete threads authored by this user
      const threadRes = await Thread.deleteMany({ author: u._id });
      console.log(`[Cleanup] Purged ${threadRes.deletedCount} thread posts.`);

      // 3. Pull replies posted by this user in other threads
      const replyRes = await Thread.updateMany({}, { $pull: { replies: { author: u._id } } });
      console.log(`[Cleanup] Removed user replies from discussions.`);

      // 4. Delete User document
      await User.deleteOne({ _id: u._id });
      console.log(`[Cleanup] Successfully deleted user ID ${u._id} from database.`);
    }

    console.log("=================== INACTIVITY CLEANUP COMPLETED ===================\n");
  } catch (err) {
    console.error("[Cleanup] Critical error during inactivity cleanup routine:", err);
  }
};

// Scheduler initializer
export const initCleanupScheduler = () => {
  // Delay run once on boot (5 seconds) to avoid database lock contention
  setTimeout(() => {
    performInactivityCleanup();
  }, 5000);

  // Set interval to run once every 24 hours
  setInterval(() => {
    performInactivityCleanup();
  }, 24 * 60 * 60 * 1000);

  console.log("Background inactivity cleanup scheduler registered.");
};

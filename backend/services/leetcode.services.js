import {PlatformStats} from "../models/platformStats.js";
import {leetcodeRequest} from "../utils/leetcodeClient.js";
import {Leetcode_Dashboard_Query} from "../utils/GQLQueries.js";

export const getLeetcodeStats = async (userId,username) => {
    const cached=await PlatformStats.findOne({
        userId,
        platform:"leetcode"
    })
    if(cached && Date.now() - cached.lastUpdated<6*60*60*1000){
        return {stats:cached,recentsolved:[]};
    }

    const data=await leetcodeRequest(
        Leetcode_Dashboard_Query,
        { username}
    )

    const user=data?.matchedUser;
    if(!user){
        throw new Error("Invalid Leetcode username");
    }

    const difficulty={easy:0, medium:0, hard:0};
    let solvedCount=0;

    const acStats=user.submitStatsGlobal.acSubmissionsNum || [];
    for(const stat of acStats){
        solvedCount+=stat.count;

        const diff=stat.difficulty.toLowerCase();
        if(difficulty[diff]!=undefined){
            difficulty[diff]+=stat.count;
        }
    }
    const recentsolved=
    data.recentSubmissionList
    ?.filter(s =>s.statusDisplay=="Accepted")
    .slice(0,10)
    .map(s=>({
        title: s.title,
        url: `https://leetcode.com/problems/${s.titleSlug}/`,
        solvedAt: new Date(s.timestamp*1000)
    }))||[];

    const stats =await PlatformStats.findOneAndUpdate(
        {
            userId, platform:"leetcode",
        },
        {
            solvedCount,
            difficulty,
            rating: user.profile?.rating || 0,
            rank: user.profile?.ranking || 0,
            status:"success",
            lastUpdated:new Date()
        },
        { new: true, upsert: true }
    )
    return {stats, recentsolved};
}

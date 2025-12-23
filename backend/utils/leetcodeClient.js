import axios from "axios";
export const LeetcodeClient =axios.create({
    baseURL: "https://leetcode.com/graphql",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'referer': 'https://leetcode.com',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
});

export const leetcodeRequest=async (query,variables={}) => {
    const res=await LeetcodeClient.post("",{
        query,
        variables
    })
    if(res.data.errors) {
        throw new Error('Leetcode API error');
    }
    return res.data;
};
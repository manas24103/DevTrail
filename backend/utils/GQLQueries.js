export const Leetcode_Dashboard_Query=`
query getUserProfile($username:String!){
    allQuestionsCount{
    difficulty
    count
    }
    matchedUser(username: $username) {
    profile{
        ranking
        username
    }
    submitStats{
        totalSubmissions{
            difficulty
            count
            submissions
        }
        acSubmissionNum{
            difficulty
            count
            submissions
        }
    }
        submissionCalendar
    }
    recentSubmissionList (username: $username,limit :20){
        title
        titleSlug
        status
        difficulty
        submitTime
    }
}
`;

export const userContestRankingInfoQuery=`
query getUserContestRankingInfo($username: String!) {
    userContestRanking(username: $username) {
        rating
        attendedContestCount
        user {
            username
        }
    }
}
`;
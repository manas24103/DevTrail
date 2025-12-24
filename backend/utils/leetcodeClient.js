export const leetcodeRequest = async (query, variables) => {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) throw new Error("LeetCode GraphQL error");

  return json.data;
};

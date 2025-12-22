import axios from "axios";

const cfClient = axios.create({
  baseURL: "https://codeforces.com/api",
  timeout: 10000
});

export const cfRequest = async (endpoint, params) => {
  const res = await cfClient.get(endpoint, { params });

  if (res.data.status !== "OK") {
    throw new Error(res.data.comment || "CF API Error");
  }

  return res.data.result;
};

export default cfClient;
import { Thread } from "../models/Thread.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Fetch all threads with optional query and category filters
export const getThreads = asyncHandler(async (req, res) => {
  const { category, query } = req.query;

  // Auto-seed initial threads if collection is completely empty
  const count = await Thread.countDocuments();
  if (count === 0) {
    try {
      await Thread.create([
        {
          title: "Dijkstra Optimization using Priority Queue in C++",
          body: "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph. We can optimize it from O(V^2) to O(E log V) by using a priority queue (min-heap) to get the node with the minimum distance. Here is the snippet:\n\n```cpp\n// C++ min-heap implementation\nstd::priority_queue<PII, std::vector<PII>, std::greater<PII>> pq;\npq.push({0, start});\n```\nWhat are your thoughts on this optimization for sparse graphs?",
          author: req.user._id,
          category: "Technical",
          views: 342,
          upvotes: [req.user._id],
          replies: [
            {
              author: req.user._id,
              body: "Great post! Priority queue optimization is absolutely necessary for competitive programming where graphs are usually sparse."
            }
          ]
        },
        {
          title: "LeetCode Weekly Contest 398 Discussion",
          body: "How was today's weekly contest? Problem 3 (sum of digit differences) was a bit tricky with time complexity, and Problem 4 was a classical DP. Let's discuss our solutions and approaches here!",
          author: req.user._id,
          category: "Contests",
          views: 120,
          upvotes: [],
          replies: []
        },
        {
          title: "Tips for FAANG SDE Resume Shortlisting",
          body: "Based on my interviews, recruiters look for three main things:\n1. Strong impact-oriented bullet points (e.g. Optimized X by Y% using Z).\n2. Links to active competitive coding handles showing high ratings.\n3. Clean, well-structured projects with GitHub links.\n\nKeep it to one page!",
          author: req.user._id,
          category: "Career",
          views: 450,
          upvotes: [req.user._id],
          replies: []
        }
      ]);
    } catch (seedErr) {
      console.error("Failed to seed initial threads:", seedErr);
    }
  }

  const filter = {};
  if (category && category !== "All") {
    filter.category = category;
  }
  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { body: { $regex: query, $options: "i" } }
    ];
  }

  // Populate author details (username and fullName)
  const threads = await Thread.find(filter)
    .populate("author", "username fullName handles")
    .populate("replies.author", "username fullName")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, threads)
  );
});

// Create a new discussion thread
export const createThread = asyncHandler(async (req, res) => {
  const { title, body, category } = req.body;

  if (!title || !body || !category) {
    throw new ApiError(400, "Title, body, and category are required");
  }

  const thread = await Thread.create({
    title,
    body,
    category,
    author: req.user._id,
    upvotes: [],
    views: 1,
    replies: []
  });

  const populatedThread = await Thread.findById(thread._id)
    .populate("author", "username fullName handles");

  return res.status(201).json(
    new ApiResponse(201, populatedThread)
  );
});

// Post a reply to a thread
export const postReply = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  if (!body) {
    throw new ApiError(400, "Reply content cannot be empty");
  }

  const thread = await Thread.findById(id);
  if (!thread) {
    throw new ApiError(404, "Thread not found");
  }

  thread.replies.push({
    author: req.user._id,
    body
  });

  await thread.save();

  const updatedThread = await Thread.findById(id)
    .populate("author", "username fullName handles")
    .populate("replies.author", "username fullName");

  return res.status(200).json(
    new ApiResponse(200, updatedThread)
  );
});

// Upvote or remove upvote from a thread
export const toggleUpvote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const thread = await Thread.findById(id);
  if (!thread) {
    throw new ApiError(404, "Thread not found");
  }

  const upvoteIndex = thread.upvotes.indexOf(userId);
  if (upvoteIndex === -1) {
    thread.upvotes.push(userId);
  } else {
    thread.upvotes.splice(upvoteIndex, 1);
  }

  await thread.save();

  const updatedThread = await Thread.findById(id)
    .populate("author", "username fullName handles")
    .populate("replies.author", "username fullName");

  return res.status(200).json(
    new ApiResponse(200, updatedThread)
  );
});

// Increment view count when a thread is opened
export const incrementViews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const thread = await Thread.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  )
  .populate("author", "username fullName handles")
  .populate("replies.author", "username fullName");

  if (!thread) {
    throw new ApiError(404, "Thread not found");
  }

  return res.status(200).json(
    new ApiResponse(200, thread)
  );
});

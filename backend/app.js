import express from "express";
import cookieParser from "cookie-parser";
import setupCors from "./config/cors.js";

import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import leetcodeRoutes from "./routes/leetcode.routes.js";
import codeforcesRoutes from "./routes/codeforces.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (env-based)
setupCors(app);

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/leetcode", leetcodeRoutes);
app.use("/api/v1/codeforces", codeforcesRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;

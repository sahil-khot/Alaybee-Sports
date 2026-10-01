const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*", // Allows requests from Vite dev server & production client
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Ensure DB connection is established for serverless and standalone requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB Atlas connection error:", err.message);
  }
  next();
});

// Health Check Handler
const healthCheckHandler = (req, res) => {
  res.json({
    status: "ok",
    message: "Alaybee Sports Backend API is running smoothly",
    timestamp: new Date().toISOString(),
  });
};
app.get("/api/health", healthCheckHandler);
app.get("/health", healthCheckHandler);

// Routes (support both /api/ prefix and direct paths for Vercel serverless rewrites)
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/products", productRoutes);

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    message: err.message || "Internal server error",
  });
});

// Start Server locally when executed directly (not when imported as a serverless function)
if (require.main === module && !process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log(`🚀 Alaybee Sports Backend running on http://localhost:${PORT}`);
    await connectDB();
  });
}

module.exports = app;

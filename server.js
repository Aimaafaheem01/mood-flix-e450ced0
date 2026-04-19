const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const movieRoutes = require("./routes/movieRoutes");
const moodRoutes  = require("./routes/moodRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/movies",  movieRoutes);
app.use("/api/moods",   moodRoutes);
app.use("/api/reviews", reviewRoutes);

// ─── Health Check ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "🎬 MoodFlix API is running!", version: "1.0.0" });
});

// ─── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(" Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ─── Database + Server Start ──────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  });

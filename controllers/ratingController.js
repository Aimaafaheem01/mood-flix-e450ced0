const Rating = require("../models/Rating");

// ─── @route  GET /api/ratings?deviceId=xxx ───────────────────
const getRatings = async (req, res) => {
  try {
    const { deviceId } = req.query;
    const ratings = await Rating.find({ deviceId });
    res.json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── @route  POST /api/ratings ───────────────────────────────
const rateMovie = async (req, res) => {
  try {
    const { deviceId, tmdbId, score } = req.body;
    const rating = await Rating.findOneAndUpdate(
      { deviceId, tmdbId },
      { score },
      { upsert: true, new: true }
    );
    res.status(201).json({ success: true, message: "Rating saved!", rating });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── @route  DELETE /api/ratings ─────────────────────────────
const deleteRating = async (req, res) => {
  try {
    const { deviceId, tmdbId } = req.body;
    const rating = await Rating.findOneAndDelete({ deviceId, tmdbId });
    if (!rating) return res.status(404).json({ success: false, message: "Rating not found" });
    res.json({ success: true, message: "Rating deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getRatings, rateMovie, deleteRating };
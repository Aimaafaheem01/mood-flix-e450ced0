const Watchlist = require("../models/Watchlist");

// ─── @route  GET /api/watchlist?deviceId=xxx ─────────────────
const getWatchlist = async (req, res) => {
  try {
    const { deviceId } = req.query;
    const items = await Watchlist.find({ deviceId });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── @route  POST /api/watchlist ─────────────────────────────
const addToWatchlist = async (req, res) => {
  try {
    const { deviceId, tmdbId } = req.body;
    const item = await Watchlist.create({ deviceId, tmdbId });
    res.status(201).json({ success: true, message: "Added to watchlist!", item });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Already in watchlist" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── @route  DELETE /api/watchlist ───────────────────────────
const removeFromWatchlist = async (req, res) => {
  try {
    const { deviceId, tmdbId } = req.body;
    const item = await Watchlist.findOneAndDelete({ deviceId, tmdbId });
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    res.json({ success: true, message: "Removed from watchlist!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
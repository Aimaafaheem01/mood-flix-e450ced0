const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  tmdbId: { type: String, required: true },
}, { timestamps: true });

watchlistSchema.index({ deviceId: 1, tmdbId: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
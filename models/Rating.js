const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  tmdbId: { type: String, required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

ratingSchema.index({ deviceId: 1, tmdbId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
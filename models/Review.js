const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  tmdbId: { type: String, required: true },
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 10 },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
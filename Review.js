const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewerName: {
      type: String,
      required: [true, "Reviewer name is required"],
      trim: true,
      default: "Anonymous",
    },
    tmdbId: {
      type: Number,
      required: [true, "Movie TMDB ID is required"],
    },
    movieTitle: {
      type: String,
      required: true,
    },
    moviePoster: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating cannot exceed 10"],
    },
    reviewText: {
      type: String,
      trim: true,
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },
    mood: {
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);

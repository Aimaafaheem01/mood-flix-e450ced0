const Review = require("../models/Review");

// ─── @route  POST /api/reviews ────────────────────────────────
const createReview = async (req, res) => {
  try {
    const { tmdbId, movieTitle, moviePoster, rating, reviewText, mood, reviewerName } = req.body;

    const review = await Review.create({
      reviewerName: reviewerName || "Anonymous",
      tmdbId,
      movieTitle,
      moviePoster,
      rating,
      reviewText,
      mood,
    });

    res.status(201).json({ success: true, message: "Review posted!", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── @route  GET /api/reviews/movie/:tmdbId ───────────────────
const getMovieReviews = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      Review.find({ tmdbId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Review.countDocuments({ tmdbId }),
    ]);

    const ratingAgg = await Review.aggregate([
      { $match: { tmdbId: parseInt(tmdbId) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const avgRating = ratingAgg[0]?.avgRating?.toFixed(1) || null;

    res.json({
      success: true,
      totalReviews: total,
      avgRating,
      page,
      totalPages: Math.ceil(total / limit),
      reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── @route  DELETE /api/reviews/:id ─────────────────────────
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    res.json({ success: true, message: "Review deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── @route  POST /api/reviews/:id/like ──────────────────────
const likeReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    res.json({ success: true, likes: review.likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createReview, getMovieReviews, deleteReview, likeReview };

const express = require("express");
const router  = express.Router();
const { createReview, getMovieReviews, deleteReview, likeReview } = require("../controllers/reviewController");

router.post("/",               createReview);
router.get( "/movie/:tmdbId",  getMovieReviews);
router.delete("/:id",          deleteReview);
router.post("/:id/like",       likeReview);

module.exports = router;

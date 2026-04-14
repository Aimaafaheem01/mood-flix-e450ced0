const express = require("express");
const router  = express.Router();
const { getAllMoods, getMoviesByMood } = require("../controllers/moodController");

router.get("/",             getAllMoods);
router.get("/:mood/movies", getMoviesByMood);

module.exports = router;

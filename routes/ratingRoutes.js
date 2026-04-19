const express = require("express");
const router = express.Router();
const { getRatings, rateMovie, deleteRating } = require("../controllers/ratingController");

router.get("/", getRatings);
router.post("/", rateMovie);
router.delete("/", deleteRating);

module.exports = router;
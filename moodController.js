const { MOOD_GENRE_MAP, VALID_MOODS } = require("../config/moods");
const { getMoviesByGenres, formatMovie } = require("../utils/tmdb");

// ─── @route  GET /api/moods ───────────────────────────────────
const getAllMoods = (req, res) => {
  const moods = VALID_MOODS.map((key) => ({
    key,
    label:    MOOD_GENRE_MAP[key].label,
    keywords: MOOD_GENRE_MAP[key].keywords,
  }));
  res.json({ success: true, moods });
};

// ─── @route  GET /api/moods/:mood/movies ─────────────────────
const getMoviesByMood = async (req, res) => {
  try {
    const { mood } = req.params;
    const page = parseInt(req.query.page) || 1;

    if (!VALID_MOODS.includes(mood)) {
      return res.status(400).json({
        success: false,
        message: `Invalid mood. Valid moods: ${VALID_MOODS.join(", ")}`,
      });
    }

    const moodConfig = MOOD_GENRE_MAP[mood];
    const data = await getMoviesByGenres(moodConfig.genres, page, moodConfig.sortBy);
    const movies = data.results.map(formatMovie);

    res.json({
      success: true,
      mood: { key: mood, label: moodConfig.label },
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      movies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllMoods, getMoviesByMood };

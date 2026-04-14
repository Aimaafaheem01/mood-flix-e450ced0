const { searchMovies, getMovieDetails, getTrending, formatMovie } = require("../utils/tmdb");

// ─── @route  GET /api/movies/search?q=batman ─────────────────
const search = async (req, res) => {
  try {
    const { q, page = 1 } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "Search query is required" });

    const data = await searchMovies(q, page);
    const movies = data.results.map(formatMovie);

    res.json({
      success: true,
      query: q,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      movies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── @route  GET /api/movies/trending ────────────────────────
const trending = async (req, res) => {
  try {
    const { window = "week" } = req.query;
    const data = await getTrending(window);
    const movies = data.results.map(formatMovie);
    res.json({ success: true, movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── @route  GET /api/movies/:id ─────────────────────────────
const getDetails = async (req, res) => {
  try {
    const movie = await getMovieDetails(req.params.id);

    const formatted = {
      ...formatMovie(movie),
      tagline:  movie.tagline,
      runtime:  movie.runtime,
      genres:   movie.genres,
      cast: movie.credits?.cast?.slice(0, 10).map((c) => ({
        id:        c.id,
        name:      c.name,
        character: c.character,
        photo: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : null,
      })),
      trailer: movie.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      )?.key || null,
      similar: movie.similar?.results?.slice(0, 6).map(formatMovie),
    };

    res.json({ success: true, movie: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { search, trending, getDetails };

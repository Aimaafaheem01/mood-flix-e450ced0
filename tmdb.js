const axios = require("axios");

const TMDB_BASE = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY   = process.env.TMDB_API_KEY;
const IMG_BASE  = process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/w500";

// ─── Base TMDB request ────────────────────────────────────────
const tmdbGet = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${TMDB_BASE}${endpoint}`, {
      params: { api_key: API_KEY, language: "en-US", ...params },
    });
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.status_message || error.message;
    throw new Error(`TMDB Error: ${msg}`);
  }
};

// ─── Get movies by genre IDs ──────────────────────────────────
const getMoviesByGenres = async (genreIds, page = 1, sortBy = "popularity.desc") => {
  return await tmdbGet("/discover/movie", {
    with_genres: genreIds.join(","),
    sort_by: sortBy,
    page,
    "vote_count.gte": 100,       // Only movies with enough votes
    include_adult: false,
  });
};

// ─── Search movies ────────────────────────────────────────────
const searchMovies = async (query, page = 1) => {
  return await tmdbGet("/search/movie", { query, page, include_adult: false });
};

// ─── Get movie details ────────────────────────────────────────
const getMovieDetails = async (tmdbId) => {
  return await tmdbGet(`/movie/${tmdbId}`, {
    append_to_response: "credits,videos,similar",
  });
};

// ─── Get trending movies ──────────────────────────────────────
const getTrending = async (timeWindow = "week") => {
  return await tmdbGet(`/trending/movie/${timeWindow}`);
};

// ─── Format movie for frontend ────────────────────────────────
const formatMovie = (movie) => ({
  tmdbId:      movie.id,
  title:       movie.title,
  overview:    movie.overview,
  poster:      movie.poster_path  ? `${IMG_BASE}${movie.poster_path}`  : null,
  backdrop:    movie.backdrop_path? `${IMG_BASE}${movie.backdrop_path}`: null,
  releaseDate: movie.release_date,
  rating:      movie.vote_average,
  voteCount:   movie.vote_count,
  genres:      movie.genres || movie.genre_ids || [],
  language:    movie.original_language,
  popularity:  movie.popularity,
});

module.exports = { tmdbGet, getMoviesByGenres, searchMovies, getMovieDetails, getTrending, formatMovie };

require("dotenv").config();
const { getMovieDetails } = require("./utils/tmdb");

const movies = [
  { id: 1,  tmdbId: 120467, title: "The Grand Budapest Hotel" },
  { id: 2,  tmdbId: 194,    title: "Amélie" },
  { id: 3,  tmdbId: 38365,  title: "Eternal Sunshine of the Spotless Mind" },
  { id: 4,  tmdbId: 44943,  title: "Blue Valentine" },
  { id: 5,  tmdbId: 76341,  title: "Mad Max: Fury Road" },
  { id: 6,  tmdbId: 27205,  title: "Inception" },
  { id: 7,  tmdbId: 11832,  title: "Before Sunrise" },
  { id: 8,  tmdbId: 11036,  title: "The Notebook" },
  { id: 9,  tmdbId: 115,    title: "The Big Lebowski" },
  { id: 10, tmdbId: 153,    title: "Lost in Translation" },
  { id: 11, tmdbId: 1018,   title: "Mulholland Drive" },
  { id: 12, tmdbId: 11324,  title: "Shutter Island" },
  { id: 13, tmdbId: 1402,   title: "The Pursuit of Happyness" },
  { id: 14, tmdbId: 1367,   title: "Rocky" },
  { id: 15, tmdbId: 138843, title: "The Conjuring" },
  { id: 16, tmdbId: 462272, title: "Hereditary" },
  { id: 17, tmdbId: 13,     title: "Forrest Gump" },
  { id: 18, tmdbId: 155,    title: "The Dark Knight" },
  { id: 19, tmdbId: 244786, title: "Whiplash" },
  { id: 20, tmdbId: 152601, title: "Her" },
  { id: 21, tmdbId: 8363,   title: "Superbad" },
  { id: 22, tmdbId: 419430, title: "Get Out" },
  { id: 23, tmdbId: 313369, title: "La La Land" },
  { id: 24, tmdbId: 157336, title: "Interstellar" },
  { id: 25, tmdbId: 9377,   title: "Ferris Bueller's Day Off" },
  { id: 26, tmdbId: 2493,   title: "The Princess Bride" },
  { id: 27, tmdbId: 14160,  title: "Up" },
  { id: 28, tmdbId: 424,    title: "Schindler's List" },
  { id: 29, tmdbId: 334533, title: "Manchester by the Sea" },
  { id: 30, tmdbId: 641,    title: "Requiem for a Dream" },
  { id: 31, tmdbId: 245891, title: "John Wick" },
  { id: 32, tmdbId: 1950,   title: "Die Hard" },
  { id: 33, tmdbId: 36557,  title: "Casino Royale" },
  { id: 34, tmdbId: 4348,   title: "Pride and Prejudice" },
  { id: 35, tmdbId: 597,    title: "Titanic" },
  { id: 36, tmdbId: 476292, title: "Crazy Rich Asians" },
  { id: 37, tmdbId: 241554, title: "Chef" },
  { id: 38, tmdbId: 8392,   title: "My Neighbor Totoro" },
  { id: 39, tmdbId: 116745, title: "The Secret Life of Walter Mitty" },
  { id: 40, tmdbId: 7445,   title: "Zodiac" },
  { id: 41, tmdbId: 210577, title: "Gone Girl" },
  { id: 42, tmdbId: 141,    title: "Donnie Darko" },
  { id: 43, tmdbId: 278,    title: "The Shawshank Redemption" },
  { id: 44, tmdbId: 1272,   title: "Good Will Hunting" },
  { id: 45, tmdbId: 207,    title: "Dead Poets Society" },
  { id: 46, tmdbId: 430826, title: "A Quiet Place" },
  { id: 47, tmdbId: 9552,   title: "The Exorcist" },
  { id: 48, tmdbId: 242224, title: "It Follows" },
];

const fetchAllPosters = async () => {
  console.log("Fetching posters from TMDB...\n");

  for (const movie of movies) {
    try {
      const data = await getMovieDetails(movie.tmdbId);
      const posterPath = data.poster_path || "";
      console.log(`  { id: ${movie.id}, tmdbId: ${movie.tmdbId}, title: "${movie.title}", poster: "${posterPath}" },`);
    } catch (err) {
      console.log(`  { id: ${movie.id}, tmdbId: ${movie.tmdbId}, title: "${movie.title}", poster: "" }, // ERROR`);
    }

    // small delay to avoid hitting TMDB rate limit
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log("\nDone! Copy the poster values into your movies.ts file.");
};

fetchAllPosters();
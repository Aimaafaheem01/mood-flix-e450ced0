// TMDB Genre IDs mapped to user moods
// TMDB Genre List: https://developers.themoviedb.org/3/genres/get-movie-list

const MOOD_GENRE_MAP = {
  happy: {
    label: "Happy 😊",
    genres: [35, 10751, 16],        
    keywords: ["feel-good", "funny", "uplifting"],
    sortBy: "popularity.desc",
  },
  sad: {
    label: "Sad 😢",
    genres: [18, 10749],             
    keywords: ["emotional", "tearjerker", "heartfelt"],
    sortBy: "vote_average.desc",
  },
  excited: {
    label: "Excited 🤩",
    genres: [28, 12, 878],           
    keywords: ["thrilling", "action-packed", "epic"],
    sortBy: "popularity.desc",
  },
  scared: {
    label: "Scared 😱",
    genres: [27, 53],                // Horror, Thriller
    keywords: ["scary", "suspense", "horror"],
    sortBy: "vote_count.desc",
  },
  romantic: {
    label: "Romantic 💕",
    genres: [10749, 18],             // Romance, Drama
    keywords: ["love story", "romantic", "date night"],
    sortBy: "vote_average.desc",
  },
  bored: {
    label: "Bored 😑",
    genres: [80, 9648, 53],         
    keywords: ["gripping", "binge-worthy", "page-turner"],
    sortBy: "popularity.desc",
  },
  angry: {
    label: "Angry 😤",
    genres: [28, 80, 36],            
    keywords: ["revenge", "justice", "intense"],
    sortBy: "vote_count.desc",
  },
  relaxed: {
    label: "Relaxed 😌",
    genres: [99, 36, 10402],         // Documentary, History, Music
    keywords: ["calm", "documentary", "peaceful"],
    sortBy: "vote_average.desc",
  },
};

// All valid mood keys
const VALID_MOODS = Object.keys(MOOD_GENRE_MAP);

module.exports = { MOOD_GENRE_MAP, VALID_MOODS };

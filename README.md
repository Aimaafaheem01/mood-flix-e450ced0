# 🎬 MoodFlix Backend

> ADBMS Project — Node.js + Express + MongoDB + TMDB API  
> **No login/signup required**

---

## Setup

### 1. Install
```bash
cd backend
npm install
```

### 2. Create `.env` file
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/moodflix
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
CLIENT_URL=http://localhost:3000
```

### 3. Run
```bash
npm run dev
```

---

## API Endpoints

### 🎭 Moods
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/moods` | Get all moods |
| GET | `/api/moods/:mood/movies` | Get movies by mood |

**Valid moods:** `happy` `sad` `excited` `scared` `romantic` `bored` `angry` `relaxed`

### 🎬 Movies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies/search?q=batman` | Search movies |
| GET | `/api/movies/trending` | Trending movies |
| GET | `/api/movies/:id` | Movie details |

### ⭐ Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews` | Post a review |
| GET | `/api/reviews/movie/:tmdbId` | Get movie reviews |
| DELETE | `/api/reviews/:id` | Delete review |
| POST | `/api/reviews/:id/like` | Like a review |

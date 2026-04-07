## MOODFLIX Feature Plan

### 1. Movie Poster Images
- Generate unique poster artwork for each of the 24 movies using the image generation tool
- Update MovieCard to display poster images as backgrounds

### 2. Movie Detail Modal
- Create a `MovieDetailModal` component with full description, rating, duration, genres
- Show "similar movies" based on shared moods
- Open on card click

### 3. Search Bar
- Add search input in the header
- Filter movies by title or genre in real-time
- Show results in a grid when searching

### 4. Expand Movie Database
- Add ~20 more movies across all mood categories
- Ensure at least 8-10 movies per mood

### 5. Favorites / Watchlist (requires Lovable Cloud)
- Enable Lovable Cloud for persistence
- Create a `favorites` table
- Add heart/bookmark button on movie cards
- Add a "My Watchlist" section

### Order of implementation
1. Expand movie database (no visual dependency)
2. Generate poster images (batched)
3. Update MovieCard to show posters
4. Add movie detail modal
5. Add search bar
6. Enable Cloud + add favorites

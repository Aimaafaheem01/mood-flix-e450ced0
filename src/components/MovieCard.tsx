import { motion } from "framer-motion";
import { Star, Clock, Heart } from "lucide-react";
import { Movie } from "@/data/movies";
import { posterMap } from "@/data/posters";

interface MovieCardProps {
  movie: Movie;
  index: number;
  onClick?: (movie: Movie) => void;
  isInWatchlist?: boolean;
  onToggleWatchlist?: (movieId: number) => void;
}

const colorPool = [
  "from-red-900/80 to-red-950/90",
  "from-blue-900/80 to-blue-950/90",
  "from-emerald-900/80 to-emerald-950/90",
  "from-purple-900/80 to-purple-950/90",
  "from-amber-900/80 to-amber-950/90",
  "from-pink-900/80 to-pink-950/90",
  "from-cyan-900/80 to-cyan-950/90",
  "from-indigo-900/80 to-indigo-950/90",
];

const MovieCard = ({ movie, index, onClick, isInWatchlist, onToggleWatchlist }: MovieCardProps) => {
  const gradient = colorPool[movie.id % colorPool.length];
  const poster = posterMap[movie.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="card-netflix group min-w-[200px] w-[200px] sm:w-[220px] flex-shrink-0 cursor-pointer relative"
      onClick={() => onClick?.(movie)}
    >
      {/* Watchlist button */}
      {onToggleWatchlist && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
          className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background/90 transition-colors"
        >
          <Heart className={`w-4 h-4 transition-colors ${isInWatchlist ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
        </button>
      )}
      {/* Poster area */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            loading="lazy"
            width={512}
            height={768}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h3 className="font-display text-xl leading-tight text-foreground">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{movie.year}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2 bg-card">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            {movie.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {movie.duration}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
            >
              {g}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {movie.description}
        </p>
      </div>
    </motion.div>
  );
};

export default MovieCard;

import { motion } from "framer-motion";
import { Star, Clock, Heart } from "lucide-react";
import { Movie } from "@/data/movies";
import StarRating from "./StarRating";

interface MovieCardProps {
  movie: Movie;
  index: number;
  onClick?: (movie: Movie) => void;
  isInWatchlist?: boolean;
  onToggleWatchlist?: (movieId: number) => void;
  userRating?: number;
  onRate?: (movieId: number, score: number) => void;
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, index, onClick, isInWatchlist, onToggleWatchlist, userRating, onRate }: MovieCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="card-netflix group min-w-[200px] w-[200px] sm:w-[220px] flex-shrink-0 cursor-pointer relative"
      onClick={() => onClick?.(movie)}
    >
      {onToggleWatchlist && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
          className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background/90 transition-colors"
        >
          <Heart className={`w-4 h-4 transition-colors ${isInWatchlist ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
        </button>
      )}

      <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
        {/* Fallback background shown only if image fails */}
        <div className="absolute inset-0 bg-gray-800" />

        {/* Poster image — sits on top of fallback, no color tint */}
        <img
          src={`${TMDB_IMAGE_BASE}${movie.poster}`}
          alt={movie.title}
          loading="lazy"
          width={500}
          height={750}
          className="absolute inset-0 w-full h-full object-cover z-10"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Only a subtle dark gradient at the bottom for the title text — not a full color overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20" />

        <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
          <h3 className="font-display text-xl leading-tight text-white">{movie.title}</h3>
          <p className="text-xs text-gray-300 mt-1">{movie.year}</p>
        </div>
      </div>

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
        {onRate && (
          <div className="pt-1">
            <StarRating rating={userRating ?? 0} onRate={(s) => onRate(movie.id, s)} size="sm" />
          </div>
        )}
        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((g) => (
            <span key={g} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{g}</span>
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
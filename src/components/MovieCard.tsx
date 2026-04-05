import { motion } from "framer-motion";
import { Star, Clock } from "lucide-react";
import { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  index: number;
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

const MovieCard = ({ movie, index }: MovieCardProps) => {
  const gradient = colorPool[movie.id % colorPool.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="card-netflix group min-w-[200px] w-[200px] sm:w-[220px] flex-shrink-0 cursor-pointer"
    >
      {/* Poster area */}
      <div
        className={`relative aspect-[2/3] bg-gradient-to-br ${gradient} flex items-end p-4`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="relative z-10 w-full">
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

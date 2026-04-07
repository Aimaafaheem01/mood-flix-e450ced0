import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Star, Clock, X } from "lucide-react";
import { Movie, movies, moods } from "@/data/movies";
import { posterMap } from "@/data/posters";

interface MovieDetailModalProps {
  movie: Movie | null;
  open: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
}

const MovieDetailModal = ({ movie, open, onClose, onSelectMovie }: MovieDetailModalProps) => {
  if (!movie) return null;

  const poster = posterMap[movie.id];
  const moodLabels = movie.moods.map(m => moods.find(md => md.id === m)).filter(Boolean);

  // Find similar movies (share at least one mood, exclude current)
  const similar = movies
    .filter(m => m.id !== movie.id && m.moods.some(mood => movie.moods.includes(mood)))
    .slice(0, 6);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border max-h-[90vh] overflow-y-auto">
        {/* Hero */}
        <div className="relative h-72 sm:h-96">
          {poster ? (
            <img src={poster} alt={movie.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-background" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors z-20"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 -mt-20 relative z-10 space-y-5">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wide text-foreground">
              {movie.title}
            </h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                <Star className="w-4 h-4 fill-current" />
                {movie.rating}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {movie.duration}
              </span>
              <span>{movie.year}</span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movie.genres.map(g => (
              <span key={g} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                {g}
              </span>
            ))}
          </div>

          {/* Moods */}
          <div className="flex flex-wrap gap-2">
            {moodLabels.map(m => m && (
              <span key={m.id} className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary">
                {m.emoji} {m.label}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{movie.description}</p>

          {/* Similar Movies */}
          {similar.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-display text-2xl tracking-wide text-foreground">Similar Movies</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {similar.map(m => (
                  <button
                    key={m.id}
                    onClick={() => onSelectMovie(m)}
                    className="group/sim rounded-md overflow-hidden hover:ring-2 ring-primary transition-all"
                  >
                    <div className="aspect-[2/3] relative">
                      {posterMap[m.id] ? (
                        <img src={posterMap[m.id]} alt={m.title} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted to-background" />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/sim:opacity-100 transition-opacity flex items-end p-1">
                        <span className="text-[10px] text-foreground font-medium leading-tight">{m.title}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailModal;

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Sparkles } from "lucide-react";
import MoodSelector from "@/components/MoodSelector";
import MovieRow from "@/components/MovieRow";
import { movies, moods, Mood } from "@/data/movies";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const filteredMovies = useMemo(() => {
    if (!selectedMood) return [];
    return movies.filter((m) => m.moods.includes(selectedMood));
  }, [selectedMood]);

  const selectedMoodData = moods.find((m) => m.id === selectedMood);

  // Group by genre for multiple rows
  const genreGroups = useMemo(() => {
    const map = new Map<string, typeof filteredMovies>();
    filteredMovies.forEach((movie) => {
      movie.genres.forEach((g) => {
        if (!map.has(g)) map.set(g, []);
        map.get(g)!.push(movie);
      });
    });
    return Array.from(map.entries()).filter(([, m]) => m.length >= 2);
  }, [filteredMovies]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2">
            <Film className="w-7 h-7 text-primary" />
            <span className="font-display text-2xl tracking-wider text-gradient-primary">
              MOODFLIX
            </span>
          </div>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Pick your mood. Get the perfect movie.
          </p>
        </div>
      </header>

      {/* Hero / Mood Selection */}
      <section className="py-12 sm:py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 space-y-3"
        >
          <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-foreground">
            HOW ARE YOU <span className="text-gradient-primary">FEELING</span>?
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Select your current mood and we'll recommend the perfect movies for
            you.
          </p>
        </motion.div>

        <MoodSelector selectedMood={selectedMood} onSelectMood={setSelectedMood} />
      </section>

      {/* Results */}
      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.section
            key={selectedMood}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pb-20 px-4 sm:px-8 space-y-10"
          >
            <div className="flex items-center gap-3 container mx-auto">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-display text-3xl tracking-wide text-foreground">
                {selectedMoodData?.emoji} {selectedMoodData?.label} Picks
              </h2>
              <span className="text-sm text-muted-foreground">
                ({filteredMovies.length} movies)
              </span>
            </div>

            {/* Top picks row */}
            <div className="container mx-auto">
              <MovieRow title="Top Picks For You" movies={filteredMovies} />
            </div>

            {/* Genre rows */}
            <div className="container mx-auto space-y-8">
              {genreGroups.map(([genre, genreMovies]) => (
                <MovieRow key={genre} title={genre} movies={genreMovies} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground">
          MOODFLIX — Your mood, your movie.
        </p>
      </footer>
    </div>
  );
};

export default Index;

import { motion } from "framer-motion";
import { moods, Mood } from "@/data/movies";

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
}

const MoodSelector = ({ selectedMood, onSelectMood }: MoodSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
      {moods.map((mood, i) => {
        const isSelected = selectedMood === mood.id;
        return (
          <motion.button
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectMood(mood.id)}
            className={`relative flex flex-col items-center justify-center gap-2 p-6 rounded-xl border transition-all duration-300 cursor-pointer bg-gradient-to-br ${mood.gradient} ${
              isSelected
                ? "border-primary ring-2 ring-primary/40 glow-primary"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            {mood.emoji && <span className="text-3xl">{mood.emoji}</span>}
            <span className="font-medium text-sm tracking-wide text-foreground">
              {mood.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default MoodSelector;

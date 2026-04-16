import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRate: (score: number) => void;
  size?: "sm" | "md";
}

const StarRating = ({ rating, onRate, size = "sm" }: StarRatingProps) => {
  const [hover, setHover] = useState(0);
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={(e) => {
            e.stopPropagation();
            onRate(star === rating ? 0 : star);
          }}
          className="p-0 transition-transform hover:scale-125"
        >
          <Star
            className={`${iconSize} transition-colors ${
              star <= (hover || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;

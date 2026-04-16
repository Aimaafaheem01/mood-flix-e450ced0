import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "moodflix-ratings";

export function useRatings() {
  const [ratings, setRatings] = useState<Record<number, number>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
  }, [ratings]);

  const rate = useCallback((movieId: number, score: number) => {
    setRatings((prev) => ({ ...prev, [movieId]: score }));
  }, []);

  const getRating = useCallback(
    (movieId: number) => ratings[movieId] ?? 0,
    [ratings]
  );

  const ratedMovieIds = Object.keys(ratings).map(Number);

  return { ratings, rate, getRating, ratedMovieIds };
}

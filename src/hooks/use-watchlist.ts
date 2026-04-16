import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "moodflix-watchlist";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const toggle = useCallback((movieId: number) => {
    setWatchlist((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  }, []);

  const isInWatchlist = useCallback(
    (movieId: number) => watchlist.includes(movieId),
    [watchlist]
  );

  return { watchlist, toggle, isInWatchlist };
}

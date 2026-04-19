import { useState, useEffect, useCallback } from "react";
import { getDeviceId } from "@/lib/device";

export function useRatings() {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  // fetch ratings from MongoDB on mount
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const deviceId = getDeviceId();
        const res = await fetch(`/api/ratings?deviceId=${deviceId}`);
        const data = await res.json();

        // convert array from DB into { movieId: score } object
        const ratingsMap: Record<number, number> = {};
        data.forEach((item: { movieId: number; score: number }) => {
          ratingsMap[item.movieId] = item.score;
        });

        setRatings(ratingsMap);
      } catch (err) {
        console.error("Failed to fetch ratings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const rate = useCallback(async (movieId: number, score: number) => {
    const deviceId = getDeviceId();

    // optimistic update
    setRatings((prev) => ({ ...prev, [movieId]: score }));

    try {
      await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, movieId, score }),
      });
    } catch (err) {
      // rollback if server fails
      console.error("Failed to save rating", err);
      setRatings((prev) => {
        const copy = { ...prev };
        delete copy[movieId];
        return copy;
      });
    }
  }, []);

  const getRating = useCallback(
    (movieId: number) => ratings[movieId] ?? 0,
    [ratings]
  );

  const ratedMovieIds = Object.keys(ratings).map(Number);

  return { ratings, rate, getRating, ratedMovieIds, loading };
}
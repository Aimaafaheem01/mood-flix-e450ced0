import { useState, useEffect, useCallback } from "react";
import { getDeviceId } from "@/lib/device";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch watchlist from MongoDB on mount
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const deviceId = getDeviceId();
        const res = await fetch(`/api/watchlist?deviceId=${deviceId}`);
        const data = await res.json();
        setWatchlist(data.map((item: { movieId: number }) => item.movieId));
      } catch (err) {
        console.error("Failed to fetch watchlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const toggle = useCallback(async (movieId: number) => {
    const deviceId = getDeviceId();
    const isAdding = !watchlist.includes(movieId);

    // optimistic update (update UI instantly, don't wait for server)
    setWatchlist((prev) =>
      isAdding ? [...prev, movieId] : prev.filter((id) => id !== movieId)
    );

    try {
      await fetch("/api/watchlist", {
        method: isAdding ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, movieId }),
      });
    } catch (err) {
 
      console.error("Failed to update watchlist", err);
      setWatchlist((prev) =>
        isAdding ? prev.filter((id) => id !== movieId) : [...prev, movieId]
      );
    }
  }, [watchlist]);

  const isInWatchlist = useCallback(
    (movieId: number) => watchlist.includes(movieId),
    [watchlist]
  );

  return { watchlist, toggle, isInWatchlist, loading };
}
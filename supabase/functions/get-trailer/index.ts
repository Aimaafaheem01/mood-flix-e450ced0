// Fetches a YouTube trailer key from TMDB for a given movie title + year.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TMDB_API_KEY = Deno.env.get("TMDB_API_KEY");
    if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY not configured");

    const { title, year } = await req.json();
    if (!title || typeof title !== "string") {
      return new Response(JSON.stringify({ error: "title is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Search TMDB for the movie
    const searchUrl = new URL("https://api.themoviedb.org/3/search/movie");
    searchUrl.searchParams.set("api_key", TMDB_API_KEY);
    searchUrl.searchParams.set("query", title);
    if (year) searchUrl.searchParams.set("year", String(year));

    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const movie = searchData.results?.[0];
    if (!movie) {
      return new Response(JSON.stringify({ trailerKey: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Fetch videos for that movie
    const videosUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`;
    const videosRes = await fetch(videosUrl);
    const videosData = await videosRes.json();
    const trailer =
      videosData.results?.find(
        (v: { type: string; site: string }) =>
          v.type === "Trailer" && v.site === "YouTube",
      ) ?? videosData.results?.find((v: { site: string }) => v.site === "YouTube");

    return new Response(
      JSON.stringify({
        trailerKey: trailer?.key ?? null,
        tmdbId: movie.id,
        originalLanguage: movie.original_language ?? null,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

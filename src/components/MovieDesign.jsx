// MovieDesign.jsx
import { useState, useEffect } from "react";
import LandingPage from "../pages/LandingPage";
import Footer from "./Footer";

function MovieDesign() {
    const [query, setQuery] = useState("");
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem("watchlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                fetch(`https://www.omdbapi.com/?s=${query}&apikey=c6c6e167`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.Response === "True") {
                            setSuggestions(data.Search.slice(0, 6));
                        } else {
                            setSuggestions([]);
                        }
                    })
                    .catch(() => setSuggestions([]));
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const fetchMovie = async (title = query) => {
        if (!title.trim()) {
            setError("Please enter a movie name.");
            setMovie(null);
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=c6c6e167`);
            const data = await res.json();
            setHasSearched(true);

            if (data.Response === "True") {
                setMovie(data);
                setError("");
            } else {
                setMovie(null);
                setError("Movie not found.");
            }
        } catch {
            setMovie(null);
            setError("Failed to fetch movie.");
        } finally {
            setLoading(false);
            setSuggestions([]);
        }
    };

    const addToWatchlist = () => {
        if (!movie) return;

        const alreadyAdded = watchlist.some((item) => item.imdbID === movie.imdbID);
        if (alreadyAdded) return alert("Movie already in watchlist!");

        const updated = [...watchlist, movie];
        setWatchlist(updated);
        localStorage.setItem("watchlist", JSON.stringify(updated));
        alert("✅ Added to Watchlist!");
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
            {!hasSearched && <LandingPage />}

            <div className="relative w-full max-w-md mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type a movie name..."
                        className="flex-1 p-2 rounded text-black w-full"
                    />
                    <button
                        onClick={() => fetchMovie()}
                        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>

                {suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white text-black w-full rounded shadow mt-1 max-h-60 overflow-y-auto">
                        {suggestions.map((sug) => (
                            <li
                                key={sug.imdbID}
                                onClick={() => {
                                    setQuery(sug.Title);
                                    fetchMovie(sug.Title);
                                    setSuggestions([]);
                                }}
                                className="p-2 hover:bg-gray-200 cursor-pointer border-b border-gray-100"
                            >
                                {sug.Title} ({sug.Year})
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {loading && (
                <div className="mb-4 border-4 border-blue-400 border-t-transparent w-10 h-10 rounded-full animate-spin"></div>
            )}

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {movie && (
                <div className="flex flex-wrap gap-4 bg-white text-black rounded-2xl p-4 max-w-xl shadow-lg">
                    <div>
                        <img
                            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                            className="h-[150px] w-auto rounded"
                            alt={movie.Title}
                        />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold">{movie.Title}</h2>
                        <p><strong>Year:</strong> {movie.Year}</p>
                        <p><strong>Genre:</strong> {movie.Genre}</p>
                        <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                        <p><strong>Plot:</strong> {movie.Plot}</p>

                        <button
                            onClick={addToWatchlist}
                            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Add to Watchlist
                        </button>
                    </div>
                </div>
            )}

            {watchlist.length > 0 && (
                <div className="mt-10 w-full max-w-xl">
                    <h2 className="text-2xl font-bold mb-4">🎞 Watchlist</h2>
                    <div className="grid gap-4">
                        {watchlist.map((item) => (
                            <div key={item.imdbID} className="flex items-center gap-4 bg-white text-black p-2 rounded shadow">
                                <img src={item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/100"} alt={item.Title} className="h-20" />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.Title}</h3>
                                    <p className="text-sm text-gray-600">{item.Year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default MovieDesign;

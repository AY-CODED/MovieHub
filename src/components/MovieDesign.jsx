import { useState } from "react";

function MovieDesign() {
    const [query, setQuery] = useState("");
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");

    const fetchMovie = async () => {
        try {
            const res = await fetch(`https://www.omdbapi.com/?t=${query}&apikey= d35e0a4f`);
            const data = await res.json();
            if (data.Response === "True") {
                setMovie(data);
                setError("");
            } else {
                setMovie(null);
                setError("Movie not found.");
            }
        } catch (err) {
            setError("Failed to fetch movie.");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6">MovieSearchX</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter movie name..."
                    className="p-2 rounded text-black"
                />
                <button
                    onClick={fetchMovie}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {movie && (
                <div className="flex flex-wrap gap-4 bg-white text-black rounded-2xl p-4 max-w-xl shadow-lg">
                    <div>
                        <img
                            src={movie.Poster}
                            className="h-[150px] w-auto"
                            alt={movie.Title}
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{movie.Title}</h2>
                        <p><strong>Year:</strong> {movie.Year}</p>
                        <p><strong>Genre:</strong> {movie.Genre}</p>
                        <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                        <p><strong>Plot:</strong> {movie.Plot}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDesign;

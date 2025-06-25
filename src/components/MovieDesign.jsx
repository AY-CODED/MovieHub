import { useState } from "react";

function MovieDesign() {
    const [query, setQuery] = useState("");
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");

    const fetchMovie = async () => {
        if (!query.trim()) {
            setError("Please enter a movie name.");
            setMovie(null);
            return;
        }

        try {
            const res = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=d35e0a4f`);
            const data = await res.json();
            console.log("API DATA:", data);

            if (data.Response === "True") {
                setMovie(data);
                setError("");
            } else {
                setMovie(null);
                setError("Movie not found.");
            }
        } catch (err) {
            setMovie(null);
            setError("Failed to fetch movie.");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">

            {/* Welcome Glitch at the Top */}
            <div className="relative text-4xl sm:text-5xl font-extrabold text-white glitch mb-10 mt-4">
                <span aria-hidden="true">Welcome to MovieHub</span>
                Welcome to MovieHub
                <span aria-hidden="true">Welcome to MovieHub</span>
            </div>

            {/* Search Input */}
            <div className="flex gap-2 mb-4 w-full max-w-md">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter movie name..."
                    className="flex-1 p-2 rounded text-black"
                />
                <button
                    onClick={fetchMovie}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Movie Info Display */}
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
                    </div>
                </div>
            )}

            {/* Glitch Animation Styles */}
            <style>{`
                .glitch {
                    position: relative;
                    animation: glitch 1s infinite;
                }
                .glitch span {
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.8;
                }
                .glitch span:nth-child(1) {
                    animation: glitchTop 1s infinite;
                    color: red;
                }
                .glitch span:nth-child(3) {
                    animation: glitchBottom 1s infinite;
                    color: blue;
                }

                @keyframes glitch {
                    0% { transform: none; }
                    20% { transform: skew(-0.5deg, -0.9deg); }
                    40% { transform: skew(0.8deg, 0.2deg); }
                    60% { transform: skew(-1deg, 0deg); }
                    80% { transform: skew(0.4deg, -0.4deg); }
                    100% { transform: none; }
                }

                @keyframes glitchTop {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, -2px); }
                    40% { transform: translate(-2px, 2px); }
                    60% { transform: translate(2px, -2px); }
                    80% { transform: translate(2px, 2px); }
                    100% { transform: translate(0); }
                }

                @keyframes glitchBottom {
                    0% { transform: translate(0); }
                    20% { transform: translate(2px, 2px); }
                    40% { transform: translate(2px, -2px); }
                    60% { transform: translate(-2px, 2px); }
                    80% { transform: translate(-2px, -2px); }
                    100% { transform: translate(0); }
                }
            `}</style>
        </div>
    );
}

export default MovieDesign;

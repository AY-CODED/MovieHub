import { useState } from "react";
import Navbar from "../components/Navbar";
import LandingPage from "./LandingPage"; // Add this

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false); // Track search state

    const handleSearch = async (searchTerm) => {
        setLoading(true);
        setError("");
        setMovies([]);
        setHasSearched(true);

        try {
            const res = await fetch(
                `https://www.omdbapi.com/?s=${searchTerm}&apikey=c6c6e167`
            );
            const data = await res.json();

            if (data.Response === "True") {
                const detailedMovies = await Promise.all(
                    data.Search.map(async (movie) => {
                        const resDetail = await fetch(
                            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=c6c6e167`
                        );
                        return resDetail.json();
                    })
                );

                setMovies(detailedMovies);
            } else {
                setError(data.Error);
            }
        } catch (err) {
            setError("Error fetching data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar onSearch={handleSearch} />

            {!hasSearched && <LandingPage />} {/* Show only before searching */}

            <div className="p-4 md:p-12">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-400">{error}</p>}

                {movies.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {movies.map((movie) => (
                            <div
                                key={movie.imdbID}
                                className="bg-blue-950 rounded-xl p-4"
                            >
                                <img
                                    src={
                                        movie.Poster !== "N/A"
                                            ? movie.Poster
                                            : "/no-poster.png"
                                    }
                                    alt={movie.Title}
                                    className="w-full h-[300px] object-cover rounded mb-3"
                                />
                                <h2 className="text-xl font-bold">{movie.Title}</h2>
                                <p><strong>Year:</strong> {movie.Year}</p>
                                <p><strong>Genre:</strong> {movie.Genre}</p>
                                <p><strong>IMDB:</strong> ⭐ {movie.imdbRating}</p>
                                <p><strong>Plot:</strong> {movie.Plot}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;

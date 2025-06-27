function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh] text-center p-4 m-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text mb-4">
                Welcome to MovieHub
            </h1>
            <p className="text-gray-300 text-lg max-w-xl">
                Discover movies, track your favorites, and build your own watchlist. Start searching to explore the world of cinema!
            </p>
        </div>
    );
}

export default LandingPage;
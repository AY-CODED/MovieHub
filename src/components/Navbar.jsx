import { Search } from "lucide-react";
import { useState } from "react";

function Navbar({ onSearch }) {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            onSearch(searchTerm);
            setShowSearch(false); // close mobile search on submit
        }
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-950 text-white relative">
            <h1 className="font-bold text-2xl">🎬 MovieHub</h1>

            <div className="hidden md:flex gap-2 items-center">
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search any movie..."
                    className="border-2 p-2 rounded-md text-white bg-blue-900"
                />
                <button onClick={handleSearch}>
                    <Search />
                </button>
            </div>

            <div className="md:hidden">
                <button onClick={() => setShowSearch(!showSearch)}>
                    <Search />
                </button>
            </div>

            {showSearch && (
                <div className="absolute top-16 left-0 w-full bg-blue-950 p-4 md:hidden z-50">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search any movie..."
                        className="w-full border-2 p-2 rounded-md text-white bg-blue-900"
                    />
                    <button
                        onClick={handleSearch}
                        className="w-full mt-2 bg-blue-700 py-2 rounded"
                    >
                        Search
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

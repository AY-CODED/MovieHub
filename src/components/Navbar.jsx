import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function Navbar({ onSearch }) {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("moviehubUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Close dropdown if clicked outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            onSearch(searchTerm);
            setShowSearch(false);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-950 text-white relative z-50">
            <h1 className="font-bold text-2xl">🎬 MovieHub</h1>

            {/* Desktop Search */}
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

            {/* Mobile Search + Profile */}
            <div className="md:hidden flex items-center gap-2">
                <button onClick={() => setShowSearch(!showSearch)}>
                    <Search />
                </button>
            </div>

            {/* Mobile Search Box */}
            {showSearch && (
                <div className="absolute top-16 left-0 w-full bg-blue-950 p-4 md:hidden z-40">
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

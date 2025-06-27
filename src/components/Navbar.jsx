import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
    const navigate = useNavigate();
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

    const goToHome = () => {
        navigate("/home"); // Navigate to Home page
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-950 text-white relative z-50">
            {/* Logo */}
            <h1
                className="font-bold text-2xl cursor-pointer hover:text-blue-300"
                onClick={goToHome}
            >
                🎬 MovieHub
            </h1>

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

            {/* Mobile Search Button */}
            <div className="md:hidden flex items-center gap-2">
                <button onClick={() => setShowSearch(!showSearch)}>
                    <Search />
                </button>
            </div>

            {/* Mobile Search Dropdown */}
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

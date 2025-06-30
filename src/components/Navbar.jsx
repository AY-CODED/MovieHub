import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("moviehubUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            onSearch(searchTerm);
            setShowMobileSearch(false); // Hide dropdown after search
        }
    };

    const goToHome = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        localStorage.removeItem("moviehubUser");
        setUser(null);
        setShowDropdown(false);
        navigate("/login");
    };

    const handleDeleteProfile = () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            localStorage.removeItem("moviehubUser");
            setUser(null);
            setShowDropdown(false);
            navigate("/signup");
        }
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

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Desktop Search */}
                <div className="hidden md:flex items-center gap-2">
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

                {/* Mobile Search Icon */}
                <div className="md:hidden">
                    <button onClick={() => setShowMobileSearch(!showMobileSearch)}>
                        <Search />
                    </button>
                </div>

                {/* Profile Icon */}
                {user && (
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setShowDropdown(!showDropdown)}>
                            <img
                                src="/src/assets/person.jpg"
                                alt="Profile"
                                className="w-9 h-9 rounded-full border-2 border-white hover:border-blue-300 object-cover"
                            />
                        </button>

                        {/* Dropdown */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg py-2 z-50">
                                <p className="px-4 py-2 font-semibold text-blue-950 border-b border-gray-200">
                                    {user.username}
                                </p>
                                <button
                                    className="block px-4 py-2 w-full text-left hover:bg-blue-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                                <button
                                    className="block px-4 py-2 w-full text-left text-red-600 hover:bg-red-100"
                                    onClick={handleDeleteProfile}
                                >
                                    Delete Profile
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Search Dropdown (Full Width) */}
            {showMobileSearch && (
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

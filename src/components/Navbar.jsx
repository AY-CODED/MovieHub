import { Search } from "lucide-react";
import { useState } from "react";

function Navbar() {
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-950 text-white">
            <h1 className="font-bold text-2xl">🎬 MovieHub</h1>

            {/* For large screens: Show search input */}
            <div className="hidden md:flex gap-2 items-center">
                <input
                    type="search"
                    placeholder="Search any movie..."
                    className="border-2 p-2 rounded-md text-white"
                />
                <Search />
            </div>

            {/* For small screens: Show search icon only */}
            <div className="md:hidden">
                <button onClick={toggleSearch}>
                    <Search />
                </button>
            </div>

            {/* Show input on mobile when icon is clicked */}
            {showSearch && (
                <div className="absolute top-16 left-0 w-full bg-blue-950 p-4 md:hidden">
                    <input
                        type="search"
                        placeholder="Search any movie..."
                        className="w-full border-2 p-2 rounded-md text-white"
                    />
                </div>
            )}
        </nav>
    );
}

export default Navbar;

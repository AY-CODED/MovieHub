function Navbar() {
    return (
        <>
            <nav className="flex justify-between p-[1rem] bg-blue-950 text-white">
                <h1 className="font-bold text-2xl">🎬 MovieHub</h1>
                <form action="">
                    <input
                        type="search"
                        name=""
                        placeholder="Search any movie......"
                        className="border-2 p-2 rounded-[10px]"
                    />
                </form>
            </nav>
        </>
    );
}

export default Navbar;

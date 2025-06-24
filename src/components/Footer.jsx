function Footer() {
    return (
        <footer className="bg-blue-950 text-white text-center p-4 mt-10">
            <p className="text-sm">
                © {new Date().getFullYear()} MovieHub. All rights reserved.
            </p>
            <p className="text-xs mt-1">
                Built with ❤️ by MovieHub Team.
            </p>
        </footer>
    );
}

export default Footer;

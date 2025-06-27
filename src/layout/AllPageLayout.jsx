// AllPageLayout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function AllPageLayout() {
    const location = useLocation();
    const showLanding = location.pathname === "/moviedesign";

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {/* <Navbar /> */}
            <main className="flex-grow">
                <Outlet />
            </main>
            {showLanding && <></>}
            <Footer />
        </div>
    );
}

export default AllPageLayout;

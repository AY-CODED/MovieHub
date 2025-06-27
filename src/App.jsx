// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllPageLayout from "./layout/AllPageLayout";
import MovieDesign from "./components/MovieDesign";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route element={<AllPageLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/moviedesign" element={<MovieDesign />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
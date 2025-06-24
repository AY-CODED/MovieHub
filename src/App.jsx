import { BrowserRouter, Routes, Route } from "react-router";
import AllPageLayout from "./layout/AllPageLayout";
import MovieGrid from "./pages/LetterGlitch";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AllPageLayout />}>
                        <Route path="" element={<MovieGrid />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default App;

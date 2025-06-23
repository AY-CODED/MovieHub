import { BrowserRouter, Routes, Route } from "react-router";
import AllPageLayout from "./layout/AllPageLayout";
import Home from "./pages/Home";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AllPageLayout />}>
                        <Route path="" element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default App;

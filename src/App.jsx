import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPageLayout from "./layout/AllPageLayout";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AllPageLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

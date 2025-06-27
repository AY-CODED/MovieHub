import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { Link } from "react-router";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        const user = { username, email };
        localStorage.setItem("moviehubUser", JSON.stringify(user));

        alert("🎉 Signup successful!");

        // Redirect to Home.jsx ("/" route)
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-md bg-[#111] p-8 rounded-xl shadow-2xl border border-gray-700">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                    Create Account
                </h1>

                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="text-sm">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full mt-1 p-3 rounded bg-gray-800 text-white"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-1 p-3 rounded bg-gray-800 text-white"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-1 p-3 rounded bg-gray-800 text-white"
                        />
                    </div>

                    <Link
                        to="/home"
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold block text-center"
                    >
                        Sign Up
                    </Link>
                </form>

                <p className="text-center text-sm mt-6 text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;

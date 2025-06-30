import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        // Validate
        if (!username || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        // Check for existing user
        const existingUser = localStorage.getItem("moviehubUser");
        if (existingUser && JSON.parse(existingUser).email === email) {
            alert("Email already registered. Please login.");
            return;
        }

        // Save user
        const user = { username, email };
        localStorage.setItem("moviehubUser", JSON.stringify(user));

        alert("🎉 Signup successful!");
        navigate("/home"); // go to Home page
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-400 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
import { Link } from "react-router";
import Home from "./Home";
import Signup from "./Signup";

function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            {/* Container */}
            <div className="w-full max-w-md bg-[#111] p-8 rounded-xl shadow-2xl border border-gray-700">
                {/* Logo/Title */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold tracking-wide text-blue-600">
                        🎬 MovieHub
                    </h1>
                    <p className="text-gray-400 mt-1 text-sm">
                        Login to continue watching your favorite movies
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm mb-1 text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm mb-1 text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="accent-blue-500"
                            />
                            Remember me
                        </label>
                        <a href="#" className="hover:underline text-blue-400">
                            Forgot password?
                        </a>
                    </div>

                    {/* Button */}
                    <Link
                        to="/home"
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold block text-center"
                        
                    >
                        Login
                    </Link>
                </form>

                {/* Sign Up Link */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Don’t have an account? <Link to="/" className="text-blue-600 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

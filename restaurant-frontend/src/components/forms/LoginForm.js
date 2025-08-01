import React, { useState } from "react";
import axios from "axios";

function LoginForm({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/users/login", {
                email,
                password,
            });

            localStorage.setItem("user", JSON.stringify(res.data));
            setMessage("Login successful");
            if (onSuccess) onSuccess();
        } catch (err) {
            if (err.response) {
                setMessage(err.response.data);
            } else {
                setMessage("There is some error: " + err.message);
            }
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="bg-cream p-6 rounded-lg w-full max-w-md mx-auto space-y-4 text-gray-700"
        >
            <h2 className="text-2xl font-bold text-center mb-2">👋 Welcome back!</h2>

            {message && (
                <p className="text-center text-sm text-red-600 font-medium">
                    {message}
                </p>
            )}

            <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-400"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1">Password</label>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-400"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition"
            >
                Log In
            </button>
        </form>
    );
}

export default LoginForm;

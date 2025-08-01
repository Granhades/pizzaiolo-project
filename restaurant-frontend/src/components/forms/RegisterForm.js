import React, { useState } from "react";
import { register } from "../../services/authService";

function RegisterForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await register(formData);
            setMessage("Registration successful!");
            if (onSuccess) onSuccess();
        } catch (error) {
            setMessage("Registration failed: " + (error.message || error));
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className="bg-cream p-6 rounded-lg w-full max-w-md mx-auto space-y-4 text-gray-700"
        >
            <h2 className="text-2xl font-bold text-center mb-2">🧑‍🍳 Join Pizzaiolo!</h2>

            {message && (
                <p className="text-center text-sm text-red-600 font-medium">
                    {message}
                </p>
            )}

            <div>
                <label className="block font-semibold mb-1">Username</label>
                <input
                    type="text"
                    placeholder="Pizzalover123"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-400"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-400"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1">Password</label>
                <input
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-400"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition"
            >
                Register
            </button>
        </form>
    );
}

export default RegisterForm;

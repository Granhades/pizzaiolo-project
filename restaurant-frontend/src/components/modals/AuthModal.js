import { useState } from "react";

export default function AuthModal({onClose, onSuccess})
{
    const[mode, setMode] = useState("login");
    const [formData, setFormData] = useState({
        email : "",
        password : "",
        username : "",
    });
    const[error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        const url = mode === "login" ? "/api/users/login" : "api/users/register";
        try{
            const response = await fetch(url,
                {
                    method : "POST",
                    headers : {"Content-Type": "application/json"},
                    body : JSON.stringify(formData),
                })
            const data = await response.json();
            if(!response.ok){
                setError(data.error || "Something wrong");
                return ;
            }
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("username", data.username);
            onSuccess(data.userId);
            onClose();
        } catch (err){
            setError("Error in the network");
        }
    };

    const handleGuest = () => {
        const guestId = "guest-" + crypto.randomUUID();
        localStorage.setItem("userId", guestId);
        onSuccess(guestId);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                <h2 className="text-xl font-bold mb-4">{mode === "login" ? "Login" : "Register"}</h2>

                {mode === "register" && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border rounded"
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                />

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white w-full py-2 rounded mb-2"
                >
                    {mode === "login" ? "Login" : "Register"}
                </button>

                <button
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="text-blue-500 underline text-sm mb-2"
                >
                    {mode === "login" ? "Don't have an account? Register" : "Already have an account? Login"}
                </button>

                <button
                    onClick={handleGuest}
                    className="text-gray-600 text-sm underline"
                >
                    Continue as Guest
                </button>
            </div>
        </div>
    );
}
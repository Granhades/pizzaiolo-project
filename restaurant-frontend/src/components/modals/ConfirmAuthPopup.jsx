import React from "react";

const ConfirmAuthPopup = ({ onLogin, onRegister, onGuest, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-cream text-gray-800 p-6 rounded-xl shadow-lg w-[90%] max-w-sm relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">🍕 Wait a minute!</h2>
                <p className="text-center mb-6 text-sm text-gray-700">
                    Log in to track your order, register if you're new, or continue as guest.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onLogin}
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        🔐 Log In
                    </button>
                    <button
                        onClick={onRegister}
                        className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        📝 Register
                    </button>
                    <button
                        onClick={onGuest}
                        className="bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
                    >
                        👤 Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmAuthPopup;
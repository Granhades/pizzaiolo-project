import React from "react";
import LoginForm from "../forms/LoginForm"; //
import { motion } from "framer-motion"; //

const LoginModal = ({ onClose, onSuccess }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-cream p-6 rounded-lg shadow-lg w-full max-w-md relative text-gray-700"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
                >
                    ✕
                </button>
                <LoginForm onSuccess={onSuccess} />
            </motion.div>
        </div>
    );
};

export default LoginModal;
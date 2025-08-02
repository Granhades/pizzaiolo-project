import React from "react";
import RegisterForm from "../forms/RegisterForm";
import { motion } from "framer-motion";

const RegisterModal = ({ onClose, onSuccess }) => {
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

                {/* Aquí usamos solo el RegisterForm con la prop correcta */}
                <RegisterForm
                    onSuccess={(user) => {
                        onSuccess(user); // Propaga el usuario al componente padre
                        onClose();       // Cierra el modal
                    }}
                />
            </motion.div>
        </div>
    );
};

export default RegisterModal;
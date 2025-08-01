import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo-pizza.png";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";

function Navbar() {
    const [userInfo, setUserInfo] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.userId && storedUser.userId !== "userGuest") {
            setUserInfo(storedUser);
        } else {
            setUserInfo(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUserInfo(null);
        navigate("/login");
    };

    return (
        <div className="bg-cream p-4 rounded flex justify-between items-center shadow">
            {/* LEFT: Logo + Links */}
            <div className="flex items-center gap-4">
                <img src={logoImg} alt="Logo" className="h-12" />
                <nav className="flex gap-6 font-semibold text-gray-700">
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/orders">Orders</Link>
                </nav>
            </div>

            {/* RIGHT: Auth section */}
            <div className="flex items-center gap-4 font-medium text-gray-700">
                {userInfo ? (
                    <>
                        <Link
                            to="/profile"
                            className="hover:underline text-sm"
                            title="View Profile"
                        >
                            👋 Welcome, {userInfo.name}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex gap-6 font-semibold text-gray-700 hover:underline text-sm"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="flex gap-6 font-semibold text-gray-700 hover:underline text-sm"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setShowRegisterModal(true)}
                            className="flex gap-6 font-semibold text-gray-700 hover:underline text-sm"
                        >
                            Register
                        </button>
                    </>
                )}
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onSuccess={() => {
                        const user = JSON.parse(localStorage.getItem("user"));
                        setUserInfo(user);
                        setShowLoginModal(false);
                    }}
                />
            )}

            {/* Register Modal */}
            {showRegisterModal && (
                <RegisterModal
                    onClose={() => setShowRegisterModal(false)}
                    onSuccess={() => {
                        const user = JSON.parse(localStorage.getItem("user"));
                        setUserInfo(user);
                        setShowRegisterModal(false);
                    }}
                />
            )}
        </div>
    );
}

export default Navbar;

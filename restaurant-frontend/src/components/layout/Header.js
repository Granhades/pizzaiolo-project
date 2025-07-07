import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import PopupModal from "../modals/PopupModal";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm"


function Header () {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    return(
        <header style = {{padding : "10px", backgroundColor: "#f0f0f0"}}>
            <nav>
                <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
                <Link to="/menu" style={{ marginRight: "10px" }}>Menu</Link>
                <Link to="/admin" style={{ marginRight: "10px" }}>Admin</Link>
                <Link to="/orders" style={{ marginRight: "10px" }}>Orders</Link>
                 
            </nav>

            <PopupModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
                <LoginForm onSuccess={() => setIsLoginOpen(false)}/>
            </PopupModal>

            <PopupModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
                <RegisterForm onSuccess={() => setIsRegisterOpen(false)}/>
            </PopupModal>

        </header>
    );
}

export default Header;
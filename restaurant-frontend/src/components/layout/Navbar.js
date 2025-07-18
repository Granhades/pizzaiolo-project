import React from "react";
import { useState } from "react";
import logoImg from "../../assets/images/logo-pizza.png"
import {Link} from "react-router-dom";

function Navbar () {
    const [table, setTable] = useState("");

    return (
        <div className="bg-cream p-4 rounded flex justify-between items-center shadow">
            <div className="flex items-center gap-4">
                <img src={logoImg} alt="Logo" className="h-12" />
                <nav className="flex gap-6 font-semibold text-gray-700">
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/orders">Orders</Link>
                </nav>
            </div>

        </div>
    )
};
    export default Navbar;
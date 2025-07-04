import React from "react";
import {Link} from "react-router-dom";

function Header () {
    return(
        <header style = {{padding : "10px", backgroundColor: "#f0f0f0"}}>
            <nav>
                <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
                <Link to="/menu" style={{ marginRight: "10px" }}>Menu</Link>
                <Link to="/admin" style={{ marginRight: "10px" }}>Admin</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    );
}

export default Header;
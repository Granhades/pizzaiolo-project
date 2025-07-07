import React, {useState} from "react";
import {register} from "../../services/authService";

function RegisterForm ({onSuccess}){
    const [formData, setFormData] = useState({
        username : "", email: "", password: ""
    });

    const[message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await register(formData);
            setMessage(res);
            onSuccess();
        }
        catch (error)
        {
            setMessage("Registration failed : " + error.message || error);
        }
    };

    return(
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <input
                type="text"
                placeholder ="Username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username : e.target.value})}
                required
            /> <br />

            <input
                type="text"
                placeholder ="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email : e.target.value})}
                required
            /> <br />

            <input
                type="password"
                placeholder ="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password : e.target.value})}
                required
            /> <br />
            <button type="submit">Register</button>
        </form>

    )

}

export default RegisterForm;
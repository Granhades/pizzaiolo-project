import React, { useState } from "react";
import axios from "axios";

import {login} from "../../services/authService";

function LoginForm ({ onSuccess }){


    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState("");

    const handleLogin = async(e) => {
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:8080/api/users/login", {
      email,
      password
    });
        //Save info
        localStorage.setItem("user", JSON.stringify(res.data));
        setMessage("Login successful");
        if(onSuccess) onSuccess();
    }
    catch(err)
    {
        if(err.response)
        {
            setMessage(err.response.data);
        }
        else{
            setMessage("There is some error " + err.message);
        }
        
    }
};

    return(
        <form onSubmit={handleLogin}>
            <h2>Log In</h2>
            {message && <p>{message}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <br/>

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br/>    
            
            <button type="submit">Log In</button>
        </form>
    );

}

export default LoginForm;
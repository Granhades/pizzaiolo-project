import axios from "axios";

const API = "http://localhost:8080/api/users";

//Register new user
export const register = async (userData) => {
    try {
        const res = await axios.post(`${API}/register`, userData);
        return res.data;
    }
    catch (error) {
        throw error.response?.data || {message : "Registration failed"};
    }
};

//Log in the user
export const login = async (credentials) => {
    try {
        const res = await axios.post(`${API}/login`, credentials);
        return res.data;
    }
    catch (error)
    {
        throw error.response?.data || {message : "Login failed"}
    }
}
import axios from "axios";

const API = "http://localhost:8080/api";

export const getAllDishes = () => axios.get(`${API}/menu`);
export const addDish = (dish) => axios.post(`${API}/menu`, dish);
export const updateDishes = (id, dish) => axios.put(`${API}/menu/${id}`, dish);
export const deleteDishe = (id, dish) => axios.delete(`${API}/menu/${id}`, dish);
export const restartMenu = () => axios.put(`${API}/seed`); //We have different logic

export const getOrders = () => axios.get(`${API}/order`);
export const addOrder = (order) => axios.post(`${API}/order`, order);
export const updateOrder = (id, order) => axios.put(`${API}/order/${id}`, order);
export const deleteOrder = (id) => axios.delete(`${API}/order/${id}`);
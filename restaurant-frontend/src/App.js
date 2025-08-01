import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ViewOrdersPage from "./pages/ViewOrdersPage";
import BasketPage from "./pages/BasketPage";
import MenuPage from "./pages/MenuPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import SuccessOrderPage from "./pages/SuccessOrderPage";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/basket/:orderId" element = {<BasketPage/>}/>
        <Route path="/order-status/:orderId" element={<SuccessOrderPage/>}/>
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/admin/orders" element={<ViewOrdersPage/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>

      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ViewOrdersPage from "./pages/ViewOrdersPage";
import BasketPage from "./pages/BasketPage";
import MenuPage from "./pages/MenuPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/basket/:orderId" element = {<BasketPage/>}/>
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/admin/orders" element={<ViewOrdersPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;

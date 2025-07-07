import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ViewOrdersPage from "./pages/ViewOrdersPage";
import SuccessPage from "./pages/SuccessPage";
import MenuPage from "./pages/MenuPage";
import AdminPage from "./pages/AdminPage";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/orders" element={<ViewOrdersPage />} />
        <Route path="/success" element ={<SuccessPage/>} />
   
      </Routes>
    </Router>
  );
}

export default App;

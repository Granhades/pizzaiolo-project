import React from "react";
import ViewOrdersPage from "./pages/ViewOrdersPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Menu</Link>
        <Link to="/admin" style={{ marginRight: "10px" }}>Admin</Link>
        <Link to="/orders" >Orders</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/orders" element={<ViewOrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;

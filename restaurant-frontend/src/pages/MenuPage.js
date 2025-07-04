import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MenuPage() {
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [table, setTable] = useState("");
    const navigate = useNavigate();
    //Sort
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('name'); //name or price
    const [sortOrder, setSortOrder] = useState('asc'); //ascendent or descendent

    useEffect(() => {
    axios.get("http://localhost:8080/api/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.error(err));
  }, []);

    const addToOrder = (dishId) => {
    setOrder(prev => {
      const quantity = prev[dishId] || 0;
      return { ...prev, [dishId]: quantity + 1 };
    });
};


    const sendOrder = () => {
    const items = Object.entries(order).map(([dishId, quantity]) => ({
      dishId,
      quantity
    }));

    const groupedMenu = menu.reduce((acc, dish) => {
      const section = dish.section || "Other";
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(dish);
      return acc;
    }, {});

    axios.post("http://localhost:8080/api/order", { table, items })
      .then(() => {
        setOrder({});
        navigate("/success");
      })
      .catch(err => alert("Error sending order: " + err.message));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Restaurant Menu</h1>

      <label>
        Table number:
        <input
          type="text"
          value={table}
          onChange={e => setTable(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </label>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>

</div>
      {Object.entries(
  menu.reduce((acc, dish) => {
    const section = dish.section || "Others";
    if (!acc[section]) acc[section] = [];
    acc[section].push(dish);
    return acc;
  }, {})
    ).map(([section, dishes]) => (
      <div key={section} style={{ marginBottom: "30px" }}>
        <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
          {section}
        </h2>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {dishes.map((dish) => (
            <li key={dish.id} style={{ margin: "10px 0" }}>
              <strong>{dish.name}</strong> – €{dish.price.toFixed(2)}<br />
              {dish.description}<br />
              <button onClick={() => addToOrder(dish.id)}>Add to Order</button>
            </li>
          ))}
        </ul>
      </div>
    ))}

      <h2>Current Order</h2>
      <ul>
        {Object.entries(order).map(([id, qty]) => {
          const dish = menu.find(d => d.id === id);
          return dish ? (
            <li key={id}>
              {dish.name} x {qty} – {(qty * dish.price.toFixed(2))} €
            </li>
          ) : null;
        })}
      </ul>

      <button
        onClick={sendOrder}
        disabled={!table || Object.keys(order).length === 0}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Send Order
      </button>
    </div>
  );
}

export default MenuPage;

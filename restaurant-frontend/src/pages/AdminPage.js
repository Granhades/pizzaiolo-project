import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {
  const [activeSection, setActiveSection] = useState("dishes");

  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ name: "", description: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "", price: "" });

  const [orders, setOrders] = useState([]);

  // Estado para mostrar/ocultar secciones
  const [showDishList, setShowDishList] = useState(false);
  const [showAddDishForm, setShowAddDishForm] = useState(false);

  // Fetch dishes and orders
  useEffect(() => {
    axios.get("http://localhost:8080/api/menu")
      .then(res => setDishes(res.data))
      .catch(err => console.error("Error fetching menu:", err));

    axios.get("http://localhost:8080/api/order")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  // Delete dish
  const deleteDish = (id) => {
    axios.delete(`http://localhost:8080/api/menu/${id}`)
      .then(() => {
        setDishes(prev => prev.filter(d => d.id !== id));
        alert("Dish deleted!");
      })
      .catch(err => alert("Error deleting dish"));
  };

  // Add dish
  const addDish = () => {
    const dish = { ...newDish, price: parseFloat(newDish.price) };
    axios.post("http://localhost:8080/api/menu", dish)
      .then(res => {
        setDishes([...dishes, res.data]);
        setNewDish({ name: "", description: "", price: "" });
        alert("Dish added!");
      })
      .catch(err => alert("Error adding dish"));
  };

  // Restart menu (seed)
  const restartMenu = () => {
    axios.post("http://localhost:8080/api/seed")
      .then(res => {
        alert(res.data);
        axios.get("http://localhost:8080/api/menu").then(res => setDishes(res.data));
      })
      .catch(err => alert("Error seeding menu: " + err.message));
  };

  // Edit dish
  const startEdit = (dish) => {
    setEditingId(dish.id);
    setEditData({ name: dish.name, description: dish.description, price: dish.price });
  };

  const saveEdit = (id) => {
    axios.put(`http://localhost:8080/api/menu/${id}`, {
      ...editData,
      price: parseFloat(editData.price)
    })
      .then(res => {
        setDishes(prev => prev.map(d => (d.id === id ? res.data : d)));
        setEditingId(null);
        alert("Dish updated!");
      })
      .catch(err => alert("Error updating dish"));
  };

  // Delete order
  const deleteOrder = (id) => {
    axios.delete(`http://localhost:8080/api/order/${id}`)
      .then(() => setOrders(orders.filter(o => o.id !== id)));
  };



  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveSection("dishes")}>🍽 Manage Menu</button>
        <button onClick={() => setActiveSection("orders")}>📦 Manage Orders</button>
      </div>

      {/* DISHES SECTION */}
      {activeSection === "dishes" && (
        <div>
          <button onClick={restartMenu}>Restart Menu by default</button>

          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setShowDishList(prev => !prev)}>
              {showDishList ? "Hide Dish List" : "Show Dish List"}
            </button>
            <button onClick={() => setShowAddDishForm(prev => !prev)}>
              {showAddDishForm ? "Hide Add New Dish" : "Show Add New Dish"}
            </button>
          </div>

          {/* Dish List */}
          {showDishList && (
            <>
              <h2>Dish List</h2>
              <ul>
                {dishes.map(dish => (
                  <li key={dish.id}>
                    {editingId === dish.id ? (
                      <>
                        <input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /><br />
                        <input value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} /><br />
                        <input type="number" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} /><br />
                        <button onClick={() => saveEdit(dish.id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <strong>{dish.name}</strong> – €{dish.price.toFixed(2)}<br />
                        {dish.description}<br />
                        <button onClick={() => startEdit(dish)}>Edit</button>
                        <button onClick={() => deleteDish(dish.id)}>Delete</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Add Dish Form */}
          {showAddDishForm && (
            <>
              <h2>Add New Dish</h2>
              <input placeholder="Name" value={newDish.name} onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} /><br />
              <input placeholder="Description" value={newDish.description} onChange={(e) => setNewDish({ ...newDish, description: e.target.value })} /><br />
              <input type="number" placeholder="Price" value={newDish.price} onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} /><br />
              <button onClick={addDish}>Add Dish</button>
            </>
          )}
        </div>
      )}

      {/* ORDERS SECTION */}
      {activeSection === "orders" && (
        <div>
          <h2>Orders</h2>
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                <strong>Table:</strong> {order.table} | <strong>Date:</strong> {new Date(order.date).toLocaleString()}<br />
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      Dish Name: {item.dishName}, Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
                <button onClick={() => deleteOrder(order.id)}>Delete Order</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default AdminPage;

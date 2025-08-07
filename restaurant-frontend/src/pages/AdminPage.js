import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {
    const [activeSection, setActiveSection] = useState("dishes");
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({ name: "", description: "", price: "" });
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: "", description: "", price: "" });
    const [orders, setOrders] = useState([]);
    const [showDishList, setShowDishList] = useState(false);
    const [showAddDishForm, setShowAddDishForm] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/menu").then(res => setDishes(res.data));
        axios.get("http://localhost:8080/api/order").then(res => setOrders(res.data));
    }, []);

    const deleteDish = (id) => {
        axios.delete(`http://localhost:8080/api/menu/${id}`).then(() => {
            setDishes(prev => prev.filter(d => d.id !== id));
            alert("Dish deleted!");
        });
    };

    const addDish = () => {
        const dish = { ...newDish, price: parseFloat(newDish.price) };
        axios.post("http://localhost:8080/api/menu", dish).then(res => {
            setDishes([...dishes, res.data]);
            setNewDish({ name: "", description: "", price: "" });
            alert("Dish added!");
        });
    };

    const restartMenu = () => {
        axios.post("http://localhost:8080/api/seed").then(res => {
            alert(res.data);
            axios.get("http://localhost:8080/api/menu").then(res => setDishes(res.data));
        });
    };

    const startEdit = (dish) => {
        setEditingId(dish.id);
        setEditData({ name: dish.name, description: dish.description, price: dish.price });
    };

    const saveEdit = (id) => {
        axios.put(`http://localhost:8080/api/menu/${id}`, {
            ...editData,
            price: parseFloat(editData.price),
        }).then(res => {
            setDishes(prev => prev.map(d => (d.id === id ? res.data : d)));
            setEditingId(null);
            alert("Dish updated!");
        });
    };

    const deleteOrder = (id) => {
        axios.delete(`http://localhost:8080/api/order/${id}`).then(() => {
            setOrders(prev => prev.filter(o => o.id !== id));
        });
    };

    return (
        <div className="p-6 max-w-5xl mx-auto text-gray-800">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            {/* Top Navigation Buttons */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveSection("dishes")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold"
                >
                    🍽 Manage Menu
                </button>
                <button
                    onClick={() => setActiveSection("orders")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold"
                >
                    📦 Manage Orders
                </button>
            </div>

            {/* DISHES SECTION */}
            {activeSection === "dishes" && (
                <div className="space-y-6">
                    {/* Dish Actions */}
                    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">🍕 Menu Actions</h2>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={restartMenu}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium"
                            >
                                Restart Menu by default
                            </button>
                            <button
                                onClick={() => setShowDishList((prev) => !prev)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
                            >
                                {showDishList ? "Hide Dish List" : "Show Dish List"}
                            </button>
                            <button
                                onClick={() => setShowAddDishForm((prev) => !prev)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium"
                            >
                                {showAddDishForm ? "Hide Add New Dish" : "Show Add New Dish"}
                            </button>
                        </div>
                    </div>

                    {/* Dish List */}
                    {showDishList && (
                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">📋 Dish List</h2>
                            <ul className="space-y-4">
                                {dishes.map((dish) => (
                                    <li key={dish.id} className="border-b pb-4">
                                        {editingId === dish.id ? (
                                            <div className="space-y-2">
                                                <input
                                                    value={editData.name}
                                                    onChange={(e) =>
                                                        setEditData({ ...editData, name: e.target.value })
                                                    }
                                                    className="border p-2 w-full rounded"
                                                    placeholder="Name"
                                                />
                                                <input
                                                    value={editData.description}
                                                    onChange={(e) =>
                                                        setEditData({ ...editData, description: e.target.value })
                                                    }
                                                    className="border p-2 w-full rounded"
                                                    placeholder="Description"
                                                />
                                                <input
                                                    type="number"
                                                    value={editData.price}
                                                    onChange={(e) =>
                                                        setEditData({ ...editData, price: e.target.value })
                                                    }
                                                    className="border p-2 w-full rounded"
                                                    placeholder="Price"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => saveEdit(dish.id)}
                                                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <div className="font-bold text-lg">{dish.name}</div>
                                                <div className="text-sm text-gray-700">{dish.description}</div>
                                                <div className="text-yellow-700 font-semibold">€{dish.price.toFixed(2)}</div>
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={() => startEdit(dish)}
                                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteDish(dish.id)}
                                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Add Dish Form */}
                    {showAddDishForm && (
                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">➕ Add New Dish</h2>
                            <div className="space-y-3">
                                <input
                                    placeholder="Name"
                                    value={newDish.name}
                                    onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                                    className="border p-2 w-full rounded"
                                />
                                <input
                                    placeholder="Description"
                                    value={newDish.description}
                                    onChange={(e) =>
                                        setNewDish({ ...newDish, description: e.target.value })
                                    }
                                    className="border p-2 w-full rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={newDish.price}
                                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                                    className="border p-2 w-full rounded"
                                />
                                <button
                                    onClick={addDish}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Add Dish
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ORDERS SECTION */}
            {activeSection === "orders" && (
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">📦 Orders</h2>
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order.id} className="border-b pb-4">
                                <div className="font-semibold">
                                    Table: {order.table} —{" "}
                                    <span className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleString()}
                </span>
                                </div>
                                <ul className="ml-4 mt-2 list-disc list-inside text-sm text-gray-700">
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>
                                            Dish: <span className="font-medium">{item.dishName}</span>, Qty: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => deleteOrder(order.id)}
                                    className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                >
                                    Delete Order
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
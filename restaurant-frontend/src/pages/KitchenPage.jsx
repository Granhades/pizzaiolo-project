import React, { useEffect, useState } from "react";
import axios from "axios";

function KitchenPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get("http://localhost:8080/api/order")
            .then(res => setOrders(res.data))
            .catch(err => console.error("Error fetching orders:", err));
    };

    const getNextStatus = (current) => {
        switch (current) {
            case "CONFIRMED": return "PREPARING";
            case "PREPARING": return "READY";
            case "READY": return "CONFIRMED";
            default: return current;
        }
    };

    const updateStatus = (orderId, currentStatus) => {
        const nextStatus = getNextStatus(currentStatus);
        axios.put(`http://localhost:8080/api/order/${orderId}/status`, { status: nextStatus })
            .then(() => fetchOrders())
            .catch(err => alert("Error updating status"));
    };


    const getStatusColor = (status) => {
        switch (status) {
            case "CONFIRMED": return "bg-yellow-500";
            case "PREPARING": return "bg-green-500";
            case "READY": return "bg-blue-500";
            default: return "bg-gray-400";
        }
    };

    const getStatusName = (status) => {
        switch (status) {
            case "CONFIRMED": return "ORDER";
            case "PREPARING": return "PACKING";
            case "READY": return "READY TO PICK UP";
            default: return "ORDER";
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">👨‍🍳 Kitchen Orders</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map(order => (
                    <div
                        key={order.id}
                        onClick={() => updateStatus(order.id, order.status)}
                        className={`cursor-pointer shadow rounded-lg p-4 text-white ${getStatusColor(order.status)} hover:opacity-90 transition`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold">{getStatusName(order.status)}</h2>
                            <span className="text-sm">Table {order.table}</span>
                        </div>
                        <p className="text-sm mb-2">{new Date(order.date).toLocaleString()}</p>
                        <ul className="list-disc list-inside">
                            {order.items.map((item, idx) => (
                                <li key={idx}>🍕 {item.dishName} × {item.quantity}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default KitchenPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/order")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteOrder = (id) => {
    axios.delete(`http://localhost:8080/api/order/${id}`)
    .then( () => {
      setOrders(prev => prev.filter(order => order.id !== id));
    })
    .catch((err) => alert("error deleting"))
  } 

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} style={{ marginBottom: "20px" }}>
              <strong>Table:</strong> {order.table}<br />
              <strong>Date:</strong> {new Date(order.date).toLocaleString()}<br />
              <strong>Items:</strong>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>Dish : {item.dishName} × {item.quantity}</li>
                ))}
              </ul>
              <button onClick ={ () => deleteOrder(order.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewOrdersPage;

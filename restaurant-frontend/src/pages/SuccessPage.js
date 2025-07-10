import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SuccessPage() {
  const[orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/order")
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));

  }, []);

  const deleteAllOrders = () => {
    Promise.all(
      orders.map(order =>
        axios.delete(`http://localhost:8080/api/order/${order.id}`)
      )
    )
    .then(() => {
      setOrders([]);
      alert("Your order was cancel");
    })
    .catch((err) => alert ("Failed to cancel some orders"));
  }
  const calculateTotal = () => 
  {
    let total = 0;
    orders.forEach(order => {
      order.items.forEach(item => {
        total += (item.quantity * (item.price || 0))
      });
    });
    return total.toFixed(2);
  }
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>✅ Order Sent Successfully!</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} style={{ marginBottom: "20px" }}>
              <strong>Table:</strong> {order.table} <br />
              <strong>Date:</strong> {new Date(order.date).toLocaleString()} <br />
              <strong>Items:</strong>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    Dish: {item.dishName} x {item.quantity} – €{(item.quantity * (item.price || 0)).toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <p><strong>Total:</strong> €{calculateTotal()}</p>

      <p>Your food will arrive shortly.</p>
      <Link to="/menu">← Back to Menu</Link>

      {orders.length > 0 && (
        <>
          <p style={{ marginTop: "20px" }}>Is your order wrong?</p>
          <button onClick={deleteAllOrders} style={{ padding: "10px 20px" }}>
            Cancel the order
          </button>
        </>
      )}
    </div>
  );
}

export default SuccessPage;

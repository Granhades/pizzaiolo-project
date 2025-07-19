import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pizzaboxFull from "../assets/images/pizzabox-full.png";
import axios from "axios";

function BasketPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch order and menu
  useEffect(() => {
    const fetchOrderAndMenu = async () => {
      try {
        const [orderRes, menuRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/order/${orderId}`),
          axios.get("http://localhost:8080/api/menu"),
        ]);

        const enrichedItems = orderRes.data.items.map((item) => {
          const dish = menuRes.data.find((d) => d.id === item.dishId);
          return {
            ...item,
            name: dish?.name || "Unknown",
            description: dish?.description || "",
            price: dish?.price || 0,
          };
        });

        setOrder({ ...orderRes.data, items: enrichedItems });
        setMenu(menuRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order or menu: ", err);
        setLoading(false);
      }
    };

    fetchOrderAndMenu();
  }, [orderId]);

  if (loading) return <div className="p-4 text-center">Loading order...</div>;
  if (!order) return <div className="p-4 text-center">Order not found.</div>;

  // Quantity handlers
  const handleIncrement = (dishId) => {
    const updatedItems = order.items.map((item) =>
      item.dishId === dishId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setOrder({ ...order, items: updatedItems });
  };

  const handleDecrement = (dishId) => {
    const updatedItems = order.items.map((item) =>
      item.dishId === dishId
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
        : item
    );
    setOrder({ ...order, items: updatedItems });
  };

  const getTotal = () =>
    order.items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="min-h-screen bg-peach p-4">
      <div className="bg-cream p-4 rounded shadow mb-6 flex justify-between items-center">
        <h2 className="font-bold text-lg text-gray-700">Order Summary</h2>
        <div className="text-sm text-gray-600">Table: {order.table}</div>
      </div>

      <div className="bg-menuitem text-chalk rounded p-6 shadow max-w-3xl mx-auto">
        <h3 className="text-2xl font-fredericka border-b pb-2 mb-4">Your Order</h3>

        {order.items.map((item) => (
          <div
            key={item.dishId}
            className="flex justify-between items-center mb-3 px-4"
          >
            <div>
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-sm italic text-gray-300">{item.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDecrement(item.dishId)}
                className="bg-cream text-black font-bold px-2 rounded"
              >
                –
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => handleIncrement(item.dishId)}
                className="bg-cream text-black font-bold px-2 rounded"
              >
                +
              </button>
              <span className="ml-4">{(item.price * item.quantity).toFixed(2)}€</span>
            </div>
          </div>
        ))}

        <div className="text-right mt-6 font-bold text-xl">
          TOTAL: {getTotal()} €
        </div>
        <div className="flex justify-center mt-6">
          <img src={pizzaboxFull} alt="Pizza box full" className="w-24" />
        </div>
      </div>
    </div>
  );
}

export default BasketPage;

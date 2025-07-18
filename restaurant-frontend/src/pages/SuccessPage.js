import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pizzaboxFull from "../assets/images/pizzabox-full.png";


function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { table, items } = location.state || { table: "", items: [] };

  const handleIncrement = (itemId) => {
    updateQuantity(itemId, 1);
  };

  const handleDecrement = (itemId) => {
    updateQuantity(itemId, -1);
  };

  const updateQuantity = (itemId, change) => {
    const updatedItems = items.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity + change, 0) }
        : item
    );
    navigate("/success", { state: { table, items: updatedItems } });
  };

  const getTotal = () =>
    items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="min-h-screen bg-peach p-4">
      
      <div className="bg-cream p-4 rounded shadow mb-6 flex justify-between items-center">
        <h2 className="font-bold text-lg text-gray-700">Order Summary</h2>
        <div className="text-sm text-gray-600">Table: {table}</div>
      </div>

      <div className="bg-menuitem text-chalk rounded p-6 shadow max-w-3xl mx-auto">
        <h3 className="text-2xl font-fredericka border-b pb-2 mb-4">Your Order</h3>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-3 px-4"
          >
            <div>
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-sm italic text-gray-300">{item.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDecrement(item.id)}
                className="bg-cream text-black font-bold px-2 rounded"
              >
                –
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => handleIncrement(item.id)}
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

export default SuccessPage;

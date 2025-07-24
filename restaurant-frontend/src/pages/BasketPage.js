import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tableImg from "../assets/images/desk.png";
import axios from "axios";
import DeletePizzaModal from "../components/modals/DeletePizzaModal";
import PizzaioloCard from "../components/ui/PizzaioloWithSpeech";

function BasketPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
 
  const [loading, setLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [pizzaioloEmotion, setPizzaioloEmotion] = useState("Please check your order!")

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

  //Update the DB
  const updateOrderDB = async(updatedItems) => {
    try {
      await axios.put(`http://localhost:8080/api/order/${orderId}`, {...order,
        items: updatedItems.map(item => ({
          dishId:item.dishId,
          quantity : item.quantity
        })),
      });
    } catch(err) {
      console.error("Error updating the DB");
    }
  };

  //Handle PizzaioloMessages
  const pizzaioloAngry = () => {
    const messages = [
      "Slice deleted.",
      "No more dough.",
      "Wiped off the menu.",
      "Gone in a flash.",
      "Pizza: denied.",
      "Swiped. Vanished.",
      "Poof! No pizza.",
      "Back to crust-land."
    ]
    return messages[Math.floor(Math.random() * (messages.length))]
  }

  //Handle PizzaioloMessages
  const pizzaioloHappy = () => {
    const messages = [
      "Slice secured!",
      "Extra cheese? Approved.",
      "Welcome to the oven squad.",
      "Your pizza just joined the party.",
      "Crust incoming!",
      "You’ve leveled up in flavor.",
      "Toppings locked and loaded.",
      "This pie's on fire!"
    ]
    return messages[Math.floor(Math.random() * (messages.length))]
  }
  

  // Quantity handlers
  const handleIncrement = async (dishId) => {
    const updatedItems = order.items.map((item) =>
      item.dishId === dishId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setOrder({ ...order, items: updatedItems });
    await(updateOrderDB(updatedItems))
    setPizzaioloEmotion(pizzaioloHappy());
  };


  const handleDecrement = async (dishId) => {
    const targetItem = order.items.find((item) => 
    item.dishId === dishId
    );

    if(targetItem.quantity === 1)
    {
      setItemToDelete(targetItem);
      setShowDeleteModal(true);
    }
    else{
      const updatedItems = order.items.map((item) =>
      item.dishId === dishId
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
        : item
 
    );
    setOrder({ ...order, items: updatedItems });
    await(updateOrderDB(updatedItems));
    setPizzaioloEmotion(pizzaioloAngry());
    }
    
  };

  const handleDeleteConfirmed = async () => {
  const updatedItems = order.items.filter(
    (item) => item.dishId !== itemToDelete.dishId
  );
  setOrder({ ...order, items: updatedItems });
  await (updateOrderDB(updatedItems))
  setShowDeleteModal(false);
};

  const getTotal = () =>
    order.items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  return (
  <div className="min-h-screen bg-peach p-4">
    {/* MAIN CONTENT CENTERED */}
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-start max-w-6xl mx-auto">
      
      {/* LEFT COLUMN - ORDER + DELETE MODAL */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="bg-menuitem text-chalk rounded p-6 shadow w-full">
          {/* HEADER + TABLE INFO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-2xl font-fredericka border-b pb-2 sm:border-0 sm:pb-0">
              Your Order
            </h3>
            <div className="flex items-center gap-2 mt-4 sm:mt-0 text-lg text-gray-100">
              <img
                src={tableImg}
                alt="Table"
                className="h-[36px] w-auto"
              />
              <span className="font-semibold">Table {order.table}</span>
            </div>
          </div>

          {/* ORDER ITEMS */}
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
                  ➖
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.dishId)}
                  className="bg-cream text-black font-bold px-2 rounded"
                >
                  ➕
                </button>
                <span className="ml-4">{(item.price * item.quantity).toFixed(2)}€</span>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="text-right mt-6 font-bold text-xl">
            TOTAL: {getTotal()} €
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => alert('Order confirmed!')}
            >
              Confirm
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => alert('Order cancelled!')}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* DELETE MODAL */}
        <DeletePizzaModal
          isOpen={showDeleteModal}
          item={itemToDelete}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setShowDeleteModal(false)}
        />
      </div>

      {/* RIGHT COLUMN - PIZZAIOL CARD */}
      
      <div className="w-full lg:w-1/3 flex items-start justify-center pt-[6px]">
        <PizzaioloCard
          
          text={pizzaioloEmotion}
          chef={true}
          speech={true}
        />
      </div>
    </div>
  </div>
);


}

export default BasketPage;

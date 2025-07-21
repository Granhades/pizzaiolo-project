import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PizzaCard from "../components/ui/PizzaCard";
import PizzaioloCard from "../components/ui/PizzaioloWithSpeech";

import pizzaioloImg from "../assets/images/chef.png";
import pizzaboxEmpty from "../assets/images/pizzabox-empty.png";
import pizzaboxFull from "../assets/images/pizzabox-full.png";
import speechBubble from "../assets/images/speech-bubbles.png";


function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState({});
  const [table, setTable] = useState("");
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToOrder = (dishId) => {
    setOrder((prev) => {
      const quantity = prev[dishId] || 0;
      return { ...prev, [dishId]: quantity + 1 };
    });
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const sendOrder = () => {
    const items = Object.entries(order).map(([dishId, quantity]) => ({
      dishId,
      quantity,
      
    }));

    console.log("This is dishID from sendOrder" + items)

    axios
      .post("http://localhost:8080/api/order", { table, items })
      .then((res) => {
        const orderId = res.data.id;
        console.log("Response from backend:", res.data);
        setOrder({});
        navigate(`/basket/${orderId}`);
      })
      .catch((err) => alert("Error sending order: " + err.message));
  };

  const getTotal = () => {
    return Object.entries(order)
      .reduce((acc, [id, qty]) => {
        const dish = menu.find((d) => d.id === id);
        return dish ? acc + dish.price * qty : acc;
      }, 0)
      .toFixed(2);
  };

  const grouped = menu.reduce((acc, dish) => {
    const section = dish.section || "Other";
    if (!acc[section]) acc[section] = [];
    acc[section].push(dish);
    return acc;
  }, {});

  const handlePizzaSelect = (pizza) => {
    setSelectedPizza(pizza);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); // vuelve a estado original
  };

  const detailedItems = Object.entries(order).map(([dishId, quantity]) => {
  const dish = menu.find(d => d.id === dishId);
  return {
    id: dishId,
    name: dish.name,
    description: dish.description,
    price: dish.price,
    quantity
    };
  });

  

  return (
    <div className="min-h-screen bg-peach p-4">
      

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 justify-center">
        {/* PIZZAS */}
        <div className="w-full lg:w-1/3 bg-menuitem p-4 rounded text-chalk">
          <h2 className="font-fredericka text-2xl mb-4 text-center border-b pb-2">
            PIZZAS
          </h2>
          {(grouped["Pizza"] || []).map((dish) => (
            <PizzaCard
              key={dish.id}
              pizza={dish}
              onSelect={() => handlePizzaSelect(dish)}
              onAdd={() => addToOrder(dish.id)}
            />
          ))}
        </div>

        {/* PASTAS + DRINKS */}
        <div className="w-full lg:w-1/3 bg-menuitem p-4 rounded text-chalk">
          <h2 className="font-fredericka text-2xl mb-2 border-b pb-1">PASTAS</h2>
          {(grouped["Pasta"] || []).map((dish) => (
            <PizzaCard
              key={dish.id}
              pizza={dish}
              onSelect={() => handlePizzaSelect(dish)}
              onAdd={() => addToOrder(dish.id)}
            />
          ))}
          <h2 className="font-fredericka text-2xl mt-6 mb-2 border-b pb-1">
            DRINKS
          </h2>
          {(grouped["Drinks"] || []).map((dish) => (
            <PizzaCard
              key={dish.id}
              pizza={dish}
              onSelect={() => handlePizzaSelect(dish)}
              onAdd={() => addToOrder(dish.id)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-start text-center gap-4 mt-4">
      {/* CHEF WITH SPEECH */}
      <PizzaioloCard text={selectedPizza} condition={!!selectedPizza} />

      {/* TABLE NUMBER INPUT */}
      <input
        type="text"
        placeholder="Table number"
        value={table}
        onChange={(e) => setTable(e.target.value)}
        className="p-2 border rounded shadow"
      />

      {/* PIZZA BOX */}
      <img
        src={parseFloat(getTotal()) > 0 ? pizzaboxFull : pizzaboxEmpty}
        alt="Pizza box"
        className="w-24 cursor-pointer hover:scale-110 transition"
        onClick={sendOrder}
      />

      {/* TOTAL PRICE */}
      <div className="mt-2 text-xl font-bold">TOTAL: {getTotal()} €</div>

      </div>
    </div>
  </div>
  );
}

export default MenuPage;

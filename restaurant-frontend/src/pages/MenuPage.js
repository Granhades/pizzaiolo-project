import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PizzaCard from "../components/ui/PizzaCard";
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

    axios
      .post("http://localhost:8080/api/order", { table, items })
      .then(() => {
        setOrder({});
        navigate("/success", { state: { table, items: detailedItems } });
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

        {/* PIZZAIOLI + SPEECH + TOTAL */}
        <div className="w-full lg:w-1/3 flex flex-col items-center text-center relative mt-8 lg:mt-0 transition-all duration-300 ease-in-out">
          {/* SPEECH BUBBLE */}
          <div
            className={`relative mb-[-100px] w-64 md:w-80 lg:w-96 transition-transform duration-300 ${
              isAnimating ? 'scale-105' : ''
            }`}
          >
            <img src={speechBubble} alt="Speech Bubble" className="w-full" />
            <div className="absolute top-[40%] left-[10%] right-[10%] text-center">
              <p className="text-xs text-gray-700 font-semibold italic leading-snug break-words">
                {selectedPizza
                  ? selectedPizza.description
                  : "Click a dish to hear the chef"}
              </p>
            </div>
          </div>

          {/* CHEF */}
          <img
            src={pizzaioloImg}
            alt="Chef"
            className="w-80 z-10 mb-4"
          />

          {/* TABLE NUMBER */}
          <div className="text-center mb-4 w-full px-4">
            <label
              htmlFor="tableNumber"
              className="block text-sm mb-1 text-chalk font-semibold"
            >
              Table number:
            </label>
            <input
              id="tableNumber"
              type="text"
              value={table}
              onChange={(e) => setTable(e.target.value)}
              placeholder="Introduce your table number"
              className="w-full rounded-md shadow-md px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* PIZZA BOX */}
          <img
            src={parseFloat(getTotal()) > 0 ? pizzaboxFull : pizzaboxEmpty}
            alt="Pizza box"
            className= "w-24 mt-2 cursor-pointer hover:scale-110"
            onClick={sendOrder}
          />

          {/* TOTAL */}
          <div className="mt-4 text-xl font-bold">TOTAL: {getTotal()} €</div>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PizzaioloCard from "../components/ui/PizzaioloWithSpeech";

import boxIcon from "../assets/images/pizzabox-full.png";

export default function SuccessOrderPage() {
  const { orderId } = useParams();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Your pizza adventure begins!");
  const [total, setTotal] = useState("...");

  // MESSAGES TO PROGRESS BAR
  const stages = [
    { percent: 10, message: "Spreading tomato sauce... 🍅" },
    { percent: 25, message: "Adding mozzarella clouds... 🧀" },
    { percent: 40, message: "Sprinkling pepperoni magic... 🍖" },
    { percent: 60, message: "Sliding onto the pizzaiolo's paddle... 🍕" },
    { percent: 80, message: "Into the wood-fired oven we go! 🔥" },
    { percent: 100, message: "Your order is ready to enjoy! 🎉" }
  ];

  // PROGRESS BAR
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 5;
        const stage = stages.find((s) => next <= s.percent);
        if (stage) setMessage(stage.message);
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // GET_TOTAL
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/order/${orderId}`);
        const order = await res.json();
        const totalCalc = order.items.reduce(
            (acc, item) => acc + (item.price || 0) * item.quantity,
            0
        ).toFixed(2);
        setTotal(totalCalc);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
      <div className="bg-peach min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-[#333] text-white text-center px-6 py-12 rounded-md  font-fredericka text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl mx-auto mb-0">
          <div className="border-b border-white pb-2">PREPARING</div>
          <div className="pt-2">YOUR</div>
          <div className="-mt-0">ORDER</div>
          {/* PROGRESS BAR */}
          <div className="w-full max-w-xl mt-10 mb-6">
            <div className="bg-white rounded-full h-6 overflow-hidden shadow">
              <div
                  className="bg-green-500 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>Progress: {progress}%</p>
          </div>

        </div>

        <div>
          <PizzaioloCard
              text={message}
              chef={true}
              speech={true}
          />
        </div>


        {/* PIZZA BOX */}
        <img src={boxIcon} alt="Pizza Box" className="h-16 mt-6" />

        {/* TOTAL */}
        <div className="mt-6 text-xl font-bold">TOTAL: {total} €</div>
      </div>
  );
}
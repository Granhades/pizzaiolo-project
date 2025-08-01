import React, { useEffect, useState } from "react";
import pizzaioloImg from "../../assets/images/chef.png";
import speechBubble from "../../assets/images/speech-bubbles.png";

function PizzaioloWithSpeech({ text, chef, speech }) {

  //Animation Chef or Speech
  const [chefAnimation, setChefAnimation] = useState(false);
  const [speechAnimation, setSpeechAnimation] = useState(false);

  useEffect(() => {
      setChefAnimation(false);
      setSpeechAnimation(false);

      requestAnimationFrame(() => {

        if (chef) setChefAnimation(true);
        if (speech) setSpeechAnimation(true);
      });
  
  }, [text, chef, speech]);


  return (

    

    <div className="pizzaiolo-wrapper flex flex-col items-center text-center relative mt-0 mb-0 transition-all duration-300 ease-in-out">
      {/* SPEECH BUBBLE */}
      <div
        className={`relative w-72 md:w-96 mb-[-100px] transition-transform duration-300 ${
          speechAnimation ? "scale-105" : "scale-100"
        }`}
      >
        <img src={speechBubble} alt="Speech Bubble" className="w-full" />
        <div className="absolute top-[40%] left-[10%] right-[10%] text-center opacity-0 animate-fade-in">
          <p className="text-xs text-gray-700 font-semibold italic leading-snug break-words">
            {typeof text === "string"
              ? text
              : text?.description || "Click a dish to hear the chef"}
          </p>
        </div>
      </div>

      {/* CHEF IMAGE */}
      <img src={pizzaioloImg} alt="Chef" className={`w-72 z-10 transition-transform duration-300 ${chefAnimation ? "scale-105" : "scale-100"} `} />
    </div>
  );
}

export default PizzaioloWithSpeech;

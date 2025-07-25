import React, { useState } from "react";


import axios from "axios";

import PizzaioloCard from "../components/ui/PizzaioloWithSpeech";

function BasketPage() {

  const [showDeleteModal, setShowDeleteModal] = useState(false)





  return (
  <div className="min-h-screen bg-peach p-4">
    {/* MAIN CONTENT CENTERED */}
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-start max-w-6xl mx-auto">
      
      {/* LEFT COLUMN - ORDER + DELETE MODAL */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="bg-menuitem text-chalk rounded p-6 shadow w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-2xl font-fredericka border-b pb-2 sm:border-0 sm:pb-0">
              PREPRARING
            </h3>
            <div className="flex items-center gap-2 mt-4 sm:mt-0 text-lg text-gray-100">
              <h3 className="text-2xl font-fredericka border-b pb-2 sm:border-0 sm:pb-0">
              YOUR ORDER
            </h3>
            </div>
          </div>

          

          {/* PROGRESS BAR */}


          {/* GIF PIZZA */}
          
        </div>

        
      </div>

      {/* RIGHT COLUMN - PIZZAIOL CARD */}
      
      <div className="w-full lg:w-1/3 flex items-start justify-center pt-[6px]">
        <PizzaioloCard
          
          text={"EXCELENT CHOICE"}
          chef={true}
          speech={true}
        />
      </div>
    </div>
  </div>
);


}

export default BasketPage;

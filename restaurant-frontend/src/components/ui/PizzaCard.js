import React from "react";
import pizzaIcon from "../../assets/images/logo-pizza.png";


{/* Pizza Name */} 
const PizzaCard = ({pizza, onSelect, onAdd}) => {
    return(
        <div
            className ="flex justify-between items-center bg-menuitem text-chalk px-4 py-2 mb-2 rounded-md shadow hover:bg-gray-600 cursor-pointer"
            onClick={() => onSelect(pizza)} //Chef speech logic
        >
        {/* Pizza Name */}
        <div className ="font-fredericka text-lg tracking-wide">{pizza.name}</div>
        {/* Price */}
        <div className="text-price font-semibold">{pizza.price.toFixed(2)}€</div>
        {/* ADD TO CART LOGIC */}
        <img
        src={pizzaIcon}
        alt="pizza"
        className="w-8 h-8 ml-4 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); 
          onAdd(pizza.id);     
        }}
      />
      
        </div>         
    );
};

export default PizzaCard
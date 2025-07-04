function DishCard ({dish, onAdd}) {
    return(
        <div>
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>{dish.price}€</p>
            <button onClick={() => onAdd(dish.id)}>Add to order</button>
        </div>
    );
}

export default DishCard;
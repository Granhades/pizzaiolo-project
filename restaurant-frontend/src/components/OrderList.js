import React from "react";


function OrderList({orders, onDelete})
{
    if(!orders.length) return <p> No orders available </p>;

    return (
        <ul>
            {orders.map(order => (
                <li key = {order.id}>
                    <strong>Table : </strong> {order.table}<br />
                    <strong>Date : </strong>  {new Date(order.date).toLocaleString()} <br />
                    <strong>Items : </strong>
                    <ul>
                        {order.items.map((item, i )=> (
                            <li key = {i}>{item.name} x {item.quantity}</li>
                        ))}
                    </ul>
                    <button onClick={() => onDelete(order.id)}>Delete</button>
                </li>
            ))}
        </ul>
    
    );
}

export default OrderList;


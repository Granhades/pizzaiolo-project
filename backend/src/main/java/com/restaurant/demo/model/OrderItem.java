package com.restaurant.demo.model;

public class OrderItem{
    private String dishId;
    private int quantity;

    //Getters and setters
    public String getDishId() {return dishId;}
    public void setDishId(String dishId) {this.dishId = dishId;}

    public int getQuantity() {return quantity;}
    public void setQuantity(int quantity) {this.quantity = quantity;}
}
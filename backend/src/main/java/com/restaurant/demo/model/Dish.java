package com.restaurant.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dishes")
public class Dish {
    
    
    @Id //ID
    private String id;
    private String name;
    private String description;
    private double price;

    private String section;

    //Getters & Setters

    //SECTION
    public String getSection() {
        return section;
    }
    public void setSection(String section) {
        this.section = section;
    }
    //ID
    public String getId() {return id; }
    public void setId(String id) {this.id = id; }
    //NAME
    public String getName() {return name; }
    public void setName(String name) {this.name = name; }
    //DESCRIPTION
    public String getDescription() {return description; }
    public void setDescription(String description) {this.description = description; }
    //PRICE
    public double getPrice() {return price; }
    public void setPrice(double price) {this.price = price;}
}
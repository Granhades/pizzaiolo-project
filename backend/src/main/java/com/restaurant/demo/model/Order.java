package com.restaurant.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;


@Document(collection = "orders")

public class Order {
    @Id //ID
    private String id;
    private String userId;
    private List<OrderItem> items;
    private String table;
    private Date date = new Date();
    private String email;
    private Status status = Status.ORDERING;

    //Control order
    private Date createdAt;
    private Date confirmedAt;
    private Date servedAt;

    //Kitchen
    private boolean kitchenSeen;
    private String notes;

    //Time METHODS

    public Long getTimeToConfirm() {
        if(createdAt != null && confirmedAt != null)
        {
            return (confirmedAt.getTime() - createdAt.getTime()) / 1000;
        }
        return null;
    }
    //Kitchen time
    public Long getTimeToServe() {
        if(kitchenSeen == true)
        {
            return(servedAt.getTime() - confirmedAt.getTime()) / 1000;
        }
        return null;
    }



   

    //Status about order
    public enum Status  {
        ORDERING, CHECKING, CONFIRMED, PREPARING, READY
    }

    // Getters and setters

    public String getUserId()
    {
        return userId;
    }

    public void setUserId(String userId)
    {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Status getStatus()
    {
        return status;
    }

    public void setStatus(Status status)
    {
        this.status = status;
    }

     public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(Date confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public Date getServedAt() {
        return servedAt;
    }

    public void setServedAt(Date servedAt) {
        this.servedAt = servedAt;
    }

    public boolean isKitchenSeen() {
        return kitchenSeen;
    }

    public void setKitchenSeen(boolean kitchenSeen) {
        this.kitchenSeen = kitchenSeen;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
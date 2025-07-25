package com.restaurant.demo.repository;
import java.util.List;

import com.restaurant.demo.model.Order;
import com.restaurant.demo.model.Order.Status;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByStatus(Status status);
    List<Order> findByUserId(String userId);
    
}
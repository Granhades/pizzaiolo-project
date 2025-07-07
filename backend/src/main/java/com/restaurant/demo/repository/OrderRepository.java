package com.restaurant.demo.repository;
import java.util.List;

import com.restaurant.demo.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
    
}
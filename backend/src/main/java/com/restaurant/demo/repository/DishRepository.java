package com.restaurant.demo.repository;

import com.restaurant.demo.model.Dish;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DishRepository extends MongoRepository<Dish, String> {}
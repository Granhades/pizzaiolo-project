package com.restaurant.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.restaurant.demo.model.User;

import java.util.Optional;


public interface UserRepository extends MongoRepository<User, String>{

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    
}

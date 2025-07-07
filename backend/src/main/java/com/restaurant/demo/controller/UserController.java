package com.restaurant.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.demo.model.User;
import com.restaurant.demo.repository.UserRepository;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Optional;
import java.util.Map;


@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")


public class UserController {
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/register")
    public String register(@RequestBody User user)
    {
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            return "Email already in use";
        }
        if(userRepository.findByUsername(user.getUsername()).isPresent())
        {
            return "Username alredy in use";
        }

        userRepository.save(user);
        return ("User registered sucessfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if(existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())){
            Map<String, String> response = new HashMap<>();
            response.put("username", existingUser.get().getUsername());
            response.put("email", existingUser.get().getEmail());
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials!");
    }
    
    
}

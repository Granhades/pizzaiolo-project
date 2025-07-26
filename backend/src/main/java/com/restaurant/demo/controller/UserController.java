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
    public ResponseEntity <Map<String,String>> register(@RequestBody User user)
    {
        Map<String, String> response = new HashMap<>();

        //Check blank or null
       if(user.getEmail() == null || user.getEmail().isEmpty())
        {
            response.put("error", "Email is required");
            return ResponseEntity.badRequest().body(response);
        }
        if(user.getPassword() == null || user.getPassword().isEmpty())
        {
            response.put("error", "Password is required");
            return ResponseEntity.badRequest().body(response);
        }
        if(user.getUsername() == null || user.getUsername().isEmpty())
        {
            response.put("error", "Username is required");
            return ResponseEntity.badRequest().body(response);
        }
       
        //Duplicates
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            response.put("error", "Email already registered");
            return ResponseEntity.badRequest().body(response);
        }
        if(userRepository.findByUsername(user.getUsername()).isPresent())
        {
            response.put("error", "Username already registered");
            return ResponseEntity.badRequest().body(response);
        }

        userRepository.save(user);
        response.put("message", "Created sucessfull!");
        response.put("userId", user.getId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

         //Check blank or null
       if(user.getEmail() == null || user.getEmail().isEmpty())
        {
            response.put("error", "Email is required");
            return ResponseEntity.badRequest().body(response);
        }
        if(user.getPassword() == null || user.getPassword().isEmpty())
        {
            response.put("error", "Password is required");
            return ResponseEntity.badRequest().body(response);
        }
        if(user.getUsername() == null || user.getUsername().isEmpty())
        {
            response.put("error", "Username is required");
            return ResponseEntity.badRequest().body(response);
        }

        //Validation
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if(existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())){
            
            response.put("message", "Login successful");
            response.put("userId", existingUser.get().getId());
            response.put("username", existingUser.get().getUsername());
            response.put("email", existingUser.get().getEmail());

            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials!");
    }
    
    
}

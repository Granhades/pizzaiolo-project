package com.restaurant.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.demo.model.User;
import com.restaurant.demo.repository.UserRepository;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Optional;



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
    public String login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if(existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())){
            return "Login sucessfully";
        }
        
        return "Invalid credentials !";
    }
    
    
}

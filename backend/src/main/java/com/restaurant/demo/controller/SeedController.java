package com.restaurant.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.demo.service.DataSeeder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/seed")
@CrossOrigin("*")
public class SeedController {
    @Autowired
    private DataSeeder dataSeeder;
    @PostMapping
    public String triggerSeed() {
        
        return dataSeeder.seedData();
    }
    
}

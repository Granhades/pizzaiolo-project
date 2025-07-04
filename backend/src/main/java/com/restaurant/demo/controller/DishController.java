package com.restaurant.demo.controller;

import com.restaurant.demo.model.Dish;
import com.restaurant.demo.repository.DishRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000")

public class DishController {
    @Autowired
    private final DishRepository dishRepository;

    public DishController(DishRepository dishRepository)
    {
        this.dishRepository = dishRepository;
    }

    @GetMapping("")
    public List<Dish> getMenu()
    {
        return dishRepository.findAll();
    }

    @PostMapping
    public Dish addDish(@RequestBody Dish dish)
    {
        return dishRepository.save(dish);
    }

    @DeleteMapping("/{id}")
    public void deleteDish(@PathVariable String id) {
    dishRepository.deleteById(id);}

    @PutMapping("/{id}")
    public Dish updateDish(@PathVariable String id, @RequestBody Dish updatedDish) {
    Dish existing = dishRepository.findById(id).orElseThrow();
    existing.setName(updatedDish.getName());
    existing.setDescription(updatedDish.getDescription());
    existing.setPrice(updatedDish.getPrice());
    return dishRepository.save(existing);
}

}
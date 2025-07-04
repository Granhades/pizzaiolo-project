package com.restaurant.demo.service;

import com.restaurant.demo.model.Dish;
import com.restaurant.demo.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@Service
public class DataSeeder {
    
    @Autowired
    private DishRepository dishRepository;

    
    public String seedData() {

        //Clean
        dishRepository.deleteAll();
        //Add
        List<Dish> dishes = Arrays.asList(
            createDish("Margherita", "Tomato, mozzarella, basil", 8.50, "Pizza"),
            createDish("Pepperoni", "Tomato, mozzarella, spicy pepperoni", 9.90, "Pizza"),
            createDish("BBQ Chicken", "BBQ sauce, chicken, red onions, cheese", 10.50, "Pizza"),
            createDish("Hawaiian", "Ham, pineapple, cheese", 9.20, "Pizza"),
            createDish("Vegetarian", "Peppers, onions, mushrooms, olives", 8.80, "Pizza"),
            createDish("Four Cheese", "Mozzarella, parmesan, gorgonzola, cheddar", 10.00, "Pizza"),
            createDish("Diavola", "Spicy salami, chili flakes, tomato sauce", 10.20, "Pizza"),

            createDish("Spaghetti Carbonara", "Egg, cheese, pancetta, pepper", 11.50, "Pasta"),
            createDish("Penne Arrabiata", "Tomato, garlic, chili, olive oil", 10.00, "Pasta"),
            createDish("Lasagna", "Meat sauce, béchamel, cheese", 12.00, "Pasta"),

            createDish("Coca-Cola", "33cl can", 2.00, "Drinks"),
            createDish("Sparkling Water", "Mineral water with gas", 1.80, "Drinks"),
            createDish("Red Wine", "Glass of house red", 4.50, "Drinks"),
            createDish("Beer", "Draft beer 50cl", 3.50, "Drinks")
        );

        
    
        dishRepository.saveAll(dishes);
        return "Seeded " + dishes.size() + " dishes!";
    }

    

    private Dish createDish(String name, String description, double price, String section)
    {
        Dish dish = new Dish();
        dish.setName(name);
        dish.setDescription(description);
        dish.setPrice(price);
        dish.setSection(section);

        return dish;
    }


}

package com.restaurant.demo.controller;

import com.restaurant.demo.model.Dish;
import com.restaurant.demo.repository.DishRepository;
import com.restaurant.demo.model.Order;
import com.restaurant.demo.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")

public class OrderController {
    @Autowired
    private final OrderRepository orderRepository;
    @Autowired
    private final DishRepository dishRepository;

    public OrderController(OrderRepository orderRepository, DishRepository dishRepository)
    {
        this.orderRepository = orderRepository;
        this.dishRepository = dishRepository;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable String id) {
    orderRepository.deleteById(id);
    }
    
    //Convert id order -> to dish name
    @GetMapping
    public List<Map<String, Object>> getAllOrdersWithDishNames() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream().map(order -> {
            Map<String, Object> orderMap = new HashMap<>();
            orderMap.put("id", order.getId());
            orderMap.put("table", order.getTable());
            orderMap.put("date", order.getDate());
            List<Map<String, Object>> itemsWithNames = order.getItems().stream().map(item -> {
                Optional<Dish> dishOpt = dishRepository.findById(item.getDishId());
                String dishName = dishOpt.map(Dish::getName).orElse("Unknown");
                double price = dishOpt.map(Dish::getPrice).orElse(0.0);
                Map<String, Object> itemMap = new HashMap<>();
                itemMap.put("dishId", item.getDishId());
                itemMap.put("dishName", dishName);
                itemMap.put("quantity", item.getQuantity());
                itemMap.put("price", price);
                return itemMap;
            }).collect(Collectors.toList());

            orderMap.put("items", itemsWithNames);
            return orderMap;
        }).collect(Collectors.toList());
    }

    @PutMapping("/order/{id}")
    public Order updateOrder(@PathVariable String id, @RequestBody Order updatedOrder) {
        return orderRepository.save(updatedOrder); // simple update
    }

    
}
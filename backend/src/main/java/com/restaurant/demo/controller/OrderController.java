package com.restaurant.demo.controller;

import com.restaurant.demo.model.Dish;
import com.restaurant.demo.model.Order;
import com.restaurant.demo.repository.DishRepository;
import com.restaurant.demo.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    public OrderController(OrderRepository orderRepository, DishRepository dishRepository) {
        this.orderRepository = orderRepository;
        this.dishRepository = dishRepository;
    }

    // Create new order
    @PostMapping
    public Map<String, String> createOrder(@RequestBody Order order) {
        Order saveOrder = orderRepository.save(order);
        return Map.of("id", saveOrder.getId());
    }

    // Debug: get all orders raw
    @GetMapping("/debug")
    public List<Order> debugAllOrders() {
        return orderRepository.findAll();
    }

    // Delete order by ID
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable String id) {
        orderRepository.deleteById(id);
    }

    // Get all orders with dish names
    @GetMapping
    public List<Map<String, Object>> getAllOrdersWithDishNames() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream().map(this::mapOrderWithDishNames).collect(Collectors.toList());
    }

    @GetMapping("/basket/{id}")
    public Map<String, Object> getOrderByIdForBasket(@PathVariable String id) {
        System.out.println("Looking for order with ID: " + id);
        
        Optional<Order> orderOpt = orderRepository.findById(id);

        if (orderOpt.isEmpty()) {
            System.out.println("NOT FOUND in database");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
        }

        System.out.println("FOUND: " + orderOpt.get().getTable());
        return mapOrderWithDishNames(orderOpt.get());
    }

    @GetMapping("/{id}")
    public Map<String, Object> getOrderById(@PathVariable String id) {
        System.out.println("Getting order by ID (non-basket): " + id);
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
        }
        return mapOrderWithDishNames(orderOpt.get());
}


    // Update order
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable String id, @RequestBody Order updatedOrder) {
        return orderRepository.save(updatedOrder);
    }

    // Helper to map Order + enrich items with dish names and prices
    private Map<String, Object> mapOrderWithDishNames(Order order) {
        Map<String, Object> orderMap = new HashMap<>();
        orderMap.put("id", order.getId());
        orderMap.put("table", order.getTable());
        orderMap.put("email", order.getEmail());
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
    }
}

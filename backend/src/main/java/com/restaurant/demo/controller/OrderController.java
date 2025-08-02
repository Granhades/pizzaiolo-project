package com.restaurant.demo.controller;

import com.restaurant.demo.model.Dish;
import com.restaurant.demo.model.Order;
import com.restaurant.demo.model.Order.Status;
import com.restaurant.demo.repository.DishRepository;
import com.restaurant.demo.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
        //Check at least 1 item
        if(order.getItems() == null || order.getItems().isEmpty())
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ORDER EMPTY");
        }   
        //Check number of table is required
        if(order.getTable() == null || order.getTable().isEmpty())
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TABLE REQUIRED");
        }
        order.setStatus(Order.Status.ORDERING);
        order.setCreatedAt(new Date());
        Order saveOrder = orderRepository.save(order);
        return Map.of("id", saveOrder.getId());
    }

    //Confirming the order & send to the kitchen
    @PostMapping("/{id}/confirm")
    public Map <String, Object> confirmToTheKitchen (@PathVariable String id) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if(orderOpt.isEmpty())
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ORDER NOT FOUND");
        }
        Order order = orderOpt.get();
        if(order.getStatus() != Status.ORDERING && order.getStatus() != Status.CHECKING)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "STATUS ERROR");
        }
        //If no user registered error
        if(order.getUserId() == null || order.getUserId().isEmpty())
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NO USER REGISTERED");
        }
        order.setStatus(Status.CONFIRMED);
        order.setConfirmedAt(new Date());
        orderRepository.save(order);

        //Return the information about dishes
        return mapOrderWithDishNames(order);
    }
    

    // Debug: get all orders raw
    @GetMapping("/debug")
    public List<Order> debugAllOrders() {
        return orderRepository.findAll();
    }

    // Delete order by ID
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable String id) {
        if (!orderRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ORDER NOT FOUND");
        }
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
       
        
        Optional<Order> orderOpt = orderRepository.findById(id);

        if (orderOpt.isEmpty()) {
            
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ORDER NOT FOUND");
        }
        Order order = orderOpt.get();
        if(order.getStatus() != Status.ORDERING && order.getStatus() != Status.CHECKING)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "STATUS ERROR");
        }
        
       
        return mapOrderWithDishNames(order);
    }

    @GetMapping("/{id}")
    public Map<String, Object> getOrderById(@PathVariable String id) {
        System.out.println("Getting order by ID (non-basket): " + id);
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ORDER NOT FOUND");
        }
        Order order = orderOpt.get();
        

        return mapOrderWithDishNames(order);
}

    @GetMapping("/status/confirmed")
    public List<Map<String,Object>> getConfirmedOrders()
    {
        List<Order> orders = orderRepository.findByStatus(Status.CONFIRMED);
        return orders.stream()
        .map(this::mapOrderWithDishNames)
        .collect(Collectors.toList());
    }

    // Get orders by user ID with enriched data
    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getOrdersByUser(@PathVariable String userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(this::mapOrderWithDishNames)
                .collect(Collectors.toList());
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
        orderMap.put("userId", order.getUserId());
        orderMap.put("table", order.getTable());
        orderMap.put("email", order.getEmail());
        orderMap.put("date", order.getDate());
        orderMap.put("timeToConfirm", order.getTimeToConfirm());
        orderMap.put("timeToServe", order.getTimeToServe());

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

# 🍕 Pizzaiolo - Full Stack Pizza Ordering App

This project is a full-stack web application for ordering pizzas at a restaurant.
Customers can browse the menu, place orders, and track their status in real-time.
Admins can manage dishes and monitor orders from the kitchen.

## 🛠 Backend Architecture

The backend is built with **Java + Spring Boot + MongoDB** and follows a clean architecture:

- **Entities/Models**: `User`, `Dish`, `Order`, `OrderItem`
- **Repositories**: `UserRepository`, `DishRepository`, `OrderRepository`
- **Controllers**: `UserController`, `DishController`, `OrderController`
- **Utilities/Tests**: `Status`, `DataSeeder`, JUnit tests

## 📐 Backend UML Diagram

Here’s the architecture of the backend:

![Backend UML](./backend-uml-structure.png)

### 🎨 Color Legend
- 🟨 Entities/Models
- 🟩 Repositories
- 🟦 Controllers
- ⚪ Utilities / Enums / Tests

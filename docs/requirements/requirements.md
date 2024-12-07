# Requirements Document

## Project Overview

The **E-Commerce Database System** is designed to manage customer data, orders, product inventories, and transactions for an online store. The system allows customers to register, place orders, track them, and manage inventory efficiently.

---

## 1. Functional Requirements

### 1.1 Customer Management

- **User Registration**:
  - Customers should be able to register an account with the required fields (e.g., name, email, password, address).
- **User Login/Logout**:
  - Registered customers should be able to log in using their credentials.
  - Customers can log out from their accounts at any time.
- **Profile Management**:
  - Customers can view and update their profiles.

### 1.2 Order Management

- **Place Order**:
  - Customers should be able to place orders by selecting products and adding them to the shopping cart.
  - The system should calculate the total cost (including taxes, shipping, etc.).
- **Order Tracking**:
  - Customers should be able to track the status of their orders (e.g., pending, shipped, delivered).
- **Order History**:
  - Customers can view their past orders and order details.

### 1.3 Product Management

- **Product Listing**:
  - The system will list available products with details (name, description, price, category).
- **Inventory Management**:
  - The system should track inventory levels and update stock when an order is placed.
- **Product Categories**:
  - Products should be organized into categories for better user navigation.

### 1.4 Payment Integration

- **Payment Gateway**:
  - The system should integrate with a payment gateway (e.g., Stripe, PayPal) to securely process payments.
  - Customers should receive a confirmation after a successful payment.

### 1.5 Data Analysis & Reporting

- **Sales Reports**:
  - Admins should be able to generate reports on sales over time (daily, monthly, yearly).
- **Customer Trends**:
  - The system should be able to display reports on customer behavior, such as most frequent buyers or popular products.
- **Inventory Reports**:
  - Admins should be able to view reports on product availability, low stock warnings, and restocking needs.

---

## 2. Non-Functional Requirements

### 2.1 Performance

- The system should handle multiple concurrent users without degradation in performance.
- The response time for placing an order, viewing products, and checking out should not exceed 3 seconds under normal load.

### 2.2 Scalability

- The system should be designed to handle increasing numbers of users, products, and orders as the business grows.

### 2.3 Security

- Customer data, especially sensitive information like passwords and payment details, should be encrypted.
- The application should implement secure login mechanisms, such as JWT tokens, for user authentication.

### 2.4 Usability

- The application should provide a clean and intuitive user interface that allows customers to easily navigate and place orders.
- The admin interface should allow for easy management of customers, products, and orders.

---

## 3. Technical Requirements

### 3.1 Frontend

- **Technologies**: React, TypeScript, Tailwind CSS
- The frontend should have responsive designs for both desktop and mobile devices.

### 3.2 Backend

- **Technologies**: Node.js, Express.js, Prisma ORM
- **Database**: MySQL or MariaDB (handled through XAMPP)
- The backend should handle customer data, order processing, and payment gateway integration.

### 3.3 Database

- **Schema Design**: The database should include tables for customers, products, orders, payments, and inventory.
- **Triggers**: Triggers should be used to update inventory automatically when an order is placed.
- **Data Integrity**: Foreign key constraints should be used to maintain consistency between tables.

### 3.4 Data Encryption

- Passwords and sensitive information should be stored securely using encryption mechanisms (e.g., bcrypt).
- Payment information should be securely processed via the payment gateway.

---

## 4. System Architecture

### 4.1 Overview

The system will be a typical client-server application, with the frontend (React) interacting with the backend (Node.js + Express), which communicates with a MySQL database via Prisma ORM.

### 4.2 API Endpoints

- **POST /login**: Authenticates a user and returns a JWT token.
- **POST /register**: Registers a new user.
- **GET /products**: Returns a list of available products.
- **POST /order**: Places a new order.
- **GET /orders/:userId**: Returns a list of orders for a specific user.
- **GET /report/sales**: Returns a report on sales.

---

## 5. Constraints

- The system will use **XAMPP** as a local MySQL database for development purposes.
- The system will use **Prisma** as the ORM for database interactions.

---

## 6. Assumptions

- All customers will have unique email addresses.
- Admin users will have additional privileges to manage products, customers, and orders.

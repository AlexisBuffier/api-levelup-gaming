# API LevelUp Gaming

A secure and scalable RESTful API for the LevelUp Gaming e-commerce platform, built with Node.js, Express, and Sequelize.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository hosts the backend API for the LevelUp Gaming platform. The API provides secure endpoints for managing users, products, categories, carts, and more, all while leveraging JWT-based authentication and role-based access control.

---

## Features

- **User Authentication:** Secure registration and login with JWT.
- **CRUD Operations:** Manage users, products, categories, carts, and cart items.
- **Secure Routes:** Protected endpoints using custom middleware.
- **CORS Configuration:** Access limited to authorized origins.
- **Database Integration:** Uses Sequelize ORM with MySQL for robust data management.

---

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-404D59?style=for-the-badge) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens) ![REST API](https://img.shields.io/badge/REST_API-ED2939?style=for-the-badge&logo=swagger&logoColor=white)

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/api-levelup-gaming.git
   cd api-levelup-gaming
   ```
   
2. **Install Dependencies:**

   ```bash
   npm install
   ```
   
3. **Configure Environment Variables:**
   
   Create a .env file in the root directory with the following content (update values as needed):
   ```bash
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_DIALECT=mysql
   DB_PORT=your_db_port
   
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   PORT=3000
   ```

4. **Run the Application:**

   ```bash
   npm start
   ```

---

## Usage

   The API will be available at: http://localhost:3000

1. **Testing Endpoints:**
   
   Use Postman or any API client to send requests. For example, to fetch all products:
   ```bash
   GET http://localhost:3000/api/products
   ```
   
2. **Authentication:**

   Secure endpoints require an Authorization header:
   ```bash
   Authorization: Bearer <your_jwt_token>
   ```

--

## API Endpoints

1. **Authentication:**
   
   - <code>POST /api/auth/register</code> — Register a new user.
   - <code>POST /api/auth/login</code> — Authenticate and receive a JWT.

2. **User:**

   - <code>GET /api/users</code> — Retrieve all users.
   - <code>GET /api/users/:id</code> — Get user details.
   - <code>PUT /api/users/:id</code> — Update user information.
   - <code>DELETE /api/users/:id</code> — Delete a user.

3. **Product:**

   - <code>GET /api/products</code> — Retrieve all products.
   - <code>GET /api/products/:id</code> — Get product details.
   - <code>POST /api/products</code> — Create a new product.
   - <code>PUT /api/products/:id</code> — Update a product.
   - <code>DELETE /api/products/:id</code> — Delete a product.

4. **Categories:**

   - <code>GET /api/categories</code> — Retrieve all categories.
   - <code>GET /api/categories/:id</code> — Get category details.
   - <code>POST /api/categories</code> — Create a new category.
   - <code>PUT /api/categories/:id</code> — Update a category.
   - <code>DELETE /api/categories/:id</code> — Delete a category.

5. **Carts & Cart Items**

   - <code>POST /api/carts</code> — Create a cart for the authenticated user.
   - <code>GET /api/carts/me</code> — Retrieve the current user's cart.
   - <code>POST /api/cart-items</code> — Add an item to a cart.
   - <code>PUT /api/cart-items/:id</code> — Update a cart item.
   - <code>DELETE /api/cart-items/:id</code> — Remove an item from the cart.
   

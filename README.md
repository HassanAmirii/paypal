<p align="center"# Expense Tracker API

<!-- <p align="center">
  <a href="https://github.com/HassanAmirii/paypal" rel="noopener">
    <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo">
  </a> -->
</p>

<h3 align="center">Expense Tracker API</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/HassanAmirii/paypal)
[![GitHub Issues](https://img.shields.io/github/issues/HassanAmirii/paypal.svg)](https://github.com/HassanAmirii/paypal/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/HassanAmirii/paypal.svg)](https://github.com/HassanAmirii/paypal/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">
  A secure and robust RESTful API for managing personal expenses, built with Node.js and Express.js.
  <br>
</p>

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

---

## About <a name="about"></a>

The **Expense Tracker API** is a complete backend solution for tracking personal finances. It provides a secure and scalable platform for users to manage their expenses. The application is built with **Node.js** and the **Express.js** framework, using **MongoDB** as its NoSQL database for flexible data storage.

This project goes beyond basic CRUD operations by implementing a full **JSON Web Token (JWT)** authentication system. This ensures that user data is protected and that each user can only access their own private expense records. The architecture is designed to be easily consumed by any modern frontend application.

---

## Features <a name="features"></a>

- **Secure User Authentication**: Full user lifecycle management with `POST /register` and `POST /login` routes.
- **Password Security**: Passwords are securely hashed using `bcrypt`.
- **JWT-based Authorization**: Protects API endpoints using a JSON Web Token, ensuring only authenticated users can access their private data.
- **Personalized Data**: Each expense is linked to a specific user, allowing users to view and manage only their own financial records.
- **Full CRUD Operations**: Complete functionality to **Create**, **Read**, **Update**, and **Delete** expenses.

---

## � Getting Started <a name="getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have **Node.js** and **npm** installed on your system.
You also need to have **MongoDB** running locally on its default port.

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1.  **Clone the Repository**:

    ```bash
    git clone [https://github.com/HassanAmirii/paypal.git](https://github.com/HassanAmirii/paypal.git)
    cd paypal
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**:

    Create a `.env` file in the root directory and add the following variables.

    ```
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/expense-tracker
    JWT_SECRET=your_super_secret_and_long_random_string_here
    ```

### Running the Application

Once the dependencies are installed and MongoDB is running, you can start the API server:

```bash
node index.js
```

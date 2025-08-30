<h1 align="center">Expense Tracker API</h1>

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

- [About](#about)
- [Features](#features)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## About <a name="about"></a>

The **Expense Tracker API** is a complete backend solution for tracking personal finances. It provides a secure and scalable platform for users to manage their expenses. The application is built with **Node.js** and the **Express.js** framework, using **MongoDB** as its NoSQL database for flexible data storage.

This project goes beyond basic CRUD operations by implementing a full **JSON Web Token (JWT)** authentication system. This ensures that user data is protected and that each user can only access their own private expense records. The architecture is designed to be easily consumed by any modern frontend application.

## Features <a name="features"></a>

- **Secure User Authentication**: Full user lifecycle management with `POST /register` and `POST /login` routes.
- **Password Security**: Passwords are securely hashed using `bcrypt`.
- **JWT-based Authorization**: Protects API endpoints using a JSON Web Token, ensuring only authenticated users can access their private data.
- **Personalized Data**: Each expense is linked to a specific user, allowing users to view and manage only their own financial records.
- **Full CRUD Operations**: Complete functionality to **Create**, **Read**, **Update**, and **Delete** expenses.

## Getting Started <a name="getting_started"></a>

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

    JWT_SECRET=your_super_secret_and_long_random_string_here
    ```

### Running the Application

Once the dependencies are installed and MongoDB is running, you can start the API server:

```bash
node index.js
```

The server will start on `http://localhost:3000`.

---

## Deployment <a name="deployment"></a>

The application can be deployed on a live system using cloud providers like **Render** or **Fly.io**. Ensure you configure your environment variables and update the `MONGO_URI` to a hosted database instance (e.g., MongoDB Atlas).

## API Endpoints

This section documents the primary API endpoints and their functionality. You can interact with the API using tools like Postman, Insomnia, or a frontend application.

### Authentication

#### `POST /register`

- **Description**: Creates a new user account.
- **Body**: `{"username": "tester", "email": "tester@example.com", "password": "secure123"}`

#### `POST /login`

- **Description**: Authenticates a user and returns a JWT token.
- **Body**: `{"email": "tester@example.com", "password": "secure123"}`

### Protected Expense Routes

These routes require a valid JWT in the `Authorization` header.

**Authorization Header Format**: `Authorization: Bearer <your_jwt_token_here>`

#### `POST /expenses`

- **Description**: Creates a new expense linked to the authenticated user.
- **Body**: `{"description": "Lunch", "amount": 25.5, "category": "Food"}`

#### `GET /expenses`

- **Description**: Retrieves all expenses for the authenticated user.

#### `PATCH /expenses/:id`

- **Description**: Updates an expense for the authenticated user.

#### `DELETE /expenses/:id`

- **Description**: Deletes an expense for the authenticated user.

---

## Built Using <a name="built_using"></a>

- [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - A flexible NoSQL document database.
- [Mongoose](https://mongoosejs.com/) - An elegant MongoDB object modeling tool for Node.js.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - A library to implement JSON Web Tokens.
- [dotenv](https://www.npmjs.com/package/dotenv) - A module to load environment variables from a `.env` file.

## Author <a name="authors"></a>

- [@HassanAmirii](https://github.com/HassanAmirii) - Primary Developer

## Acknowledgments <a name="acknowledgement"></a>

- Thanks to the open-source community for providing the tools and inspiration for this project.
- Special thanks to the **Node.js**, **Express**, and **MongoDB** teams for creating such powerful and user-friendly technologies.

👉[project idea from roadmap.sh](https://roadmap.sh/projects/expense-tracker-api)

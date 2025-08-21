# Expense Tracker API 💰

Welcome to the **Expense Tracker API**, a robust backend solution designed for efficient personal expense management. Built with **Node.js** and the **Express.js** framework, this API provides a complete set of CRUD (Create, Read, Update, Delete) operations for your financial records, utilizing **MongoDB** as its NoSQL database.

## ✨ Features

*   **Create Expenses**: Easily add new expense records with detailed descriptions, amounts, and categories.
*   **Retrieve Expenses**: Fetch all expenses or retrieve specific expenses by their unique ID.
*   **Update Expenses**: Modify existing expense details as your financial situation changes.
*   **Delete Expenses**: Remove unwanted expense records from your collection.
*   **Category Enforcement**: Standardized expense categories (e.g., Groceries, Utilities) ensuring data consistency.
*   **Timestamping**: Automatic recording of the date for each expense entry.

## 🚀 Getting Started

Follow these steps to set up and run the Expense Tracker API locally on your machine.

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/HassanAmirii/paypal.git
    cd paypal
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **MongoDB Setup**:
    Ensure you have a MongoDB instance running locally. The application connects to `mongodb://localhost:27017/expense-tracker` by default. If you need to use a different MongoDB URI or port, configure it in your environment variables as described below.

### Running the Application

Once the dependencies are installed and MongoDB is running, you can start the API server:

```bash
node index.js
```

The server will start on `http://localhost:3000` (or your configured port). You should see `Database connected successfully!` and `paypal listening on localhost:3000/expenses` in your console.

---

# Expense Tracker API

## Overview
A robust RESTful API built with Node.js and Express.js, leveraging MongoDB for persistent storage, designed to manage personal expenses.

## Features
- `Express.js`: Facilitates the creation of a RESTful API with defined routes and middleware.
- `Mongoose`: Serves as an Object Data Modeling (ODM) library for Node.js, providing a straightforward, schema-based solution to interact with MongoDB.
- `MongoDB`: A NoSQL document database used for storing all expense records.

## Getting Started
### Installation
Refer to the 'Getting Started' section above for detailed installation instructions.

### Environment Variables
The application uses environment variables for configuration. Create a `.env` file in the root directory and populate it with the following:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/expense-tracker
```
*   `PORT`: The port on which the Express server will listen. (e.g., `3000`)
*   `MONGO_URI`: The connection string for your MongoDB database. (e.g., `mongodb://localhost:27017/expense-tracker`)

## API Documentation
### Base URL
`http://localhost:<PORT>` (e.g., `http://localhost:3000`)

### Endpoints

#### POST /expenses
Creates a new expense record in the database.

**Request**:
```json
{
  "description": "Lunch with colleagues",
  "amount": 25.50,
  "category": "Groceries"
}
```
*   `description` (String, Required): A brief description of the expense.
*   `amount` (Number, Required): The monetary value of the expense.
*   `category` (String, Required): The category of the expense. Must be one of: "Groceries", "Leisure", "Electronics", "Utilities", "Clothing", "Health", "Others".

**Response**:
```json
{
  "message": "successfully created a new expense",
  "expense": {
    "description": "Lunch with colleagues",
    "amount": 25.50,
    "category": "Groceries",
    "date": "2024-07-30T10:00:00.000Z",
    "_id": "60d0fe3d4d4f8f001c2e0e3a",
    "__v": 0
  }
}
```

**Errors**:
- `400 Bad Request`: Invalid input (e.g., missing required fields, invalid category value).
  ```json
  {
    "error": "Expense validation failed: description: Path `description` is required."
  }
  ```

#### GET /expenses
Retrieves all expense records from the database.

**Request**:
_No request body_

**Response**:
```json
{
  "message": "successfully retrieved all expenses",
  "expenses": [
    {
      "_id": "60d0fe3d4d4f8f001c2e0e3a",
      "description": "Lunch with colleagues",
      "amount": 25.50,
      "category": "Groceries",
      "date": "2024-07-30T10:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "60d0fe3d4d4f8f001c2e0e3b",
      "description": "Monthly electricity bill",
      "amount": 75.00,
      "category": "Utilities",
      "date": "2024-07-29T08:30:00.000Z",
      "__v": 0
    }
  ]
}
```

**Errors**:
- `500 Internal Server Error`: Server-side error during retrieval.
  ```json
  {
    "error": "Error message from server"
  }
  ```

#### GET /expenses/:id
Retrieves a single expense record by its unique ID.

**Request**:
_No request body_

**Response**:
```json
{
  "message": "successfully retrieved  expense",
  "expense": {
    "_id": "60d0fe3d4d4f8f001c2e0e3a",
    "description": "Lunch with colleagues",
    "amount": 25.50,
    "category": "Groceries",
    "date": "2024-07-30T10:00:00.000Z",
    "__v": 0
  }
}
```

**Errors**:
- `404 Not Found`: No expense found with the provided ID.
  ```json
  {
    "message": "could not find expense"
  }
  ```
- `500 Internal Server Error`: Server-side error during retrieval (e.g., invalid ID format).
  ```json
  {
    "error": "Cast to ObjectId failed for value \"invalidid\" (type string) at path \"_id\" for model \"Expense\""
  }
  ```

#### PATCH /expenses/:id
Updates an existing expense record identified by its ID. Only provided fields will be updated.

**Request**:
```json
{
  "description": "Updated description for lunch",
  "amount": 28.00
}
```
*   `description` (String, Optional): New description for the expense.
*   `amount` (Number, Optional): New amount for the expense.
*   `category` (String, Optional): New category for the expense. Must be one of the defined enum values.

**Response**:
```json
{
  "message": "succesfully updated expense",
  "expense": {
    "_id": "60d0fe3d4d4f8f001c2e0e3a",
    "description": "Updated description for lunch",
    "amount": 28.00,
    "category": "Groceries",
    "date": "2024-07-30T10:00:00.000Z",
    "__v": 0
  }
}
```

**Errors**:
- `404 Not Found`: No expense found with the provided ID.
  ```json
  {
    "message": "could not find expense"
  }
  ```
- `500 Internal Server Error`: Server-side error during update (e.g., invalid ID format, invalid category value).
  ```json
  {
    "error": "Validation failed: category: `InvalidCategory` is not a valid enum value for path `category`."
  }
  ```

#### DELETE /expenses/:id
Deletes an expense record by its unique ID.

**Request**:
_No request body_

**Response**:
```json
{
  "message": "successfully deleted expense",
  "expenses": {
    "_id": "60d0fe3d4d4f8f001c2e0e3a",
    "description": "Lunch with colleagues",
    "amount": 25.50,
    "category": "Groceries",
    "date": "2024-07-30T10:00:00.000Z",
    "__v": 0
  }
}
```

**Errors**:
- `404 Not Found`: No expense found with the provided ID.
  ```json
  {
    "message": "could'not find expense"
  }
  ```
- `500 Internal Server Error`: Server-side error during deletion (e.g., invalid ID format).
  ```json
  {
    "error": "Error message from server"
  }
  ```

---

## 💻 Usage Examples

You can interact with the API using tools like `curl`, Postman, or your preferred API client. Here are some `curl` examples:

**1. Create a New Expense:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{ "description": "Coffee", "amount": 4.50, "category": "Leisure" }' http://localhost:3000/expenses
```

**2. Get All Expenses:**

```bash
curl http://localhost:3000/expenses
```

**3. Get a Specific Expense:**

```bash
curl http://localhost:3000/expenses/60d0fe3d4d4f8f001c2e0e3a
```
*(Replace `60d0fe3d4d4f8f001c2e0e3a` with an actual expense ID from your database)*

**4. Update an Expense:**

```bash
curl -X PATCH -H "Content-Type: application/json" -d '{ "amount": 5.00, "category": "Food" }' http://localhost:3000/expenses/60d0fe3d4d4f8f001c2e0e3a
```
*(Replace `60d0fe3d4d4f8f001c2e0e3a` with an actual expense ID)*

**5. Delete an Expense:**

```bash
curl -X DELETE http://localhost:3000/expenses/60d0fe3d4d4f8f001c2e0e3a
```
*(Replace `60d0fe3d4d4f8f001c2e0e3a` with an actual expense ID)*

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1.  **Fork the Project** 🍴
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`) 🌿
3.  **Commit your Changes** (`git commit -m 'feat: Add some AmazingFeature'`) 💾
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`) ⬆️
5.  **Open a Pull Request** 🚀

Please ensure your code adheres to the project's style and includes relevant tests where applicable.

## 📄 License

This project is licensed under the ISC License. See the `package.json` file for more details.

## 👤 Author

*   **Your Name**
    *   [LinkedIn](https://www.linkedin.com/in/yourusername) (Placeholder)
    *   [Twitter](https://twitter.com/yourusername) (Placeholder)

---

## Badges

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen)](https://nodejs.org/en/)
[![Express.js Version](https://img.shields.io/badge/express-%5E5.1.0-blue)](https://expressjs.com/)
[![MongoDB Version](https://img.shields.io/badge/mongodb-%5E6.18.0-4EA94B?logo=mongodb)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
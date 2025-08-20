require("dotenv").config();
const mongoose = require("mongoose");
const Expense = require("./models/expense");
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const API_KEY = process.env.API_KEY;

mongoose
  .connect("mongodb://localhost:27017/expense-tracker")
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));

app.post("/expenses", async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    const newExpense = new Expense({
      description,
      amount,
      category,
    });

    await newExpense.save();
    res.status(201).json({
      message: "successfully created a new expense",
      expense: newExpense,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`paypal listening on localhost:${port}`);
});

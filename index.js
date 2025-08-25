const mongoose = require("mongoose");
const Expense = require("./models/expense");
const User = require("./models/user");
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

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

app.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json({
      message: "successfully retrieved all expenses",
      expenses: expenses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/expenses/:id", async (req, res) => {
  try {
    const expenseID = req.params.id;
    const expense = await Expense.findById(expenseID);

    if (!expense) {
      return res.status(404).json({ message: "could not find expense" });
    }
    res.status(200).json({
      message: "successfully retrieved  expense",
      expense: expense,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/expenses/:id", async (req, res) => {
  try {
    const expenseID = req.params.id;
    const deleteExpense = await Expense.findByIdAndDelete(expenseID);

    if (!deleteExpense) {
      return res.status(404).json({
        message: "could'not find expense",
      });
    }
    res.status(200).json({
      message: "successfully deleted expense",
      expenses: deleteExpense,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/expenses/:id", async (req, res) => {
  try {
    const expenseID = req.params.id;
    const updateData = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseID,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "could not find expense" });
    }
    res.status(200).json({
      message: "succesfully updated expense",
      expense: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`paypal listening on localhost:${port}/expenses`);
});

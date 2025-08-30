const mongoose = require("mongoose");
const Expense = require("./models/expense");
const User = require("./models/user");
const auth = require("./middleware/auth");
const adminAuth = require("./middleware/adminAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/expense-tracker")
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));

// register a new user
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "succesfully created your account", account: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "This email is already in use" });
    }
    res.status(500).json({ error: error.message });
  }
});

// login a user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      admin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// user dashboard after login (protected route)
app.get("/dashboard", auth, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, ${req.user.email}!`,
    userID: req.user.id,
  });
});

// Get all users info in db (accessed only by admin)
app.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "successfully retrieved all expenses",
      users: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create an expense (protected route)

app.post("/expense", auth, async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    const newExpense = new Expense({
      description,
      amount,
      category,
      owner: req.user.id,
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

// get all expenses of a particular user
app.get("/expenses", auth, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const expenses = await Expense.find({ owner: ownerId });
    res.status(200).json({
      message: "successfully retrieved all your expenses",
      expenses: expenses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/expense/:id", auth, async (req, res) => {
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

app.patch("/expenses/:id", auth, async (req, res) => {
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
  console.log(`app is listening on localhost:${port}/`);
});

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
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`paypal listening on localhost:${port}`);
});

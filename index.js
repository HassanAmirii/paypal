require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

const mongoose = require("mongoose");

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

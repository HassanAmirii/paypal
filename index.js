require("dotenv").config;
const express = require("express");
const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`paypal listening on localhost:${port}`);
});

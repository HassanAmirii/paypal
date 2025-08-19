const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  decription: {
    type: string,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: string,
    enum: [
      "Groceries",
      "Leisure",
      "Electronics",
      "Utilities",
      "Clothing",
      "Health",
      "Others",
    ],
    required: true,
  },
  date: {
    type: Number,
    default: date.now(),
  },
});

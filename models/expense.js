const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
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
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);

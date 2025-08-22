Step 1: Initialize a Node.js Project

First, we need to create a Node.js project if you haven't done so already. Run the following command in your terminal:

```sh
npm init -y
```

step 2: install the mongoose and mongodb package by running

```sh
npm install mongoose mongodb
```

Now that we have succesfully installed the package we have to define (or bring it) into our app.

You must have a MongoDB server running on your machine (either directly installed, in a Docker container, etc.)

```js
# index.js
//Now we coonect to the server
mongoose
  .connect("mongodb://localhost:27017/expense-tracker")
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));
```

step 3: let's define our data-base schema

First, we must understand what a schema is; A schema is simply like a blueprint where we organize our data, A place to slide in information in a structured way.

Now back to defining our data base schema
// we will be creating a schema for an expense tracker API

```js
//import the mongoose library
const mongoose = require("mongoose");

//lets name how db structure **ExpenseSchema**
const ExpenseSchema = new mongoose.Schema({
  // now we shall create a custom headings and rules for filling body

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
    type: Date,
    default: date.now,
  },
});
```

Let's break this down:

**type: String, Number, Date:** These lines enforce the data type for each field. This is crucial for preventing errors and ensuring your data is predictable.

**required: true:** This is a simple but powerful rule. It ensures that no expense can be saved to our database without a value for that field.

**enum:** The enum property is our guardrail. It restricts the category to a specific list of strings we've defined. This keeps our data clean and consistent.

**default:** This property automatically assigns a value if one isn't provided. For the date field, we're automatically setting the date to the current time.

step 4: populating our database using model

```js
//we need to create a model of our ExpenseScehema

const Expense = mongoose.model("Expense", ExpenseSchema);
//This model is now our gate way to the collection of data in our db

const newExpense = new Expense({
  description: "airtime purchase",
  amount: 35.0,
  category: "Subscription",
});

newExpense.save(); // This line saves the new expense to the database
```

congratulations you can now create and populate a schema into mongodb with mongoose

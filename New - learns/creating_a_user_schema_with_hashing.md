# how to create a username/password hashing database schema (or model)

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
const bcrypt = require("bcrypt");

//lets name how db structure **ExpenseSchema**
// now we shall create a custom headings and rules for filling body

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
// now we have to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await brypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
```

let's break this down

```js
userSchema.pre("save", function (next) {
```

- the pre-save functio is a middle ware that runs before any informatio get saved to the database

```js
if (!this.isModified("password")) {
  return next();
}
```

- this means if the password is unchanged proceed to to the next function (save)

```js
try {
    const salt = await brypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
```

- this create a random string and 10 is the cost factor (number of computational rounds which is 2 to the power 10 = 1024 times before it generate the final hash). Higher = slower but safer.
- when it is done hashing the next() proceed to saving

```js
  } catch (error) {

    next(error)
  }
});

module.exports = mongoose.model(User, userSchema);
```

- alright this is in charge of handling error the **next(error)** stops the assembly line and sends error message to catch

- we then export so we can use the **User** model in our app.js

**to use in #app.js we simply have to put this at the top of our file**

```js
const User = require("./models/user");
```

to create a new model:

```js
const newUser = new User({
  ...rest of the code..
})

await newUser.save();
```

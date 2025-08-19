# how to create a database schema (or model) with mongoose

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

```sh
# index.js
//Now we coonect to the server
mongoose
  .connect("mongodb://localhost:27017/expense-tracker")
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));
```

step 3: let's define our data-base schema

First, we must understand what a schema is; A schema is simply like a blueprint where we organize our data.

If you have have worked with table in HTML, eg

//Let's assume this a data-base

| Left columns | Right columns |
| ------------ | :-----------: |
| left foo     |   right foo   |
| left bar     |   right bar   |
| left baz     |   right baz   |

To populate the cells in both the left columns and right column, we would have declare

```sh
<thead> /... the category heading goes here </thead>

<tbody> /... the category body goes here</tbody>
```

This code above is exactly what creating a schema is about, you know a place to slide in information in a structured way.

Now back to defining our data base schema

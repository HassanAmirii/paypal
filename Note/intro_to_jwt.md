# Introduction to jwt (Json web token)

<p>Here are some questions i asked myself when it was time to implement jwt into my server authentication--which will also serve as the explanation outline. </p>

<ul>
 <li> what is jwt </li>
 <li> why do need jwt when we can simply validate a user through the database</li>
 <li> how does jwt works</li>
 <li> how to implement jwt into a server authentication </li>
 
 </ul>

### 1. What is jwt?

"JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA."

- source jwt.io

In my own words, **jwt is a digital identification holder.**

### 2. Why do need jwt when we can simply validate a user through a database?

Well, turns out hitting the database everytime to validate a user is not scalable when the user-base start growing, and it introduces performance issues such as latency, botttle neck etc.

### 3. How does jwt works?

I will be rephrasing this heading title as how does jwt serves as a digital identity holder?

when a user registers an account, their information is stored in the db, Now when it is time to log in the jwt is attached to it because it needs to collect certain details to form the identification holder which it will auto tender to the server upon subsequent requests, so the user does not have to keep inputting their credentials to access secured routes.

There are three essentials that jwt contains.

- header
- payload
- signed token
  <br>

1. The **header** contains meta-data about the token such as the token type, hashing algorithm, etc.

 <br>

2. The **payload** contains information such as the user_id, username.

 <br>

3. The **signed token** is formed by mixing and hashing the header, payload, and the server's secret key.

 <br>

Upon subsequent requests, the server just have re sign token which contains (server's secret key, payload, header). and compare it with the tendered one by jwt. if it matches and the jwt's token has'nt expired ,

then the user get authorized.

else the server returns error 401: unauthorized, and probably reroute the user to relogin to re-create a jwt token.

### 4. how to implement jwt into server auth?

prerequisites:

- js
- bcrypt
- expressJS
- mongoose
- mongoDB
- .env

I'm assuming you can set up an express server and setup a mongoose model to register a user.

```js
// A simple Express.js server for user authentication with JWT.
// This example assumes you have an 'app' instance and other dependencies set up.

// --- The Login Route: Handles user authentication and JWT creation ---
app.post("/login", async (req, res) => {
  // Use destructuring to get username and password from the request body.
  const { username, password } = req.body;

  try {
    // 1. Find the user in the database based on the provided username.
    // 'User.findOne' is a common method for finding a user by a unique field like username.
    const user = await User.findOne({ username });

    // 2. Check if the user exists and if the provided password matches the stored hash.
    // The condition '!user' handles the case where no user is found.
    // The condition '!(await bcrypt.compare(password, user.password))' securely compares
    // the plaintext password to the hashed one. The '!' is used to check for a non-match.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Create the JWT payload. This object contains non-sensitive user data.
    const payload = {
      id: user._id, // '_id' is a common field name for a document's ID in MongoDB.
      username: user.username,
    };

    // 4. Sign the JWT with the payload and a secret key.
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // The token will be invalid after one hour.
    });

    // 5. Send the token back to the client. The client will store it for future requests.
    res.json({ token });
  } catch (error) {
    // Handle unexpected errors, such as database connection issues.
    res
      .status(500)
      .json({ error: error.message || "An internal server error occurred." });
  }
});

// --- Middleware: Verifies the JWT from the request headers ---
function verifyToken(req, res, next) {
  // 1. Get the Authorization header from the request. Headers are usually in lowercase.
  const authHeader = req.headers["authorization"];

  // 2. If the header is missing, deny access.
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  }

  // Use a 'try...catch' block to handle potential errors from 'jwt.verify()'.
  try {
    // 3. Extract the token from the "Bearer <token>" string.
    const token = authHeader.split(" ")[1];

    // 4. Verify the token using the secret key. This decodes the payload if successful.
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach the decoded user payload to the request object.
    // This makes the user data available to subsequent route handlers.
    req.user = verified;

    // 6. Call 'next()' to pass control to the next middleware or route handler.
    next();
  } catch (err) {
    // If verification fails (e.g., invalid signature or expired token), return an error.
    res.status(400).json({ message: "Invalid or expired token" });
  }
}

// --- Protected Route: Accessible only with a valid JWT ---
app.get("/dashboard", verifyToken, (req, res) => {
  // The 'verifyToken' middleware has already run and attached the user data to 'req.user'.
  res.json({
    message: `Welcome to your dashboard, ${req.user.username}!`,
    userID: req.user.id,
  });
});

// --- Server Startup ---
// Ensure the 'PORT' constant is defined somewhere.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Now you can confidently implement jwt into your server, Happy coding.

_Thanks to a fellow coder for proof reading_

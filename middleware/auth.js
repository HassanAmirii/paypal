const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;

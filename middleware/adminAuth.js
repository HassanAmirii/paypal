const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified.isAdmin == true) {
      req.user = verified;

      next();
    } else {
      return res.status(401).json({ message: "Access denied: Not an admin" });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminAuth;

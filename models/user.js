const bcrypt = require("bcrpyt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minlength: 4,
    trim: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
    minlength: 4,
    lowercase: true,
  },

  password: {
    type: String,
    require: true,
    unique: true,
    minlength: 4,
    lowercase: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);

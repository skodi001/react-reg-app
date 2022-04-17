const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isBlocked: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  regTime: {
    type: String,
  },
  logTime: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);

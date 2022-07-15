const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  userName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);

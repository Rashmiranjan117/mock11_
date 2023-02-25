const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  email: String,
  password: String,
});

const AuthModel = mongoose.model("mock", authSchema);

module.exports = { AuthModel };

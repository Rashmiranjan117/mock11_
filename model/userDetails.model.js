const mongoose = require("mongoose");

const userDetailSchema = mongoose.Schema({
  image: String,
  name: String,
  bio: String,
  phone: String,
  email: String,
  password: String,
  userId: String,
});

const UserDetailModel = mongoose.model("userDetails", userDetailSchema);

module.exports = { UserDetailModel };

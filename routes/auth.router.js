const { AuthModel } = require("../model/auth.model");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  let { email, password } = req.body;
  //   console.log(email,password)
  try {
    bcrypt.hash(password, 5, async (err, secured_password) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        const user = new AuthModel({
          email,
          password: secured_password,
        });
        await user.save();
        res.send("Registration successfull");
      }
    });
  } catch (err) {
    res.send("Something went wrong");
  }
});

authRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const user = await AuthModel.find({ email });
  console.log(user)
  if (user.length > 0) {
    bcrypt.compare(password, user[0].password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { email, password, userId: user[0]._id },
          "secret"
        );
       // store token in localstorage from frontend
        res.send({
          msg: "Login Successfull",
          token,
        });
      } else {
        res.send({ msg: "Wrong Credentials" });
      }
    });
  } else {
    res.send("Wrong Credentials");
  }
  try {
  } catch (err) {
    res.send("Something went wrong. Try Again!");
  }
});

module.exports = { authRouter };

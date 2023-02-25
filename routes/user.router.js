const { UserDetailModel } = require("../model/userDetails.model");

const express = require("express");

const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
  try {
    let data = await UserDetailModel.find();
    res.send(data);
  } catch (err) {
    res.send("No Data Found");
  }
});

UserRouter.post("/", async (req, res) => {
  let data = req.body;
  let headers = req.headers.authorization;
  try {
    let user = new UserDetailModel(data);
    await user.save();
    res.send({ msg: "Data Added Successfully" });
  } catch (err) {
    res.send({ msg: "SOmething went wrong" });
  }
});

module.exports = { UserRouter };

const { connection } = require("./config/db");
require("dotenv").config();
const { authRouter } = require("./routes/auth.router");
const express = require("express");
const cors = require("cors");
const { authenticator } = require("./middleware/authenticator");
const app = express();
const { UserRouter } = require("./routes/user.router");
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use(authenticator);
app.use("/user", UserRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server is connected to db.");
  } catch (err) {
    console.log("Something Went wrong while connecting");
  }

  console.log("Server is running at port", process.env.port);
});

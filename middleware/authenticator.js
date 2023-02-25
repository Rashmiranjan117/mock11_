const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decoded_token = jwt.verify(token, "secret");
    console.log(req.body.userId);
    if (decoded_token) {
      const user_id = decoded_token.userId;
      req.body.userId = user_id;
      next();
    } else {
      res.send("Please Login First");
    }
  } else {
    res.send("Please Login First");
  }
};

module.exports = { authenticator };

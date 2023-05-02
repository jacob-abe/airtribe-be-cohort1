const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config");
const { users } = require("../controllers/authController");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      // Find user with same name
      const dbUser = users.find((u) => u.name === user.name);
      req.user = dbUser;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authMiddleware,
};

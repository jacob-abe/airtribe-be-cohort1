// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config");

const users = [];

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const login = async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (!user) return res.status(400).send("Cannot find user");
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    } else {
      res.send("Not allowed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = {
  register,
  login,
  users,
};

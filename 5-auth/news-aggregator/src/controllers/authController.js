// controllers/authController.js
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config");

const users = [];

const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check if a user with the same name already exists
  const existingUser = users.find((user) => user.name === req.body.name);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this name already exists" });
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      name: req.body.name,
      password: hashedPassword,
      preferences: "general",
    };
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
  registerValidation,
};

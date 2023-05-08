// routes/auth.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  registerValidation,
} = require("../controllers/authController");

router.post("/register", registerValidation, register);

router.post("/login", login);

module.exports = router;

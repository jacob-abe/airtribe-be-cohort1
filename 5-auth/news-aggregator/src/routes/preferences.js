const express = require("express");
const router = express.Router();
const {
  getPreferences,
  updatePreferences,
} = require("../controllers/preferencesController");

router.get("/preferences", (req, res) => {
  getPreferences(req, res);
});

router.put("/preferences", (req, res) => {
  updatePreferences(req, res);
});

module.exports = router;

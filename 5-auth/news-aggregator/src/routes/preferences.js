// routes/preferences.js
const express = require("express");
const router = express.Router();
const {
  getPreferences,
  updatePreferences,
  updatePreferencesValidation,
} = require("../controllers/preferencesController");

router.get("/preferences", (req, res) => {
  getPreferences(req, res);
});

router.put("/preferences", updatePreferencesValidation, updatePreferences);

module.exports = router;

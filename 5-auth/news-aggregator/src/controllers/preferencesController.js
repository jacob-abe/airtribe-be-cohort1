// controllers/preferencesController.js
const { users } = require("./authController");
const { body, validationResult } = require("express-validator");

// Add this validation middleware in the updatePreferences function
const updatePreferencesValidation = [
  body("preferences").notEmpty().withMessage("Preferences must not be empty"),
];

const getPreferences = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.sendStatus(401);
  }
  const preferences = user.preferences || "";
  res.json({ preferences });
};

const updatePreferences = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = req.user;
  if (!user) {
    return res.sendStatus(401);
  }
  const preferences = req.body.preferences;
  user.preferences = preferences;
  // Replace user's preferences in the users array where the user's name matches
  const index = users.findIndex((u) => u.name === user.name);
  users[index].preferences = preferences;
  res.sendStatus(204);
};

module.exports = {
  getPreferences,
  updatePreferences,
  updatePreferencesValidation,
};

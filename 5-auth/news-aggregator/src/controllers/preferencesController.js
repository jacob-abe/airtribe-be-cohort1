// controllers/preferencesController.js
const { users } = require("./authController");

const getPreferences = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.sendStatus(401);
  }
  const preferences = user.preferences || "";
  res.json({ preferences });
};

const updatePreferences = (req, res) => {
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
};

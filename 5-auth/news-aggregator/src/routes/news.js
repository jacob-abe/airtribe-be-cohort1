// news.js
const express = require("express");
const router = express.Router();
const { filterNews } = require("../controllers/newsController");

router.get("/news", async (req, res) => {
  const preferences = req.user.preferences;
  const articles = await filterNews(preferences);
  res.json(articles);
});

module.exports = router;

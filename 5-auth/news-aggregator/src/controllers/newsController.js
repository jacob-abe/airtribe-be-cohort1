// controllers/newsController.js
const axios = require("axios");
const { API_KEY, API_URL } = require("../config");

const filterNews = async (preferences) => {
  const categories = preferences?.categories?.join(",") ?? "general";
  const url = `${API_URL}/?country=us&category=${categories}&apiKey=${API_KEY}}`;
  const response = await axios.get(url);
  return response.data.articles;
};

module.exports = {
  filterNews,
};

// controllers/newsController.js
const axios = require("axios");
const { API_KEY, API_URL } = require("../config");

const filterNews = async (preferences) => {
  const categories = preferences?.categories?.join(",") ?? "general";
  const url = `${API_URL}`;
  const response = await axios.get(url, {
    params: {
      apikey: API_KEY,
      lang: "en",
      country: "us",
      category: categories,
    },
  });
  return response.data.articles;
};

module.exports = {
  filterNews,
};

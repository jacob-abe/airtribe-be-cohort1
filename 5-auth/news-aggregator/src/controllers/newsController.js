// controllers/newsController.js
const axios = require("axios");
const { getNewsFromCache, setNewsToCache } = require("../helpers/cacheHelper");
const { API_KEY, API_URL } = require("../config");

const filterNews = async (preferences) => {
  const categories = preferences?.categories?.join(",") ?? "general";
  // Get news from cache
  const key = `news:${categories}`;
  const cachedNews = await getNewsFromCache(key);

  if (cachedNews) {
    return cachedNews;
  }

  const url = `${API_URL}`;
  const response = await axios.get(url, {
    params: {
      apikey: API_KEY,
      lang: "en",
      country: "us",
      category: categories,
    },
  });
  const articles = response.data.articles;
  // Cache news
  setNewsToCache(key, articles);
  return articles;
};

module.exports = {
  filterNews,
};

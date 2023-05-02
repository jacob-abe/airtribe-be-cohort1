require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.API_KEY,
  API_URL: process.env.API_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};

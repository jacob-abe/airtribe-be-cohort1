const Redis = require("ioredis");
const redis = new Redis();

// Add an error event listener
redis.on("error", (err) => {
  //console.error("Redis connection error:", err);
});

const getWithTimeout = (key, ms) => {
  return new Promise((resolve, reject) => {
    redis.get(key, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });

    setTimeout(() => {
      reject(new Error(`Timeout exceeded: ${ms} ms`));
    }, ms);
  });
};

const getNewsFromCache = async (key) => {
  try {
    const data = await getWithTimeout(key, 500);
    return JSON.parse(data);
  } catch (err) {
    //console.error("Error retrieving news from cache:", err);
    return null;
  }
};

const setNewsToCache = async (key, data) => {
  try {
    await redis.set(key, JSON.stringify(data), "EX", 60 * 60);
  } catch (err) {
    //console.error("Error setting news to cache:", err);
  }
};

module.exports = {
  getNewsFromCache,
  setNewsToCache,
};

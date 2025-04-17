const redis = require('redis');
const client = redis.createClient();

const getCache = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) reject(err);
      resolve(data ? JSON.parse(data) : null);
    });
  });
};

const cacheResponse = (key, data) => {
  client.setex(key, 86400, JSON.stringify(data)); 
};

module.exports = { getCache, cacheResponse };

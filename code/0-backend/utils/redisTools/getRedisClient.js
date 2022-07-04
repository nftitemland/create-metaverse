"use strict";

const { createClient } = require("redis");

const getRedisClient = () => {
  if (!process.env.REDIS_URL) {
    throw new Error("getRedisClient: missing process.env.REDIS_URL");
  }

  const client = createClient({
    url: process.env.REDIS_URL,
  });

  return client;
};

module.exports = getRedisClient;

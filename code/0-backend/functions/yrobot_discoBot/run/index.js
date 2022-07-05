"use strict";

// INFRASTRUCTURE AS A SERVICE

const {
  // delay,
  redisTools: { getRedisClient },

  // constants: {
  //   environment: { isProductionMode },
  // },
} = require("compute-utils");

const disco = require("./disco");
const discoIfNotInCp = require("./discoIfNotInCp");

// const RUN_TIME = Number(process.env.RUN_TIME_SUPER_ENGINE) || 1000 * 63;
// const PERIOD = Number(process.env.REFRESH_RATE_SUPER_ENGINE) || 25;
// const PERIOD = 1000;

module.exports = async () => {
  const client = getRedisClient();
  await client.connect();

  console.log("running realtime disco");

  await disco({ client });

  // if (!isProductionMode) {
  await discoIfNotInCp({ client });
  // }

  try {
    await client.quit();
  } catch (err) {
    console.log("[WARN] error in quitting disco:", err);
  }
};

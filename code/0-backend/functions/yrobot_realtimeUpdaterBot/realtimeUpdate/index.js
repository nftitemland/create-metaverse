"use strict";

// const bluebird = require("bluebird");
const {
  delay,
  redisTools: { getRedisClient },
} = require("compute-utils");

const sendPartyDataToAll = require("./sendPartyDataToAll");

// const RUN_TIME = 1000 * 10;
const RUN_TIME = Number(process.env.RUN_TIME) || 1000 * 63;

const REFRESH_RATE = Number(process.env.REFRESH_RATE) || 50;

module.exports = async () => {
  const client = getRedisClient();
  // let client;
  await client.connect();
  // let lastConnectTime = 0;
  console.log("running realtime streamer iterations");
  // let tempCounter = 0;

  const startTime = Date.now();
  let lastTime = startTime;

  let lastPartyCompareData = {
    time: 0,
    userData: {},
  };

  while (Date.now() - startTime < RUN_TIME) {
    if (process.env.DEBUG_TIME) {
      const now = Date.now();
      console.log(now - lastTime);
      lastTime = now;
    }

    const [gottenLastPartyCompareData] = await Promise.all([
      sendPartyDataToAll({ client, lastPartyCompareData }),
      delay(REFRESH_RATE),
    ]);

    lastPartyCompareData = gottenLastPartyCompareData;
  }

  try {
    await client.quit();
  } catch (err) {
    console.log("[WARN] error in quitting redis:", err);
  }
};

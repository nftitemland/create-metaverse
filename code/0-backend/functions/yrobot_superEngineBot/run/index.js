"use strict";

const {
  delay,
  redisTools: { getRedisClient },
  javascript: { getUUID },
} = require("compute-utils");

const doTimePeriod = require("./doTimePeriod");

const RUN_TIME = Number(process.env.RUN_TIME_SUPER_ENGINE) || 1000 * 63;
const PERIOD = Number(process.env.REFRESH_RATE_SUPER_ENGINE) || 25;
// const PERIOD = 1000;

const SUPER_ENGINE_BLOCK = "SUPER_ENGINE_BLOCK";

const superEngineIsBlocked = async ({ client, processId }) => {
  const rawSuperEngineBlockData = await client.sendCommand([
    "GET",
    SUPER_ENGINE_BLOCK,
  ]);

  if (rawSuperEngineBlockData) {
    const superEngineBlockData = JSON.parse(rawSuperEngineBlockData);

    if (superEngineBlockData.processId !== processId) {
      const superEngineBlockExpiry = Number(superEngineBlockData.expiry);

      if (superEngineBlockExpiry > Date.now()) {
        return true;
      }
    }
  }
};

const superEngineAddBlockSafe = async ({ client, processId }) => {
  try {
    const superEngineBlock = JSON.stringify({
      processId,
      expiry: Date.now() + 500,
    });

    await client.sendCommand(["SET", SUPER_ENGINE_BLOCK, superEngineBlock]);
  } catch (err) {
    console.log("error in superEngineBlockAddBlockSafe:", err);
  }
};

module.exports = async () => {
  const client = getRedisClient();
  await client.connect();

  console.log("running realtime super engine streamer iterations");

  const processId = `superEngine_${getUUID()}`;

  try {
    const startTime = Date.now();
    let lastTime = startTime;

    while (Date.now() - startTime < RUN_TIME) {
      if (process.env.DEBUG_TIME_SUPER_ENGINE) {
        const d = Date.now();
        console.log(d - lastTime);
        lastTime = d;
      }

      const isBlocked = await superEngineIsBlocked({
        client,
        processId,
      });

      if (isBlocked) {
        console.log("TEMP LOG: Request blocked, concurrent requests");

        await delay(PERIOD);
      } else {
        superEngineAddBlockSafe({ client, processId });

        await Promise.all([
          doTimePeriod({ client, period: PERIOD }),
          delay(PERIOD),
        ]);
      }
    }

    await client.sendCommand(["DEL", SUPER_ENGINE_BLOCK]);

    await client.quit();
  } catch (err) {
    console.log("[ERROR] error super engine robot:", err);

    await client.quit();

    throw err;
  }
};

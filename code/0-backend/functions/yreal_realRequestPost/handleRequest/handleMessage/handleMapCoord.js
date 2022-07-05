"use strict";

const {
  stringify,
  // realtime: {
  //   realmap: { getMapLevelData },
  // },
  // drq,
  constants: {
    realtime: {
      commands: { MAPCOORD },
    },
  },
  redisTools: { getRedisClient, consistentAddToRedisQueue },
} = require("compute-utils");

const {
  constants: {
    // actionValues,
    lRListKeys: { Q_1 },
    limits: { MAX_QUEUE_LENGTH_MINUS_ONE },
  },
  // authorizePartyUser,
} = require("../../local");

module.exports = async ({ messageValue, connectionId, userId }) => {
  console.log(
    "running handleMapCoord with the following values: " +
      stringify({
        messageValue,
        connectionId,
        userId,
      })
  );

  const client = getRedisClient();

  try {
    await client.connect();

    await consistentAddToRedisQueue({
      client,
      value: {
        type: MAPCOORD,
        userId,
        value: messageValue,
        time: Date.now(),
      },
      queueId: Q_1,
      maxQueueLengthMinusOne: String(MAX_QUEUE_LENGTH_MINUS_ONE),
    });

    // // TODO: verify connection id
    // const cmd = JSON.stringify({
    //   type: MOVE,
    //   userId,
    //   value: messageValue,
    //   time: Date.now(),
    // });

    // await client.sendCommand(["LPUSH", Q_1, cmd]);
    // safeLTrim({ client });

    await client.quit();
  } catch (err) {
    console.log("[WARN] error in quitting redis:", err);
    await client.quit();
    throw err;
  }

  const responseValues = {};

  console.log(
    "handleMapCoord executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

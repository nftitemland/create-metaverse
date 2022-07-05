"use strict";

const {
  stringify,
  // drq,
  constants: {
    realtime: {
      commands: { ENTER },
    },
  },
  redisTools: {
    getRedisClient,
    consistentAddToRedisQueue,
    // redisStrObj
  },
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
    "running handleEnter with the following values: " +
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
        type: ENTER,
        userId,
        value: messageValue,
        time: Date.now(),
      },
      queueId: Q_1,
      maxQueueLengthMinusOne: String(MAX_QUEUE_LENGTH_MINUS_ONE),
    });

    await client.quit();
  } catch (err) {
    console.log("[WARN] error in quitting redis:", err);
    await client.quit();
    throw err;
  }

  const responseValues = {};

  console.log(
    "handleEnter executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

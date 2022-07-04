"use strict";

const {
  stringify,
  // drq,
  constants: {
    realtime: {
      commands: { ENCHANT },
    },
  },
  redisTools: {
    getRedisClient,
    consistentAddToRedisQueue,
    // redisStrObj
  },
  // redisTools: { getRedisClient, redisStrObj },
  // realtime: {
  // connectionPoolHObjToObj,
  // updateUserConnectionPoolData,
  // getEncodedCmdValue,
  // get,
  // },
} = require("compute-utils");

const {
  constants: {
    // actionValues,
    lRListKeys: { Q_1 },
  },
  // authorizePartyUser,
} = require("../../local");

const MAX_QUEUE_LENGTH_MINUS_ONE = String(500 - 1);

module.exports = async ({ messageValue, connectionId, userId }) => {
  console.log(
    "running handleMove with the following values: " +
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
        type: ENCHANT,
        userId,
        value: messageValue,
        time: Date.now(),
      },
      queueId: Q_1,
      maxQueueLengthMinusOne: MAX_QUEUE_LENGTH_MINUS_ONE,
    });

    await client.quit();
  } catch (err) {
    console.log("[WARN] error in quitting redis:", err);
    await client.quit();
    throw err;
  }

  // await updateUserConnectionPoolData({
  //   getNewUserData: ({ userData }) => {
  //     return Object.assign({}, userData, {
  //       t: Date.now(),
  //     });
  //   },
  //   connectionId,
  //   userId,
  //   connectionPoolKey: CP_1,
  // });

  const responseValues = {};

  console.log(
    "handleMove executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

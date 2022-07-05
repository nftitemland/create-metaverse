"use strict";

const {
  stringify,
  delay,
  // drq,
  redisTools: {
    getRedisClient,
    // redisStrObj
  },
  constants: {
    realtime: {
      commands: { DISCO },
    },
  },
  realtime: { connectionPoolHObjToObj },
} = require("compute-utils");

const {
  constants: {
    connectionPoolKeys: { CP_1 },
    lRListKeys: { Q_1 },
  },
  // authorizePartyUser,
} = require("../local");

const CONNECTION_POOL_KEY = CP_1;

// const connectionPoolHObjToObj = (hObj) => {
//   const userIdToUserConnectionPoolData = {};

//   for (let i = 0; i < hObj.length; i = i + 2) {
//     const userId = hObj[i];
//     const strObj = hObj[i + 1];
//     const userConnectionPoolData = redisStrObj.fromRedisStrObj(strObj);

//     userIdToUserConnectionPoolData[userId] = userConnectionPoolData;
//   }

//   return userIdToUserConnectionPoolData;
// };

module.exports = async ({ connectionId }) => {
  console.log(
    "running handleDisconnect with the following values: " +
      stringify({
        connectionId,
      })
  );

  const client = getRedisClient();

  await client.connect();

  const rawUserIdToUserConnectionPoolData = await client.sendCommand([
    "HGETALL",
    CONNECTION_POOL_KEY,
  ]);

  const userIdToUserConnectionPoolData = connectionPoolHObjToObj(
    rawUserIdToUserConnectionPoolData
  );

  for (const userId in userIdToUserConnectionPoolData) {
    const userConnectionPoolData = userIdToUserConnectionPoolData[userId];

    if (userConnectionPoolData.cId === connectionId) {
      console.log(
        "removing connection from redis: " +
          stringify({
            userId,
            connectionId,
          })
      );

      await client.sendCommand(["HDEL", CONNECTION_POOL_KEY, userId]);

      const cmd = JSON.stringify({
        type: DISCO,
        userId,
        time: Date.now(),
      });

      await client.sendCommand(["LPUSH", Q_1, cmd]);

      await delay(200);

      await client.sendCommand(["HDEL", CONNECTION_POOL_KEY, userId]);

      await delay(500);

      await client.sendCommand(["HDEL", CONNECTION_POOL_KEY, userId]);

      // BRUTUS THIS DISCO
    }
  }

  try {
    await client.quit();
  } catch (err) {
    console.log("[WARN] error in quitting redis:", err);
  }
  const responseValues = {};

  console.log(
    "handleDisconnect executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

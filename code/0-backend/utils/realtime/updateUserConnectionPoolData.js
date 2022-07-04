"use strict";

// const {
//   stringify,
//   // drq,
//   constants: {
//     realtime: {
//       commands: { MOVE },
//     },
//   },
//   // redisTools: { getRedisClient, redisStrObj },
// realtime: { connectionPoolHObjToObj },
// } = require("compute-utils");

const getRedisClient = require("../redisTools/getRedisClient");
const redisStrObj = require("../redisTools/redisStrObj");
// // const connectionPoolHObjToObj = require("./connectionPoolHObjToObj");

// const {
//   constants: { messageKeys },
// } = require("../../local");

// const handleConnect = require("./handleConnect");
// const handleMessage = require("./handleMessage");
// const handleDisconnect = require("./handleDisconnect");

// TO REALTIME UTILS
module.exports = async ({
  getNewUserData,
  userId,
  connectionPoolKey,

  providedClient,

  providedUserData,
  // OR
  connectionId, // for user data verification

  noLog = false,

  // quitClient = true,
}) => {
  if (!noLog) {
    console.log("running updateUserConnectionPoolData");
  }

  let client;

  if (providedClient) {
    client = providedClient;
  } else {
    client = getRedisClient();
    await client.connect();
  }

  let userData;

  if (providedUserData) {
    userData = providedUserData;
  } else {
    const rawUserData = await client.sendCommand([
      "HGET",
      connectionPoolKey,
      userId,
    ]);

    if (!rawUserData) {
      const error = new Error(`invalid user id provided: ${userId}`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    userData = redisStrObj.fromRedisStrObj(rawUserData);

    if (userData.cId !== connectionId) {
      const error = new Error(`invalid user id provided: ${userId}`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }
  }

  // const newUserData = Object.assign({}, userData, {
  //   x: messageValue,
  // });

  const newUserData = getNewUserData({ userData });

  const newUserDataRedisStrObj = redisStrObj.toRedisStrObj(newUserData);

  await client.sendCommand([
    "HSET",
    connectionPoolKey,
    userId,
    newUserDataRedisStrObj,
  ]);

  if (!providedClient) {
    try {
      await client.quit();
    } catch (err) {
      console.log("[WARN] error in quitting redis:", err);
    }
  }

  if (!noLog) {
    console.log("updateUserConnectionPoolData executed successfully");
  }
};

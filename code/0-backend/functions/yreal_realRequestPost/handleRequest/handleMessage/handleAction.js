"use strict";

const {
  stringify,
  // drq,
  redisTools: { getRedisClient, redisStrObj },
  // realtime: { connectionPoolHObjToObj },
} = require("compute-utils");

const {
  constants: {
    actionValues,
    connectionPoolKeys: { CP_1 },
  },
  // authorizePartyUser,
} = require("../../local");

// const {
//   constants: { messageKeys },
// } = require("../../local");

// const handleConnect = require("./handleConnect");
// const handleMessage = require("./handleMessage");
// const handleDisconnect = require("./handleDisconnect");

const CONNECTION_POOL_KEY = CP_1;

module.exports = async ({ messageValue, connectionId, userId }) => {
  console.log(
    "running handleAction with the following values: " +
      stringify({
        messageValue,
        connectionId,
        userId,
      })
  );

  const client = getRedisClient();

  await client.connect();

  const rawUserData = await client.sendCommand([
    "HGET",
    CONNECTION_POOL_KEY,
    userId,
  ]);

  if (!rawUserData) {
    const error = new Error(`invalid user id provided: ${userId}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const userData = redisStrObj.fromRedisStrObj(rawUserData);

  if (userData.cId !== connectionId) {
    const error = new Error(`invalid user id provided: ${userId}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const newUserData = Object.assign({}, userData, {
    x: Number(userData.x) + (messageValue === actionValues.RIGHT ? 1 : -1),
  });

  const newUserDataRedisStrObj = redisStrObj.toRedisStrObj(newUserData);

  await client.sendCommand([
    "HSET",
    CONNECTION_POOL_KEY,
    userId,
    newUserDataRedisStrObj,
  ]);

  try {
    await client.quit();
  } catch (err) {
    console.log("[WARN] error in quitting redis:", err);
  }

  const responseValues = {};

  console.log(
    "handleAction executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

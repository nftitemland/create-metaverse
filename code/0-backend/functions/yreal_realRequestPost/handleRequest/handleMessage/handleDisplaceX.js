"use strict";

const {
  stringify,
  // drq,
  redisTools: { getRedisClient, redisStrObj },
  realtime: { connectionPoolHObjToObj },
} = require("compute-utils");

const {
  constants: {
    // actionValues,
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

const updateUserConnectionPoolData = async ({
  getNewUserData,
  connectionId,
  userId,
  connectionPoolKey,
}) => {
  console.log("running updateUserConnectionPoolData");

  const client = getRedisClient();

  await client.connect();

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

  const userData = redisStrObj.fromRedisStrObj(rawUserData);

  if (userData.cId !== connectionId) {
    const error = new Error(`invalid user id provided: ${rawUserId}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
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

  try {
    await client.quit();
  } catch (err) {
    console.log("[WARN] error in quitting redis:", err);
  }

  console.log("updateUserConnectionPoolData executed successfully");
};

module.exports = async ({ messageValue, connectionId, userId }) => {
  console.log(
    "running handleDisplaceX with the following values: " +
      stringify({
        messageValue,
        connectionId,
        userId,
      })
  );

  await updateUserConnectionPoolData({
    //DECPRECATED
    getNewUserData: ({ userData }) => {
      return Object.assign({}, userData, {
        x: messageValue,
      });
    },
    connectionId,
    userId,
    connectionPoolKey: CP_1,
  });

  const responseValues = {};

  console.log(
    "handleDisplaceX executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

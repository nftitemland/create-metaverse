"use strict";

const {
  stringify,
  // drq,
  constants: {
    realtime: {
      commands: { MOVE },
    },
  },
  redisTools: {
    getRedisClient,
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

// const {
//   constants: { messageKeys },
// } = require("../../local");

// const handleConnect = require("./handleConnect");
// const handleMessage = require("./handleMessage");
// const handleDisconnect = require("./handleDisconnect");

// TO REALTIME UTILS
// const updateUserConnectionPoolData = async ({
//   getNewUserData,
//   connectionId,
//   userId,
//   connectionPoolKey,

//   client = null,
//   quitClient = true,
// }) => {
//   console.log("running updateUserConnectionPoolData");

//   if (!client) {
//     client = getRedisClient();
//     await client.connect();
//   }

//   const rawUserData = await client.sendCommand([
//     "HGET",
//     connectionPoolKey,
//     userId,
//   ]);

//   if (!rawUserData) {
//     const error = new Error(`invalid user id provided: ${userId}`);
//     error.statusCode = 400;
//     error.bulltrue = true;
//     throw error;
//   }

//   const userData = redisStrObj.fromRedisStrObj(rawUserData);

//   if (userData.cId !== connectionId) {
//     const error = new Error(`invalid user id provided: ${rawUserId}`);
//     error.statusCode = 400;
//     error.bulltrue = true;
//     throw error;
//   }

//   // const newUserData = Object.assign({}, userData, {
//   //   x: messageValue,
//   // });

//   const newUserData = getNewUserData({ userData });

//   const newUserDataRedisStrObj = redisStrObj.toRedisStrObj(newUserData);

//   await client.sendCommand([
//     "HSET",
//     connectionPoolKey,
//     userId,
//     newUserDataRedisStrObj,
//   ]);

//   if (quitClient) {
//     try {
//       await client.quit();
//     } catch (err) {
//       console.log("[WARN] error in quitting redis:", err);
//     }
//   }

//   console.log("updateUserConnectionPoolData executed successfully");
// };

// `move_x$2y$3_z$6w$50`;

// const getEncodedCmdValue = (command, params) => {
//   let encodedCmdValue = `${command}_`;

//   const paramKeys = Object.keys(params);

//   for (let i = 0; i < paramKeys.length - 1; i++) {
//     const paramKey = paramKeys[i];
//     const paramValue = params[paramKey];

//     encodedCmdValue += `${paramKey}$${paramValue}_`;
//   }

//   const lastParamKey = paramKeys[paramKeys.length - 1];
//   const lastParamValue = params[lastParamKey];

//   encodedCmdValue += `${lastParamKey}$${lastParamValue}`;

//   return encodedCmdValue;
// };

const MAX_QUEUE_LENGTH_MINUS_ONE = String(500 - 1);

const safeLTrim = async ({ client }) => {
  console.log("running safeLTrim");
  try {
    await client.sendCommand(["LTRIM", Q_1, "0", MAX_QUEUE_LENGTH_MINUS_ONE]);
    console.log("running safeLTrimExecutedSuccessfully");
  } catch (err) {
    console.log("error in safeLTrim", err);
  }
};

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

    // TODO: verify connection id
    const cmd = JSON.stringify({
      type: MOVE,
      userId,
      value: messageValue,
      time: Date.now(),
    });

    await client.sendCommand(["LPUSH", Q_1, cmd]);
    safeLTrim({ client });

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

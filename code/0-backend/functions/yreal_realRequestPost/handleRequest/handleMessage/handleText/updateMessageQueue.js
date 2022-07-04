"use strict";

// const {
//   // stringify,
//   // drq,
//   // constants: {
//   //   realtime: {
//   //     commands: { MOVE },
//   //   },
//   // },
//   redisTools: {
//     getRedisClient,

//     //redisStrObj
//   },
//   // realtime: { connectionPoolHObjToObj },
// } = require("compute-utils");

const {
  constants: {
    // actionValues,
    lRListKeys: { M_1 },
  },
  // authorizePartyUser,
} = require("../../../local");

// const getRedisClient = require("../redisTools/getRedisClient");
// const redisStrObj = require("../redisTools/redisStrObj");
// // const connectionPoolHObjToObj = require("./connectionPoolHObjToObj");

// const {
//   constants: { messageKeys },
// } = require("../../local");

// const handleConnect = require("./handleConnect");
// const handleMessage = require("./handleMessage");
// const handleDisconnect = require("./handleDisconnect");

const MAX_QUEUE_LENGTH_MINUS_ONE = String(25 - 1);
// const MAX_QUEUE_LENGTH_MINUS_ONE = String(5 - 1);

const safeLTrim = async ({ client }) => {
  console.log("running safeLTrim");
  try {
    await client.sendCommand(["LTRIM", M_1, "0", MAX_QUEUE_LENGTH_MINUS_ONE]);
    console.log("running safeLTrimExecutedSuccessfully");
  } catch (err) {
    console.log("error in safeLTrim", err);
  }
};

const getEncodedMessage = ({ messageValue, userId }) => {
  const stringifiedMessage = JSON.stringify({
    message: messageValue,
    userId,
    time: Date.now(),
  });

  return stringifiedMessage;
};

// TO REALTIME UTILS
module.exports = async ({
  messageValue,
  client,
  userId,

  // quitClient = true,
}) => {
  console.log("running updateMessageQueue");

  await client.sendCommand([
    "LPUSH",
    M_1,
    getEncodedMessage({
      messageValue,
      userId,
    }),
  ]);

  safeLTrim({ client });

  console.log("updateMessageQueue executed successfully");
};

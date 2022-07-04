"use strict";

const {
  stringify,
  // drq,
  // constants: {
  //   realtime: {
  //     commands: { MOVE },
  //   },
  // },
  constants: {
    realtime: {
      commands: { MSGRCPT },
    },
  },
  redisTools: {
    getRedisClient,

    //redisStrObj
  },
  // realtime: {
  //   // connectionPoolHObjToObj,
  //   updateUserConnectionPoolData,
  // },
} = require("compute-utils");

const {
  constants: {
    // actionValues,
    // connectionPoolKeys: { CP_1 },
    lRListKeys: { Q_1 },
  },
  // authorizePartyUser,
} = require("../../../local");

// const sendMessages = require("./sendMessages");

const updateMessageQueue = require("./updateMessageQueue");

const addMessageReceiptToLRListQueue = async ({
  client,
  userId,
  messageValue,
}) => {
  const cmd = JSON.stringify({
    type: MSGRCPT,
    userId,
    value: `${MSGRCPT}${messageValue.length}`,
    time: Date.now(),
  });

  await client.sendCommand(["LPUSH", Q_1, cmd]);
};

module.exports = async ({ messageValue, connectionId, userId }) => {
  console.log(
    "running handleText with the following values: " +
      stringify({
        messageValue,
        connectionId,
        userId,
      })
  );

  const client = getRedisClient();
  await client.connect();

  // await sendMessages({
  //   client,
  // });

  try {
    if (messageValue) {
      // .all doesn't matter for now
      await Promise.all([
        updateMessageQueue({ client, userId, messageValue }),

        // updateUserConnectionPoolData({
        //   getNewUserData: ({ userData }) => {
        //     return Object.assign({}, userData, {
        //       t: Date.now(),
        //     });
        //   },
        //   connectionId,
        //   userId,
        //   connectionPoolKey: CP_1,
        //   client,
        // }),
      ]);
    }

    await addMessageReceiptToLRListQueue({
      client,
      userId,
      messageValue,
    });

    await client.quit();
  } catch (err) {
    await client.quit();

    console.log("[ERROR] error in redis component:", err);

    throw err;
  }

  const responseValues = {};

  console.log(
    "handleText executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

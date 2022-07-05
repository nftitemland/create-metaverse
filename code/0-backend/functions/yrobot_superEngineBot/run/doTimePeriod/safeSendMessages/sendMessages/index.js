"use strict";

const {
  // stringify,
  // drq,
  constants: {
    // realtime: {
    //   commands: { MOVE },
    // },

    redis: {
      lRListKeyPrefixes: {
        M_,
        // Q_: "Q_",
      },
    },
  },
  // redisTools: {
  //   getRedisClient,

  //   //redisStrObj
  // },
  // realtime: { connectionPoolHObjToObj },
} = require("compute-utils");

const bluebird = require("bluebird");

const sendRequest = require("./sendRequest");
const getFormattedMessagesData = require("./getFormattedMessagesData");

const MESSAGE_QUEUE_ID = `${M_}1`;

// TO REALTIME UTILS
module.exports = async ({
  client,
  userIdToUserConnectionPoolData, // quitClient = true,
  userIds,
}) => {
  // console.log("running sendMessages");

  const [
    //rawUserIdToUserConnectionPoolData,
    rawMessages,
  ] = await Promise.all([
    // client.sendCommand(["HGETALL", CP_1]),
    client.sendCommand(["LRANGE", MESSAGE_QUEUE_ID, "0", "-1"]),
  ]);

  const messageData = getFormattedMessagesData({
    rawMessages,
  });

  await bluebird.map(
    userIds,
    async (userId) => {
      const userConnectionPoolData = userIdToUserConnectionPoolData[userId];

      await sendRequest({
        connectionId: userConnectionPoolData.cId,
        messageData,
      });
    },
    { concurrency: 100 }
  );

  // console.log("sendMessages executed successfully");
};

"use strict";

const {
  stringify,
  drq,
  constants: {
    realtime: {
      limits: { MAXIMUM_USER_COUNT },
      realPoiLvls,
    },
    // environment: { isProductionMode },
  },
  redisTools: { getRedisClient, redisStrObj },
  javascript: { getHashedText },

  // sendData,
} = require("compute-utils");

const {
  // constants: { eventTypes },
  constants: {
    connectionPoolKeys: { CP_1 },
    queueKeys,
    queueNames,
  },
  // authorizePartyUser,
} = require("../../local");

const addConnectionToDb = require("../addConnectionToDb");
// const ethUtil = require("ethereumjs-util");

const CONNECTION_POOL_KEY = CP_1;

const GUEST = "GUEST";

module.exports = async ({ userId, connectionId, ipAddress }) => {
  console.log(
    "running handleGuestConnect with the following values: " +
      stringify({
        userId,
        ipAddress,
        connectionId,
      })
  );

  const hashedIpAddress = getHashedText(ipAddress);

  // const fullUserId = `${userId}${hashedIpAddress.substring(0, 6)}`;
  const fullUserId = userId;

  await drq({
    queueId: drq.getQueueId({
      name: queueNames.user_party_connect,
      id: hashedIpAddress,
    }),
    operation: async () => {
      await drq({
        queueId: drq.getQueueId({
          name: queueNames.global_party_connect,
          id: queueKeys.global,
        }),
        operation: async () => {
          const client = getRedisClient();

          await client.connect();

          const numberOfUsers = await client.sendCommand([
            "HLEN",
            CONNECTION_POOL_KEY,
          ]);

          console.log("current number of users:", numberOfUsers);

          if (numberOfUsers >= MAXIMUM_USER_COUNT) {
            const error = new Error(
              `Too many users in room, please try again in a bit.`
            );
            error.statusCode = 400;
            error.bulltrue = true;
            throw error;
          }

          const thePowerOfNow = Date.now();

          const userConnectionPoolData = {
            cId: connectionId,
            cT: thePowerOfNow,
            t: thePowerOfNow,
            x: 0,
            y: 0,
            cnt: 0,
            g: "y",
            lvl: realPoiLvls.GUEST,
          };

          await client.sendCommand([
            "HSET",
            CONNECTION_POOL_KEY,
            fullUserId,
            redisStrObj.toRedisStrObj(userConnectionPoolData),
          ]);

          try {
            await client.quit();
          } catch (err) {
            console.log("[WARN] error in quitting redis:", err);
          }
        },
      });
    },
  });

  await addConnectionToDb({
    connectionId,
    userId: fullUserId,
    address: GUEST,
  });

  // if (isProductionMode) {
  //   safeSendMonitorData({
  //     address,
  //     userId: user.userId,
  //   });
  // }

  const responseValues = {};

  console.log(
    "handleGuestConnect executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

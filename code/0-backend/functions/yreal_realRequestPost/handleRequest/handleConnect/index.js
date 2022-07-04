"use strict";

const {
  stringify,
  drq,
  constants: {
    realtime: {
      limits: { MAXIMUM_USER_COUNT },
    },
    // environment: { isProductionMode },
    // nftTypes,
    // nftKeys,
  },
  user: { getWithdrawLevelData },
  redisTools: { getRedisClient, redisStrObj },
  realtime: {
    realpoi: { getGameTier },
  },
  // sendData,
} = require("compute-utils");

const {
  // constants: { eventTypes },
  constants: {
    connectionPoolKeys: { CP_1 },
    queueKeys,
    queueNames,
  },
  authorizePartyUser,
} = require("../../local");

const getAuxNftLevel = require("./getAuxNftLevel");

const addConnectionToDb = require("../addConnectionToDb");

const CONNECTION_POOL_KEY = CP_1;

module.exports = async ({ address, partyLoginToken, connectionId }) => {
  console.log(
    "running handleConnect with the following values: " +
      stringify({
        address,
        partyLoginToken,
        connectionId,
      })
  );

  const { user } = await authorizePartyUser({
    address,
    partyLoginToken,
  });

  const withdrawLevelPromise = getWithdrawLevelData({
    address,
    // types: [nftKeys.POIPOI, nftKeys.GAME_CHARACTERS],
  });

  // todo: make based on tempDb
  const auxNftLevelPromise = getAuxNftLevel({
    address,
  });

  await drq({
    queueId: drq.getQueueId({
      name: queueNames.user_party_connect,
      id: address,
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

          const withdrawLevelData = await withdrawLevelPromise;

          const gameTier = getGameTier({
            withdrawLevelData,
          });

          /*
            withdraw level to character level
          */

          const thePowerOfNow = Date.now();

          const userConnectionPoolData = {
            cId: connectionId,
            cT: thePowerOfNow,
            t: thePowerOfNow,
            x: 0,
            y: 0,
            cnt: 0,
            lvl: gameTier,
          };

          // todo: make based on tempDb
          const auxNftLevel = await auxNftLevelPromise;

          if (auxNftLevel) {
            userConnectionPoolData.aux1 = auxNftLevel;
          }

          await client.sendCommand([
            "HSET",
            CONNECTION_POOL_KEY,
            user.userId,
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
    userId: user.userId,
    address,
  });

  // if (isProductionMode) {
  //   safeSendMonitorData({
  //     address,
  //     userId: user.userId,
  //   });
  // }

  const responseValues = {};

  console.log(
    "handleConnect executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

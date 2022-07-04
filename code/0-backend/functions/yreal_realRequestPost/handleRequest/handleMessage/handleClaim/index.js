"use strict";

const {
  drq,
  stringify,
  // drq,
  database: { classicalUpdateDatabaseEntry },
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
} = require("../../../local");

const CLAIM_DRQ = "realpoi_claim_drq";

const getChest = async () => {
  return {
    secondarySortKey: "UNOPENED",
  };
};

module.exports = async ({ messageValue, connectionId, userId }) => {
  console.log(
    "running handleClaim with the following values: " +
      stringify({
        messageValue,
        connectionId,
        userId,
      })
  );

  const client = getRedisClient();

  try {
    await client.connect();

    // get if is valid chest ()
    const chestData = await getChest();

    // === UNOPENED
    if (chestData.secondarySortKey === "2") {
      await drq({
        queueId: drq.getQueueId({
          name: CLAIM_DRQ,
          id: userId,
        }),
        operation: async () => {
          const chestData = await getChest();

          if (chestData.secondarySortKey === "2") {
            await classicalUpdateDatabaseEntry({});
          }
        },
      });
    }

    await client.quit();
  } catch (err) {
    console.log("[WARN] error in quitting redis:", err);
    await client.quit();
    throw err;
  }

  const responseValues = {};

  console.log(
    "handleMove executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

"use strict";

const bluebird = require("bluebird");
const {
  realtime: { connectionPoolHObjToObj },
  // stringify,
  // delay,
  constants: {
    redis: {
      hKeyPrefixes: { CP_ },
    },
  },
} = require("compute-utils");

const disconnect = require("../disconnect");

const CONNECTION_POOL_KEY = `${CP_}1`;

// const QUANTA_PER_PERIOD = 1;
// const EXPIRY_TIME = 1000 * 60 * 10;
const EXPIRY_TIME = 1000 * 60 * 5;
// const EXPIRY_TIME = 1000 * 5;

module.exports = async ({ client }) => {
  const rawUserIdToUserConnectionPoolData = await client.sendCommand([
    "HGETALL",
    CONNECTION_POOL_KEY,
  ]);

  const userIdToUserConnectionPoolData = connectionPoolHObjToObj(
    rawUserIdToUserConnectionPoolData
  );

  const userIds = Object.keys(userIdToUserConnectionPoolData);

  console.log(`running disco, found ${userIds.length} users`);

  await bluebird.map(
    userIds,
    async (userId) => {
      const userCpData = userIdToUserConnectionPoolData[userId];

      const timeSinceExpiry = Date.now() - userCpData.t;

      if (timeSinceExpiry >= EXPIRY_TIME) {
        await disconnect({
          connectionId: userCpData.cId,
          userId,
          client,
        });
      }
    },
    { concurrency: 5 }
  );
};

"use strict";

const {
  stringify,
  redisTools: { getRedisClient },
  constants: {
    redis: {
      hKeyPrefixes: { CP_ },
    },
    realtime: {
      limits: { MAXIMUM_USER_COUNT },
    },
  },
  realtime: { connectionPoolHObjToObj },
} = require("compute-utils");

const CONNECTION_POOL_KEY = `${CP_}1`;

const ensureNotTooManyUsers = async ({ client }) => {
  console.log("running ensureNotTooManyUsers");

  const rawUserIdToUserConnectionPoolData = await client.sendCommand([
    "HGETALL",
    CONNECTION_POOL_KEY,
  ]);

  const userIdToUserConnectionPoolData = connectionPoolHObjToObj(
    rawUserIdToUserConnectionPoolData
  );

  const userIds = Object.keys(userIdToUserConnectionPoolData);

  console.log(`ensureNotTooManyUsers: ${userIds.length} users`);

  if (userIds.length >= MAXIMUM_USER_COUNT) {
    const error = new Error(
      `unable to connect: too many users currently in metaverse`
    );
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  console.log("ensureNotTooManyUsers executed successfully");
};

module.exports = async ({ ipAddress }) => {
  console.log(
    "running doPreconnectTasks with the following values: " +
      stringify({
        ipAddress,
      })
  );

  const client = getRedisClient();
  // let client;
  console.log("running realtime streamer iterations");

  await client.connect();

  try {
    await ensureNotTooManyUsers({ client });

    await client.quit();
  } catch (err) {
    await client.quit();
    console.log("[WARN] error in redis command:", err);
    throw err;
  }

  const responseValues = {};

  console.log(
    "doPreconnectTasks executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

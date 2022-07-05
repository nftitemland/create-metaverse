"use strict";

const {
  stringify,

  database: { updateDatabaseEntry },
  constants: {
    // environment: { isProductionMode },
    aws: {
      database: {
        // pureMetadataKeys,
        tableNames: { METADATA },
        // tableNameToPartitionKey,
      },
    },

    realtime: {
      dbKeys: { REALTIME_CONNECTION_RECORD },
    },
    // environment: { isProductionMode },
    // users: {
    //   visibilities: { PUBLIC },
    // },
    // secondaryIndices: { secondaryPartitionKeySecondarySortKeyIndex },
    // },
  },
  // drq,
  // constants: {
  //   realtime: {
  //     limits: { MAXIMUM_USER_COUNT },
  //   },
  //   // environment: { isProductionMode },
  // },
  // redisTools: { getRedisClient, redisStrObj },
  // sendData,
} = require("compute-utils");

const {
  // constants: { eventTypes },
  constants: {
    connectionPoolKeys: { CP_1 },
  },
  // authorizePartyUser,
} = require("../local");

module.exports = async ({ connectionId, userId, address }) => {
  // if (isProductionMode) {
  //   return;
  // }

  console.log(
    "running addConnectionToDb with the following values: " +
      stringify({
        connectionId,
        userId,
        address,
      })
  );

  await updateDatabaseEntry({
    tableName: METADATA,
    entry: {
      partitionKey: `REALTIME_CONNECTION_${connectionId}`,
      secondaryPartitionKey: REALTIME_CONNECTION_RECORD,
      secondarySortKey: Date.now(),
      connectionId,
      userId,
      address,
      connectionPoolKey: CP_1,
    },
  });

  /*  
    NEXTA STEPU: in disco
      1. search 100, oldest first 
      2. for each, get from connection pool,
      3. if not in connection pool, disco
  */

  const responseValues = {};

  console.log(
    "addConnectionToDb executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

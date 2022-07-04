"use strict";

const {
  stringify,
  realtime: { connectionPoolHObjToObj },
  database: { searchDatabase, classicalUpdateDatabaseEntry },
  constants: {
    aws: {
      database: {
        tableNameToPartitionKey,
        // tableNameToSortKey,
        tableNames: { METADATA },
        secondaryIndices: { secondaryPartitionKeySecondarySortKeyIndex },
      },
    },

    realtime: {
      dbKeys: {
        REALTIME_CONNECTION_RECORD,
        REALTIME_CONNECTION_RECORD_PROCESSED,
      },
    },

    redis: {
      hKeyPrefixes: { CP_ },
    },
  },
  // delay,
  // redisTools: { getRedisClient },
} = require("compute-utils");

const CONNECTION_POOL_KEY = `${CP_}1`;

const disconnect = require("../disconnect");

// const disco = require("./disco");

// const RUN_TIME = Number(process.env.RUN_TIME_SUPER_ENGINE) || 1000 * 63;
// const PERIOD = Number(process.env.REFRESH_RATE_SUPER_ENGINE) || 25;
// const PERIOD = 1000;
const SEARCH_LIMIT = 100;
//

const getIfShouldDiscoConnection = (record, userIdToUserConnectionPoolData) => {
  const userId = record.userId;
  const connectionId = record.connectionId;

  const cpData = userIdToUserConnectionPoolData[userId];

  if (!cpData || cpData.cId !== connectionId) {
    return true;
  }

  return false;
};

module.exports = async ({ client }) => {
  console.log("running discoIfNotInCp");

  const searchResults = await searchDatabase({
    searchParams: {
      TableName: METADATA,
      IndexName: secondaryPartitionKeySecondarySortKeyIndex,
      Limit: SEARCH_LIMIT,
      ScanIndexForward: true,
      KeyConditionExpression: `#secondaryPartitionKey = :secondaryPartitionKey`,
      ExpressionAttributeNames: {
        "#secondaryPartitionKey": "secondaryPartitionKey",
      },
      ExpressionAttributeValues: {
        ":secondaryPartitionKey": REALTIME_CONNECTION_RECORD,
      },
      // ExclusiveStartKey: paginationValueToUse || undefined,
    },
  });

  console.log(
    `discoIfNotInCp - ` +
      `got ${searchResults.ultimateResults.length} connection records`
  );

  const rawUserIdToUserConnectionPoolData = await client.sendCommand([
    "HGETALL",
    CONNECTION_POOL_KEY,
  ]);

  const userIdToUserConnectionPoolData = connectionPoolHObjToObj(
    rawUserIdToUserConnectionPoolData
  );

  for (const record of searchResults.ultimateResults) {
    const shouldDiscoConnection = getIfShouldDiscoConnection(
      record,
      userIdToUserConnectionPoolData
    );

    if (shouldDiscoConnection) {
      console.log("disconnecting connection:", stringify(record));

      await disconnect({
        userId: record.userId,
        connectionId: record.connectionId,
        client,
        onlyDisco: true,
      });

      const updateExpression =
        "SET #secondaryPartitionKey = :secondaryPartitionKey";

      const expressionAttributeNames = {
        "#secondaryPartitionKey": "secondaryPartitionKey",
      };

      const expressionAttributeValues = {
        ":secondaryPartitionKey": REALTIME_CONNECTION_RECORD_PROCESSED,
      };

      await classicalUpdateDatabaseEntry({
        tableName: METADATA,
        key: tableNameToPartitionKey[METADATA],
        value: record.partitionKey,
        // value: Number(result.token_id),
        // sortKey: tableNameToSortKey[NFTMINE],
        // sortValue: transactionId,
        // conditionExpression,
        updateExpression,
        expressionAttributeNames,
        expressionAttributeValues,
        // doNotErrorOnConditionalFail: true,
      });
    }
  }

  console.log("Disco if not in CP executed successfully");
};

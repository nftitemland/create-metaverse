"use strict";

const {
  stringify,
  battle: { awardBattleFieldReward },
  // getRoundedNumber,
  database: { scanDatabase, classicalUpdateDatabaseEntry },
  constants: {
    environment: { isProductionMode },
    users: {
      visibilities: { PUBLIC },
    },
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNames: { USERS, METADATA },
      },
    },
  },
  delay,
} = require("compute-utils");

const SEARCH_LIMIT = isProductionMode ? 5 : 1;

module.exports = async ({ metadata }) => {
  console.log(
    "🐸🥊running handleBattleFieldRewardsMetadata with the following values:" +
      stringify({
        metadata,
      })
  );

  const searchResults = await scanDatabase({
    tableName: USERS,
    exclusiveStartKey: metadata.paginationValue,

    expressionAttributeNames: {
      "#secondaryPartitionKey": "secondaryPartitionKey",
    },
    expressionAttributeValues: {
      ":secondaryPartitionKey": PUBLIC,
    },
    filterExpression: `#secondaryPartitionKey = :secondaryPartitionKey`,
    limit: SEARCH_LIMIT,
  });

  for (const user of searchResults.ultimateResults) {
    await awardBattleFieldReward({
      user,
    });

    await delay(3200);
  }

  if (searchResults.paginationValue) {
    console.log(
      "handleBattleFieldRewardsMetadata: updating metadata with pag: " +
        stringify({
          paginationValue: searchResults.paginationValue,
        })
    );

    const updateExpression = "SET #paginationValue = :paginationValue";

    const expressionAttributeNames = {
      "#paginationValue": "paginationValue",
    };

    const expressionAttributeValues = {
      ":paginationValue": searchResults.paginationValue,
    };

    await classicalUpdateDatabaseEntry({
      tableName: METADATA,
      key: tableNameToPartitionKey[METADATA],
      value: metadata.partitionKey,
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    });
  }

  console.log("handleBattleFieldRewardsMetadata executed successfully");
};

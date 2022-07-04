"use strict";

const {
  stringify,
  // getRoundedNumber,
  battle: { awardBattleFieldReward },
  database: { scanDatabase, updateDatabaseEntry },
  constants: {
    environment: { isProductionMode },
    users: {
      visibilities: { PUBLIC },
    },
    aws: {
      database: {
        tableNames: { USERS, METADATA },
        // secondaryIndices: { secondaryPartitionKeySecondarySortKeyIndex },
      },
    },
    transactions: {
      types: { BATTLE_V1_FIELD_REWARD },
    },
  },
  delay,
  // addTransactionAndUpdateUser,
} = require("compute-utils");

const SEARCH_LIMIT = isProductionMode ? 5 : 1;

module.exports = async () => {
  console.log(
    "🐼📈running reward: " +
      stringify({
        time: new Date().toLocaleString(),
      })
  );

  const searchResults = await scanDatabase({
    tableName: USERS,
    exclusiveStartKey: null,
    expressionAttributeNames: {
      "#secondaryPartitionKey": "secondaryPartitionKey",
    },
    expressionAttributeValues: {
      ":secondaryPartitionKey": PUBLIC,
    },
    filterExpression: `#secondaryPartitionKey = :secondaryPartitionKey`,
    // indexName,
    limit: SEARCH_LIMIT,
  });

  for (const user of searchResults.ultimateResults) {
    if (user.txDbCache.battleMode) {
      await awardBattleFieldReward({
        user,
      });

      await delay(250);
    }
  }

  if (searchResults.paginationValue) {
    console.log(
      "reward: updating metadata with pag: " +
        stringify({
          paginationValue: searchResults.paginationValue,
        })
    );

    const partitionKey = `battle_field_rewards_${Date.now()}`;

    await updateDatabaseEntry({
      tableName: METADATA,
      entry: {
        partitionKey,
        type: BATTLE_V1_FIELD_REWARD,
        paginationValue: searchResults.paginationValue,
      },
      // onlyAddDbEntryIfNotAlreadyExists: true,
    });
  }

  const responseValues = {};

  console.log(
    "reward executed successfully " +
      "returning values: " +
      stringify(responseValues)
  );
};

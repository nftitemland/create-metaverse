"use strict";

const {
  stringify,
  database: { searchDatabase },
  constants: {
    battle: {
      meta: { TIME_BEFORE_NEXT_MATCH },
    },
    aws: {
      database: {
        tableNames: { TRANSACTIONS },
        secondaryIndices: { partitionKeySecondarySortKeyIndex },
      },
    },
    transactions: {
      types: { BATTLE_V2 },
    },
  },
} = require("compute-utils");

const SEARCH_LIMIT = 300;

module.exports = async ({ address }) => {
  console.log(
    "running getRecentBattles " +
      "with the following values: " +
      stringify({
        address,
      })
  );

  const searchResults = await searchDatabase({
    searchParams: {
      TableName: TRANSACTIONS,
      IndexName: partitionKeySecondarySortKeyIndex,
      Limit: SEARCH_LIMIT,
      ScanIndexForward: false,
      KeyConditionExpression:
        `#partitionKey = :partitionKey ` +
        "and #secondarySortKey >= :latestBattleTime",
      FilterExpression: "#type = :typeA",
      ExpressionAttributeNames: {
        "#partitionKey": "partitionKey",
        "#type": "type",
        "#secondarySortKey": "secondarySortKey",
      },
      ExpressionAttributeValues: {
        ":partitionKey": address,
        ":typeA": BATTLE_V2,
        ":latestBattleTime": Date.now() - TIME_BEFORE_NEXT_MATCH,
      },
      // ExclusiveStartKey: paginationValueToUse,
    },
  });

  const processedRecentBattles = [];

  for (const tx of searchResults.ultimateResults) {
    if (tx.value.instigator) {
      const enemyUserId = tx.value.enemyUserId;
      const nextPlayTime = tx.secondarySortKey + TIME_BEFORE_NEXT_MATCH;

      processedRecentBattles.push({
        enemyUserId,
        nextPlayTime,
      });
    }
  }

  const results = {
    recentBattles: processedRecentBattles,
  };

  console.log(
    "getRecentBattles executed successfully, " +
      `obtained ${results.recentBattles.length} recent battles`
  );

  return results;
};

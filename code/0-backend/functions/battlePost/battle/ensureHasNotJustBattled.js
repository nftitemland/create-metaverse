"use strict";

const {
  stringify,
  database: { searchDatabase },
  getRoundedNumber,
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
      types: { BATTLE_V1 },
    },
  },
} = require("compute-utils");

const SEARCH_LIMIT = 150;

module.exports = async ({ address, battleId }) => {
  console.log(
    "running ensureHasNotJustBattled, with the following values:",
    stringify({
      address,
      battleId,
    })
  );

  let paginationValueToUse;

  const secondarySortKeyLower = Date.now() - TIME_BEFORE_NEXT_MATCH;

  do {
    const searchDbResults = await searchDatabase({
      searchParams: {
        TableName: TRANSACTIONS,
        IndexName: partitionKeySecondarySortKeyIndex,
        Limit: SEARCH_LIMIT,
        ScanIndexForward: false,
        KeyConditionExpression:
          `#partitionKey = :partitionKey and ` +
          "#secondarySortKey > :secondarySortKeyLower",
        FilterExpression: `#type = :type`,
        ExpressionAttributeNames: {
          "#partitionKey": "partitionKey",
          "#secondarySortKey": "secondarySortKey",
          "#type": "type",
        },
        ExpressionAttributeValues: {
          ":partitionKey": address,
          ":secondarySortKeyLower": secondarySortKeyLower,
          ":type": BATTLE_V1,
        },
        ExclusiveStartKey: paginationValueToUse || undefined,
      },
    });

    for (const tx of searchDbResults.ultimateResults) {
      console.log(
        "ensureHasNotJustBattled error, " + `users have just battled.`
      );
      if (tx.value.battleId === battleId) {
        const nextPlayTime = tx.secondarySortKey + TIME_BEFORE_NEXT_MATCH;

        const timeRemaining = nextPlayTime - Date.now();

        const timeRemainingInMinutes = getRoundedNumber(
          timeRemaining / 60000,
          0
        );

        const error = new Error(
          `Too soon to battle selected user, ` +
            `can battle in ${timeRemainingInMinutes} minutes.`
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
      }
    }

    paginationValueToUse = searchDbResults.paginationValue;
  } while (paginationValueToUse);

  console.log(
    "ensureHasNotJustBattled executed successfully, " +
      `users have not just battled.`
  );
};

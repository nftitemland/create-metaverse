"use strict";

const {
  stringify,
  database: { searchDatabase },
  // user: { getWithdrawLevelData, getUser },
  constants: {
    environment: { isProductionMode },
    aws: {
      database: {
        // tableNameToPartitionKey,
        secondaryIndices: { partitionKeySecondarySortKeyIndex },
        tableNames: { TRANSACTIONS },
      },
    },
    transactions: {
      types: { WITHDRAW_REQUEST },
    },
  },
  // addTransactionAndUpdateUser,
} = require("compute-utils");

const PROD_TIME_UNTIL_NEXT_WITHDRAW = 1000 * 60 * 60 * 12;
// const PROD_TIME_UNTIL_NEXT_WITHDRAW = 3;

const timeUntilNextWithdraw = isProductionMode
  ? PROD_TIME_UNTIL_NEXT_WITHDRAW
  : 3;

const searchLimit = 100;

module.exports = async ({ address }) => {
  console.log(
    "running ensureWithdrawNotTooSoon with the following values:",
    stringify({
      address,
    })
  );

  let paginationValueToUse;
  const secondarySortKeyLower = Date.now() - timeUntilNextWithdraw;

  do {
    const searchDbResults = await searchDatabase({
      searchParams: {
        TableName: TRANSACTIONS,
        IndexName: partitionKeySecondarySortKeyIndex,
        Limit: searchLimit,
        ScanIndexForward: false,
        KeyConditionExpression:
          `#partitionKey = :partitionKey and ` +
          "#secondarySortKey > :secondarySortKeyLower",
        FilterExpression: "#type = :type",
        ExpressionAttributeNames: {
          "#partitionKey": "partitionKey",
          "#type": "type",
          "#secondarySortKey": "secondarySortKey",
        },
        ExpressionAttributeValues: {
          ":partitionKey": address,
          ":type": WITHDRAW_REQUEST,
          ":secondarySortKeyLower": secondarySortKeyLower,
        },
        ExclusiveStartKey: paginationValueToUse || undefined,
      },
    });

    if (searchDbResults.ultimateResults.length > 0) {
      const error = new Error("too soon to withdraw again");
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    paginationValueToUse = searchDbResults.paginationValue;
  } while (paginationValueToUse);

  console.log(
    "ensureWithdrawNotTooSoon executed successfully - " +
      `user has not withdraw recently and is good to withdraw`
  );
};

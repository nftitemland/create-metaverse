"use strict";

const stringify = require("../../stringify");
const {
  aws: {
    database: {
      tableNames: { QUEUE },
      //   tableNameToPartitionKey,
      //   tableNameToSortKey,
    },
  },
} = require("../../constants");
// const delay = require("../../delay");
const searchDatabase = require("../../database/searchDatabase");
// const updateDatabaseEntry = require("../../database/updateDatabaseEntry");
// const obliterateOperationFromQueue = require("../obliterateOperationFromQueue");

// const waitUntilOperationIsAllowedToBePerformed = require("./waitUntilOperationIsAllowedToBePerformed");
// const classicalUpdateDatabaseEntry = require("../../database/classicalUpdateDatabaseEntry");

const {
  constants: { STATES, TIMES },
} = require("../local");

// const timeoutFunction = async () => {
//   await delay(EXPIRY_TIME_1);
//   throw new Error("concurrency timeout error");
// };

/*
  Adjustments
    
    WHEN seeing if operations are still running it waits 100ms extra

*/

module.exports = async ({ queueId, operationId, expiryTwoKey }) => {
  console.log(
    "Running beforeOperationEnsure:",
    stringify({
      queueId,
      operationId,
      expiryTwoKey,
    })
  );

  /*
        strategy: get in time range

         if any with expiryTimeKeyTwo within two, then you;'re
    */

  const sortKeyUpper = expiryTwoKey - 1;
  const sortKeyLower = sortKeyUpper - TIMES.EXPIRY_TIME_1 * 10;

  const expiryTwoKeyUpper = expiryTwoKey - 1 + TIMES.MINIMUM_QUEUE_ACTION_TIME;
  const expiryTwoKeyLower =
    expiryTwoKeyUpper - TIMES.MINIMUM_QUEUE_ACTION_TIME + 1;

  const searchDbResults = await searchDatabase({
    searchParams: {
      TableName: QUEUE,
      //   IndexName: secondaryPartitionKeySecondarySortKeyIndex,
      Limit: 500,
      ScanIndexForward: true,
      KeyConditionExpression:
        `#partitionKey = :partitionKey and ` +
        "#sortKey BETWEEN :sortKeyLower AND :sortKeyUpper",
      FilterExpression:
        "#state = :state and " +
        "#expiryTwoKey BETWEEN :expiryTwoKeyLower AND :expiryTwoKeyUpper",
      ExpressionAttributeNames: {
        "#partitionKey": "partitionKey",
        "#sortKey": "sortKey",
        "#state": "state",
        "#expiryTwoKey": "expiryTwoKey",
      },
      ExpressionAttributeValues: {
        ":partitionKey": queueId,
        ":sortKeyLower": sortKeyLower,
        ":sortKeyUpper": sortKeyUpper,
        ":state": STATES.OPERATION,
        ":expiryTwoKeyLower": expiryTwoKeyLower,
        ":expiryTwoKeyUpper": expiryTwoKeyUpper,
      },
      // ExclusiveStartKey: paginationValueToUse || undefined,
    },
  });

  const queueEntries = searchDbResults.ultimateResults.filter((queueEntry) => {
    return queueEntry.operationId !== operationId;
  });

  if (queueEntries > 0) {
    throw new Error("batch concurrency timeout error");
  }
  // one way to test is make crazy amount and have special mega log
  const results = {};

  console.log(
    "beforeOperationEnsure executed successfully, here's the results:",
    stringify(results)
  );

  return results;
};

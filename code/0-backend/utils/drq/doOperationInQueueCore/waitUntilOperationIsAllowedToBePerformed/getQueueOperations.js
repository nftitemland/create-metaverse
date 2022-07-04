"use strict";

// const stringify = require("../../stringify");
const {
  aws: {
    database: {
      tableNames: { QUEUE },
    },
  },
} = require("../../../constants");
const searchDatabase = require("../../../database/searchDatabase");

const {
  constants: {
    TIMES: { EXPIRY_TIME_1 },
  },
} = require("../../local");

const searchLimit = 100;

module.exports = async ({ queueId, operationId }) => {
  const queueOperations = [];
  let paginationValueToUse = null;

  const sortKeyLower = operationId - EXPIRY_TIME_1 * 10 - 200;
  const sortKeyUpper = operationId - 1;
  // const sortKeyUpper = operationId + EXPIRY_TIME_1;

  do {
    const searchDbResults = await searchDatabase({
      searchParams: {
        TableName: QUEUE,
        //   IndexName: secondaryPartitionKeySecondarySortKeyIndex,
        Limit: searchLimit,
        ScanIndexForward: true,
        KeyConditionExpression:
          `#partitionKey = :partitionKey and ` +
          "#sortKey BETWEEN :sortKeyLower AND :sortKeyUpper",
        ExpressionAttributeNames: {
          "#partitionKey": "partitionKey",
          "#sortKey": "sortKey",
        },
        ExpressionAttributeValues: {
          ":partitionKey": queueId,
          ":sortKeyLower": sortKeyLower,
          ":sortKeyUpper": sortKeyUpper,
        },
        ExclusiveStartKey: paginationValueToUse || undefined,
      },
    });

    const qOs = searchDbResults.ultimateResults.filter((qO) => {
      return qO.operationId !== operationId;
    });

    queueOperations.push(...qOs);
    paginationValueToUse = searchDbResults.paginationValue;
  } while (paginationValueToUse);

  return queueOperations;
};

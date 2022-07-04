"use strict";

const stringify = require("../../stringify");
const {
  aws: {
    database: {
      tableNames: { QUEUE },
      tableNameToPartitionKey,
      tableNameToSortKey,
    },
  },
} = require("../../constants");
const delay = require("../../delay");
const updateDatabaseEntry = require("../../database/updateDatabaseEntry");
const obliterateOperationFromQueue = require("../obliterateOperationFromQueue");

const waitUntilOperationIsAllowedToBePerformed = require("./waitUntilOperationIsAllowedToBePerformed");
const beforeOperationEnsure = require("./beforeOperationEnsure");
const classicalUpdateDatabaseEntry = require("../../database/classicalUpdateDatabaseEntry");

const {
  constants: {
    TIMES: {
      EXPIRY_TIME_1,
      EXPIRY_TIME_2,
      QUEUE_ACTION_LATENCY_OFFSET_MARGIN,
      MINIMUM_QUEUE_ACTION_TIME,
    },
  },
} = require("../local");

// const EXPIRY_TIME_1 = 1000 * 10;
// const EXPIRY_TIME_2 = 1000 * 30;
// const QUEUE_ACTION_LATENCY_OFFSET_MARGIN = 150;
// const MINIMUM_QUEUE_ACTION_TIME = 50;

const {
  constants: { STATES },
} = require("../local");

/*
  Adjustments
    
    WHEN seeing if operations are still running it waits 100ms extra

*/

module.exports = async ({ queueId, operationId, operation }) => {
  console.log(
    "Running doOperationInQueueCore:",
    stringify({
      queueId,
      operationId,
    })
  );

  const queueEntry = {
    partitionKey: queueId,
    sortKey: operationId,
    expiry: Date.now() + EXPIRY_TIME_1 * 3,
    state: STATES.START,
  };

  await updateDatabaseEntry({
    tableName: QUEUE,
    entry: queueEntry,
    onlyAddDbEntryIfNotAlreadyExists: true,
    alwaysError: true,
  });

  const waitTimeout =
    Date.now() + EXPIRY_TIME_1 - QUEUE_ACTION_LATENCY_OFFSET_MARGIN;

  await waitUntilOperationIsAllowedToBePerformed({
    queueId,
    operationId,
    waitTimeout,
  });

  console.log(
    "doOperationInQueueCore: previous operations have finished " +
      "running operation"
  );

  let updateExpression = "";
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  const expiryTwo = Date.now() + EXPIRY_TIME_2;
  const expiryTwoKey = Date.now();

  updateExpression +=
    "SET #state = :state, " +
    "#expiryTwo = :expiryTwo, " +
    "#expiryTwoKey = :expiryTwoKey";
  expressionAttributeNames["#state"] = "state";
  expressionAttributeValues[":state"] = STATES.OPERATION;
  expressionAttributeNames["#expiryTwo"] = "expiryTwo";
  expressionAttributeValues[":expiryTwo"] = expiryTwo;
  expressionAttributeNames["#expiryTwoKey"] = "expiryTwoKey";
  expressionAttributeValues[":expiryTwoKey"] = expiryTwoKey;
  // expressionAttributeValues[":expiryTwo"] = Date.now() + EXPIRY_TIME_2;

  await classicalUpdateDatabaseEntry({
    tableName: QUEUE,
    key: tableNameToPartitionKey[QUEUE],
    sortKey: tableNameToSortKey[QUEUE],
    value: queueId,
    sortValue: operationId,
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  });

  await beforeOperationEnsure({
    queueId,
    operationId,
    expiryTwoKey,
  });

  try {
    // let hasNotPassedYet = false;

    const wrappedOperation = async () => {
      console.log("🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚");
      console.log(
        `🥚Doing Operation "${operationId}" in Queue "${queueId}" 🥚`
      );
      console.log("🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚");

      await operation();

      console.log("🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣");
      console.log(
        `🐣Doing Operation "${operationId}" in Queue "${queueId}" 🐣`
      );
      console.log("🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣");
      // hasNotPassedYet = true;
    };

    // const timeoutFunction = async () => {
    //   await delay(EXPIRY_TIME_2);

    //   if (hasNotPassedYet) {
    //     throw new Error("operation timeout error");
    //   }
    // };

    await Promise.all([
      delay(MINIMUM_QUEUE_ACTION_TIME),
      wrappedOperation(),
      // timeoutFunction(),
    ]);
  } catch (err) {
    console.log(
      "doOperationInQueueCore error: error in running operation:",
      err
    );

    throw err;
  }

  await obliterateOperationFromQueue({
    queueId,
    operationId,
  });

  const results = {};

  console.log(
    "doOperationInQueueCore executed successfully, here's the results:",
    stringify(results)
  );

  return results;
};

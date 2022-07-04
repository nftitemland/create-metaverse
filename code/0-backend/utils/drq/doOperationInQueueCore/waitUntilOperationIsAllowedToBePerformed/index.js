"use strict";

const stringify = require("../../../stringify");
// const {
//   aws: {
//     database: {
//       tableNames: { QUEUE },
//     },
//   },
// } = require("../../../constants");
const delay = require("../../../delay");
const getQueueOperations = require("./getQueueOperations");
const getOperationsStillRunning = require("./getOperationsStillRunning");

// const STAGES = {
//   START: "START",
//   OPERATION: "OPERATION",
//   END: "END",
// };
const GET_RETRY_TIME = 125;
const MAX_CONCURRENCY = 10;

module.exports = async ({ queueId, operationId, waitTimeout }) => {
  console.log(
    "Running waitUntilOperationIsAllowedToPerform:",
    stringify({
      queueId,
      operationId,
      waitTimeout,
    })
  );

  let numberOfOperationsRunning = 0;
  let nextAllowedGetTime = 0;

  do {
    if (Date.now() > waitTimeout) {
      throw new Error("operation timeout");
    }

    const timeUntilNextGet = nextAllowedGetTime - Date.now();

    if (timeUntilNextGet > 0) {
      console.info("waiting timeUntilNextGet:", timeUntilNextGet);
      await delay(timeUntilNextGet);
    }

    nextAllowedGetTime = Date.now() + GET_RETRY_TIME;

    const queueOperations = await getQueueOperations({
      queueId,
      operationId,
    });

    numberOfOperationsRunning = getOperationsStillRunning({
      queueOperations,
    });

    if (numberOfOperationsRunning > MAX_CONCURRENCY) {
      console.info(
        "waitUntilOperationIsAllowedToPerform error, " +
          "too many operations already running:",
        stringify({
          numberOfOperationsRunning,
        })
      );
      throw new Error("concurrency error");
    }
  } while (numberOfOperationsRunning > 0);

  const results = {};

  console.log(
    "waitUntilOperationIsAllowedToPerform executed successfully, " +
      "here's the results:",
    stringify(results)
  );

  return results;
};

"use strict";

const doOperationInQueueCore = require("./doOperationInQueueCore");
const obliterateOperationFromQueue = require("./obliterateOperationFromQueue");
const stringify = require("../stringify");

/*
  🐶DRQ by DogeDestiny
    limitation: millisecond precision
    assumes operation will be performed in 20 seconds or less    
*/

const drq = async ({ queueId, operation }) => {
  if (!queueId) {
    throw new Error("error in drq: missing queueId");
  } else if (!operation) {
    throw new Error("error in drq: missing operation");
  }

  const operationId = Date.now();
  //   const operationId = uuidv4();

  console.log(
    `🐸⏫Running doOperationInQueueCore: ${stringify({
      queueId,
      operationId,
    })}`
  );

  console.log("🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒");
  console.log(
    `🐴Running do Operation "${operationId}" in Queue "${queueId}" 🐴`
  );
  console.log("🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒");

  try {
    const doOperationInQueueCoreResults = await doOperationInQueueCore({
      queueId,
      operationId,
      operation,
    });

    console.log("🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓");
    console.log(
      `🦄Do Operation "${operationId}" ` +
        `in Queue "${queueId}" Executed Successfully🦄`
    );
    console.log("🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓");

    console.log(
      "🐸⏫doOperationInQueueCore executed successfully, " +
        "here's the results: " +
        stringify(doOperationInQueueCoreResults)
    );

    return doOperationInQueueCoreResults;
  } catch (err) {
    console.log("🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀");
    console.log(
      "🐺error in doOperationInQueue🐺:",
      `err: ${err} - \n`,
      `err message: ${err.message} - \n`,
      `operationId: "${operationId}"`
    );
    console.log("🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀");

    console.log(
      "obliterating operation from queue " +
        "and destroying the client before finally throwing the error"
    );

    try {
      await obliterateOperationFromQueue({
        queueId,
        operationId,
        error: err.message || "error",
      });
    } catch (innerError) {
      console.log(
        "obliterating operation from queue, very strange error:",
        innerError
      );
      console.log("throwing first error:", err);
    }

    throw err;
  }
};

drq.getQueueId = ({ name, id }) => {
  return `queue_id_${name}_${id}`;
};

module.exports = drq;

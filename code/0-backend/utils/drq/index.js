"use strict";

const doOperationInQueueCore = require("./doOperationInQueueCore");
const obliterateOperationFromQueue = require("./obliterateOperationFromQueue");
const stringify = require("../stringify");

/*
  πΆDRQ by DogeDestiny
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
    `πΈβ«Running doOperationInQueueCore: ${stringify({
      queueId,
      operationId,
    })}`
  );

  console.log("ππππππππππππππ");
  console.log(
    `π΄Running do Operation "${operationId}" in Queue "${queueId}" π΄`
  );
  console.log("ππππππππππππππ");

  try {
    const doOperationInQueueCoreResults = await doOperationInQueueCore({
      queueId,
      operationId,
      operation,
    });

    console.log("ππππππππππππππ");
    console.log(
      `π¦Do Operation "${operationId}" ` +
        `in Queue "${queueId}" Executed Successfullyπ¦`
    );
    console.log("ππππππππππππππ");

    console.log(
      "πΈβ«doOperationInQueueCore executed successfully, " +
        "here's the results: " +
        stringify(doOperationInQueueCoreResults)
    );

    return doOperationInQueueCoreResults;
  } catch (err) {
    console.log("π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦");
    console.log(
      "πΊerror in doOperationInQueueπΊ:",
      `err: ${err} - \n`,
      `err message: ${err.message} - \n`,
      `operationId: "${operationId}"`
    );
    console.log("π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦π¦");

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

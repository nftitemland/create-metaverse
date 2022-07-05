"use strict";

// const stringify = require("../../stringify");
// const {
//   aws: {
//     database: {
//       tableNames: { QUEUE },
//     },
//   },
// } = require("../../constants");

const {
  constants: { STATES, TIMES },
} = require("../../local");

module.exports = ({ queueOperations }) => {
  const numberOfOperationsRunning = queueOperations
    .map((operation) => {
      if (operation.state === STATES.END) {
        return false;
      } else if (operation.state === STATES.OPERATION) {
        if (
          Date.now() > operation.expiryTwo // + TIMES.QUEUE_ACTION_LATENCY_OFFSET_MARGIN
        ) {
          return false;
        }
      } else if (operation.state === STATES.START) {
        if (
          Date.now() > operation.expiry //+ TIMES.QUEUE_ACTION_LATENCY_OFFSET_MARGIN
        ) {
          return false;
        }
      } else {
        throw new Error(`invalid operation state: ${operation.state}`);
      }
      return operation;
    })
    .filter((operation) => !!operation).length;

  return numberOfOperationsRunning;
};

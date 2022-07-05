"use strict";

const updateDatabaseEntry = require("../database/updateDatabaseEntry");
const {
  aws: {
    database: {
      tableNames: { TRANSACTIONS },
    },
  },
} = require("../constants");
const stringify = require("../stringify");

module.exports = async ({ transactionToAdd, dryRun }) => {
  console.log(
    "Running addTransaction with the following values:",
    stringify({ transactionToAdd, dryRun })
  );

  if (dryRun) {
    console.log("addTransaction [DRY-RUN] mode, NOT adding transaction");

    const dryRunReport = {
      transactionToAdd,
    };

    console.log("addTransaction [DRY-RUN] Report", stringify(dryRunReport));

    console.log("addTransaction [DRY-RUN] executed successfully");
  } else {
    await updateDatabaseEntry({
      tableName: TRANSACTIONS,
      entry: transactionToAdd,
    });

    console.log("addTransaction executed successfully");
  }
};

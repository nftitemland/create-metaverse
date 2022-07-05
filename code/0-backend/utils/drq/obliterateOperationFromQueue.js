"use strict";

const stringify = require("../stringify");
const {
  aws: {
    database: {
      tableNames: { QUEUE },
      tableNameToPartitionKey,
      tableNameToSortKey,
    },
  },
} = require("../constants");
const classicalUpdateDatabaseEntry = require("../database/classicalUpdateDatabaseEntry");

const {
  constants: { STATES },
} = require("./local");

module.exports = async ({ queueId, operationId, error }) => {
  console.log(
    "Running obliterateOperationFromQueue:",
    stringify({
      queueId,
      operationId,
      error,
    })
  );

  let updateExpression = "SET ";
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  updateExpression += "#state = :state";
  expressionAttributeNames["#state"] = "state";
  expressionAttributeValues[":state"] = STATES.END;

  if (!!error) {
    updateExpression += ", #operationError = :operationError";
    expressionAttributeNames["#operationError"] = "operationError";
    expressionAttributeValues[":operationError"] = error;
  }

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

  console.log(
    "obliterateOperationFromQueue executed successfully, here's the results:",
    stringify({})
  );
};

"use strict";

const classicalUpdateDatabaseEntry = require("../database/classicalUpdateDatabaseEntry");
const {
  aws: {
    database: {
      tableNames: { USERS },
      tableNameToPartitionKey,
    },
  },
  users,
} = require("../constants");

const stringify = require("../stringify");

module.exports = async ({ address, txDbCache, dryRun }) => {
  console.log(
    "Running updateUser with the following values:",
    stringify({ address, txDbCache })
  );

  let updateExpression = "SET";

  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  updateExpression +=
    " #secondaryPartitionKey = :secondaryPartitionKey, " +
    "#secondarySortKey = :secondarySortKey, " +
    "#txDbCache = :txDbCache, " +
    "#visibilities = :visibilities";
  expressionAttributeNames["#secondaryPartitionKey"] = "secondaryPartitionKey";
  expressionAttributeNames["#secondarySortKey"] = "secondarySortKey";
  expressionAttributeNames["#txDbCache"] = "txDbCache";
  expressionAttributeNames["#visibilities"] = "visibilities";
  expressionAttributeValues[":secondaryPartitionKey"] =
    txDbCache.profileIsPublic
      ? users.visibilities.PUBLIC
      : users.visibilities.PRIVATE;
  expressionAttributeValues[":txDbCache"] = txDbCache;
  expressionAttributeValues[":visibilities"] = Object.assign(
    {},
    txDbCache.visibilities
  );
  expressionAttributeValues[":secondarySortKey"] = txDbCache.pixiePowder;

  if (dryRun) {
    console.log("updateUser [DRY-RUN] mode, NOT updating user");

    const dryRunReport = {
      value: address,
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    };

    console.log("updateUser [DRY-RUN] Report", stringify(dryRunReport));

    console.log("updateUser [DRY-RUN] executed successfully");
  } else {
    await classicalUpdateDatabaseEntry({
      tableName: USERS,
      key: tableNameToPartitionKey[USERS],
      value: address,
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    });

    console.log("updateUser executed successfully");
  }
};

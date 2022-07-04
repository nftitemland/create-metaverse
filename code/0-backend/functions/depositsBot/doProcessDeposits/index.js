"use strict";

const {
  stringify,
  database: { getDatabaseEntry, classicalUpdateDatabaseEntry },
  constants: {
    aws: {
      database: {
        pureMetadataKeys,
        tableNames: { METADATA },
        tableNameToPartitionKey,
      },
    },
  },
} = require("compute-utils");

const getAndProcessDepositBatch = require("./getAndProcessDepositBatch");

module.exports = async () => {
  console.log(
    "🐼📈running doProcessDeposits: " +
      stringify({
        time: new Date().toLocaleString(),
      })
  );

  const depositsBotData = await getDatabaseEntry({
    tableName: METADATA,
    value: pureMetadataKeys.depositsBotData,
  });

  if (
    !depositsBotData ||
    typeof depositsBotData.lastBlockScanned !== "number"
  ) {
    throw new Error(
      "doProcessDeposits safeguard error, " +
        "missing or invalid deposits bot data"
    );
  }

  // let currentIndex = 0;
  // let total;
  let lastBlockScanned = depositsBotData.lastBlockScanned;
  let cursor = null;

  do {
    const { newCursor, newLastBlockScanned } = await getAndProcessDepositBatch({
      lastBlockScanned,
      cursor,
    });

    cursor = newCursor;
    lastBlockScanned = newLastBlockScanned;
  } while (cursor != "" && cursor != null);

  const updateExpression = "SET #lastBlockScanned = :lastBlockScanned";

  const expressionAttributeNames = {
    "#lastBlockScanned": "lastBlockScanned",
  };

  const expressionAttributeValues = {
    ":lastBlockScanned": lastBlockScanned,
  };

  await classicalUpdateDatabaseEntry({
    tableName: METADATA,
    key: tableNameToPartitionKey[METADATA],
    value: pureMetadataKeys.depositsBotData,
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  });

  const responseValues = {};

  console.log(
    "doProcessDeposits executed successfully " +
      "returning values: " +
      stringify(responseValues)
  );
};

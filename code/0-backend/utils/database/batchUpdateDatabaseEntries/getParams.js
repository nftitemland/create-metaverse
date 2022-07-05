"use strict";

const stringify = require("../../stringify");

module.exports = Object.freeze(({ tableName, entries }) => {
  console.log(
    "running batchUpdateDatabaseEntries.getParams " +
      "with the following values: " +
      stringify({ tableName, entries })
  );

  const putCommands = [];

  for (const entry of entries) {
    putCommands.push({ PutRequest: { Item: entry } });
  }

  const params = { RequestItems: { [tableName]: putCommands } };

  console.log(
    "batchUpdateDatabaseEntries.getParams executed successfully " +
      `returning params: ${stringify(params)}`
  );

  return params;
});

"use strict";

const { database } = require("../aws");

const stringify = require("../stringify");

const {
  aws: {
    database: { tableNameToPartitionKey, tableNameToSortKey },
  },
} = require("../constants");

module.exports = ({ tableName, value, sortValue, key, sortKey }) => {
  key = key || tableNameToPartitionKey[tableName];

  const TableName = tableName;

  const Key = {
    [key]: value,
  };

  if (sortValue) {
    sortKey = sortKey || tableNameToSortKey[tableName];

    Key[sortKey] = sortValue;
  }

  const params = {
    Key,
    TableName,
  };

  console.log(
    "Running database.removeDatabaseEntry with the following values: " +
      stringify(Object.keys(params))
  );

  return new Promise((resolve, reject) =>
    database.delete(params, (err, data) => {
      if (err) {
        console.log(
          "Error in database.removeDatabaseEntry",
          "with the following values:",
          stringify(params)
        );

        return reject(err);
      }

      console.log(
        "database.removeDatabaseEntry successfully executed",
        `result data from AWS: ${stringify(data)}`
      );

      resolve();
    })
  );
};

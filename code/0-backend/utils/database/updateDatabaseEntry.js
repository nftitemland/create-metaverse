"use strict";

const { database } = require("../aws");

const stringify = require("../stringify");

const UPDATE_CONDITION_FAILED_ERROR_CODE = "ConditionalCheckFailedException";

module.exports = Object.freeze(
  ({
    tableName,
    entry,
    onlyAddDbEntryIfNotAlreadyExists = false,
    alwaysError = false,
    quietUpdate = false,
  }) => {
    const TableName = tableName;
    const Item = Object.assign(entry, {
      lastUpdated: Date.now(),
    });

    const params = {
      TableName,
      Item,
    };
    if (onlyAddDbEntryIfNotAlreadyExists) {
      params.ConditionExpression = "attribute_not_exists(partitionKey)";
    }
    // ConditionExpression: "attribute_not_exists(id)",
    console.log(
      "Running database.updateDatabaseEntry with the following values: " +
        (quietUpdate ? stringify(Object.keys(params)) : stringify(params))
    );

    return new Promise((resolve, reject) =>
      database.put(params, (err, data) => {
        if (!!err) {
          if (!alwaysError && err.code === UPDATE_CONDITION_FAILED_ERROR_CODE) {
            console.log(
              "[NO-OP] database.updateDatabaseEntry " +
                "successfully executed NO-OP, database entry not put"
            );
            return resolve();
          }
          console.log(
            "Error in database.updateDatabaseEntry " +
              "with the following values: " +
              stringify(params)
          );
          return reject(err);
        }

        console.log("database.updateDatabaseEntry successfully executed");

        resolve(data);
      })
    );
  }
);

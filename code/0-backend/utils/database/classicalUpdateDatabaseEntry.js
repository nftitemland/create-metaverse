"use strict";

const { database } = require("../aws");

const stringify = require("../stringify");

module.exports = Object.freeze(
  ({
    tableName,
    key,
    value,
    sortKey,
    sortValue,
    updateExpression = "",
    conditionExpression,
    expressionAttributeNames = {},
    expressionAttributeValues = {},
    returnConsumedCapacity,
    returnItemCollectionMetrics,
    returnValues,
    refreshLastUpdated = true,
    doNotErrorOnConditionalFail = false,
  }) => {
    const TableName = tableName;

    const Key = {
      [key]: value,
    };

    if (!!sortKey && sortValue !== undefined) {
      Key[sortKey] = sortValue;
    }

    const params = {
      TableName,
      Key,
      UpdateExpression: updateExpression, //'STRING_VALUE'
      ConditionExpression: conditionExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnConsumedCapacity: returnConsumedCapacity, //INDEXES | TOTAL | NONE,
      ReturnItemCollectionMetrics: returnItemCollectionMetrics, //SIZE | NONE,
      ReturnValues: returnValues, // NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW,
    };

    if (refreshLastUpdated) {
      params.ExpressionAttributeNames["#lastUpdated"] = "lastUpdated";
      params.ExpressionAttributeValues[":lastUpdated"] = Date.now();
      params.UpdateExpression += ", #lastUpdated = :lastUpdated";
    }
    /*
      expressionAttributeNames: {
          '#lastUpdated': 'lastUpdated',
      },
      expressionAttributeValues: {
          ':lastUpdated':  Date.now(),
      },
      updateExpression: (
          'SET #lastUpdated :lastUpdated'
      ),
    */
    console.log(
      "Running database.classicalUpdateDatabaseEntry " +
        "with the following values: " +
        stringify(params)
    );

    return new Promise((resolve, reject) =>
      database.update(params, (err, data) => {
        if (!!err) {
          console.log(
            "Error in database.classicalUpdateDatabaseEntry:",
            err.message
          );

          if (
            doNotErrorOnConditionalFail &&
            (err.code === "ConditionalCheckFailedException" ||
              err.message.includes("conditional request failed"))
          ) {
            console.log(
              "[NO-OP] database.classicalUpdateDatabaseEntry " +
                "successfully executed. " +
                "Bypass error is " +
                "ConditionalCheckFailedException, NO-OP: " +
                `here is the return data: ${stringify({})}`
            );

            return resolve({});
          }

          return reject(err);
        }

        console.log(
          "database.classicalUpdateDatabaseEntry " +
            "successfully executed: " +
            `here is the AWS return data: ${stringify(data)}`
        );

        resolve(data);
      })
    );
  }
);

"use strict";

// const {

//     aws: {
//         database: {
//             tableNames:
//         }
//     }

// } = require( '../constants' );
const { database } = require("../aws");

const stringify = require("../stringify");

const scanDatabase = ({
  tableName,
  exclusiveStartKey,
  expressionAttributeNames,
  expressionAttributeValues,
  filterExpression,
  indexName,
  limit,
  projectionExpression,
}) => {
  console.log(
    "Running scanDatabase with the following values: " +
      stringify({
        tableName,
        exclusiveStartKey,
        expressionAttributeNames,
        expressionAttributeValues,
        filterExpression,
        indexName,
        limit,
        projectionExpression,
      })
  );

  return new Promise((resolve, reject) =>
    database.scan(
      {
        TableName: tableName,
        // ConsistentRead: true || false,
        ExclusiveStartKey: exclusiveStartKey,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        FilterExpression: filterExpression,
        IndexName: indexName,
        Limit: limit,
        ProjectionExpression: projectionExpression,
        // ReturnConsumedCapacity: returnConsumedCapacity,
        // ScanFilter: {
        //   "<AttributeName>": {
        //     ComparisonOperator:
        //       EQ |
        //       NE |
        //       IN |
        //       LE |
        //       LT |
        //       GE |
        //       GT |
        //       BETWEEN |
        //       NOT_NULL |
        //       NULL |
        //       CONTAINS |
        //       NOT_CONTAINS |
        //       BEGINS_WITH /* required */,
        //     AttributeValueList: [
        //       someValue /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */,
        //       /* more items */
        //     ],
        //   },
        //   /* '<AttributeName>': ... */
        // },
        // Segment: "NUMBER_VALUE",
        // Select:
        //   ALL_ATTRIBUTES |
        //   ALL_PROJECTED_ATTRIBUTES |
        //   SPECIFIC_ATTRIBUTES |
        //   COUNT,
        // TotalSegments: "NUMBER_VALUE",
      },
      (err, data = {}) => {
        if (!!err) {
          console.log("Error in scanDatabase:", err);

          return reject(err);
        }

        const results = (!!data.Items && data.Items) || [];

        const ultimateResults = results.slice();

        if (!!data && !!data.LastEvaluatedKey) {
          const paginationValue = Object.assign({}, data.LastEvaluatedKey);

          console.log(
            "scanDatabase: " +
              "the limit has been hit, returning the super response -- " +
              `pagination value: ${stringify(paginationValue)}`
          );

          return resolve({
            ultimateResults,
            paginationValue,
          });
        }

        console.log(
          "scanDatabase successfully executed, " +
            `retrieved ${ultimateResults.length} results`
        );

        resolve({
          ultimateResults,
          paginationValue: null,
        });
      }
    )
  );
};

module.exports = scanDatabase;

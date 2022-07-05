"use strict";

const { database } = require("../../aws");

const stringify = require("../../stringify");
const getParams = require("./getParams");

// const UPDATE_CONDITION_FAILED_ERROR_CODE = "ConditionalCheckFailedException";

module.exports = Object.freeze(
  ({ tableName, entries }) => {
    const TableName = tableName;
    const Item = Object.assign(entry, {
      lastUpdated: Date.now(),
    });

    const params = getParams()
    if (onlyAddDbEntryIfNotAlreadyExists) {
      params.ConditionExpression = "attribute_not_exists(partitionKey)";
    }
    // ConditionExpression: "attribute_not_exists(id)",
    console.log(
      "Running batchUpdateDatabaseEntries " +
        "with the following values: " +
        stringify(params)
    );

    return new Promise((resolve, reject) =>
      database.batchWriteItem({
  RequestItems: { /* required */
    '<TableName>': [
      {
        DeleteRequest: {
          Key: { /* required */
            '<AttributeName>': { /* AttributeValue */
              B: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
              BOOL: true || false,
              BS: [
                Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
                /* more items */
              ],
              L: [
                /* recursive AttributeValue */,
                /* more items */
              ],
              M: {
                '<AttributeName>': /* recursive AttributeValue */,
                /* '<AttributeName>': ... */
              },
              N: 'STRING_VALUE',
              NS: [
                'STRING_VALUE',
                /* more items */
              ],
              NULL: true || false,
              S: 'STRING_VALUE',
              SS: [
                'STRING_VALUE',
                /* more items */
              ]
            },
            /* '<AttributeName>': ... */
          }
        },
        PutRequest: {
          Item: { /* required */
            '<AttributeName>': { /* AttributeValue */
              B: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
              BOOL: true || false,
              BS: [
                Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
                /* more items */
              ],
              L: [
                /* recursive AttributeValue */,
                /* more items */
              ],
              M: {
                '<AttributeName>': /* recursive AttributeValue */,
                /* '<AttributeName>': ... */
              },
              N: 'STRING_VALUE',
              NS: [
                'STRING_VALUE',
                /* more items */
              ],
              NULL: true || false,
              S: 'STRING_VALUE',
              SS: [
                'STRING_VALUE',
                /* more items */
              ]
            },
            /* '<AttributeName>': ... */
          }
        }
      },
      /* more items */
    ],
    /* '<TableName>': ... */
  },
  ReturnConsumedCapacity: INDEXES | TOTAL | NONE,
  ReturnItemCollectionMetrics: SIZE | NONE
}, (err, data) => {
        if (!!err) {
          if (err.code === UPDATE_CONDITION_FAILED_ERROR_CODE) {
            console.log(
              "[NO-OP] database.updateDatabaseEntry " +
                "successfully executed NO-OP, database entry not put"
            );
            return resolve();
          }
          console.log(
            "Error in batchUpdateDatabaseEntries " +
              "with the following values: " +
              stringify(params)
          );
          return reject(err);
        }

        console.log("batchUpdateDatabaseEntries successfully executed");

        resolve(data);
      })
    );
  }
);

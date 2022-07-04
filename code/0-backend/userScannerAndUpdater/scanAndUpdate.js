"use strict";

const {
  delay,
  runFunctionRecursively,
  stringify,
  database: { getDatabaseEntry, scanDatabase, classicalUpdateDatabaseEntry },
  constants: {
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNames: { ASSETS, USERS },
        assetsMetadataKeys: { metadata_userScannerAndUpdaterData },
      },
    },
    // transactions: {
    //   types: { ADD_MESSAGE_PUBLIC },
    // },
  },
  javascript: { waitUntilNextDayTime },
  // delay,
  // addTransactionAndUpdateUser,
} = require("compute-utils");
const { argv } = require("yargs");

const updateUser = require("./updateUser");

const USERS_SCANNER_AND_UPDATER = "USERS_SCANNER_AND_UPDATER";

const SEARCH_LIMIT = 25;

const adminUserOnly = argv.adminUserOnly;

const mainFunction = async () => {
  console.log(
    "🐼📈running scanAndUpdate Iteration: " +
      stringify({
        time: new Date().toLocaleString(),
        adminUserOnly,
      })
  );

  let innerIterationCount = 0;
  let paginationValue;

  do {
    console.log(
      "🐼📈running scanAndUpdate inner Iteration: " +
        stringify({
          time: new Date().toLocaleString(),
          innerIterationCount,
        })
    );

    const userScannerDbMetadata = await getDatabaseEntry({
      tableName: ASSETS,
      value: metadata_userScannerAndUpdaterData,
    });

    if (!userScannerDbMetadata) {
      throw new Error("safeguard error: scanAndUpdate not set up");
    }

    paginationValue = userScannerDbMetadata.paginationValue || undefined;

    const scanResults = argv.adminUserOnly
      ? {
          ultimateResults: [
            {
              partitionKey: "0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474",
            },
          ],
          paginationValue: null,
        }
      : await scanDatabase({
          // const { ultimateResults, paginationValue } = await scanDatabase({
          tableName: USERS,
          // expressionAttributeNames,
          // expressionAttributeValues,
          // filterExpression,
          // indexName,
          limit: SEARCH_LIMIT,
          // projectionExpression,
          exclusiveStartKey: paginationValue,
        });

    const ultimateResults = scanResults.ultimateResults;
    paginationValue = scanResults.paginationValue;

    // const responseValues = {};

    // if (ultimateResults.length < 1) {
    //   responseValues.NO_OP = true;
    //   console.log(
    //     "🦩scanAndUpdate [NO-OP], no user found, [NO-OP]: " +
    //       stringify(responseValues)
    //   );
    //   // return responseValues;
    // } else if (ultimateResults.length > 1) {
    //   throw new Error(
    //     "scanAndUpdate safeguard error: " +
    //       "scanAndUpdate error: multiple users found"
    //   );
    // } else {

    for (const user of ultimateResults) {
      await updateUser({
        user,
      });
    }

    await classicalUpdateDatabaseEntry({
      tableName: ASSETS,
      key: tableNameToPartitionKey[ASSETS],
      value: metadata_userScannerAndUpdaterData,
      updateExpression: "SET #paginationValue = :paginationValue",
      expressionAttributeNames: {
        "#paginationValue": "paginationValue",
      },
      expressionAttributeValues: {
        ":paginationValue": paginationValue,
      },
    });

    innerIterationCount++;
    await delay(3250);
    // await delay(250);
  } while (paginationValue);

  console.log("done iteration cycle:", new Date().toLocaleString());
  console.log("🐼📈scanAndUpdate executes successfully" + stringify({}));
  console.log(
    "🦩scanAndUpdate executed successfully, " +
      "returning values: " +
      stringify({})
  );
};

module.exports = async () => {
  await runFunctionRecursively({
    serviceName: USERS_SCANNER_AND_UPDATER,
    mainFunction: async () => {
      if (argv.startWait) {
        argv.startWait = null;

        await waitUntilNextDayTime(1, 5);
      }

      await mainFunction();

      await waitUntilNextDayTime(1, 5);
    },
    // retryTimeInSeconds: 60 * 60 * 4,
    retryTimeInSeconds: 60,
  });
};

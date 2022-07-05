"use strict";

const searchDatabase = require("../../database/searchDatabase");
const processTransaction = require("./processTransaction");
const {
  aws: {
    database: {
      tableNames: { TRANSACTIONS },
      secondaryIndices: { partitionKeySecondarySortKeyIndex },
    },
  },
  // transactions: {
  //   types: { SWITCH_PROFILE_IS_PUBLIC, SWITCH_PROFILE_ATTRIBUTE_VISIBLE },
  // },
} = require("../../constants");
const stringify = require("../../stringify");

const SEARCH_LIMIT = 250;

const processTransactions = ({ transactions, txDbCache }) => {
  for (const transaction of transactions) {
    processTransaction({
      transaction,
      txDbCache,
    });
  }
};

const getInitialPaginationValueToUse = ({ fullRefresh, txDbCache }) => {
  if (fullRefresh || !txDbCache.paginationValue) {
    return null;
  }

  return txDbCache.paginationValue;
};

const extractDataCore = async ({ address, txDbCache, fullRefresh }) => {
  let paginationValueToUse = getInitialPaginationValueToUse({
    fullRefresh,
    txDbCache,
  });
  let iterationCount = 0;

  do {
    console.log(
      "extractDataCore: extractDataFromTxs searching TXs " +
        "with the following values: " +
        stringify({
          iterationCount,
          paginationValueToUse,
        })
    );

    iterationCount++;

    const searchDbResults = await searchDatabase({
      searchParams: {
        TableName: TRANSACTIONS,
        IndexName: partitionKeySecondarySortKeyIndex,
        Limit: SEARCH_LIMIT,
        ScanIndexForward: true,
        KeyConditionExpression: `#partitionKey = :partitionKey`,
        ExpressionAttributeNames: {
          "#partitionKey": "partitionKey",
        },
        ExpressionAttributeValues: {
          ":partitionKey": address,
        },
        ExclusiveStartKey: paginationValueToUse || undefined,
      },
    });

    processTransactions({
      transactions: searchDbResults.ultimateResults,
      txDbCache: txDbCache,
    });

    if (searchDbResults.paginationValue) {
      paginationValueToUse = searchDbResults.paginationValue;
    } else {
      paginationValueToUse = null;

      // txDbCache.paginationValue = {
      //   partitionKey: address,
      //   sortKey: address,
      // };
    }
  } while (paginationValueToUse);
};

module.exports = async ({
  address,
  txDbCache,
  transactionToAdd,
  searchRefresh,
  fullRefresh,
}) => {
  console.log(
    "Running extractDataFromTxs with the following values:",
    stringify({
      address,
      txDbCache,
      transactionToAdd,
      searchRefresh,
      fullRefresh,
    })
  );

  if (searchRefresh || fullRefresh) {
    await extractDataCore({
      address,
      txDbCache,
      fullRefresh,
    });
  }

  processTransaction({
    transaction: transactionToAdd,
    txDbCache,
  });

  console.log("extractDataFromTxs executed successfully");
};

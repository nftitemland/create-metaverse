"use strict";

const {
  stringify,
  database: { searchDatabase },
  encryption: { encrypt },
  constants: {
    environment: { isProductionMode },
    misc: { POI_SEPARATOR },
    aws: {
      database: {
        tableNames: { TRANSACTIONS },
        secondaryIndices: { partitionKeySecondarySortKeyIndex },
      },
    },
    transactions: {
      types: {
        BATTLE_V1,
        BATTLE_V1_REWARDS,
        BATTLE_V1_FIELD_REWARD,
        WITHDRAW_REQUEST,
        WITHDRAW_PENDING,
        WITHDRAW_SUCCESSFUL,
        DEPOSIT_V1,
        BATTLE_V2,
      },
    },
    encryptionKeys: { POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1 },
  },
} = require("compute-utils");
const getProcessedTransactions = require("./getProcessedTransactions");

const SEARCH_LIMIT = 100;
const BATCH_AMOUNT = isProductionMode ? 25 : 5;

module.exports = async ({ address, pag }) => {
  console.log(
    "running getTransactions " +
      "with the following values: " +
      stringify({
        address,
        pag,
      })
  );

  const transactions = [];

  let paginationValueToUse = pag;

  do {
    const searchResults = await searchDatabase({
      searchParams: {
        TableName: TRANSACTIONS,
        IndexName: partitionKeySecondarySortKeyIndex,
        Limit: SEARCH_LIMIT,
        ScanIndexForward: false,
        KeyConditionExpression: `#partitionKey = :partitionKey`,
        FilterExpression:
          "#type = :typeA or #type = :typeB or #type = :typeC or #type = :typeD or #type = :typeE or #type = :typeF or #type = :typeG or #type = :typeH",
        ExpressionAttributeNames: {
          "#partitionKey": "partitionKey",
          "#type": "type",
        },
        ExpressionAttributeValues: {
          ":partitionKey": address,
          ":typeA": BATTLE_V1,
          ":typeB": BATTLE_V1_REWARDS,
          ":typeC": BATTLE_V1_FIELD_REWARD,
          ":typeD": WITHDRAW_REQUEST,
          ":typeE": WITHDRAW_PENDING,
          ":typeF": WITHDRAW_SUCCESSFUL,
          ":typeG": DEPOSIT_V1,
          ":typeH": BATTLE_V2,
        },
        ExclusiveStartKey: paginationValueToUse,
      },
    });

    const txs = searchResults.ultimateResults;

    for (const tx of txs) {
      transactions.push(tx);
    }

    paginationValueToUse = searchResults.paginationValue;
  } while (paginationValueToUse && transactions.length < BATCH_AMOUNT);

  if (transactions.length > BATCH_AMOUNT) {
    transactions.length = BATCH_AMOUNT;
  }

  const processedTransactions = getProcessedTransactions({
    address,
    transactions,
  });

  const results = {
    transactions: processedTransactions,
  };

  if (processedTransactions.length === BATCH_AMOUNT) {
    const lastTransaction = transactions[transactions.length - 1];

    const rawPag = {
      partitionKey: lastTransaction.partitionKey,
      sortKey: lastTransaction.sortKey,
      secondarySortKey: lastTransaction.secondarySortKey,
    };

    const { encryptedText, iv } = encrypt(
      JSON.stringify(rawPag),
      POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1
    );

    const pagKey = `${encryptedText}${POI_SEPARATOR}${iv.toString("base64")}`;

    results.pag = pagKey;
  } else {
    results.pag = null;
  }

  console.log(
    "getTransactions executed successfully, " +
      `obtained ${processedTransactions.length} transactions, ` +
      `pag=${stringify(paginationValueToUse)}`
  );

  return results;
};

"use strict";

const {
  stringify,
  database: { searchDatabase },
  encryption: { encrypt },
  constants: {
    misc: { POI_SEPARATOR },
    aws: {
      database: {
        tableNames: { TRANSACTIONS },
        secondaryIndices: { typeSecondarySortKey },
      },
    },
    transactions: {
      types: { ADD_MESSAGE_PUBLIC },
    },
    encryptionKeys: { POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1 },
    environment: { isProductionMode },
  },
  // addTransactionAndUpdateUser,
} = require("compute-utils");

// const updateMiniGame = require("./updateMiniGame");

// const SEARCH_LIMIT = 10;
const SEARCH_LIMIT = isProductionMode ? 50 : 10;

module.exports = async ({ startTime, endTime, pag }) => {
  console.log(
    "🐝running getMessages with the following values:",
    stringify({ startTime, endTime, pag })
  );

  const searchDbResults = await searchDatabase({
    searchParams: {
      TableName: TRANSACTIONS,
      IndexName: typeSecondarySortKey,
      Limit: SEARCH_LIMIT,
      ScanIndexForward: false,
      KeyConditionExpression:
        `#type = :type and ` +
        "#secondarySortKey BETWEEN :startTime AND :endTime",
      ExpressionAttributeNames: {
        "#type": "type",
        "#secondarySortKey": "secondarySortKey",
      },
      ExpressionAttributeValues: {
        ":type": ADD_MESSAGE_PUBLIC,
        ":startTime": startTime,
        ":endTime": endTime,
      },
      ExclusiveStartKey: pag,
    },
  });

  const messages = searchDbResults.ultimateResults.map((message) => {
    return {
      message: message.value,
      time: message.secondarySortKey,
      id: message.sortKey,
    };
  });

  const responseValues = {
    messages,
  };

  if (!!searchDbResults.paginationValue) {
    const { encryptedText, iv } = encrypt(
      searchDbResults.paginationValue.partitionKey,
      POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1
    );

    responseValues.pag = {
      powerMagna: `${encryptedText}${POI_SEPARATOR}${iv.toString("base64")}`,
      id: searchDbResults.paginationValue.sortKey,
      time: searchDbResults.paginationValue.secondarySortKey,
    };
  } else {
    responseValues.pag = null;
  }

  console.log(
    "🐝getMessages executed successfully, " +
      "returning values: " +
      stringify(Object.keys(responseValues))
  );

  return responseValues;
};

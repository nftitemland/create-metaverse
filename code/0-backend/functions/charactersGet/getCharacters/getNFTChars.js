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
        tableNames: { ASSETS },
        secondaryIndices: { ownerAddressIndex },
      },
    },
    encryptionKeys: { POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1 },
  },
} = require("compute-utils");

const SEARCH_LIMIT = isProductionMode ? 25 : 2;

module.exports = async ({ address, pag, assetsPrefix, characterType }) => {
  console.log(
    "💁‍♀️running getNFTChars with the following values:",
    stringify({ address, assetsPrefix, pag })
  );

  const responseValues = {
    characters: [],
    pag: null,
  };

  const ownerAddress = `${assetsPrefix}${address}`;

  const searchDbResults = await searchDatabase({
    searchParams: {
      TableName: ASSETS,
      IndexName: ownerAddressIndex,
      Limit: SEARCH_LIMIT,
      KeyConditionExpression: `#ownerAddress = :ownerAddress`,
      ExpressionAttributeNames: {
        "#ownerAddress": "ownerAddress",
      },
      ExpressionAttributeValues: {
        ":ownerAddress": ownerAddress,
      },
      ExclusiveStartKey: pag,
    },
  });

  const characters = searchDbResults.ultimateResults.map((asset) => {
    const splitPartitionKey = asset.partitionKey.split("_");

    const character = {
      type: characterType,
      id: Number(splitPartitionKey[splitPartitionKey.length - 1]),
    };

    return character;
  });

  responseValues.characters.push(...characters);

  if (searchDbResults.paginationValue) {
    const { encryptedText, iv } = encrypt(
      Buffer.from(JSON.stringify(searchDbResults.paginationValue)).toString(
        "base64"
      ),
      // JSON.stringify(searchDbResults.paginationValue),
      POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1
    );

    const pagKey = `${encryptedText}${POI_SEPARATOR}${iv.toString("base64")}`;

    responseValues.pag = Buffer.from(JSON.stringify(pagKey)).toString("base64");
  }

  console.log(
    "💁‍♀️getNFTChars executed successfully, " +
      "returning values: " +
      stringify(Object.keys(responseValues))
  );

  return responseValues;
};

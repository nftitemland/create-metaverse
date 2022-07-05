"use strict";

const {
  aws: {
    database: {
      tableNames: { ASSETS },
      tableNameToPartitionKey,
    },
  },
} = require("../constants");
const getNftPartitionKey = require("../javascript/getNftPartitionKey");
const classicalUpdateDatabaseEntry = require("../database/classicalUpdateDatabaseEntry");

const ethUtil = require("ethereumjs-util");

const updateDbAsset = async ({
  assetPrefix,
  address,
  tokenId,
  tokenAddress,
}) => {
  const updateExpression = "SET #ownerAddress = :ownerAddress";

  const expressionAttributeNames = {
    "#ownerAddress": "ownerAddress",
  };

  const ownerAddress = assetPrefix + ethUtil.toChecksumAddress(address);

  const expressionAttributeValues = {
    ":ownerAddress": ownerAddress,
  };

  const conditionExpression = "#ownerAddress <> :ownerAddress";

  await classicalUpdateDatabaseEntry({
    tableName: ASSETS,
    key: tableNameToPartitionKey[ASSETS],
    value: getNftPartitionKey({ tokenId, tokenAddress }),
    conditionExpression,
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
    doNotErrorOnConditionalFail: true,
  });
};

module.exports = updateDbAsset;

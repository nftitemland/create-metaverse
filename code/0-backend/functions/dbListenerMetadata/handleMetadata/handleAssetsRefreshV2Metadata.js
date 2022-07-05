"use strict";

const axios = require("axios");

const {
  stringify,
  database: { classicalUpdateDatabaseEntry, removeDatabaseEntry },
  constants: {
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNames: { METADATA },
      },
    },
  },
  assets: { updateDbAsset },
  delay,
} = require("compute-utils");

const BASE_URL = `https://deep-index.moralis.io/api/v2`;
const MORALIS_X_API_KEY = process.env.MORALIS_X_API_KEY;
const SYNCED = "SYNCED";

module.exports = async ({ metadata }) => {
  console.log(
    "🐸🥊running handleAssetsRefreshV2Metadata with the following values:" +
      stringify({
        metadata,
      })
  );

  if (!MORALIS_X_API_KEY) {
    throw new Error(
      "handleAssetsRefreshV2Metadata: setup error: missing MORALIS_X_API_KEY"
    );
  }

  const chain = metadata.chain;

  const params = {
    chain,
    format: "decimal",
    limit: metadata.limit,
    cursor: metadata.cursor,
  };

  const assetPrefix = metadata.assetPrefix;
  const tokenAddress = metadata.tokenAddress;

  const querystring = new URLSearchParams(params).toString();

  const results = await axios({
    method: "GET",
    url: `${BASE_URL}/nft/${tokenAddress}/owners` + `?${querystring}`,
    headers: {
      "X-API-Key": MORALIS_X_API_KEY,
    },
  });

  const nftData = results.data;

  console.log(
    `Got page ${nftData.page} of ${Math.ceil(
      nftData.total / nftData.page_size
    )}, ${nftData.total} total`
  );

  if (nftData.status === SYNCED) {
    nftData.result.sort((datumA, datumB) => {
      return Number(datumA.token_id) - Number(datumB.token_id);
    });

    for (const result of nftData.result) {
      await updateDbAsset({
        assetPrefix,
        address: result.owner_of,
        tokenId: result.token_id,
        tokenAddress,
      });

      if (Math.abs(2) === 1 + 1) {
        await delay(2500);
      }
    }
  }

  if (nftData.cursor) {
    console.log("cursor exists, going to db metadata listener again");

    const updateExpression = "SET #cursor = :cursor";

    const expressionAttributeNames = {
      "#cursor": "cursor",
    };

    const expressionAttributeValues = {
      ":cursor": nftData.cursor || null,
    };

    await classicalUpdateDatabaseEntry({
      tableName: METADATA,
      key: tableNameToPartitionKey[METADATA],
      value: metadata.partitionKey,
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    });
  } else {
    console.log(
      "cursor does not exist, " + "removing db metadata listener updater entry"
    );

    await removeDatabaseEntry({
      tableName: METADATA,
      value: metadata.partitionKey,
    });
  }

  console.log("handleAssetsRefreshV2Metadata executed successfully");
};

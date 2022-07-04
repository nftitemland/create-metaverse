"use strict";

// const ethUtil = require("ethereumjs-util");
const axios = require("axios");
const {
  stringify,
  database: { updateDatabaseEntry },
  constants: {
    aws: {
      database: {
        tableNames: { METADATA },
        // tableNameToPartitionKey,
      },
    },
    transactions: {
      types: { ASSETS_REFRESH_V2 },
    },
  },
  delay,
  // javascript: { getNftPartitionKey },
  assets: { updateDbAsset },
} = require("compute-utils");

const SYNCED = "SYNCED";
// const PAGE_SIZE = 90;
// const PAGE_SIZE = 35;
const PAGE_SIZE = 35;

const BASE_URL = `https://deep-index.moralis.io/api/v2`;
const MORALIS_X_API_KEY = process.env.MORALIS_X_API_KEY;
if (!MORALIS_X_API_KEY) {
  throw new Error("getUserNfts: setup error: missing MORALIS_X_API_KEY");
}

module.exports = async ({ chain, tokenAddress, assetPrefix }) => {
  console.log(
    "running refreshAssetsCore with the following values:",
    stringify({ chain, tokenAddress, assetPrefix })
  );

  const params = {
    chain,
    format: "decimal",
    limit: PAGE_SIZE,
  };

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
        await delay(3000);
      }
    }
  }

  if (nftData.cursor) {
    console.log("cursor exists, going to db metadata listener");

    const partitionKey = `assets_refresh_${tokenAddress}_${Date.now()}`;

    await updateDatabaseEntry({
      tableName: METADATA,
      entry: {
        partitionKey,
        type: ASSETS_REFRESH_V2,
        cursor: nftData.cursor,
        tokenAddress,
        assetPrefix,
        chain,
        limit: PAGE_SIZE,
      },
      // onlyAddDbEntryIfNotAlreadyExists: true,
    });
  }

  console.log("refreshAssetsCore executed successfully:", stringify({}));
};

"use strict";

const ethUtil = require("ethereumjs-util");
const axios = require("axios");
const {
  stringify,
  database: { classicalUpdateDatabaseEntry },
  constants: {
    aws: {
      database: {
        tableNames: { ASSETS },
        tableNameToPartitionKey,
      },
    },
  },
  delay,
  javascript: { getNftPartitionKey },
} = require("compute-utils");

const SYNCED = "SYNCED";
const PAGE_SIZE = 90;

const BASE_URL = `https://deep-index.moralis.io/api/v2`;
const MORALIS_X_API_KEY = process.env.MORALIS_X_API_KEY;

if (!MORALIS_X_API_KEY) {
  throw new Error("getUserNfts: setup error: missing MORALIS_X_API_KEY");
}

module.exports = async ({ chain, tokenAddress, ownerAddressPrefix }) => {
  console.log(
    "running refreshAssetsCore with the following values:",
    stringify({ chain, tokenAddress, ownerAddressPrefix })
  );

  let cursor = null;

  do {
    const params = {
      chain: "polygon",
      format: "decimal",
      limit: PAGE_SIZE,
    };

    if (cursor) {
      params.cursor = cursor;
    }

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
        const updateExpression = "SET #ownerAddress = :ownerAddress";

        const expressionAttributeNames = {
          "#ownerAddress": "ownerAddress",
        };

        const ownerAddress =
          ownerAddressPrefix + ethUtil.toChecksumAddress(result.owner_of);

        const expressionAttributeValues = {
          ":ownerAddress": ownerAddress,
        };

        const conditionExpression = "#ownerAddress <> :ownerAddress";

        await classicalUpdateDatabaseEntry({
          tableName: ASSETS,
          key: tableNameToPartitionKey[ASSETS],
          value: getNftPartitionKey({ tokenId: result.token_id, tokenAddress }),
          // value: Number(result.token_id),
          // sortKey: tableNameToSortKey[NFTMINE],
          // sortValue: transactionId,
          conditionExpression,
          updateExpression,
          expressionAttributeNames,
          expressionAttributeValues,
          doNotErrorOnConditionalFail: true,
        });

        if (Math.abs(2) === 1 + 1) {
          await delay(2500);
          // if (2 === 2) {
          //   await delay(10000);
        }
      }
    } else {
      throw new Error("Moralis not synced");
    }

    cursor = nftData.cursor;
  } while (cursor != "" && cursor != null);

  console.log("refreshAssetsCore executed successfully:", stringify({}));
};

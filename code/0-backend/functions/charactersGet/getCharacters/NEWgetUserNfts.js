"use strict";

const axios = require("axios");

const stringify = require("../../stringify");
const delay = require("../../delay");

const baseUrl = `https://deep-index.moralis.io/api/v2`;
const MORALIS_X_API_KEY = process.env.MORALIS_X_API_KEY;

const SYNCED = "SYNCED";

module.exports = async ({
  address,
  offset,
  limit,
  chain,
  tokenAddress,
  notSyncedGetCount = 0,
}) => {
  console.log(
    "running getUserNfts with the following values:",
    stringify({
      address,
      offset,
      limit,
      chain,
      tokenAddress,
      notSyncedGetCount,
    })
  );

  if (!MORALIS_X_API_KEY) {
    throw new Error("getUserNfts: setup error: missing MORALIS_X_API_KEY");
  }

  try {
    const results = await axios({
      method: "GET",
      url:
        `${baseUrl}/${address}/nft/${tokenAddress}` +
        `?chain=${chain}&format=decimal&offset=${offset}&limit=${limit}`,
      headers: {
        "X-API-Key": MORALIS_X_API_KEY,
      },
    });

    const moralisResponse = results.data;

    if (moralisResponse.status !== SYNCED) {
      if (notSyncedGetCount > 3) {
        throw new Error("Moralis not synced, error threshold passed");
      }
      notSyncedGetCount++;
      const seconds = 10;
      console.log(
        "getUserNfts: [NO-OP] executed successfully, " +
          `Moralis status is not SYNCED [NO-OP] (waiting ${seconds} seconds)`
      );
      await delay(seconds * 1000);

      return {
        total: moralisResponse.total,
        tokenData: [],
        notSyncedGetCount,
      };
    }

    console.log(
      "getUserNfts: executed successfully, " +
        `retrieved results: ${stringify({
          ["Number of NFTs retrieved"]: moralisResponse.result.length,
          ["Total amount of NFTs"]: moralisResponse.total,
        })}`
    );

    notSyncedGetCount = 0;
    return {
      total: moralisResponse.total,
      tokenData: moralisResponse.result,
      notSyncedGetCount,
    };
  } catch (err) {
    console.log("error in getUserNfts:", err);
    throw err;
  }
};

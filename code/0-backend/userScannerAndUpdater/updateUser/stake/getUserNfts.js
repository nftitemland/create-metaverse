"use strict";

const {
  stringify,
  database: { searchDatabase },
  constants: {
    aws: {
      database: {
        tableNames: { ASSETS },
        secondaryIndices: { ownerAddressIndex },
        assetsPrefixes: { asset_PoiPois_ },
      },
    },
  },
} = require("compute-utils");

const searchLimit = 75;

const GURR_KEYS = [24, 25, 30, 32, 40, 41, 43];

const getGurrNftCount = ({ searchDbResults }) => {
  let gurrNftCount = 0;

  for (const result of searchDbResults.ultimateResults) {
    for (const gurrKey of GURR_KEYS) {
      if (result.partitionKey.endsWith(gurrKey)) {
        gurrNftCount++;
      }
    }
  }
  console.log("getGurrNftCount results:", gurrNftCount);

  return gurrNftCount;
};

module.exports = async ({ address, assetPrefix }) => {
  console.log("running getUserNfts:" + stringify({ address, assetPrefix }));

  const responseData = {
    nftCount: 0,
  };

  const ownerAddress = `${assetPrefix}${address}`;
  let paginationValueToUse;

  do {
    const searchDbResults = await searchDatabase({
      searchParams: {
        TableName: ASSETS,
        IndexName: ownerAddressIndex,
        Limit: searchLimit,
        ScanIndexForward: true,
        KeyConditionExpression: `#ownerAddress = :ownerAddress`,
        ExpressionAttributeNames: {
          "#ownerAddress": "ownerAddress",
        },
        ExpressionAttributeValues: {
          ":ownerAddress": ownerAddress,
        },
        ExclusiveStartKey: paginationValueToUse || undefined,
      },
    });

    responseData.nftCount += searchDbResults.ultimateResults.length;

    if (assetPrefix === asset_PoiPois_) {
      const gurrNftCount = getGurrNftCount({
        searchDbResults,
      });

      responseData.nftCount += gurrNftCount * 4;
    }

    paginationValueToUse = searchDbResults.paginationValue;
  } while (paginationValueToUse);

  console.log(
    "getUserNfts executed successfully:",
    stringify({
      responseData,
    })
  );

  return responseData;
};

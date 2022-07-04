"use strict";

const {
  stringify,
  database: { searchDatabase },
  constants: {
    aws: {
      database: {
        // tableNameToPartitionKey,
        // tableNameToSortKey,
        tableNames: { ASSETS },
        secondaryIndices: { ownerAddressIndex },
      },
    },
    // users: {
    //   visibilities: { PUBLIC },
    //   attributeVisibilities: { ADDRESS, ART_POINTS, METAVERSE_PRESENT },
    // },
  },
  // sendData,
} = require("compute-utils");

const { poiLevels } = require("./local");

// const { stringify } = require("compute-utils");

const getTopPoiLevel = async ({ address }) => {
  console.log(
    "running getTopPoiLevel, with the following values:",
    stringify({
      address,
    })
  );

  const searchParams = {
    TableName: ASSETS,
    IndexName: ownerAddressIndex,
    Limit: 100,
    ScanIndexForward: true,
    KeyConditionExpression: `#ownerAddress = :ownerAddress`,
    ExpressionAttributeNames: {
      "#ownerAddress": "ownerAddress",
    },
    ExpressionAttributeValues: {
      ":ownerAddress": address,
    },
    // ExclusiveStartKey: paginationValueToUse || undefined,
  };

  const { ultimateResults } = await searchDatabase({
    searchParams,
  });

  for (const poi of ultimateResults) {
    if (!!poi.og) {
      console.log(
        "getTopPoiLevel executed successfully " + `user ${address} is og`
      );
      return poiLevels.og;
    } else if (!!poi.diamond) {
      console.log(
        "getTopPoiLevel executed successfully " + `user ${address} is diamond`
      );
      return poiLevels.diamond;
    }
  }
  console.log("getPoiPoiCountAmount executed successfully " + `user is Poi`);
  return null;
};

module.exports = getTopPoiLevel;

"use strict";

const {
  stringify,
  database: { searchDatabase },
  constants: {
    aws: {
      database: {
        tableNames: { METADATA },
        secondaryIndices: { secondaryPartitionKeySecondarySortKeyIndex },
      },
    },

    realtime: { realPoiObjDbTypes, realPoiObjStates },
  },
} = require("compute-utils");

const SEARCH_LIMIT = 100;

module.exports = async () => {
  console.log(
    "running getLandElements " + "with the following values: " + stringify({})
  );

  const chestData = [];

  const searchResults = await searchDatabase({
    searchParams: {
      TableName: METADATA,
      IndexName: secondaryPartitionKeySecondarySortKeyIndex,
      Limit: SEARCH_LIMIT,
      ScanIndexForward: true,
      KeyConditionExpression:
        `#secondaryPartitionKey = :secondaryPartitionKey and ` +
        `#secondarySortKey = :secondarySortKey`,
      ExpressionAttributeNames: {
        "#secondaryPartitionKey": "secondaryPartitionKey",
        "#secondarySortKey": "secondarySortKey",
      },
      ExpressionAttributeValues: {
        ":secondaryPartitionKey": realPoiObjDbTypes.REALPOI_CHEST,
        ":secondarySortKey": realPoiObjStates.UNOPENED,
      },
      ExclusiveStartKey: null,
    },
  });

  const rawChestData = searchResults.ultimateResults;

  for (const rawChestDatum of rawChestData) {
    const chestDatum = {
      id: rawChestDatum.partitionKey,
      x: rawChestDatum.x,
      y: rawChestDatum.y,
      w: rawChestDatum.w,
      h: rawChestDatum.h,
      prizeType: rawChestDatum.prizeType,
      prizeAmount: rawChestDatum.prizeAmount,
      forUserId: rawChestData.forUserId,
      chestType: rawChestData.chestType,
    };

    chestData.push(chestDatum);
  }

  const responseData = {
    chestData,
  };

  console.log(
    "getLandElements executed successfully: " +
      `obtained ${stringify({
        chestData: responseData.chestData.length,
      })}`
  );

  return responseData;
};

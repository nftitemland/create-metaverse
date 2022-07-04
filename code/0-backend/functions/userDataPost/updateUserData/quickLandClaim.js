"use strict";

const {
  stringify,
  // drq,
  database: {
    //getDatabaseEntry,
    // updateDatabaseEntry,
    classicalUpdateDatabaseEntry,
  },
  constants: {
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNames: { USERS },
      },
    },
  },
  getUserData,
  // getUserData,
} = require("compute-utils");

const REQUIRED_PIXIE_CRYSTALS = 175;
// const REQUIRED_PIXIE_CRYSTALS = 175000;

module.exports = async ({ address }) => {
  console.log(
    "Running quick land claim with the following values: " +
      stringify({
        address,
      })
  );

  const updateExpression = "SET #landClaimLevel = :landClaimLevel";
  //   const conditionExpression = "#secondarySortKey >= :requiredPixieCrystals";
  const expressionAttributeNames = {
    "#landClaimLevel": "landClaimLevel",
    // "#secondarySortKey": "secondarySortKey",
  };
  const expressionAttributeValues = {
    ":landClaimLevel": 1,
    // ":requiredPixieCrystals": REQUIRED_PIXIE_CRYSTALS,
  };

  const updateParams = {
    tableName: USERS,
    key: tableNameToPartitionKey[USERS],
    value: address,
    updateExpression,
    // conditionExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  };

  const userData = await getUserData({
    address,
  });

  const hasEnoughPoi =
    !!userData &&
    (userData.poiPoiCount > 0 ||
      userData.ultraFlaminCount > 0 ||
      userData.landsCount > 0);

  console.log(
    "user has enough PoiPoi:",
    stringify({
      poiPoiCount: userData.poiPoiCount,
      ultraFlaminCount: userData.ultraFlaminCount,
      landsCount: userData.landsCount,
      hasEnoughPoi,
    })
  );

  if (!hasEnoughPoi) {
    updateParams.conditionExpression =
      "#secondarySortKey >= :requiredPixieCrystals";

    expressionAttributeNames["#secondarySortKey"] = "secondarySortKey";
    expressionAttributeValues[":requiredPixieCrystals"] =
      REQUIRED_PIXIE_CRYSTALS;
  }

  try {
    await classicalUpdateDatabaseEntry(updateParams);
  } catch (err) {
    const errorMessage =
      (!!err.message &&
        typeof err.message === "string" &&
        err.message.toLowerCase().includes("conditional") &&
        "Require more Pixie Crystals") ||
      "Internal Server Error";

    const error = new Error(errorMessage);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const responseValues = {};

  console.log(
    "Quick land claim executed successfully, " + stringify(responseValues)
  );

  return responseValues;
};

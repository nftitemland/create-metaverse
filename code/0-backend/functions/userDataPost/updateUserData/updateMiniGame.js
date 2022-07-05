"use strict";

const {
  stringify,
  database: { getDatabaseEntry, classicalUpdateDatabaseEntry, searchDatabase },
  constants: {
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNames: { USERS, ASSETS },
        secondaryIndices: { ownerAddressIndex },
      },
    },
  },
} = require("compute-utils");

const { miniGameStates } = require("../localC");

const getPoiPoiCountAmount = async ({ address }) => {
  const lcAddress = address.toLowerCase();

  console.log("running getPoiPoiCountAmount, with the following values:", {
    address: lcAddress,
  });

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
      ":ownerAddress": lcAddress,
    },
    // ExclusiveStartKey: paginationValueToUse || undefined,
  };

  const { ultimateResults } = await searchDatabase({
    searchParams,
  });

  //   const poiPoiCount = ultimateResults.length;

  let amount = 0;

  for (const poi of ultimateResults) {
    if (poi.rarity === "GIGA") {
      amount += 10000;
    } else if (poi.rarity === "HYPER") {
      amount += 1000;
    } else {
      amount += 100;
    }
  }
  console.log(
    "getPoiPoiCountAmount executed successfully " +
      `user won ${amount || 10} Art Points`
  );
  return amount || 10;
};

module.exports = async ({ address, miniGameState }) => {
  console.log(
    "running updateMiniGame with the following values:",
    stringify({
      miniGameState,
    })
  );

  const user = await getDatabaseEntry({
    tableName: USERS,
    value: address,
  });

  if (miniGameState === miniGameStates.START) {
    if (!!user.miniGameStart) {
      const error = new Error(`user already started minigame state`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    let updateExpression = "";
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    updateExpression += "SET #miniGameStart = :miniGameStart";
    expressionAttributeNames["#miniGameStart"] = "miniGameStart";
    expressionAttributeValues[":miniGameStart"] = true;

    await classicalUpdateDatabaseEntry({
      tableName: USERS,
      key: tableNameToPartitionKey[USERS],
      value: address,
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    });

    console.log(
      "updateMiniGame executed successfully [START ROUTE]:",
      stringify({
        miniGameStart: true,
      })
    );
    return;
  }

  if (user.miniGameFinishAmount || user.miniGameFinishAmount === 0) {
    const error = new Error(`user already awarded minigame prize`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const countAmount =
    miniGameState === miniGameStates.ENDL
      ? 0
      : await getPoiPoiCountAmount({
          address,
        });

  let updateExpression = "";
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  updateExpression += "SET #miniGameFinishAmount = :miniGameFinishAmount";
  expressionAttributeNames["#miniGameFinishAmount"] = "miniGameFinishAmount";
  expressionAttributeValues[":miniGameFinishAmount"] = countAmount;

  await classicalUpdateDatabaseEntry({
    tableName: USERS,
    key: tableNameToPartitionKey[USERS],
    value: address,
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  });

  console.log(
    "updateMiniGame executed successfully [FINISH AMOUNT ROUTE]:",
    stringify({
      miniGameFinishAmount: countAmount,
    })
  );
};

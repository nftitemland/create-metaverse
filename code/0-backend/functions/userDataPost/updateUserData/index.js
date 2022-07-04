"use strict";

const {
  stringify,
  database: { classicalUpdateDatabaseEntry },
  constants: {
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNames: { USERS },
      },
    },
    transactions: {
      types: {
        SWITCH_PROFILE_IS_PUBLIC,
        SWITCH_PROFILE_ATTRIBUTE_VISIBLE,
        SWITCH_BATTLE_MODE,
      },
    },
  },
  addTransactionAndUpdateUser,
} = require("compute-utils");

const performMetaverseAction = require("./performMetaverseAction");
const claimLand = require("./claimLand2");
const quickLandClaim = require("./quickLandClaim");
const loginToParty = require("./loginToParty");
// const updateMiniGame = require("./updateMiniGame");

module.exports = async ({
  address,
  username,
  // miniGameState,
  switchPublicMode,
  metaverseAction,
  visibility,
  polygonAddress,
  land,
  quickClaim,
  switchBattleMode,
  loginParty,
}) => {
  console.log(
    "🦒running updateUserData with the following values:",
    stringify({
      address,
      username,
      // miniGameState,
      switchPublicMode,
      metaverseAction,
      visibility,
      polygonAddress,
      land,
      quickClaim,
      switchBattleMode,
      loginParty,
    })
  );

  if (loginParty) {
    console.log("🧚‍♀️updateUserData: login to party");

    const responseValues = await loginToParty({
      address,
    });

    console.log(
      "🧚‍♀️updateUserData: login to party executed successfully, " +
        "returning values: " +
        stringify(responseValues)
    );

    return responseValues;
  }

  if (quickClaim) {
    console.log("🦒updateUserData: quick land claim");

    // TODO: in lock updates
    await quickLandClaim({
      address,
    });

    const responseValues = {};

    console.log(
      "🦒updateUserData: quick land claim executed successfully, " +
        "returning values: " +
        stringify(responseValues)
    );

    return responseValues;
  }

  if (polygonAddress && land) {
    console.log("🦒updateUserData: claiming land");

    await claimLand({
      address,
      polygonAddress,
      land,
    });

    const responseValues = {};

    console.log(
      "🦒updateUserData: claiming land executed successfully, " +
        "returning values: " +
        stringify(responseValues)
    );

    return responseValues;
  }

  if (metaverseAction) {
    console.log("🦒updateUserData: performing metaverse action");

    await performMetaverseAction({
      address,
      metaverseAction,
    });

    const responseValues = {};

    console.log(
      "🦒updateUserData: metaverse action executed successfully, " +
        "returning values: " +
        stringify(responseValues)
    );

    return responseValues;
  }

  if (visibility) {
    console.log("🦒updateUserData: switching attribute visibility");

    await addTransactionAndUpdateUser({
      address,
      type: SWITCH_PROFILE_ATTRIBUTE_VISIBLE,
      value: visibility,
    });

    const responseValues = {};

    console.log(
      "🦒updateUserData [SWITCH ATTRIBUTE VISIBILITY] executed successfully " +
        "returning values: " +
        stringify(responseValues)
    );

    return responseValues;
  }

  if (switchPublicMode) {
    console.log("🦒updateUserData: switching public mode");

    await addTransactionAndUpdateUser({
      address,
      type: SWITCH_PROFILE_IS_PUBLIC,
    });

    const responseValues = {};

    console.log(
      "🦒updateUserData [SWITCH PUBLIC ROUTE] executed successfully " +
        "returning values: " +
        stringify(responseValues)
    );

    return responseValues;
  }

  if (switchBattleMode) {
    console.log("🦒updateUserData: switching battle mode");

    await addTransactionAndUpdateUser({
      address,
      type: SWITCH_BATTLE_MODE,
    });

    const responseValues = {};

    console.log(
      "🦒updateUserData [SWITCH BATTLE MODE] executed successfully " +
        "returning values: " +
        stringify(responseValues)
    );

    return responseValues;
  }
  // else if (!!miniGameState) {
  //   console.log("miniGameState exists, updating based on mini game data");

  //   await updateMiniGame({
  //     address,
  //     miniGameState,
  //   });

  //   const responseValues = {};

  //   console.log(
  //     "🦒updateUserData [MINIGAME ROUTE] executed successfully " +
  //       "returning values: " +
  //       stringify(responseValues)
  //   );

  //   return responseValues;
  // }

  if (!!username) {
    let updateExpression = "";
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    updateExpression += "SET #username = :username";
    expressionAttributeNames["#username"] = "username";
    expressionAttributeValues[":username"] = username;

    await classicalUpdateDatabaseEntry({
      tableName: USERS,
      key: tableNameToPartitionKey[USERS],
      value: address,
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    });

    const responseValues = {};

    console.log(
      "🦒updateUserData executed successfully, " +
        "returning values: " +
        stringify(responseValues)
    );

    return responseValues;
  }

  const responseValues = {};

  console.log(
    "🦒updateUserData [NO-OP] executed successfully [NO-OP] " +
      "returning values: " +
      stringify(responseValues)
  );

  return responseValues;
};

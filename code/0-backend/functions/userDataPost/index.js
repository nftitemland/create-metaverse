"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
} = require("compute-utils");

const updateUserData = require("./updateUserData");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
// const addLoginToken = require("./addLoginToken");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/user-data POST");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      // shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    // const rawMiniGameState = formattedEvent.body.miniGameState;
    const rawUsername = formattedEvent.body.username;
    const rawPublic = formattedEvent.body.public;
    const rawVisibility = formattedEvent.body.visibility;
    const rawMetaverseAction = formattedEvent.body.metaverseAction;
    const rawLandClaimData = formattedEvent.body.landClaimData;
    const rawQuickClaim = formattedEvent.body.quickClaim;
    const rawBattleMode = formattedEvent.body.battleMode;
    const rawLoginParty = formattedEvent.body.loginParty;

    const {
      address,
      nToken,
      username,
      // miniGameState,
      switchPublicMode,
      visibility,
      metaverseAction,
      //
      polygonAddress,
      land,
      quickClaim,
      switchBattleMode,
      loginParty,
    } = getValidatedValues({
      rawAddress,
      rawNToken,
      rawUsername,
      rawLoginParty,
      // rawMiniGameState,
      rawPublic,
      rawVisibility,
      rawMetaverseAction,
      rawLandClaimData,
      rawQuickClaim,
      rawBattleMode,
    });

    await authorizeUser({
      address,
      nToken,
    });

    const results = await updateUserData({
      address,
      username,
      // miniGameState,
      switchPublicMode,
      visibility,
      metaverseAction,
      polygonAddress,
      land,
      quickClaim,
      switchBattleMode,
      loginParty,
    });
    // await addLoginToken({
    //   address,
    // });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_324lkealweiwqg38469",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/user-data POST - " +
        "function executed successfully: " +
        stringify({ responseData })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(
      `error in Lambda /expansive-world/user-data POST function: ${err}`
    );

    return handleError(err);
  }
};

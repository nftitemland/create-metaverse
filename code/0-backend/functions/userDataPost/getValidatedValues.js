"use strict";

const {
  stringify,
  validation: { getNTokenV1IfIsValid },
  web3,
  constants: {
    users: { attributeVisibilities },
    metaverseActions,
  },
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

// const { miniGameStates } = require("./localC");

const allowedUsernameCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_";

module.exports = ({
  rawAddress,
  rawNToken,
  rawUsername,
  // rawMiniGameState,
  rawPublic,
  rawVisibility,
  rawMetaverseAction,
  rawLandClaimData,
  rawQuickClaim,
  rawBattleMode,
  rawLoginParty,
}) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawNToken,
      rawUsername,
      // rawMiniGameState,
      rawPublic,
      rawVisibility,
      rawMetaverseAction,
      rawLandClaimData,
      rawQuickClaim,
      rawBattleMode,
      rawLoginParty,
    })
  );

  if (rawQuickClaim) {
    const error = new Error(`Land claim done`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (
    !rawAddress ||
    typeof rawAddress !== "string" ||
    rawAddress.length > 500
  ) {
    const error = new Error('missing "address" parameter');
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (!web3.utils.isAddress(rawAddress)) {
    const error = new Error(`invalid "address" provided ${rawAddress}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const nToken = getNTokenV1IfIsValid(rawNToken);

  if (!nToken) {
    const error = new Error(`invalid login-token`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (!!rawUsername) {
    if (typeof rawUsername !== "string") {
      const error = new Error(`invalid username`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    if (rawUsername.length > 12) {
      const error = new Error(`username too long`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    for (const char of rawUsername) {
      if (!allowedUsernameCharacters.includes(char)) {
        const error = new Error(`invalid username`);
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
      }
    }
  }

  // if (!!rawMiniGameState) {
  //   if (
  //     typeof rawMiniGameState !== "string" ||
  //     !miniGameStates[rawMiniGameState]
  //   ) {
  //     const error = new Error(`invalid minigame state`);
  //     error.statusCode = 400;
  //     error.bulltrue = true;
  //     throw error;
  //   }
  // }

  const values = {
    address: ethUtil.toChecksumAddress(rawAddress),
    nToken,
    username: rawUsername,
    // miniGameState: rawMiniGameState,
    switchPublicMode: !!rawPublic,
    quickClaim: !!rawQuickClaim,
    visibility: undefined,
    metaverseAction: undefined,
    polygonAddress: undefined,
    land: undefined,
    switchBattleMode: !!rawBattleMode,
  };

  if (!!rawVisibility) {
    if (!attributeVisibilities[rawVisibility]) {
      const error = new Error(`invalid visibilities`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    values.visibility = rawVisibility;
  }

  if (!!rawMetaverseAction) {
    if (!metaverseActions[rawMetaverseAction]) {
      const error = new Error(
        `invalid metaverse action: ${rawMetaverseAction}`
      );
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    values.metaverseAction = rawMetaverseAction;
  }

  if (rawLoginParty === true) {
    values.loginParty = true;
  }

  if (!!rawLandClaimData && typeof rawLandClaimData === "object") {
    if (true === !!true) {
      const error = new Error(`Land claim done`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    const rawPolygonAddress = rawLandClaimData.polygonAddress;

    if (!web3.utils.isAddress(rawPolygonAddress)) {
      const error = new Error(
        `invalid Polygon address provided ${rawPolygonAddress}`
      );
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }
    values.polygonAddress = rawPolygonAddress;

    const rawLand = Number(rawLandClaimData.land);

    if (
      !rawLand ||
      !Number.isInteger(rawLand) ||
      rawLand > 99 ||
      rawLand < 28
    ) {
      const error = new Error(`invalid land provided ${rawLand}`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    values.land = String(rawLand);
  }

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

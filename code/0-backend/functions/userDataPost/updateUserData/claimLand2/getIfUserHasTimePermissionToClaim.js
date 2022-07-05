"use strict";

const {
  constants: {
    nftKeys: {
      DPS_DOGES,
      DPS_PUPPIES,
      CRYPDOLLS,
      PIXIEJARS,
      CUSTOM_PIXIES,
      GIGA,
      HYPER,
      NORMAL,
    },
  },
} = require("compute-utils");

const whiteListKeys = [
  GIGA,
  HYPER,
  NORMAL,
  DPS_DOGES,
  DPS_PUPPIES,
  CRYPDOLLS,
  PIXIEJARS,
  CUSTOM_PIXIES,
];

const AIRDROP_EDIT_MODE_END_TIME = 1642168800000;
const AIRDROP_TIME = 1642224600000;
const AIRDROP_TIME_EARLY_ACCESS = 1642172400000;
// const AIRDROP_TIME_EARLY_ACCESS = Date.now() - 1000 * 120;

module.exports = ({ userLandData }) => {
  if (Date.now() < AIRDROP_EDIT_MODE_END_TIME) {
    return true;
  }

  for (const key of whiteListKeys) {
    const userLandDatum = userLandData[key];
    if (
      userLandDatum &&
      userLandDatum.tokenData &&
      userLandDatum.tokenData.length > 0 &&
      Date.now() > AIRDROP_TIME_EARLY_ACCESS
    ) {
      return true;
    }
  }

  if (Date.now() > AIRDROP_TIME) {
    return true;
  }

  return false;
};

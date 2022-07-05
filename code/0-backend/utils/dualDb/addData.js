"use strict";

// const uuid = require("uuid");
const stringify = require("../stringify");
// const getReferralCode = require("../user/getReferralCode");
const updateDatabaseEntry = require("../database/updateDatabaseEntry");

// const classicalUpdateDatabaseEntry = require("../database/classicalUpdateDatabaseEntry");
const {
  aws: {
    database: {
      // tableNameToPartitionKey,
      // assetsMetadataKeys: { metadata_firstLandClaim },
      tableNames: { METADATA }, //, ASSETS },
      // dataTypes: { MINT_INITIALIZATION },
      // assetsMetadataKeys: { metadata_landClaim },
    },
  },
  // users: {
  //   visibilities: { PUBLIC, PRIVATE },
  //   attributeVisibilities: { ADDRESS, ART_POINTS },
  // },
  // environment: { isProductionMode },
} = require("../constants");
// const getUUID = require("../javascript/getUUID");
// const getUserBattleHpValueData = require("../battle/getUserBattleHpValueData");
// const getModHp = require("../javascript/getModHp");

// const getLandTokenData = require("./getLandTokenData");
// const getEarliestAirdropClaim = require("../metaverse/getEarliestAirdropClaim");

// // const USER_REFRESH_TIME = 0;
// // const USER_REFRESH_TIME = 1000 * 60 * 15;
// const USER_REFRESH_TIME = Infinity;
// const TIME_TO_EDIT_AIRDROP = 3 * (1000 * 60 * 60 * 24);

// const getAssetsAddressKey = ({ address }) => {
//   return `landClaim_${address}`;
// };

module.exports = async ({ entry }) => {
  console.log(
    "🦒running dualDb add with the following values:",
    stringify({
      entry,
    })
  );

  await updateDatabaseEntry({
    tableName: METADATA,
    entry,
  });

  const responseValues = {};

  console.log(
    "🦒dualDb add executed successfully, " +
      "returning values: " +
      stringify(Object.keys(responseValues))
  );

  return responseValues;
};

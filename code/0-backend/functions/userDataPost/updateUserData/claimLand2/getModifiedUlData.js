"use strict";

// const {
//   stringify,
//   drq,
//   database: { getDatabaseEntry, updateDatabaseEntry },
//   constants: {
//     aws: {
//       database: {
//         assetsMetadataKeys: { metadata_landClaim },
//         tableNames: { ASSETS },
//       },
//     },
//   },
//   getUserData,
// } = require("compute-utils");
// const classicalUpdateDatabaseEntry = require("../../../../../../../../utils/database/classicalUpdateDatabaseEntry");

// const getUserData = require("../../../userDataGet/getUserData");

const getIfUserLandDatumIsInMetaverseLandData = ({
  userTokenDatum,
  metaverseLandData,
  tokenType,
}) => {
  // TODO: create map TYPE ID -> claimed land id
  for (const key in metaverseLandData.landData) {
    const metaverseLandDatum = metaverseLandData.landData[key];
    if (metaverseLandDatum.claimData) {
      for (const claimTokenDatum of metaverseLandDatum.claimData.tokenData) {
        if (
          String(claimTokenDatum.tokenId) === String(userTokenDatum.tokenId) &&
          claimTokenDatum.tokenType === tokenType
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

/*
  metaverseLandData: {
    landData: {
      28: {
        type: "MANSION",
        claimData: {
          address: "",
          polygonAddressData: "",
          tokenData: [
            {
              tokenId,
            },
          ],
        },
      },
*/

module.exports = ({ userLandData, metaverseLandData }) => {
  const modifiedULData = {};

  for (const tokenType in userLandData) {
    const userLandTokenData = userLandData[tokenType].tokenData;

    modifiedULData[tokenType] = {
      tokenData: [],
    };

    for (const userTokenDatum of userLandTokenData) {
      const landDataInMetaverseData = getIfUserLandDatumIsInMetaverseLandData({
        userTokenDatum,
        metaverseLandData,
        tokenType,
      });

      if (!landDataInMetaverseData) {
        modifiedULData[tokenType].tokenData.push(userTokenDatum);
      }
    }
  }

  return modifiedULData;
};

"use strict";

const {
  stringify,
  drq,
  // database: { getDatabaseEntry, updateDatabaseEntry },
  // constants: {
  //   aws: {
  //     database: {
  //       assetsMetadataKeys: { metadata_landClaim },
  //       tableNames: { ASSETS },
  //     },
  //   },
  // },
  getUserData,
} = require("compute-utils");
const getIfUserHasTimePermissionToClaim = require("./getIfUserHasTimePermissionToClaim");
const getIfIsExceedingMax = require("./getIfIsExceedingMax");
const getModifiedUlData = require("./getModifiedUlData");
const getTokenDataToUseIfUserCanAffordLand = require("./getTokenDataToUseIfUserCanAffordLand");
const updateMetaverseData = require("./updateMetaverseData");
const cancelMetaverseData = require("./cancelMetaverseData");

const CLAIM_LANDS_QUEUE_ID_NAME = "claimlands";
const CLAIM_LANDS_QUEUE_ID_ID = "global";

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

// const showTime = false;
// const showTime = true;

const claimEndTime = 1642431600000;

module.exports = async ({ address, polygonAddress, land }) => {
  console.log(
    "running claimLand2 with the following values: " +
      stringify({
        address,
        polygonAddress,
        land,
      })
  );

  // if (1 === 2 - 1) {
  //   const error = new Error(
  //     "Airdrop on temporary pause, try again in a few minutes."
  //   );
  //   error.bulltrue = true;
  //   error.statusCode = 400;
  //   throw error;
  // }

  await drq({
    queueId: drq.getQueueId({
      name: CLAIM_LANDS_QUEUE_ID_NAME,
      id: CLAIM_LANDS_QUEUE_ID_ID,
    }),
    operation: async () => {
      const { userLandData, metaverseLandData, airdropEditEndTime } =
        await getUserData({
          address,
          landClaimMode: true,
        });

      if (Date.now() > claimEndTime) {
        const error = new Error("Airdrop has ended.");
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
      }

      if (airdropEditEndTime && Date.now() > airdropEditEndTime) {
        const error = new Error(
          "Airdrop edit time for this address has ended."
        );
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
      }

      const userHasTimePermissionToClaim = getIfUserHasTimePermissionToClaim({
        userLandData,
      });

      if (!userHasTimePermissionToClaim) {
        const error = new Error("Airdrop has not started yet.");
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
      }

      const landData = metaverseLandData.landData[land];

      if (landData.claimData) {
        if (landData.claimData.address === address) {
          await cancelMetaverseData({
            land,
            metaverseLandData,
          });
          return;
        }
        const error = new Error("Land already taken");
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
      }

      // if (landData.claimData) {

      // }

      const isExceedingMax = getIfIsExceedingMax({
        address,
        landData,
        metaverseLandData,
      });

      if (isExceedingMax) {
        const error = new Error(
          `Already claimed max amount of real estate of selected type.`
        );
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
      }

      const modifiedULData = getModifiedUlData({
        userLandData,
        metaverseLandData,
      });

      const tokenDataToUseIfUserCanAffordLand =
        getTokenDataToUseIfUserCanAffordLand({
          metaverseLandData,
          landData,
          modifiedULData,
        });

      if (!tokenDataToUseIfUserCanAffordLand) {
        const error = new Error("Cannot afford land");
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
      }

      await updateMetaverseData({
        address,
        polygonAddress,
        tokenDataToAdd: tokenDataToUseIfUserCanAffordLand,
        land,
        metaverseLandData,
      });
    },
  });

  const result = {};

  console.log(
    "claimLand2 executed successfully: " +
      "returning result: " +
      stringify(result)
  );

  return result;
};

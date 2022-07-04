"use strict";

const {
  stringify,
  drq,
  database: { updateDatabaseEntry, getDatabaseEntry },
  constants: {
    aws: {
      database: {
        assetsMetadataKeys: { metadata_firstLandClaim },
        tableNames: { ASSETS },
      },
    },
  },
} = require("compute-utils");

const getTopPoiLevel = require("./getTopPoiLevel");

const { poiLevels, landIds } = require("./local");

const CLAIM_LANDS_QUEUE_ID_NAME = "claimlands";
const CLAIM_LANDS_QUEUE_ID_ID = "global";

const expiry = 1000 * 60 * 10;
// const expiry = 1000;

const REDEEM_TIME = 1640448000000; //11am dec 25 2021

const getUserLandClaimState = ({ landsData, address }) => {
  for (const land of landIds) {
    const datum = landsData[land];
    if (datum && datum.address === address) {
      return datum;
    }
  }
  return null;
};

const getLandClaimStateObject = ({
  address,
  land,
  firstClaimTime,
  polygonAddress,
}) => {
  firstClaimTime = firstClaimTime || Date.now();

  return {
    land,
    address,
    firstClaimTime,
    polygonAddress,
  };
};

module.exports = async ({ address, polygonAddress, land }) => {
  console.log(
    "running claimLand with the following values: " +
      stringify({
        address,
        polygonAddress,
        land,
      })
  );

  const topPoiLevel = await getTopPoiLevel({
    address,
  });

  if (!poiLevels[topPoiLevel]) {
    const error = new Error(
      `Address "${address}" not holding eligible PoiPoi.`
    );
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  } else if (topPoiLevel === poiLevels.diamond && land < 7) {
    const error = new Error(`Error: Poi is not top echelon.`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  // else if (topPoiLevel === poiLevels.diamond && Date.now() < REDEEM_TIME) {
  //   const error = new Error(`Error: not yet redeem time.`);
  //   error.statusCode = 400;
  //   error.bulltrue = true;
  //   throw error;
  // }

  await drq({
    queueId: drq.getQueueId({
      name: CLAIM_LANDS_QUEUE_ID_NAME,
      id: CLAIM_LANDS_QUEUE_ID_ID,
    }),
    operation: async () => {
      const firstLandClaimMetadata = await getDatabaseEntry({
        tableName: ASSETS,
        value: metadata_firstLandClaim,
      });

      const landsData = firstLandClaimMetadata.lands;

      if (!landsData) {
        // safeguard
        throw new Error("claimLand setup error: missing metadata");
      }

      const existingUserState = getUserLandClaimState({
        landsData,
        address,
      });

      if (existingUserState) {
        const claimEndTime = existingUserState.firstClaimTime + expiry;

        if (Date.now() > claimEndTime) {
          const error = new Error(`Claiming has expired.`);
          error.statusCode = 400;
          error.bulltrue = true;
          throw error;
        }
      }

      const existingLandClaimStateForChosenLand = landsData[land];

      if (
        existingLandClaimStateForChosenLand &&
        existingLandClaimStateForChosenLand?.address !== address
      ) {
        const error = new Error(`Land ${land} already claimed.`);
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
      }

      const newLandsData = Object.assign({}, landsData);

      if (existingUserState) {
        newLandsData[existingUserState.land] = null;
      }

      Object.assign(newLandsData, {
        [land]: getLandClaimStateObject({
          address,
          land,
          firstClaimTime:
            (existingUserState && existingUserState.firstClaimTime) ||
            undefined,
          polygonAddress,
        }),
      });

      const newFirstLandClaimMetadata = Object.assign(
        {},
        firstLandClaimMetadata,
        {
          lands: newLandsData,
        }
      );

      await updateDatabaseEntry({
        tableName: ASSETS,
        entry: newFirstLandClaimMetadata,
      });
    },
  });

  const result = {};

  console.log(
    "claimLand executed successfully: " +
      "returning result: " +
      stringify(result)
  );

  return result;
};

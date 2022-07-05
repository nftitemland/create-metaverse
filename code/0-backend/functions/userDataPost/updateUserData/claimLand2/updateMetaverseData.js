"use strict";

const {
  // stringify,
  // drq,
  database: {
    //getDatabaseEntry,
    updateDatabaseEntry,
  },
  constants: {
    aws: {
      database: {
        // assetsMetadataKeys: { metadata_landClaim },
        tableNames: { ASSETS },
      },
    },
  },
  // getUserData,
} = require("compute-utils");

module.exports = async ({
  address,
  polygonAddress,
  tokenDataToAdd,
  land,
  metaverseLandData,
}) => {
  const newMetaverseLandData = Object.assign({}, metaverseLandData);

  newMetaverseLandData.landData[land] = Object.assign(
    {},
    newMetaverseLandData.landData[land],
    {
      claimData: {
        polygonAddress,
        tokenData: tokenDataToAdd,
        address,
        time: Date.now(),
      },
    }
  );

  await updateDatabaseEntry({
    tableName: ASSETS,
    entry: newMetaverseLandData,
  });
};

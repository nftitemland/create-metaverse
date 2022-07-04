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
const { stringify } = require("querystring");

module.exports = async ({
  // address,
  // polygonAddress,
  // tokenDataToAdd,
  land,
  metaverseLandData,
}) => {
  console.log(
    "cancelMetaverseData: Cancelling metaverse data:",
    stringify({
      // address,
      land,
    })
  );
  const newMetaverseLandData = Object.assign({}, metaverseLandData);

  newMetaverseLandData.landData[land] = Object.assign(
    {},
    newMetaverseLandData.landData[land],
    {
      claimData: null,
    }
  );

  await updateDatabaseEntry({
    tableName: ASSETS,
    entry: newMetaverseLandData,
  });

  console.log("cancelMetaverseData: Executed successfully");
};

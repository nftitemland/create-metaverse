"use strict";

const {
  stringify,
  // drq,
  // database: {
  //   //getDatabaseEntry,
  //   updateDatabaseEntry,
  // },
  // constants: {
  //   aws: {
  //     database: {
  //       // assetsMetadataKeys: { metadata_landClaim },
  //       tableNames: { ASSETS },
  //     },
  //   },
  // },
  // getUserData,
} = require("compute-utils");

module.exports = ({ address, landData, metaverseLandData }) => {
  const landType = landData.type;

  let totalOfTypeCollectedAlready = 0;

  for (const landDatumKey in metaverseLandData.landData) {
    const landDatum = metaverseLandData.landData[landDatumKey];

    if (
      landDatum.claimData &&
      landDatum.claimData.address === address &&
      landDatum.type === landType
    ) {
      totalOfTypeCollectedAlready++;
    }
  }

  console.log(
    "getIfIsExceedingMax:",
    stringify({
      landType,
      totalOfTypeCollectedAlready,
      max: metaverseLandData.maximums[landType],
    })
  );

  if (
    landType === "LARGE_HOME" &&
    [
      "0xfCf42185fB42CfBad2fC3C1AC0d87eCEF37f4185",
      "0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474",
    ].includes(address)
  ) {
    if (totalOfTypeCollectedAlready >= 2) {
      return true;
    }
  }

  if (totalOfTypeCollectedAlready >= metaverseLandData.maximums[landType]) {
    return true;
  }
  return false;
};

"use strict";

module.exports = ({ landData, address }) => {
  let earliestDate = null;

  for (const landNumber in landData) {
    const landDatum = landData[landNumber];

    if (
      landDatum.claimData &&
      typeof landDatum.claimData === "object" &&
      landDatum.claimData.address === address
    ) {
      if (!earliestDate) {
        earliestDate = landDatum.claimData.time;
      } else if (landDatum.claimData.time < earliestDate) {
        earliestDate = landDatum.claimData.time;
      }
    }
  }

  return earliestDate;
};

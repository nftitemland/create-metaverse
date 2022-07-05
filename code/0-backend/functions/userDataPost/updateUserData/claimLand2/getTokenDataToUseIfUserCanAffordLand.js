"use strict";

// const {
//   stringify,
//   drq,
//   // database: { getDatabaseEntry, updateDatabaseEntry },
//   // constants: {
//   //   aws: {
//   //     database: {
//   //       assetsMetadataKeys: { metadata_landClaim },
//   //       tableNames: { ASSETS },
//   //     },
//   //   },
//   // },
//   getUserData,
// } = require("compute-utils");

const getParisHiltonFunction = (count = 5) => {
  return ({ modifiedULData }) => {
    // console.log(`

    //     MEGAmodifiedULData LOG: ${JSON.stringify(
    //       {
    //         modifiedULData,
    //       },
    //       null,
    //       4
    //     )}

    // `);
    const tokenDataToAdd = [];

    for (const key of ["PIXIEJARS", "CUSTOM_PIXIES", "CRYPDOLLS"]) {
      const keyData = modifiedULData[key];
      if (keyData && keyData.tokenData) {
        for (const tokenDatum of keyData.tokenData) {
          tokenDataToAdd.push({
            tokenId: tokenDatum.tokenId,
            tokenType: key,
          });
        }
      }
    }

    // console.log(`

    //     MEGA2modifiedULData LOG: ${JSON.stringify(
    //       {
    //         tokenDataToAdd,
    //       },
    //       null,
    //       4
    //     )}

    // `);

    if (tokenDataToAdd.length >= count) {
      const actualTokenDataToAdd = [];
      for (let i = 0; i < count; i++) {
        actualTokenDataToAdd.push(tokenDataToAdd[i]);
      }
      return actualTokenDataToAdd;
    }

    return null;
  };
};

const generalOperationNameToGeneralOperation = {
  PARIS_HILTON: getParisHiltonFunction(5),
  TOP_P_PENTHOUSE: getParisHiltonFunction(10),
  SECOND_P_PENTHOUSE: getParisHiltonFunction(5),
};

module.exports = ({ modifiedULData, metaverseLandData, landData }) => {
  const requirements = metaverseLandData.requirements[landData.type];

  for (const requirementBlock of requirements) {
    for (const requirement of requirementBlock) {
      if (
        requirement.generalOperationName &&
        typeof generalOperationNameToGeneralOperation[
          requirement.generalOperationName
        ] === "function"
      ) {
        const tokenDataToAdd = generalOperationNameToGeneralOperation[
          requirement.generalOperationName
        ]({
          modifiedULData,
        });

        if (tokenDataToAdd) {
          // for (let i = 0; i < requirementAmount; i++) {
          //   tokenDataToAdd.push({
          //     tokenId: modifiedULData[requirement.token].tokenData[i].tokenId,
          //     tokenType: requirement.token,
          //   });
          // }

          return tokenDataToAdd;
        }
      } else if (requirement.amount && requirement.token) {
        const requirementAmount = requirement.amount;
        const userDataAmount =
          modifiedULData[requirement.token].tokenData.length;

        if (userDataAmount >= requirementAmount) {
          const tokenDataToAdd = [];

          for (let i = 0; i < requirementAmount; i++) {
            tokenDataToAdd.push({
              tokenId: modifiedULData[requirement.token].tokenData[i].tokenId,
              tokenType: requirement.token,
            });
          }

          return tokenDataToAdd;
        }
      }
    }
  }

  return null;
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

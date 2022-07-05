"use strict";

// const  = require("../../stringify");
// const searchDatabase = require("../../database/searchDatabase");
const {
  stringify,
  database: { searchDatabase },
  constants: {
    aws: {
      database: {
        tableNames: { ASSETS },
        secondaryIndices: { ownerAddressIndex },
        // assetsPrefixes: {
        //   asset_PoiPois_,
        //   asset_GameCharacters_,
        //   asset_UltraFlamingos_,
        // },
      },
    },
    // nftKeys: { POIPOI, GAME_CHARACTERS, ULTRA_FLAMINS },
    // withdraws: { GLOBAL_WITHDRAW_CONSTANT, MAXIMUM_WITHDRAW_LEVEL },
  },
  // transactions: {
  //   types: { CHARACTER_SELECT },
  // },
  tempDb,
} = require("compute-utils");

const getAuxNftLevelCore = async ({ address }) => {
  console.log(
    `running getAuxNftLevelCore, with the following values: ` +
      stringify({
        address,
      })
  );

  const ownerAddressKey = `${tempDb.typeToParams.AUX_NFT_1.assetPrefix}${address}`;

  const searchParams = {
    TableName: ASSETS,
    IndexName: ownerAddressIndex,
    Limit: 1,
    ScanIndexForward: true,
    KeyConditionExpression: `#ownerAddress = :ownerAddress`,
    ExpressionAttributeNames: {
      "#ownerAddress": "ownerAddress",
    },
    ExpressionAttributeValues: {
      ":ownerAddress": ownerAddressKey,
    },
    ExclusiveStartKey: null,
  };

  const searchDatabaseResults = await searchDatabase({
    searchParams,
  });

  if (searchDatabaseResults.ultimateResults.length > 0) {
    console.log(
      "getAuxNftLevelCore " +
        `executed successfully: ${stringify({})}` +
        ` - is aux nft holder`
    );
    return true;
  }

  console.log(
    `getAuxNftLevelCore executed successfully: ${stringify()}` +
      ` - is Not aux nft holder`
  );

  return false;
};

module.exports = async ({ address }) => {
  console.log(
    "running getAuxNftLevel with the following values:",
    stringify({
      address,
    })
  );
  const auxNftLevel = (await getAuxNftLevelCore({
    address,
  }))
    ? "y"
    : null;

  console.log(
    "getAuxNftLevel executed successfully:",
    stringify({
      auxNftLevel,
    })
  );

  return auxNftLevel;
};

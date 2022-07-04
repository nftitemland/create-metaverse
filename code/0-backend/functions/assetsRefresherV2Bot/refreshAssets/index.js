"use strict";

const {
  stringify,
  constants: {
    smartContractAddresses,
    aws: {
      database: {
        assetsPrefixes: {
          asset_PoiPois_,
          asset_UltraFlamingos_,
          asset_GameCharacters_,
          asset_Lands_,
        },
      },
    },
    nftKeys: { POIPOI, ULTRA_FLAMINS, GAME_CHARACTERS, LANDS },
  },
  tempDb,
} = require("compute-utils");
// const Moralis = require("moralis/node");
const refreshAssetsCore = require("./refreshAssetsCore");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const temporaryDb = tempDb;

const typeToParams = {
  [POIPOI]: {
    chain: "eth",
    tokenAddress: smartContractAddresses.POI_POI_PROD_ONLY,
    assetPrefix: asset_PoiPois_,
  },
  [ULTRA_FLAMINS]: {
    chain: "matic",
    tokenAddress: smartContractAddresses.ULTRA_FLAMINGO,
    assetPrefix: asset_UltraFlamingos_,
  },
  [GAME_CHARACTERS]: {
    chain: "matic",
    tokenAddress: smartContractAddresses.GAME_CHARACTERS,
    assetPrefix: asset_GameCharacters_,
  },
  [LANDS]: {
    chain: "matic",
    tokenAddress: smartContractAddresses.LAND,
    assetPrefix: asset_Lands_,
  },
};

const eTypeToParams = Object.assign({}, typeToParams, temporaryDb.typeToParams);

module.exports = async ({ type }) => {
  // USE TEMPORARY DB, THEN

  console.log(
    "running refreshAssets:",
    stringify({
      type,
    })
  );

  // await Moralis.start({ serverUrl, appId });

  const params = eTypeToParams[type];

  if (!params) {
    throw new Error(`operation error: invalid type: ${type}`);
  }

  const { chain, tokenAddress, assetPrefix } = params;

  await refreshAssetsCore({
    chain,
    tokenAddress,
    assetPrefix,
  });

  console.log("refreshAssets executed successfully:", stringify({}));
};

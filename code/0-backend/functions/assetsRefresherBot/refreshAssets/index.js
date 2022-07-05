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
} = require("compute-utils");
// const Moralis = require("moralis/node");
const refreshAssetsCore = require("./refreshAssetsCore");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const typeToParams = {
  [POIPOI]: {
    chain: "eth",
    tokenAddress: smartContractAddresses.POI_POI_PROD_ONLY,
    ownerAddressPrefix: asset_PoiPois_,
  },
  [ULTRA_FLAMINS]: {
    chain: "matic",
    tokenAddress: smartContractAddresses.ULTRA_FLAMINGO,
    ownerAddressPrefix: asset_UltraFlamingos_,
  },
  [GAME_CHARACTERS]: {
    chain: "matic",
    tokenAddress: smartContractAddresses.GAME_CHARACTERS,
    ownerAddressPrefix: asset_GameCharacters_,
  },
  [LANDS]: {
    chain: "matic",
    tokenAddress: smartContractAddresses.LAND,
    ownerAddressPrefix: asset_Lands_,
  },
};

module.exports = async ({ type }) => {
  console.log(
    "running refreshAssets:",
    stringify({
      type,
    })
  );

  // await Moralis.start({ serverUrl, appId });

  const params = typeToParams[type];

  if (!params) {
    throw new Error(`operation error: invalid type: ${type}`);
  }

  const { chain, tokenAddress, ownerAddressPrefix } = params;

  await refreshAssetsCore({
    chain,
    tokenAddress,
    ownerAddressPrefix,
  });

  console.log("refreshAssets executed successfully:", stringify({}));
};

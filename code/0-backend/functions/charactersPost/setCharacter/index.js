"use strict";

const {
  stringify,
  addTransactionAndUpdateUser,
  database: { getDatabaseEntry },
  constants: {
    nftKeys: { POIPOI, GAME_CHARACTERS, ULTRA_FLAMINS },
    smartContractAddresses,
    aws: {
      database: {
        tableNames: { ASSETS },
        assetsPrefixes: {
          asset_PoiPois_,
          asset_GameCharacters_,
          asset_UltraFlamingos_,
        },
      },
    },
    transactions: {
      types: { CHARACTER_SELECT },
    },
  },
} = require("compute-utils");

const getAssetsKey = ({ type, id }) => {
  switch (type) {
    case POIPOI:
      return `nft_${smartContractAddresses.POI_POI_PROD_ONLY}_${id}`;
    case GAME_CHARACTERS:
      return `nft_${smartContractAddresses.GAME_CHARACTERS}_${id}`;
    case ULTRA_FLAMINS:
      return `nft_${smartContractAddresses.ULTRA_FLAMINGO}_${id}`;
    default:
      throw new Error(`internal server error, invalid type provided ${type}`);
  }
};

const getComparisonAddress = ({ type, address }) => {
  switch (type) {
    case POIPOI:
      return `${asset_PoiPois_}${address}`;
    case GAME_CHARACTERS:
      return `${asset_GameCharacters_}${address}`;
    case ULTRA_FLAMINS:
      return `${asset_UltraFlamingos_}${address}`;
    default:
      throw new Error(`internal server error, invalid type provided ${type}`);
  }
};

const getExtraBonus = ({ type }) => {
  switch (type) {
    case POIPOI:
      return 0;
    case GAME_CHARACTERS:
      return 400;
    case ULTRA_FLAMINS:
      return 15;
    default:
      throw new Error(
        `internal server error, getExtraBonus: invalid type provided ${type}`
      );
  }
};

module.exports = async ({ address, type, id }) => {
  console.log(
    "🧚‍♀️running setCharacter with the following values:",
    stringify({ address, type, id })
  );

  const assetsKey = getAssetsKey({
    type,
    id,
  });

  const asset = await getDatabaseEntry({
    tableName: ASSETS,
    value: assetsKey,
  });

  const comparisonAddress = getComparisonAddress({
    type,
    address,
  });

  if (!asset || asset.ownerAddress !== comparisonAddress) {
    const error = new Error(`invalid character specified`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const extraBattleBonus = getExtraBonus({ type });

  await addTransactionAndUpdateUser({
    address,
    type: CHARACTER_SELECT,
    value: {
      type,
      id,
      battleBonus: (asset.battleBonus || 0) + extraBattleBonus,
    },
    // metadata,
    // fullRefresh: true,
    // searchRefresh: true,
    // dryRun: false,
  });

  const responseValues = {};

  console.log(
    "🧚‍♀️setCharacter executed successfully, " +
      "returning values: " +
      stringify(Object.keys(responseValues))
  );

  return responseValues;
};

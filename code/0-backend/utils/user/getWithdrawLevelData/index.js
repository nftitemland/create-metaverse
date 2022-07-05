"use strict";

// const {
//   stringify,
//   // addTransactionAndUpdateUser,
//   database: { searchDatabase },
//   constants: {
//     aws: {
//       database: {
//         tableNames: { ASSETS },
//         secondaryIndices: { ownerAddressIndex },
//         assetsPrefixes: { asset_PoiPois_ },
//       },
//     },
//     nftKeys: { POIPOI },
//     // transactions: {
//     //   types: { CHARACTER_SELECT },
//     // },
//   },
// } = require("compute-utils");

const stringify = require("../../stringify");
const searchDatabase = require("../../database/searchDatabase");
const {
  aws: {
    database: {
      tableNames: { ASSETS },
      secondaryIndices: { ownerAddressIndex },
      assetsPrefixes: {
        asset_PoiPois_,
        asset_GameCharacters_,
        asset_UltraFlamingos_,
      },
    },
  },
  nftKeys: { POIPOI, GAME_CHARACTERS, ULTRA_FLAMINS },
  withdraws: { GLOBAL_WITHDRAW_CONSTANT, MAXIMUM_WITHDRAW_LEVEL },
  // transactions: {
  //   types: { CHARACTER_SELECT },
  // },
} = require("../../constants");

const SEARCH_LIMIT = 100;
/*
    assetLevels: [
        {   
            type: POIPOI,
            amount: 6
        },
        {   
            type: POIPOI,
            amount: 6
        },
    ]
*/

const getAssetLevelDatum = async ({
  address,
  type,
  assetPrefix,
  defaultWithdrawLevel = 0,
  onlyGetIfUserHasAsset = false,
  shouldGetNftTypes = false,
}) => {
  console.log(
    `running getAssetLevelDatum, with the following values: ` +
      stringify({
        address,
        type,
        assetPrefix,
        onlyGetIfUserHasAsset,
      })
  );

  const assetLevelDatum = {
    type,
    amount: 0,
  };

  if (shouldGetNftTypes) {
    assetLevelDatum.nftTypes = new Set();
  }

  let paginationValueToUse = null;

  const ownerAddressKey = `${assetPrefix}${address}`;

  do {
    const searchParams = {
      TableName: ASSETS,
      IndexName: ownerAddressIndex,
      Limit: onlyGetIfUserHasAsset ? 1 : SEARCH_LIMIT,
      ScanIndexForward: true,
      KeyConditionExpression: `#ownerAddress = :ownerAddress`,
      ExpressionAttributeNames: {
        "#ownerAddress": "ownerAddress",
      },
      ExpressionAttributeValues: {
        ":ownerAddress": ownerAddressKey,
      },
      ExclusiveStartKey: paginationValueToUse,
    };

    const searchDatabaseResults = await searchDatabase({
      searchParams,
    });

    if (onlyGetIfUserHasAsset) {
      if (searchDatabaseResults.ultimateResults.length > 0) {
        assetLevelDatum.amount = defaultWithdrawLevel;

        console.log(
          "getAssetLevelDatum [onlyGetIfUserHasAsset mode] " +
            `executed successfully: ${stringify(assetLevelDatum)}`
        );
        return assetLevelDatum;
      }
    }

    for (const asset of searchDatabaseResults.ultimateResults) {
      if (typeof asset.withdrawLevel === "number") {
        assetLevelDatum.amount += asset.withdrawLevel;
      } else {
        assetLevelDatum.amount += defaultWithdrawLevel;
      }

      if (shouldGetNftTypes) {
        if (asset.nftType) {
          assetLevelDatum.nftTypes.add(asset.nftType);
        }
      }
    }

    paginationValueToUse = searchDatabaseResults.paginationValue;
  } while (paginationValueToUse);

  if (shouldGetNftTypes) {
    assetLevelDatum.nftTypes = Array.from(assetLevelDatum.nftTypes);
  }

  console.log(
    `getAssetLevelDatum executed successfully: ${stringify(assetLevelDatum)}`
  );

  return assetLevelDatum;
};

module.exports = async ({
  address,
  types = [POIPOI, GAME_CHARACTERS, ULTRA_FLAMINS],
}) => {
  console.log(
    "running getWithdrawLevelData with the following values:",
    stringify({
      address,
    })
  );

  const withdrawLevelData = {
    assetLevelData: [],
    totalWithdrawLevel: 0,
    globalWithdrawConstant: GLOBAL_WITHDRAW_CONSTANT,
    maximumWithdrawLevel: MAXIMUM_WITHDRAW_LEVEL,
  };

  const assetLevelDatumGetPromises = [];

  if (types.includes(POIPOI)) {
    assetLevelDatumGetPromises.push(
      getAssetLevelDatum({
        address,
        type: POIPOI,
        assetPrefix: asset_PoiPois_,
        defaultWithdrawLevel: 0.1,
        shouldGetNftTypes: true,
      })
    );
  }

  if (types.includes(GAME_CHARACTERS)) {
    assetLevelDatumGetPromises.push(
      getAssetLevelDatum({
        address,
        type: GAME_CHARACTERS,
        assetPrefix: asset_GameCharacters_,
        defaultWithdrawLevel: 5,
      })
    );
  }

  if (types.includes(ULTRA_FLAMINS)) {
    assetLevelDatumGetPromises.push(
      getAssetLevelDatum({
        address,
        type: ULTRA_FLAMINS,
        assetPrefix: asset_UltraFlamingos_,
        defaultWithdrawLevel: 1,
        onlyGetIfUserHasAsset: true,
      })
    );
  }

  // const [
  //   poiPoiWithdrawLevelDatum,
  //   gameCharactersWithdrawLevelDatum,
  //   ultraFlaminWithdrawLevelDatum,
  // ] =

  const assetLevelData = await Promise.all(assetLevelDatumGetPromises);

  withdrawLevelData.assetLevelData.push(...assetLevelData);

  for (const assetLevelDatum of withdrawLevelData.assetLevelData) {
    withdrawLevelData.totalWithdrawLevel += assetLevelDatum.amount;
  }

  if (
    withdrawLevelData.totalWithdrawLevel >
    withdrawLevelData.maximumWithdrawLevel
  ) {
    withdrawLevelData.totalWithdrawLevel =
      withdrawLevelData.maximumWithdrawLevel;
  }

  console.log(
    "getWithdrawLevelData executed successfully:",
    stringify({
      withdrawLevelData,
    })
  );

  return withdrawLevelData;
};

/*
  get PoiPois

  gur: 2x
  
  gigaRarePoi: 1.25x
  hyperRarePoi: 1x
  regularPoiPoi: 0.5x

  landCastle: 5x
  landCondoDogePenthouse: 1x
  landCondoPuppyPenthouse: 0.8x
  landCondoFlamingo: 0.8x
  landCondoPremiumPixiePenthouse: 0.8x
  landCondoPixiePenthouse: 0.8x
  landCondoPixieCondo: 0.8x
  landRareFlamingo: 1x
  landFlamingo: 1x
  landLargeHouse: 1x
  landMansion: 1x
  landRareMansion: 1x
  landDoubleDiamond: 0.2x
  landDiamond: 0.2x
  lands: 0.2x


  Pois: 0.01

  otherwise:
      0.0001

  get lands
  get pois
*/

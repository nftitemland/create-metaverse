"use strict";

const uuid = require("uuid");
const stringify = require("../stringify");
const getReferralCode = require("../user/getReferralCode");
const getDatabaseEntry = require("../database/getDatabaseEntry");
const updateDatabaseEntry = require("../database/updateDatabaseEntry");

// const classicalUpdateDatabaseEntry = require("../database/classicalUpdateDatabaseEntry");
const {
  aws: {
    database: {
      // tableNameToPartitionKey,
      // assetsMetadataKeys: { metadata_firstLandClaim },
      tableNames: { USERS }, //, ASSETS },
      // dataTypes: { MINT_INITIALIZATION },
      // assetsMetadataKeys: { metadata_landClaim },
    },
  },
  users: {
    visibilities: { PUBLIC },
    attributeVisibilities: { ADDRESS, ART_POINTS },
  },
  // environment: { isProductionMode },
} = require("../constants");
const getUUID = require("../javascript/getUUID");
const getUserBattleHpValueData = require("../battle/getUserBattleHpValueData");
const getModHp = require("../javascript/getModHp");

// const getLandTokenData = require("./getLandTokenData");
// const getEarliestAirdropClaim = require("../metaverse/getEarliestAirdropClaim");

// // const USER_REFRESH_TIME = 0;
// // const USER_REFRESH_TIME = 1000 * 60 * 15;
// const USER_REFRESH_TIME = Infinity;
// const TIME_TO_EDIT_AIRDROP = 3 * (1000 * 60 * 60 * 24);

// const getAssetsAddressKey = ({ address }) => {
//   return `landClaim_${address}`;
// };

module.exports = async ({ address }) => {
  console.log(
    "🦒running getUserData with the following values:",
    stringify({
      address,
    })
  );

  let user = await getDatabaseEntry({
    tableName: USERS,
    value: address,
  });

  if (!user) {
    console.log(
      `🦒🔨user not found for address "${address}", ` + "creating user"
    );

    await updateDatabaseEntry({
      tableName: USERS,
      entry: {
        username: `Poi${getUUID().substring(0, 7)}`,
        partitionKey: address,
        secondarySortKey: 0,
        visibilities: {
          [ART_POINTS]: false,
          [ADDRESS]: false,
        },
        secondaryPartitionKey: PUBLIC,
        xPosition: 0,
        yPosition: 0,
        land: 1,
        landClaimLevel: 0,
        userId: uuid.v4(),
        hp: 0,
        referralCodeData: null,
      },
      onlyAddDbEntryIfNotAlreadyExists: true,
    });

    console.log(`🦒🔨user created`);

    // await delay(2000);

    user = await getDatabaseEntry({
      tableName: USERS,
      value: address,
    });
  }

  const txDbCache = user.txDbCache || {};

  const responseValues = {
    username: user.username,
    address: user.address,
    public: user.secondaryPartitionKey === PUBLIC,
    artPoints: user.secondarySortKey,
    visibilities: user.visibilities,
    landClaimLevel: user.landClaimLevel || 0,
    referralCode: getReferralCode({ userId: user.userId }),
    // miniGameFinishAmount: user.miniGameFinishAmount,
    // miniGameStart: user.miniGameStart,
    // xPosition: user.xPosition || 0,
    // yPosition: user.yPosition || 0,
    // land: user.land || 1,
    xPosition: user.xPosition || 0,
    yPosition: user.yPosition || 0,
    //
    referralCodeData: user.referralCodeData || null,
    // CrypDolls
    crypDollCount: txDbCache.pixiePowderDataCrypDollsNftCount || 0,
    crypDollCrystals: txDbCache.pixiePowderDataCrypDolls || 0,
    // Custom PJS
    customPixieCount: txDbCache.pixiePowderDataCustomPixieJarsNftCount || 0,
    customPixieCrystals: txDbCache.pixiePowderDataCustomPixieJars || 0,
    // PJs
    minitablePixieJarsCount: txDbCache.pixiePowderDataPixieJarsNftCount || 0,
    minitablePixieJarsCrystals: txDbCache.pixiePowderDataPixieJars || 0,
    // PoiPois
    poiPoiCount: txDbCache.pixiePowderPoiPoisNftCount || 0,
    poiPoiCrystals: txDbCache.pixiePowderPoiPois || 0,
    // Lands
    landsCount: txDbCache.pixiePowderLandsNftCount || 0,
    landsCrystals: txDbCache.pixiePowderLands || 0,
    // Ultra Flamin
    ultraFlaminCount: txDbCache.pixiePowderUltraFlaminNftCount || 0,
    ultraFlaminCrystals: txDbCache.pixiePowderUltraFlamin || 0,
    // Fantastic Flamingo
    fantasticFlamingoCount: txDbCache.pixiePowderFantasticFlamingoNftCount || 0,
    fantasticFlamingoCrystals: txDbCache.pixiePowderFantasticFlamingo || 0,
    // Lonely Frog
    lonelyFrogCount: txDbCache.pixiePowderLonelyFrogNftCount || 0,
    lonelyFrogCrystals: txDbCache.pixiePowderLonelyFrog || 0,
    // Crypto Chicks
    cryptoChicksCount: txDbCache.pixiePowderCryptoChicksNftCount || 0,
    cryptoChicksCrystals: txDbCache.pixiePowderCryptoChicks || 0,

    // character: txDbCache.selectedCharacter || null,
  };

  // if (!isProductionMode) {
  //   responseValues.partyLoginToken = user.partyLoginToken;
  // }

  const userBattleHpValueData = getUserBattleHpValueData({
    user,
  });

  responseValues.hp = getModHp(userBattleHpValueData.userBattleHpValue);
  responseValues.characterLevel = userBattleHpValueData.characterLevel;

  // if (!isProductionMode) {
  responseValues.userId = user.userId;
  responseValues.character = txDbCache.selectedCharacter || null;
  responseValues.battleMode = txDbCache.battleMode || false;
  responseValues.battleLoseCount = txDbCache.battleLoseCount;
  responseValues.battleWinCount = txDbCache.battleWinCount;

  if (txDbCache.battleData) {
    responseValues.battleData = {
      info: txDbCache.battleData.startData,
      turnData: txDbCache.battleData.state,
    };

    if (txDbCache.battleData.victoryData) {
      responseValues.battleData.battleEnd = true;

      //   // winnerAddress: user.partitionKey,
      //   // winAmount: battleStartData.battleValue,
      //   // loserAddress: user.txDbCache.battleData.enemyAddress,
      //   // loseAmount: battleStartData.battleValue,
      //   const isWinner =
      //     txDbCache.battleData.victoryData.winnerAddress === address;
      //   responseValues.battleData.winInfo = {
      //     isWinner,
      //     amount: isWinner
      //       ? txDbCache.battleData.victoryData.winAmount
      //       : -txDbCache.battleData.victoryData.loseAmount,
      //   };
    }
  }

  if (txDbCache.lastBattleData) {
    const isWinner =
      txDbCache.lastBattleData.victoryData.winnerAddress === address;

    responseValues.lastBattleData = {
      isWinner,
      amount: isWinner
        ? txDbCache.lastBattleData.victoryData.winAmount
        : -txDbCache.lastBattleData.victoryData.loseAmount,
    };
  }
  // }

  console.log(
    "🦒getUserData executed successfully, " +
      "returning values: " +
      stringify(Object.keys(responseValues))
  );

  return responseValues;
};

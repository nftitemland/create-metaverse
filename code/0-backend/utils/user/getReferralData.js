"use strict";

const getUserData = require("../getUserData");
const stringify = require("../stringify");
const getWithdrawLevelData = require("./getWithdrawLevelData");
const { nftKeys } = require("../constants");

const earningLvlData = {
  ULTRA_EARN: {
    name: "Ultra Earn",
    percentage: 80,
  },
  GIGA_EARN: {
    name: "Giga Earn",
    percentage: 50,
  },
  BOOSTED_EARN: {
    name: "Boosted Earn",
    percentage: 25,
  },
  NORMAL_EARN: {
    name: "Normal Earn",
    percentage: 15,
  },
};

const getEarningsPercentageData = async ({ address }) => {
  const withdrawLevelData = await getWithdrawLevelData({
    address,
  });

  const poiPoiAssetLevelDatum = withdrawLevelData.assetLevelData.filter(
    (datum) => {
      return datum.type === nftKeys.POIPOI;
    }
  )[0];

  if (poiPoiAssetLevelDatum.amount > 0) {
    return earningLvlData.ULTRA_EARN;
  }

  const gameCharactersAssetLevelDatum = withdrawLevelData.assetLevelData.filter(
    (datum) => {
      return datum.type === nftKeys.GAME_CHARACTERS;
    }
  )[0];

  if (gameCharactersAssetLevelDatum.amount > 0) {
    return earningLvlData.GIGA_EARN;
  }

  const poiAssetLevelDatum = withdrawLevelData.assetLevelData.filter(
    (datum) => {
      return datum.type === nftKeys.ULTRA_FLAMINS;
    }
  )[0];

  if (poiAssetLevelDatum.amount > 0) {
    return earningLvlData.BOOSTED_EARN;
  }

  return earningLvlData.NORMAL_EARN;
};

/*
  const assetLevelDatum = {
      type,
      amount: 0,
  };

  withdrawLevelData = {
      assetLevelData: [],
      totalWithdrawLevel: 0,
      globalWithdrawConstant: GLOBAL_WITHDRAW_CONSTANT,
      maximumWithdrawLevel: MAXIMUM_WITHDRAW_LEVEL,
  };
*/

module.exports = async ({ address }) => {
  console.log(
    "running getReferralData " +
      "with the following values: " +
      stringify({
        address,
      })
  );

  // const dbEntry = await getDatabaseEntry({
  //   tableName: USERS,
  //   value: address,
  // });

  const userData = await getUserData({ address });

  const makeshiftRefCodeData = (userData && userData.referralCodeData) || {};

  const referralData = {
    referralCode: makeshiftRefCodeData.referralCode || null,
    userId: userData.userId,
    discountPercentage: makeshiftRefCodeData.discountPercentage || null,
    earningsPercentageData: await getEarningsPercentageData({
      address,
    }),
  };

  console.log(
    "getReferralData executed successfully, " +
      `obtained referral data: ${stringify(referralData)}`
  );

  return referralData;
};

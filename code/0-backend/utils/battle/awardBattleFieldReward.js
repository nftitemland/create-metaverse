"use strict";

const {
  transactions: {
    types: { BATTLE_V1_FIELD_REWARD },
  },
  battle: {
    rewards: {
      // BATTLE_FIELD_AWARD_RATE,
      MINIMUM_PIXIE_CRYSTAL_VALUE,
      BATTLE_FIELD_AWARD_ADDITIVE_RATE,
    },
  },
} = require("../constants");
const getRoundedNumber = require("../getRoundedNumber");
const addTransactionAndUpdateUser = require("../addTransactionAndUpdateUser");
const stringify = require("../stringify");

const PIXIE_CRYSTAL_BONUS_HOURLY_RATIO = 1 / 10000;

const getPixieCrystalBonus = ({ pixieCrystalCount }) => {
  return pixieCrystalCount * PIXIE_CRYSTAL_BONUS_HOURLY_RATIO;
};

module.exports = async ({ user }) => {
  console.log(
    "🐼📈running awardBattleFieldReward: " +
      stringify({
        address: user.partitionKey,
      })
  );

  const pixieCrystalCount =
    user.secondarySortKey < MINIMUM_PIXIE_CRYSTAL_VALUE
      ? MINIMUM_PIXIE_CRYSTAL_VALUE
      : user.secondarySortKey;

  const pixieCrystalBonus = getPixieCrystalBonus({
    pixieCrystalCount,
  });

  console.log(
    "Pixie Crystal Bonus:",
    stringify({
      pixieCrystals: user.secondarySortKey,
      pixieCrystalCount,
      pixieCrystalBonus,
    })
  );

  await addTransactionAndUpdateUser({
    address: user.partitionKey,
    type: BATTLE_V1_FIELD_REWARD,
    value: {
      // amount: getRoundedNumber(pixieCrystalCount * AWARD_RATE),
      amount: getRoundedNumber(
        BATTLE_FIELD_AWARD_ADDITIVE_RATE + pixieCrystalBonus
      ),
      awardRate: BATTLE_FIELD_AWARD_ADDITIVE_RATE,
    },
  });

  const responseValues = {};

  console.log(
    "awardBattleFieldReward successfully " +
      "returning values: " +
      stringify(responseValues)
  );

  return responseValues;
};

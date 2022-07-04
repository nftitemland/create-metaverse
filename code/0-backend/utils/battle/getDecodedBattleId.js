"use strict";

// const getBattleId = ({ userId, enemyUserId }) => {
//   return `${BATTLE_V1}_${userId}_${enemyUserId}`;
// };
const {
  transactions: {
    types: { BATTLE_V1 },
  },
} = require("../constants");

const STARTING_TAG = `${BATTLE_V1}_`;

const getDecodedBattleId = (battleId) => {
  if (
    !battleId ||
    typeof battleId !== "string" ||
    !battleId.startsWith(STARTING_TAG)
  ) {
    throw new Error(
      "getDecodedBattleId error: invalid battle ID provided: " + battleId
    );
  }

  const [userId, enemyUserId] = battleId
    .substring(STARTING_TAG.length)
    .split("_");

  return {
    userId,
    enemyUserId,
  };
};

module.exports = getDecodedBattleId;

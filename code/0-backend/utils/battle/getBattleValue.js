"use strict";

const {
  battle: {
    battle: { MINIMUM_BATTLE_VALUE },
  },
} = require("../constants");

const getBattleValue = ({ user, characterLevel }) => {
  const pixieCrystals = user.secondarySortKey || 0;

  const modPixieCrystals = pixieCrystals + characterLevel;

  if (modPixieCrystals < MINIMUM_BATTLE_VALUE) {
    return MINIMUM_BATTLE_VALUE;
  }

  return modPixieCrystals;
};

module.exports = getBattleValue;

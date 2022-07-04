"use strict";

const getCharacterLevel = require("./getCharacterLevel");
const getBattleValue = require("./getBattleValue");

const getUserBattleHpValue = ({ user }) => {
  const characterLevel = getCharacterLevel({
    user,
  });

  const userBattleHpValue = getBattleValue({
    user,
    characterLevel,
  });

  return {
    characterLevel,
    userBattleHpValue,
  };
};

module.exports = getUserBattleHpValue;

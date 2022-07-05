"use strict";

const {
  stringify,
  getRoundedNumber,
  // database: { getDatabaseEntry },
  battle: { getUserBattleHpValueData },
  javascript: { getModHp },
  constants: {
    battle: {
      battle: { MINIMUM_BATTLE_VALUE, BATTLE_VALUE_MULTIPLIER_CONSTANT },
    },
  },
} = require("compute-utils");

const LOSE_MULTIPLIER = 1;

const getRawBattleBattleValue = ({ userBattleValue, enemyUserBattleValue }) => {
  if (
    userBattleValue <= MINIMUM_BATTLE_VALUE ||
    enemyUserBattleValue <= MINIMUM_BATTLE_VALUE
  ) {
    return MINIMUM_BATTLE_VALUE;
  }

  if (enemyUserBattleValue > userBattleValue) {
    return userBattleValue;
  }

  return enemyUserBattleValue;
};

module.exports = ({ user, enemyUser }) => {
  console.log("running getBattleStartData:", stringify({}));

  const userBattleHpValueData = getUserBattleHpValueData({
    user,
  });
  const userBattleValue = userBattleHpValueData.userBattleHpValue;
  const userCharacterLevel = userBattleHpValueData.characterLevel;

  const enemyUserBattleHpValueData = getUserBattleHpValueData({
    user: enemyUser,
  });
  const enemyUserBattleValue = enemyUserBattleHpValueData.userBattleHpValue;
  const enemyUserCharacterLevel = enemyUserBattleHpValueData.characterLevel;

  const userHasMoreBattleValue = userBattleValue >= enemyUserBattleValue;

  const rawBattleBattleValue = getRawBattleBattleValue({
    userBattleValue,
    enemyUserBattleValue,
  });

  const battleValue = getRoundedNumber(
    rawBattleBattleValue * BATTLE_VALUE_MULTIPLIER_CONSTANT
  );

  const enemyUserCharacterData = {
    characterLevel: enemyUserCharacterLevel,
  };

  enemyUserCharacterData.selectedCharacter = enemyUser.txDbCache
    .selectedCharacter
    ? {
        id: enemyUser.txDbCache.selectedCharacter.id,
        type: enemyUser.txDbCache.selectedCharacter.type,
      }
    : null;

  const userHp = getModHp(userBattleValue);
  const enemyHp = getModHp(enemyUserBattleValue);

  const battleStartData = {
    battleValue: battleValue,
    isFirst: userHasMoreBattleValue,

    hp: userHp,
    attack: getRoundedNumber(userHp / 3),

    enemyUserId: enemyUser.userId,
    enemyHp: enemyHp,
    enemyAttack: getRoundedNumber(enemyHp / 3),

    userCharacterData: {
      selectedCharacter: user.txDbCache.selectedCharacter
        ? {
            id: user.txDbCache.selectedCharacter.id,
            type: user.txDbCache.selectedCharacter.type,
          }
        : null,
      characterLevel: userCharacterLevel,
    },
    enemyUserCharacterData,
    loseAmount: getRoundedNumber(battleValue * LOSE_MULTIPLIER),
  };

  console.log(
    "getBattleStartData executed successfully:",
    stringify({
      battleStartData,
    })
  );

  return battleStartData;
};

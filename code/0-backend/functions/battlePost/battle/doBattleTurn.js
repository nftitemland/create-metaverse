"use strict";

const {
  getRoundedNumber,
  stringify,
  constants: {
    battle: {
      actions: { USER_ATTACK, ENEMY_USER_ATTACK },
    },
  },
  javascript: { getRandomArbitrary },
} = require("compute-utils");

const getIsUserTurn = ({ isFirst, currentTurn }) => {
  if (isFirst) {
    return !!(currentTurn % 2);
  }

  return !!((currentTurn + 1) % 2);
};

const attackOffsetConstant = 0.7;
const getAttackOffsetMultiplier = () => {
  return getRandomArbitrary(1 - attackOffsetConstant, 1 + attackOffsetConstant);
};

module.exports = ({ user }) => {
  console.log("running doBattleTurn:", stringify({}));

  const battleStartData = user.txDbCache.battleData.startData;
  const battleState = user.txDbCache.battleData.state;

  const currentTurn = battleState.turn + 1;

  const isUserTurn = getIsUserTurn({
    isFirst: battleStartData.isFirst,
    currentTurn,
  });

  const newState = Object.assign({}, battleState, {
    turn: currentTurn,
    isUserTurn,
  });

  const turnActionData = {};

  if (isUserTurn) {
    const attackOffsetMultiplier = getAttackOffsetMultiplier();
    turnActionData.action = USER_ATTACK;
    turnActionData.damage = getRoundedNumber(
      battleStartData.attack * attackOffsetMultiplier
    );
    turnActionData.attackOffsetMultiplier = attackOffsetMultiplier;
    newState.enemyDamage = getRoundedNumber(
      newState.enemyDamage + turnActionData.damage
    );
  } else {
    const attackOffsetMultiplier = getAttackOffsetMultiplier();
    turnActionData.action = ENEMY_USER_ATTACK;
    turnActionData.damage = getRoundedNumber(
      battleStartData.enemyAttack * attackOffsetMultiplier
    );
    turnActionData.attackOffsetMultiplier = attackOffsetMultiplier;
    newState.damage = getRoundedNumber(newState.damage + turnActionData.damage);
  }

  const userHasWon = newState.enemyDamage >= battleStartData.enemyHp;
  const enemyHasWon = newState.damage >= battleStartData.hp;

  console.log(
    "doBattleTurn battle action analysis:",
    stringify({
      newState,
      userHp: battleStartData.hp,
      enemyHp: battleStartData.enemyHp,
      userHasWon,
      enemyHasWon,
    })
  );

  let victoryData = null;

  if (userHasWon) {
    victoryData = {
      winnerAddress: user.partitionKey,
      winAmount: battleStartData.battleValue,
      loserAddress: user.txDbCache.battleData.enemyAddress,
      loseAmount: battleStartData.loseAmount || 0, // temp default 0 safeguard
    };
  } else if (enemyHasWon) {
    victoryData = {
      winnerAddress: user.txDbCache.battleData.enemyAddress,
      winAmount: battleStartData.battleValue,
      loserAddress: user.partitionKey,
      loseAmount: battleStartData.loseAmount || 0,
    };
  }

  return {
    newState,
    victoryData,
    turnActionData,
  };
};

"use strict";

const {
  drq,
  stringify,
  constants: {
    transactions: {
      types: { BATTLE_V1 },
    },
  },
  user: { getUserByUserId, getUser },
  addTransactionAndUpdateUser,
} = require("compute-utils");

const getBattleStartData = require("./getBattleStartData");
const doBattleTurn = require("./doBattleTurn");
const ensureHasNotJustBattled = require("./ensureHasNotJustBattled");

const getBattleId = ({ userId, enemyUserId }) => {
  return `${BATTLE_V1}_${userId}_${enemyUserId}`;
};

const battleCore = async ({ address, enemyUserId }) => {
  console.log(
    "🦒🥊running battle with the following values:",
    stringify({
      address,
      enemyUserId,
    })
  );

  let user = await getUser({
    address,
  });

  if (user.userId === enemyUserId) {
    const error = new Error(`cannot battle self`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (!user) {
    throw new Error(
      "safeguard battle error - missing user data for address: " + address
    );
  }

  if (!user.txDbCache) {
    await addTransactionAndUpdateUser({
      address,
      type: "PIXIE_POWDER_BONUS",
      value: 0,
      metadata: {
        note: "BattleStartBonus",
      },
    });

    user = await getUser({
      address,
    });
  }

  if (user.txDbCache.battleData) {
    if (user.txDbCache.battleData.victoryData) {
      const error = new Error(`error in battle request, please try again`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    const battleId = getBattleId({
      userId: user.userId,
      enemyUserId: enemyUserId,
    });

    if (user.txDbCache.battleData.battleId !== battleId) {
      const error = new Error(`invalid enemy user specified: ${enemyUserId}`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    const { newState, victoryData, turnActionData } = doBattleTurn({
      user,
    });

    const atauuValue = {
      battleId,
      battleState: newState,
      turnActionData,
    };

    if (victoryData) {
      atauuValue.victoryData = victoryData;
    }

    await addTransactionAndUpdateUser({
      address,
      type: BATTLE_V1,
      value: atauuValue,
      // dryRun: true,
    });

    const responseValues = {};

    if (victoryData) {
      const isWinner = victoryData.winnerAddress === address;

      responseValues.lastBattleData = {
        isWinner,
        amount: isWinner ? victoryData.winAmount : -victoryData.loseAmount,
      };
    }

    console.log(
      `🦒🥊battle executed successfully [Turn ${newState.turn}], ` +
        "returning values: " +
        stringify(responseValues)
    );

    return responseValues;
  }

  const battleId = getBattleId({
    userId: user.userId,
    enemyUserId: enemyUserId,
  });

  await ensureHasNotJustBattled({
    address,
    battleId,
  });

  console.log("🥊fresh battle");

  const enemyUser = await getUserByUserId({
    userId: enemyUserId,
  });

  if (!enemyUser) {
    const error = new Error(`invalid enemy user specified: ${enemyUserId}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const battleStartData = getBattleStartData({
    user,
    enemyUser,
  });

  const battleState = {
    turn: 0,
    damage: 0,
    enemyDamage: 0,
    isUserTurn: !battleStartData.isFirst,
  };

  await addTransactionAndUpdateUser({
    address,
    type: BATTLE_V1,
    value: {
      battleId,
      enemyAddress: enemyUser.partitionKey,
      userPixieCrystals: user.secondarySortKey,
      enemyUserPixieCrystals: enemyUser.secondarySortKey,
      battleStartData,
      battleState,
    },
    // dryRun: true,
  });

  const responseValues = {};

  console.log(
    "🦒🥊battle executed successfully [Turn 0], " +
      "returning values: " +
      stringify(responseValues)
  );

  return responseValues;
};

module.exports = async ({ address, enemyUserId }) => {
  console.log("🦒🥊Let Us Battle🦒🥊");

  const responseValues = {};

  await drq({
    queueId: drq.getQueueId({
      name: "battlePost",
      id: address,
    }),
    operation: async () => {
      const result = await battleCore({ address, enemyUserId });

      Object.assign(responseValues, result);
    },
  });

  return responseValues;
};

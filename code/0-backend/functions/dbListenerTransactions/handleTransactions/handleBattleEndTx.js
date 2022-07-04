"use strict";

const {
  stringify,
  addTransactionAndUpdateUser,
  constants: {
    transactions: {
      types: {
        // raffle,
        BATTLE_V1_REWARDS,
      },
    },
  },
  user: { getUser },
} = require("compute-utils");

module.exports = async ({ transaction }) => {
  console.log(
    "🐸🥊running handleBattleEndTx with the following values:" +
      stringify({
        transaction,
      })
  );

  const user = await getUser({
    address: transaction.partitionKey,
  });

  if (!user.txDbCache.battleData.victoryData) {
    // safeguard
    throw new Error("unexpected error, user has no victory data");
  }

  const userHasWon =
    transaction.partitionKey === transaction.value.victoryData.winnerAddress;

  const {
    userAddress,
    enemyUserAddress,
    userBattleValue,
    enemyUserBattleValue,
  } = userHasWon
    ? {
        userAddress: transaction.value.victoryData.winnerAddress,
        enemyUserAddress: transaction.value.victoryData.loserAddress,
        userBattleValue: transaction.value.victoryData.winAmount,
        enemyUserBattleValue: transaction.value.victoryData.loseAmount,
      }
    : {
        userAddress: transaction.value.victoryData.loserAddress,
        enemyUserAddress: transaction.value.victoryData.winnerAddress,
        userBattleValue: transaction.value.victoryData.loseAmount,
        enemyUserBattleValue: transaction.value.victoryData.winAmount,
      };

  const updateUserPromise = addTransactionAndUpdateUser({
    address: userAddress,
    type: BATTLE_V1_REWARDS,
    value: {
      isUser: true,
      isWinner: userHasWon,
      battleValue: userBattleValue,
    },
    // dryRun: true,
  });

  const updateEnemyUserPromise = addTransactionAndUpdateUser({
    address: enemyUserAddress,
    type: BATTLE_V1_REWARDS,
    value: {
      isUser: false,
      isWinner: !userHasWon,
      battleValue: enemyUserBattleValue,
    },
    // dryRun: true,
  });

  await Promise.all([updateUserPromise, updateEnemyUserPromise]);

  console.log("🐸🥊handleBattleEndTx executed successfully");
};

"use strict";

const {
  stringify,
  addTransactionAndUpdateUser,
  constants: {
    transactions: {
      types: {
        // raffle,
        BATTLE_V2,
      },
    },
  },
  delay,
} = require("compute-utils");

module.exports = async ({ transaction }) => {
  console.log(
    "🐸🥊🥊running handleBattleV2Instigation with the following values:" +
      stringify({
        transaction,
      })
  );

  await addTransactionAndUpdateUser({
    address: transaction.value.enemyAddress,
    type: BATTLE_V2,
    value: {
      battleId: transaction.value.battleId,
      amount: -transaction.value.amount,
      userId: transaction.value.enemyUserId,
      enemyAddress: transaction.partitionKey,
      enemyUserId: transaction.value.userId,
      instigator: false,
    },
    // dryRun: true,
  });

  console.log("🐸🥊🥊handleBattleV2Instigation executed successfully");

  await delay(2500);
};

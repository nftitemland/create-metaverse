"use strict";

const {
  drq,
  stringify,
  getRoundedNumber,
  javascript: { getRandomArbitrary },
  battle: { getUserBattleHpValueData },
  constants: {
    transactions: {
      types: { BATTLE_V2 },
    },
    battle: {
      battle: { MINIMUM_BATTLE_VALUE, BATTLE_VALUE_MULTIPLIER_CONSTANT },
    },
  },
  user: { getUserByUserId, getUser },
  addTransactionAndUpdateUser,
} = require("compute-utils");

const ensureHasNotJustBattled = require("./ensureHasNotJustBattled");

const getBattleV2Id = ({ userId, enemyUserId }) => {
  return `${BATTLE_V2}_${userId}_${enemyUserId}`;
};

const MAX_WIN_NUMBER = 0.8;

const getBattleValData = ({ user, enemyUser }) => {
  const userBattleHpValueData = getUserBattleHpValueData({
    user,
  });
  const userBattleValue = userBattleHpValueData.userBattleHpValue;

  const enemyUserBattleHpValueData = getUserBattleHpValueData({
    user: enemyUser,
  });
  const enemyUserBattleValue = enemyUserBattleHpValueData.userBattleHpValue;

  const battleValData = {
    userBattleValue,
    enemyUserBattleValue,
  };

  if (
    userBattleValue <= MINIMUM_BATTLE_VALUE ||
    enemyUserBattleValue <= MINIMUM_BATTLE_VALUE
  ) {
    battleValData.absoluteAmount = MINIMUM_BATTLE_VALUE;
  } else if (enemyUserBattleValue > userBattleValue) {
    battleValData.absoluteAmount = userBattleValue;
  } else {
    battleValData.absoluteAmount = enemyUserBattleValue;
  }

  const combinedBattleValues = userBattleValue + enemyUserBattleValue;

  battleValData.combinedBattleValues = combinedBattleValues;

  let winNumber = userBattleValue / combinedBattleValues;

  if (winNumber > MAX_WIN_NUMBER) {
    winNumber = MAX_WIN_NUMBER;
  }

  battleValData.winNumber = winNumber;

  return battleValData;
};

const battleCore = async ({ address, enemyUserId }) => {
  console.log(
    "🦒🥊running battle with the following values:",
    stringify({
      address,
      enemyUserId,
    })
  );

  const user = await getUser({
    address,
  });

  if (!user) {
    throw new Error(
      "safeguard battle error - missing user data for address: " + address
    );
  }

  if (user.userId === enemyUserId) {
    const error = new Error(`cannot battle self`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const enemyUser = await getUserByUserId({
    userId: enemyUserId,
  });

  if (!enemyUser) {
    const error = new Error(`invalid enemy user specified: ${enemyUserId}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const battleId = getBattleV2Id({
    userId: user.userId,
    enemyUserId: enemyUser.userId,
  });

  await ensureHasNotJustBattled({
    address,
    battleId,
  });

  const {
    absoluteAmount,
    winNumber,
    userBattleValue,
    enemyUserBattleValue,
    combinedBattleValues,
  } = getBattleValData({
    user,
    enemyUser,
  });

  const battleValue = getRoundedNumber(
    absoluteAmount * BATTLE_VALUE_MULTIPLIER_CONSTANT
  );

  const randomArbitrary = getRandomArbitrary(0, 1);

  const hasWon = randomArbitrary <= winNumber;

  const amount = hasWon ? battleValue : -battleValue;

  console.log(
    "Battle Log: " +
      stringify({
        combinedBattleValues,
        userBattleValue,
        enemyUserBattleValue,
        randomArbitrary,
        winNumber,
        absoluteAmount,
        battleValue,
        hasWon,
        amount,
      })
  );

  await addTransactionAndUpdateUser({
    address,
    type: BATTLE_V2,
    value: {
      battleId,
      amount,
      enemyUserId: enemyUser.userId,
      enemyAddress: enemyUser.partitionKey,
      userId: user.userId,
      instigator: true,
    },
  });

  const responseValues = {
    amount,
  };

  console.log(
    "🦒🥊battle executed successfully, " +
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
      name: "battleV2Post",
      id: address,
    }),
    operation: async () => {
      const result = await battleCore({ address, enemyUserId });

      Object.assign(responseValues, result);
    },
  });

  return responseValues;
};

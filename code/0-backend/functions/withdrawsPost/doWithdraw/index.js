"use strict";

const {
  stringify,
  getRoundedNumber,
  database: { updateDatabaseEntry },
  user: { getWithdrawLevelData, getUser },
  constants: {
    // environment: { isProductionMode },
    withdraws: {
      GLOBAL_WITHDRAW_CONSTANT,
      statuses: { PENDING },
    },
    aws: {
      database: {
        // tableNameToPartitionKey,
        tableNames: { METADATA },
      },
    },
    transactions: {
      types: { WITHDRAW_REQUEST },
    },
  },
  javascript: { getUUID },
  addTransactionAndUpdateUser,
} = require("compute-utils");

const ensureWithdrawNotTooSoon = require("./ensureWithdrawNotTooSoon");

const globalWithdrawConstant = GLOBAL_WITHDRAW_CONSTANT;

const minimumTotalWithdrawAmount = 0.00000001;

// const performMetaverseAction = require("./performMetaverseAction");
// const claimLand = require("./claimLand2");
// const quickLandClaim = require("./quickLandClaim");
// const updateMiniGame = require("./updateMiniGame");

module.exports = async ({ address, amount, withdrawAddress }) => {
  console.log(
    "🧚‍♀️running doWithdraw with the following values:",
    stringify({
      address,
      amount,
      withdrawAddress,
      globalWithdrawConstant,
    })
  );

  // TODO: GET Global withdraw
  let { totalWithdrawLevel } = await getWithdrawLevelData({
    address,
  });

  // totalWithdrawLevel = 0.1;

  // totalWithdrawLevel += isProductionMode ? 0 : 1;

  if (totalWithdrawLevel === 0) {
    const error = new Error("user withdraw level too low");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const user = await getUser({
    address,
  });

  if (user.secondarySortKey < amount) {
    const error = new Error("user does not have enough Pixie Crystals");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  await ensureWithdrawNotTooSoon({
    address,
  });

  const totalWithdrawAmount = getRoundedNumber(
    (amount * totalWithdrawLevel) / globalWithdrawConstant
  );

  if (totalWithdrawAmount < minimumTotalWithdrawAmount) {
    const error = new Error("user does not have enough Pixie Crystals");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const withdrawId = `withdraw_${getUUID()}_${Date.now()}`;

  console.log(
    "doWithdraw: user is able to make requested withdraw: " +
      stringify({
        totalWithdrawAmount,
        withdrawId,
      })
  );

  await addTransactionAndUpdateUser({
    address,
    type: WITHDRAW_REQUEST,
    value: {
      withdrawId,
      withdrawAddress,
      amount,
      totalWithdrawLevel,
      globalWithdrawConstant,
      totalWithdrawAmount,
    },
    // dryRun: true,
  });

  const withdrawEntry = {
    partitionKey: `withdraw_${address}_${Date.now()}`,
    secondaryPartitionKey: address,
    type: WITHDRAW_REQUEST,
    status: PENDING,
    withdrawAddress,
    amount,
    totalWithdrawLevel,
    globalWithdrawConstant,
    totalWithdrawAmount,
    withdrawId,
    secondarySortKey: Date.now(),
  };

  await updateDatabaseEntry({
    tableName: METADATA,
    entry: withdrawEntry,
    // onlyAddDbEntryIfNotAlreadyExists: true,
  });

  const responseValues = {};

  console.log(
    "🧚‍♀️doWithdraw executed successfully returning values:",
    stringify({
      responseValues,
    })
  );

  return responseValues;
};

"use strict";

const {
  stringify,
  database: { classicalUpdateDatabaseEntry },
  addTransactionAndUpdateUser,
  constants: {
    withdraws: { GLOBAL_WITHDRAW_CONSTANT },
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNames: { METADATA },
      },
    },
    deposits: {
      statuses: { COMPLETE },
    },
    withdraws: { MAXIMUM_WITHDRAW_LEVEL },
    transactions: {
      types: { DEPOSIT_V1 },
    },
  },
  getRoundedNumber,
} = require("compute-utils");

module.exports = async ({ metadata }) => {
  console.log(
    "💰💰running handlePendingDepositMetadata with the following values:" +
      stringify({
        metadata,
      })
  );

  const totalDepositAmount = getRoundedNumber(
    (metadata.amount * GLOBAL_WITHDRAW_CONSTANT) / MAXIMUM_WITHDRAW_LEVEL
  );

  await addTransactionAndUpdateUser({
    address: metadata.fromAddress,
    type: DEPOSIT_V1,
    value: {
      amount: metadata.amount,
      totalDepositAmount,
      globalWithdrawConstant: GLOBAL_WITHDRAW_CONSTANT,
      maximumWithdrawLevel: MAXIMUM_WITHDRAW_LEVEL,
      transactionHash: metadata.transactionHash,
    },
  });

  const updateExpression = "SET #status = :status";

  const expressionAttributeNames = {
    "#status": "status",
  };

  const expressionAttributeValues = {
    ":status": COMPLETE,
  };

  await classicalUpdateDatabaseEntry({
    tableName: METADATA,
    key: tableNameToPartitionKey[METADATA],
    value: metadata.partitionKey,
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  });

  console.log("💰💰handlePendingDepositMetadata executed successfully");
};

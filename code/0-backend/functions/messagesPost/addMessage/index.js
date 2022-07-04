"use strict";

const {
  stringify,
  // database: { classicalUpdateDatabaseEntry },
  constants: {
    // aws: {
    //   database: {
    //     tableNameToPartitionKey,
    //     tableNames: { USERS },
    //   },
    // },
    transactions: {
      types: { ADD_MESSAGE_PUBLIC },
    },
  },
  addTransactionAndUpdateUser,
} = require("compute-utils");

// const updateMiniGame = require("./updateMiniGame");

module.exports = async ({ address, message }) => {
  console.log(
    "🧚‍♀️running addMessage with the following values:",
    stringify({
      address,
      message,
    })
  );

  await addTransactionAndUpdateUser({
    address,
    type: ADD_MESSAGE_PUBLIC,
    value: message,
  });

  const responseValues = {};

  console.log(
    "🧚‍♀️addMessage executed successfully, " +
      "returning values: " +
      stringify(responseValues)
  );

  return responseValues;
};

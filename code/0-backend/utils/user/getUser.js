"use strict";

const stringify = require("../stringify");
const {
  // transactions: {
  //   types: { BATTLE_V1 },
  // },
  aws: {
    database: {
      tableNames: { USERS },
    },
  },
} = require("../constants");
const getDatabaseEntry = require("../database/getDatabaseEntry");
// const {
//   stringify,
//   // getRoundedNumber,
//   database: { getDatabaseEntry },
// constants: {
//   // transactions: {
//   //   types: { BATTLE_V1 },
//   // },
//   aws: {
//     database: {
//       tableNames: { USERS },
//     },
//   },
// },
//   // user: { getUserByUserId },
//   // addTransactionAndUpdateUser,
// } = require("compute-utils");

module.exports = async ({ address }) => {
  console.log(
    "running getUser with the following values:",
    stringify({
      address,
    })
  );

  const user = await getDatabaseEntry({
    tableName: USERS,
    value: address,
  });

  if (!user) {
    const error = new Error(`invalid user specified: ${address}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  console.log(
    "getUser executed successfully:",
    stringify({
      user: user ? JSON.stringify(Object.keys(user)) : null,
    })
  );

  return user;
};

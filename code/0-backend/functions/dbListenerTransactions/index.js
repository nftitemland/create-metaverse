"use strict";

const handleTransactions = require("./handleTransactions");

exports.handler = Object.freeze(async (event) => {
  console.log("💦Running DB Transactions Listener");

  // if (true) {
  //   return;
  // }

  try {
    await handleTransactions({
      event,
    });

    console.log("💦🐉DB Transactions Listener executed successfully");
  } catch (err) {
    console.log("💦🍣error in DB Transactions Listener:", err);

    // TODO: put error alarm

    throw err;
  }
});

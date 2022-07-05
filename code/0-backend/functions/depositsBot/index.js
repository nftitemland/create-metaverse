"use strict";

const { stringify, sendData } = require("compute-utils");
const doProcessDeposits = require("./doProcessDeposits");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

exports.handler = async (event) => {
  console.log(
    "running depositsBot, here's the omega event:",
    stringify({
      event,
    })
  );
  if (
    !process.env.MORALIS_X_API_KEY ||
    !process.env.WITHDRAWS_MONEY_HOLDER_ADDRESS
  ) {
    throw new Error(
      "depositsBot: setup error: missing MORALIS_X_API_KEY " +
        "or WITHDRAWS_MONEY_HOLDER_ADDRESS"
    );
  }

  try {
    await doProcessDeposits();
  } catch (err) {
    console.log("doProcessDeposits error:", err);

    try {
      await sendData({
        subject: "depositsBot Error",
        message: `The Error Message: ${err.message}`,
      });
    } catch (innerError) {
      console.log(`💦🍣Double error in Deposits Bot: ${innerError.message}`);
    }

    throw err;
  }

  console.log("depositsBot executed successfully:", stringify({}));
};

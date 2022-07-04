"use strict";

const { argv } = require("yargs");

const isProductionMode = argv.mode === "production";

if (isProductionMode) {
  require("dotenv").config({ path: "./.env" });
} else {
  require("dotenv").config({ path: "./.staging.env" });
}

const {
  constants,
  addTransactionAndUpdateUser,
  stringify,
} = require("compute-utils");

const addressData = [
  {
    address: "0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474",
    // value: 2,
    value: -100,
  },
];

const addItem = async () => {
  try {
    console.log(
      "Running addItem with the following values:",
      stringify({
        metadata,
      })
    );

    const { address, value } = addressData[0];

    // const address = "0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474";

    const type = constants.transactions.types.TRANSFER_ITEM;

    // const value = 10000;

    await addTransactionAndUpdateUser({
      address,
      type,
      value,
      metadata,
      fullRefresh: true,
      searchRefresh: true,
      // dryRun: true,
      dryRun: false,
    });

    console.log("addItem executed successfully");
  } catch (err) {
    console.log("error in addItem:", err.message, err.data, err);
  }
};

addItem();

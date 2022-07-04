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

const metadata = {
  note: "Adjustment Bonus",
};

const addressData = [
  // {
  //   address: "0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474",
  //   // value: 2,
  //   value: 10000,
  // },
  // {
  //   // nftitemland.eth
  //   address: "0xf754d5B615c0491Ca152cDC33980a8FDc335ADB6",
  //   value: -5000,
  // },
  // {
  //   // mayur
  //   address: "0x975E054dDaD599868122f45f2fB1C115d1aa1640",
  //   value: 10000,
  // },
];

const awardBonus = async () => {
  try {
    console.log(
      "Running awardBonus with the following values:",
      stringify({
        metadata,
      })
    );

    const { address, value } = addressData[0];

    // const address = "0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474";

    const type = constants.transactions.types.PIXIE_POWDER_BONUS;

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

    console.log("awardBonus executed successfully");
  } catch (err) {
    console.log("error in awardBonus:", err.message, err.data, err);
  }
};

awardBonus();

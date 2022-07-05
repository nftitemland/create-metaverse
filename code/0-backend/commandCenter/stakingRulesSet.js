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

const stakingRules = {
  // name: constants.staking.ruleNames.PREMIER_PIXIE,
  name: constants.staking.ruleNames.PREMIER_PIXIE,
};

const setStakingRules = async () => {
  try {
    console.log(
      "Running setStakingRules with the following values:",
      stringify({
        stakingRules,
      })
    );

    const address = "0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474";

    const type = constants.transactions.types.STAKING_RULES_SET;

    const value = stakingRules;

    await addTransactionAndUpdateUser({ address, type, value, dryRun: false });

    console.log("setStakingRules executed successfully");
  } catch (err) {
    console.log("error in setStakingRules:", err.message, err.data, err);
  }
};

setStakingRules();

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

// const stakingRules = {
//   // name: constants.staking.ruleNames.PREMIER_PIXIE,
//   name: constants.staking.ruleNames.PREMIER_PIXIE,
// };

const setCharacter = async () => {
  try {
    console.log(
      "Running setCharacter with the following values: " +
        stringify({
          //   stakingRules,
        })
    );

    const address = "0x9D6FC8D113c1EC93b24389Cf2d413188FC4bb782";

    const type = constants.transactions.types.CHARACTER_SELECT;

    // const value = stakingRules;

    // await addTransactionAndUpdateUser({ address, type, value, dryRun: false });

    await addTransactionAndUpdateUser({
      address,
      type,
      //   value: {
      //     type,
      //     id,
      //     battleBonus: (asset.battleBonus || 0) + extraBattleBonus,
      //   },

      value: null,
      // metadata,
      fullRefresh: true,
      searchRefresh: true,
      // dryRun: false,
    });

    console.log("setCharacter executed successfully");
  } catch (err) {
    console.log("error in setCharacter:", err.message, err.data, err);
  }
};

setCharacter();

"use strict";

const { stringify } = require("compute-utils");
const reward = require("./reward");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

exports.handler = async (event) => {
  console.log(
    "running battleFieldRewardsBot, here is the omega event:",
    stringify({})
  );

  try {
    await reward();
  } catch (err) {
    console.log("battleFieldRewards error:", err);

    throw err;
  }

  console.log("battleFieldRewardsBot executed successfully:", stringify({}));
};

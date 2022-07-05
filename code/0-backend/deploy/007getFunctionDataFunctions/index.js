"use strict";

const {
  argv: { meta },
} = require("yargs");

if (!meta) {
  module.exports = Object.freeze({
    exchange: require("./exchange"),
  });
} else {
  const jamesBondFunctions = {};

  if (meta.includes("e")) {
    jamesBondFunctions.exchange = require("./exchange");
  }

  module.exports = Object.freeze(jamesBondFunctions);
}

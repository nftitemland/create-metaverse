"use strict";

const exactMath = require("exact-math");

const toWei = (etherAmount) =>
  exactMath.div(etherAmount, 1e18, { returnString: true });
const toEther = (weiAmount) =>
  exactMath.mul(weiAmount, 1e18, { returnString: true });

module.exports = {
  toWei,
  toEther,
};

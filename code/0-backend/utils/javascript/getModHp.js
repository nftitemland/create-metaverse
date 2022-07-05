"use strict";

const getRoundedNumber = require("../getRoundedNumber");

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function getModHp(x) {
  return getRoundedNumber(getBaseLog(10, x / 3000 + 10) * 1000);
}

module.exports = getModHp;

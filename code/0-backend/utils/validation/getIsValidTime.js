"use strict";

const {
  timeReferences: { TIME_1, TIME_2 },
} = require("../constants");

module.exports = (time) => {
  if (!time || typeof time !== "number" || Number.isNaN(time)) {
    return false;
  }

  if (time < TIME_1 || time > TIME_2) {
    return false;
  }

  return true;
};

"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = (
  { noDash = true } = {
    noDash: true,
  }
) => {
  const uuid = uuidv4();

  if (noDash) {
    return uuid.split("-").join("");
  }

  return uuid;
};

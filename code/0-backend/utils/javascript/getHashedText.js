"use strict";
const crypto = require("crypto");

module.exports = (text) => {
  const hashedText = crypto.createHash("md5").update(text).digest("hex");

  return hashedText;
};

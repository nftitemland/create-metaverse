"use strict";

const crypto = require("crypto");

const algorithm = "aes256";
// const key = process.env.LOGIN_ENCRYPTION_KEY_V1;
// const key = "521d3882eeba4fdfbe81e04d896a8523";

/**
 *
 * @param {string} text
 * @param {string} iv
 * @param {string} key
 */
module.exports = (text, iv, key) => {
  if (!key) {
    throw new Error("decrypt error: missing encryption key");
  }

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  // decipher.setAutoPadding(false);
  const decryptedText =
    decipher.update(text, "hex", "utf8") + decipher.final("utf8");

  return decryptedText;
};

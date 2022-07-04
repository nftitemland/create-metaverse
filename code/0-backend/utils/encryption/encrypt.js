"use strict";

const crypto = require("crypto");

const algorithm = "aes256"; // or any other algorithm supported by OpenSSL

/**
 *
 * @param {string} text
 * @param {string} key
 */
module.exports = (text, key) => {
  if (!key) {
    throw new Error("encrypt error: missing encryption key");
  }

  const iv = crypto.randomBytes(16); // generate different ciphertext everytime
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encryptedText =
    cipher.update(text, "utf8", "hex") + cipher.final("hex"); // encrypted text

  return {
    encryptedText,
    iv,
  };
};

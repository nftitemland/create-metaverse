"use strict";

const {
  encryptionKeys: { NTOKEN_ENCRYPTION_KEY_V1 },
  misc: { POI_SEPARATOR },
} = require("../constants");

const decrypt = require("../encryption/decrypt");

const N_TOKEN_V1 = "N_TOKEN_V1";
/*
const getNTokenV1 = ({ expiryDate }) => {
  return `${N_TOKEN_V1}-` + `i-${getUUID()}-` + `e-${expiryDate}`;
};
*/

/**
 *
 * @param {string} nToken
 */
module.exports = (rawNToken) => {
  if (!NTOKEN_ENCRYPTION_KEY_V1) {
    throw new Error(
      "getNTokenV1IfIsValid error: " +
        "missing process.env.NTOKEN_ENCRYPTION_KEY_V1 encryption key"
    );
  }

  if (
    !rawNToken ||
    typeof rawNToken !== "string" ||
    rawNToken.length < 5 ||
    rawNToken.length > 2000
  ) {
    return null;
  }

  const [encryptedNToken, ivBase64String] = rawNToken.split(POI_SEPARATOR);

  const nToken = decrypt(
    encryptedNToken,
    Buffer.from(ivBase64String, "base64"),
    NTOKEN_ENCRYPTION_KEY_V1
  );

  if (
    !nToken ||
    typeof nToken !== "string" ||
    nToken.length < 5 ||
    nToken.length > 1000
  ) {
    return null;
  }

  const [label, idTag, id, expiryTag, expiry] = nToken.split("-");

  const expiryAsNumber = Number(expiry);

  if (
    label !== N_TOKEN_V1 ||
    idTag !== "i" ||
    id.length !== 32 ||
    expiryTag !== "e" ||
    !expiryAsNumber ||
    Number.isNaN(expiryAsNumber)
  ) {
    return null;
  }

  if (Date.now() > expiryAsNumber) {
    console.log("getNTokenV1IfIsValid: nToken has expired");
    return null;
  }

  return nToken;
};

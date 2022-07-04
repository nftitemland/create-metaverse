"use strict";

const {
  encryptionKeys: { POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1 },
  misc: { POI_SEPARATOR },
} = require("../constants");
const web3 = require("web3");

const decrypt = require("../encryption/decrypt");

/*
const getNTokenV1 = ({ expiryDate }) => {
  return `${N_TOKEN_V1}-` + `i-${getUUID()}-` + `e-${expiryDate}`;
};
*/

/**
 *
 * @param {string} nToken
 */
module.exports = (rawMagnaAddress) => {
  if (!POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1) {
    throw new Error(
      "getMagnaObscuredAddressIfIsValid error: " +
        "missing process.env.POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1 " +
        "encryption key"
    );
  }
  // f1082ff306215afb540a324147f8d8f74a5f4f6cc985e90ea33e4a01aaaeaffdf6c86ebb0e13d7877970ef99b4c2fa31-----Poi-----AJcWvKzJFsj6Wtz9lR16rQ==
  if (
    !rawMagnaAddress ||
    typeof rawMagnaAddress !== "string" ||
    rawMagnaAddress.length < 5 ||
    rawMagnaAddress.length > 2000
  ) {
    return null;
  }

  const [encryptedAddress, ivBase64String] =
    rawMagnaAddress.split(POI_SEPARATOR);

  const address = decrypt(
    encryptedAddress,
    Buffer.from(ivBase64String, "base64"),
    POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1
  );

  if (!web3.utils.isAddress(address)) {
    return null;
  }

  return address;
};

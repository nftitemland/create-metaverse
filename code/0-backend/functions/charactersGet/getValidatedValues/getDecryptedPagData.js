"use strict";

const {
  encryption: { decrypt },
  constants: {
    encryptionKeys: { POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1 },
    misc: { POI_SEPARATOR },
  },
} = require("compute-utils");

/**
 *
 * @param {string} nToken
 */
module.exports = (rawEncryptedPagData) => {
  if (!POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1) {
    throw new Error(
      "getDecryptedPagData error: " +
        "missing process.env.POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1 " +
        "encryption key"
    );
  }

  if (
    !rawEncryptedPagData ||
    typeof rawEncryptedPagData !== "string" ||
    rawEncryptedPagData.length < 5 ||
    rawEncryptedPagData.length > 100000
  ) {
    const error = new Error("invalid next data provided");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const [encryptedPagData, ivBase64String] =
    rawEncryptedPagData.split(POI_SEPARATOR);

  const pagData = decrypt(
    encryptedPagData,
    Buffer.from(ivBase64String, "base64"),
    POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1
  );

  // const pagData2 = Buffer.from(pagData, "base64").toString("ascii");

  return pagData;
};

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
    rawEncryptedPagData.length > 2000
  ) {
    return null;
  }

  const [encryptedPagData, ivBase64String] =
    rawEncryptedPagData.split(POI_SEPARATOR);

  const rawPagData = decrypt(
    encryptedPagData,
    Buffer.from(ivBase64String, "base64"),
    POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1
  );

  const pagData = JSON.parse(rawPagData);

  return pagData;
};

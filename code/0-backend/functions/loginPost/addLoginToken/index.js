"use strict";

const {
  stringify,
  database: { updateDatabaseEntry },
  javascript: { getHashedText, getUUID },
  encryption: { encrypt },
  constants: {
    encryptionKeys: { LOGIN_ENCRYPTION_KEY_V1, NTOKEN_ENCRYPTION_KEY_V1 },
    aws: {
      database: {
        tableNames: { LOGIN_TOKENS },
      },
    },
    misc: { POI_SEPARATOR },
  },
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

const expiryTime = 1000 * 60 * 60 * 24 * 7;

const N_TOKEN_V1 = "N_TOKEN_V1";

const getNTokenV1 = ({ expiryDate }) => {
  return `${N_TOKEN_V1}-` + `i-${getUUID()}-` + `e-${expiryDate}`;
};

module.exports = async ({ address }) => {
  console.log(
    "running addLoginToken " +
      "with the following values: " +
      stringify({
        address,
      })
  );

  const thePowerOfNow = Date.now();

  const expiryDate = thePowerOfNow + expiryTime;

  const nToken = getNTokenV1({
    expiryDate,
  });

  const hashedNToken = getHashedText(nToken);
  const encryptionResults = encrypt(hashedNToken, LOGIN_ENCRYPTION_KEY_V1);

  const loginToken = {
    partitionKey: ethUtil.toChecksumAddress(address),
    sortKey: thePowerOfNow,
    encryptedHashedNToken: encryptionResults.encryptedText,
    iv: encryptionResults.iv,
  };

  try {
    await updateDatabaseEntry({
      tableName: LOGIN_TOKENS,
      entry: loginToken,
    });
  } catch (err) {
    console.log(
      "addLoginToken 3uhjsfbsdfbjhs: strange updateDatabaseEntry error:",
      err
    );
    throw new Error("Internal Server Error");
  }

  const { encryptedText, iv } = encrypt(nToken, NTOKEN_ENCRYPTION_KEY_V1);

  const results = {
    nToken: `${encryptedText}${POI_SEPARATOR}${iv.toString("base64")}`,
    expiry: expiryDate,
  };

  console.log("addLoginToken executed successfully: " + stringify(results));

  return results;
};

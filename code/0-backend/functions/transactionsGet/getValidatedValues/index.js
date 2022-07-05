"use strict";

const {
  stringify,
  validation: { getNTokenV1IfIsValid },
  web3,
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");
const getDecryptedPagData = require("./getDecryptedPagData");

const safeGetDecodedPag = (rawPag) => {
  try {
    const pag = Buffer.from(rawPag, "base64").toString("ascii");

    return pag;
  } catch (err) {
    const error = new Error("invalid next data provided");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }
};

module.exports = ({ rawAddress, rawNToken, rawPag }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawNToken,
      rawPag,
      // rawEnemyUserId,
    })
  );

  if (
    !rawAddress ||
    typeof rawAddress !== "string" ||
    rawAddress.length > 500
  ) {
    const error = new Error('missing "address" parameter');
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (!web3.utils.isAddress(rawAddress)) {
    const error = new Error(`invalid "address" provided ${rawAddress}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const nToken = getNTokenV1IfIsValid(rawNToken);

  if (!nToken) {
    const error = new Error(`invalid login-token`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  // if (
  //   !rawEnemyUserId ||
  //   typeof rawEnemyUserId !== "string" ||
  //   rawEnemyUserId.length !== 36
  // ) {
  //   const error = new Error(`invalid enemy user ID`);
  //   error.statusCode = 400;
  //   error.bulltrue = true;
  //   throw error;
  // }

  const values = {
    address: ethUtil.toChecksumAddress(rawAddress),
    nToken,
    // enemyUserId: rawEnemyUserId,
  };

  if (!!rawPag) {
    const pag = getDecryptedPagData(safeGetDecodedPag(rawPag));

    if (
      typeof pag !== "object" ||
      !pag.partitionKey ||
      typeof pag.partitionKey !== "string" ||
      typeof pag.sortKey !== "string" ||
      typeof pag.secondarySortKey !== "number"
    ) {
      const error = new Error("invalid next data provided");
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    values.pag = pag;
  } else {
    values.pag = null;
  }

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

"use strict";

const {
  stringify,
  validation: { getNTokenV1IfIsValid },
  web3,
  constants: {
    nftKeys: { POIPOI, GAME_CHARACTERS, ULTRA_FLAMINS },
  },
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

module.exports = ({ rawAddress, rawNToken, rawType, rawId }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawNToken,
      rawType,
      rawId,
    })
  );

  const stringRawId = String(rawId);

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

  const checksumAddress = ethUtil.toChecksumAddress(rawAddress);

  if (![POIPOI, GAME_CHARACTERS, ULTRA_FLAMINS].includes(rawType)) {
    const error = new Error(`invalid type provided`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (!stringRawId || stringRawId.length > 1250) {
    const error = new Error(`invalid id provided`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const values = {
    address: checksumAddress,
    nToken,
    type: rawType,
    id: stringRawId,
  };

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

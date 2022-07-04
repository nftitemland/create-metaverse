"use strict";

const {
  stringify,
  validation: { getNTokenV1IfIsValid, getIsValidTime },
  web3,
  constants: {
    // transactions: {
    //   types: { STAKING_REWARD },
    // },
    timeReferences: { TIME_1, TIME_2 },
  },
  // validation: { getMagnaObscuredAddressIfIsValid },
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

const TEN_DAYS = 1000 * 60 * 60 * 24 * 9;

module.exports = ({
  rawAddress,
  rawNToken,
  rawStartTime,
  rawEndTime,
  // rawPag,
}) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawNToken,
      rawStartTime,
      rawEndTime,
      // rawPag,
    })
  );

  const startTime = Number(rawStartTime) || TIME_1;
  const endTime = Number(rawEndTime) || TIME_2;

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

  if (!getIsValidTime(startTime)) {
    const error = new Error(`invalid startTime provided: ${startTime}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (!getIsValidTime(endTime)) {
    const error = new Error(`invalid endTime provided: ${endTime}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (startTime >= endTime || endTime - startTime > TEN_DAYS) {
    const error = new Error(`invalid startTime and endTime provided`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const checksumAddress = ethUtil.toChecksumAddress(rawAddress);

  const values = {
    address: checksumAddress,
    nToken,
    startTime,
    endTime,
    // pag: rawPag,
  };

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

"use strict";

const {
  stringify,
  // validation: { getIsValidEthAddress },
  web3,
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

module.exports = ({ rawAddress, rawSignature, rawLoginToken }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawSignature,
      rawLoginToken,
    })
  );

  if (!rawAddress) {
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

  if (
    !rawSignature ||
    typeof rawSignature !== "string" ||
    rawSignature.length > 3000
  ) {
    const error = new Error("invalid signature");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (
    !rawLoginToken ||
    typeof rawLoginToken !== "string" ||
    rawLoginToken.length > 3000
  ) {
    const error = new Error("invalid login-token");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const values = {
    address: ethUtil.toChecksumAddress(rawAddress),
    signature: rawSignature,
    loginToken: rawLoginToken,
  };

  console.log(
    "getValidatedValues executed successfully, " +
      "Got Validated Values: " +
      stringify(values)
  );

  return values;
};

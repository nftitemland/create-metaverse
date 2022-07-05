"use strict";

const {
  stringify,
  validation: { getNTokenV1IfIsValid },
  web3,
  // getRoundedNumber,
  // constants: {
  //   nftKeys: { POIPOI },
  // },
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

module.exports = ({ rawAddress, rawNToken }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawNToken,
      // rawAmount,
      // rawWithdrawAddress,
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

  const checksumAddress = ethUtil.toChecksumAddress(rawAddress);

  const nToken = getNTokenV1IfIsValid(rawNToken);

  if (!nToken) {
    const error = new Error(`invalid login-token`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const values = {
    address: checksumAddress,
    nToken,
    // withdrawAddress: checksumWithdrawAddress,
    // amount: getRoundedNumber(rawAmount),
  };

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

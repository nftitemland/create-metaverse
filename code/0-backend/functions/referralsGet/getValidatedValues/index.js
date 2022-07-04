"use strict";

const {
  stringify,
  // validation: { getNTokenV1IfIsValid },
  web3,
  // constants: {
  //   nftKeys: { POIPOI, GAME_CHARACTERS, ULTRA_FLAMINS },
  // },
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

module.exports = ({ rawAddress }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
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

  const values = {
    address: checksumAddress,
  };

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

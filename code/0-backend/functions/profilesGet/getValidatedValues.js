"use strict";

const {
  stringify,
  // validation: { getNTokenV1IfIsValid },
  web3,
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

const MODE = "metaverse";

module.exports = ({ rawAddress, rawMode }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawMode,
    })
  );

  const values = {
    address: undefined,
    mode: undefined,
  };

  if (!!rawAddress) {
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

    values.address = ethUtil.toChecksumAddress(rawAddress);
  }

  if (!!rawMode) {
    if (rawMode !== MODE) {
      const error = new Error(`invalid mode`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    values.mode = MODE;
  }

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

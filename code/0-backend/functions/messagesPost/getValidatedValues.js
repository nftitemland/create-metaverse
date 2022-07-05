"use strict";

const {
  stringify,
  validation: { getNTokenV1IfIsValid },
  web3,
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

const MAX_MESSAGE_LENGTH = 140;

module.exports = ({ rawAddress, rawNToken, rawMessage }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawNToken,
      rawMessage,
    })
  );

  const message = rawMessage;

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

  if (
    !message ||
    typeof message !== "string" ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    const error = new Error(`invalid message`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const values = {
    address: ethUtil.toChecksumAddress(rawAddress),
    nToken,
    message,
  };

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

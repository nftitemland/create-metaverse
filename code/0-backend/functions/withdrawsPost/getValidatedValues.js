"use strict";

const {
  stringify,
  validation: { getNTokenV1IfIsValid },
  web3,
  getRoundedNumber,
  // constants: {
  //   nftKeys: { POIPOI },
  // },
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

// const minimumAmount = 300;
const minimumAmount = 0.00000001;
const maximumAmount = 300000000;

const addressWhiteList = ["0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474"];

const WHITELIST_ACCESS_END_TIME = 1647338400000;

module.exports = ({ rawAddress, rawNToken, rawAmount, rawWithdrawAddress }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawNToken,
      rawAmount,
      rawWithdrawAddress,
    })
  );

  // if (true) {
  //   const error = new Error(`withdraw temporarily closed`);
  //   error.statusCode = 400;
  //   error.bulltrue = true;
  //   throw error;
  // }

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

  if (
    Date.now() < WHITELIST_ACCESS_END_TIME &&
    !addressWhiteList.includes(checksumAddress)
  ) {
    const error = new Error(`user ${checksumAddress} is not in whitelist`);
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
    !rawWithdrawAddress ||
    typeof rawWithdrawAddress !== "string" ||
    rawWithdrawAddress.length > 500
  ) {
    const error = new Error("missing withdraw address parameter");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (!web3.utils.isAddress(rawWithdrawAddress)) {
    const error = new Error(
      `invalid withdraw address provided ${rawWithdrawAddress}`
    );
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const checksumWithdrawAddress = ethUtil.toChecksumAddress(rawWithdrawAddress);

  rawAmount = Number(rawAmount);

  if (
    !rawAmount ||
    typeof rawAmount !== "number" ||
    Number.isNaN(rawAmount) ||
    rawAmount < minimumAmount ||
    rawAmount > maximumAmount
  ) {
    const error = new Error(`invalid withdraw amount provided ${rawAmount}`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const values = {
    address: checksumAddress,
    nToken,
    withdrawAddress: checksumWithdrawAddress,
    amount: getRoundedNumber(rawAmount),
  };

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

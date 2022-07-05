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

module.exports = ({ rawAddress, rawSignature, rawReferralCode }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawSignature,
      rawReferralCode,
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

  if (
    !rawSignature ||
    typeof rawSignature !== "string" ||
    rawSignature.length > 10000
  ) {
    const error = new Error("invalid signature provided");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (
    !rawReferralCode ||
    typeof rawReferralCode !== "string" ||
    rawReferralCode.length > 1000
  ) {
    const error = new Error("invalid referral code provided");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const values = {
    address: checksumAddress,
    signature: rawSignature,
    referralCode: rawReferralCode,
  };

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

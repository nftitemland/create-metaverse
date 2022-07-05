"use strict";

const {
  stringify,
  validation: {
    //getNTokenV1IfIsValid,
    getIsValidTime,
  },
  // web3,
  constants: {
    transactions: {
      types: { ADD_MESSAGE_PUBLIC },
    },
    timeReferences: { TIME_1, TIME_2 },
  },
  validation: { getMagnaObscuredAddressIfIsValid },
} = require("compute-utils");
//const ethUtil = require("ethereumjs-util");

const safeGetDecodedPag = (rawPag) => {
  try {
    const stringifiedPag = Buffer.from(rawPag, "base64").toString("ascii");

    const pag = JSON.parse(stringifiedPag);

    return pag;
  } catch (err) {
    const error = new Error("invalid next data provided");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }
};

module.exports = ({
  // rawAddress,
  // rawNToken,
  rawStartTime,
  rawEndTime,
  rawPag,
}) => {
  console.log(
    "getValidatedValues:",
    stringify({
      // rawAddress,
      // rawNToken,
      rawStartTime,
      rawEndTime,
      rawPag,
    })
  );

  const startTime = Number(rawStartTime) || TIME_1;
  const endTime = Number(rawEndTime) || TIME_2;

  // if (
  //   !rawAddress ||
  //   typeof rawAddress !== "string" ||
  //   rawAddress.length > 500
  // ) {
  //   const error = new Error('missing "address" parameter');
  //   error.statusCode = 400;
  //   error.bulltrue = true;
  //   throw error;
  // }

  // if (!web3.utils.isAddress(rawAddress)) {
  //   const error = new Error(`invalid "address" provided ${rawAddress}`);
  //   error.statusCode = 400;
  //   error.bulltrue = true;
  //   throw error;
  // }

  // const nToken = getNTokenV1IfIsValid(rawNToken);

  // if (!nToken) {
  //   const error = new Error(`invalid login-token`);
  //   error.statusCode = 400;
  //   error.bulltrue = true;
  //   throw error;
  // }

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

  const values = {
    // address: ethUtil.toChecksumAddress(rawAddress),
    // nToken,
    startTime,
    endTime,
    // pag: rawPag,
  };

  if (rawPag) {
    const decodedPag = safeGetDecodedPag(rawPag);
    if (
      typeof decodedPag !== "object" ||
      !decodedPag.powerMagna ||
      typeof decodedPag.powerMagna !== "string" ||
      !decodedPag.id ||
      typeof decodedPag.id !== "string" ||
      decodedPag.id.length !== 36 ||
      !decodedPag.time ||
      typeof decodedPag.time !== "number" ||
      Number.isNaN(decodedPag.time)
    ) {
      const error = new Error("invalid next data provided");
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    const magnaAddress = getMagnaObscuredAddressIfIsValid(
      decodedPag.powerMagna
    );

    if (!magnaAddress) {
      const error = new Error("invalid next data provided");
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    values.pag = {
      partitionKey: magnaAddress,
      sortKey: decodedPag.id,
      type: ADD_MESSAGE_PUBLIC,
      secondarySortKey: decodedPag.time,
    };
  }

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

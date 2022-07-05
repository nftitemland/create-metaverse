"use strict";

const {
  stringify,
  validation: { getNTokenV1IfIsValid },
  web3,
  constants: {
    nftKeys,
    // aws: {
    //   database: {
    //     assetsPrefixes: { asset_PoiPois_ },
    //   },
    // },
  },
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

const getDecryptedPagData = require("./getDecryptedPagData");

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

module.exports = ({ rawAddress, rawNToken, rawPag, rawMode }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawNToken,
      rawPag,
      rawMode,
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

  const nToken = getNTokenV1IfIsValid(rawNToken);

  if (!nToken) {
    const error = new Error(`invalid login-token`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const checksumAddress = ethUtil.toChecksumAddress(rawAddress);

  if (
    ![nftKeys.POIPOI, nftKeys.GAME_CHARACTERS, nftKeys.ULTRA_FLAMINS].includes(
      rawMode
    )
  ) {
    const error = new Error(`invalid mode`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const values = {
    address: checksumAddress,
    nToken,
    mode: rawMode,
  };

  if (!!rawPag) {
    const decodedPag = safeGetDecodedPag(rawPag);

    values.pag = safeGetDecodedPag(getDecryptedPagData(decodedPag));
  } else {
    values.pag = null;
  }

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

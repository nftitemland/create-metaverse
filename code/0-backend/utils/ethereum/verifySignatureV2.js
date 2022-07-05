"use strict";

const stringify = require("../stringify");

// const {
//   environment: { isProductionMode },
// } = require("../constants");

const sigUtil = require("eth-sig-util");
const ethUtil = require("ethereumjs-util");

// const chainId = isProductionMode ? "0x1" : "0x4";
// const verifyingContract = isProductionMode
// ? "0xd4d29a9ea76d6e31bd02af1d02549a35db08a30d"
// : "0x5bbbd40be357f77086a5fa5a7a1bf933d12ab697";

const NFT_ITEM_LOGIN_TOKEN_V2 = "NFT_ITEM_LOGIN_TOKEN_V2";

const verifyLoginTokenV2 = (loginToken, providedAddress) => {
  const [tag, addressTag, address, timeTag, time, expiryTag, expiry] =
    loginToken.split("-");

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         tag,
  //         addressTag,
  //         address,
  //         providedAddress,
  //         timeTag,
  //         time,
  //         expiryTag,
  //         expiry,

  //         a: tag !== NFT_ITEM_LOGIN_TOKEN_V2,
  //         b: addressTag !== "a",
  //         d:
  //           ethUtil.toChecksumAddress(address) !==
  //           ethUtil.toChecksumAddress(providedAddress),
  //         e: timeTag !== "t",
  //         f: !time,
  //         g: time.length < 2,
  //         h: Number.isNaN(Number(time)),
  //         i: expiryTag !== "e",
  //         j: !expiry,
  //         m: expiry.length < 2,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  if (
    tag !== NFT_ITEM_LOGIN_TOKEN_V2 ||
    addressTag !== "a" ||
    ethUtil.toChecksumAddress(address) !==
      ethUtil.toChecksumAddress(providedAddress) ||
    timeTag !== "t" ||
    !time ||
    time.length < 2 ||
    Number.isNaN(Number(time)) ||
    expiryTag !== "e" ||
    !expiry ||
    expiry.length < 2
  ) {
    throw new Error("Invalid Login Token");
  }

  // TODO: expiry should not be too far away from now
  // time should not be too far away from expiry
  // consider other security implications
  const expiryAsNumber = Number(expiry);

  if (
    !expiryAsNumber ||
    Number.isNaN(expiryAsNumber) ||
    Date.now() > expiryAsNumber
  ) {
    const error = new Error("Login Token has expired");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }
};

module.exports = ({ address, loginToken, signature }) => {
  console.log(
    "running verifySignatureV2 with the following values:",
    stringify({
      address,
      loginToken,
      signature,
    })
  );
  const recoveredTypedSignature = sigUtil.recoverTypedSignature_v4({
    // data: JSON.parse(msgParams),
    data: {
      domain: {},
      message: {
        contents: loginToken,
      },
      // primaryType: "LoginToken",
      // types: { LoginToken: [] },

      primaryType: "LoginToken",
      types: {
        LoginToken: [{ name: "contents", type: "string" }],
      },
    },
    sig: signature,
  });

  if (
    ethUtil.toChecksumAddress(recoveredTypedSignature) !==
    ethUtil.toChecksumAddress(address)
  ) {
    console.log("verifySignatureV2: failed");
    throw new Error("Failed to Verify Signature");
  }

  verifyLoginTokenV2(loginToken, address);

  console.log("verifySignatureV2: Executed Successfully");
};

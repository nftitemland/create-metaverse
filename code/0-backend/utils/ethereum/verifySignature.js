"use strict";

const stringify = require("../stringify");

const {
  environment: { isProductionMode },
} = require("../constants");

const sigUtil = require("eth-sig-util");
const ethUtil = require("ethereumjs-util");

const chainId = isProductionMode ? "0x1" : "0x4";
const verifyingContract = isProductionMode
  ? "0xd4d29a9ea76d6e31bd02af1d02549a35db08a30d"
  : "0x5bbbd40be357f77086a5fa5a7a1bf933d12ab697";

module.exports = ({ address, loginToken, signature }) => {
  console.log(
    "running verifySignature with the following values:",
    stringify({
      address,
      loginToken,
      signature,
    })
  );
  const msgParams = JSON.stringify({
    domain: {
      chainId,
      name: "NFT Item",
      verifyingContract,
      version: "1",
    },
    message: {
      contents: loginToken,
    },
    primaryType: "LoginToken",
    types: {
      LoginToken: [],
    },
  });
  //   const from = "0xa2ca536b9facdf345344601e13b6178387ce9043";
  //   const result = {
  //     jsonrpc: "2.0",
  //     result:
  //       "0x34a80f68570a1915578e9b1387afbee62dba68e48a2238521062586451d138153a73e20a4497136019167fbc7b92b656f58a67e9a38c74cab0d554e39712d3721c",
  //   };

  //   console.log("TYPED SIGNED:" + JSON.stringify(result.result, null, 4));
  const recoveredTypedSignature = sigUtil.recoverTypedSignature_v4({
    data: JSON.parse(msgParams),
    sig: signature,
  });

  if (
    ethUtil.toChecksumAddress(recoveredTypedSignature) !==
    ethUtil.toChecksumAddress(address)
  ) {
    console.log("verifySignature: failed");
    throw new Error("Failed to Verify Signature");
  }

  console.log("verifySignature: Executed Successfully");
};

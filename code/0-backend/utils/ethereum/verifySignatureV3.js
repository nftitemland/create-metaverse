"use strict";

const stringify = require("../stringify");

const sigUtil = require("eth-sig-util");
const ethUtil = require("ethereumjs-util");

module.exports = ({ address, primaryType, dataString, signature }) => {
  console.log(
    "running verifySignatureV3 with the following values:",
    stringify({
      address,
      primaryType,
      dataString,
      signature,
    })
  );

  const recoveredTypedSignature = sigUtil.recoverTypedSignature_v4({
    // data: JSON.parse(msgParams),
    data: {
      domain: {},
      message: {
        contents: dataString,
      },
      // primaryType: "LoginToken",
      // types: { LoginToken: [] },

      primaryType,
      types: {
        [primaryType]: [{ name: "contents", type: "string" }],
      },
    },
    sig: signature,
  });

  if (
    ethUtil.toChecksumAddress(recoveredTypedSignature) !==
    ethUtil.toChecksumAddress(address)
  ) {
    console.log("verifySignatureV3: failed");
    throw new Error("Failed to Verify Signature");
  }

  console.log("verifySignatureV3: Executed Successfully");
};

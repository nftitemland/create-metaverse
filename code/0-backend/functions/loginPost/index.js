"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  ethereum: { verifySignatureV2 },
} = require("compute-utils");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
const addLoginToken = require("./addLoginToken");

// TODO, move to constants
const headerKeys = {
  NFTITEM__ADDRESS: "nftitem-address",
  NFTITEM__WEB3_SIGNATURE: "nftitem-web3-signature",
  NFTITEM__LOGIN_TOKEN: "nftitem-login-token",
};

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/login POST");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    const rawSignature =
      formattedEvent.headers[headerKeys.NFTITEM__WEB3_SIGNATURE];
    const rawLoginToken =
      formattedEvent.headers[headerKeys.NFTITEM__LOGIN_TOKEN];
    const rawAddress = formattedEvent.headers[headerKeys.NFTITEM__ADDRESS];

    const { address, signature, loginToken } = getValidatedValues({
      rawAddress,
      rawSignature,
      rawLoginToken,
    });

    verifySignatureV2({
      address,
      signature,
      loginToken,
    });

    const results = await addLoginToken({
      address,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_3679523645876",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/login POST - " +
        "function executed successfully: " +
        stringify({ responseData })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(`error in Lambda /expansive-world/login POST function: ${err}`);

    return handleError(err);
  }
};

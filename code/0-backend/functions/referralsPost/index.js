"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  ethereum: { verifySignatureV3 },
  // constants: { httpHeaderKeys },
  // authorizeUser,
  // beginningDragonProtection,
} = require("compute-utils");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
const setReferralCodeData = require("./setReferralCodeData");
// TODO, move to constants

const headerKeys = {
  NFTITEM__ADDRESS: "nftitem-address",
  NFTITEM__WEB3_SIGNATURE: "nftitem-web3-signature",
  NFTITEM__REFERRAL_CODE: "nftitem-referral-code",
};

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /referrals POST");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    // const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    // const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    // const rawType = formattedEvent.body.type;
    // const rawId = formattedEvent.body.id;

    const rawSignature =
      formattedEvent.headers[headerKeys.NFTITEM__WEB3_SIGNATURE];
    const rawReferralCode =
      formattedEvent.headers[headerKeys.NFTITEM__REFERRAL_CODE];
    const rawAddress = formattedEvent.headers[headerKeys.NFTITEM__ADDRESS];

    const { address, signature, referralCode } = getValidatedValues({
      rawAddress,
      rawSignature,
      rawReferralCode,
    });

    verifySignatureV3({
      address,
      primaryType: "ReferralCode",
      dataString: referralCode,
      signature,
    });

    const results = await setReferralCodeData({
      address,
      referralCode,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_al23sd23sjahdbub",
      },
      results
    );

    console.log(
      "the Lambda /referrals POST - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(`error in Lambda /referrals POST function: ${err}`);

    return handleError(err);
  }
};

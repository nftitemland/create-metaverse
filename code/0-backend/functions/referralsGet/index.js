"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  // ethereum: { verifySignatureV3 },
  // constants: { httpHeaderKeys },
  // authorizeUser,
  // beginningDragonProtection,
} = require("compute-utils");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
const getReferralData = require("./getReferralData");
// const setCharacter = require("./setCharacter");
// TODO, move to constants

const headerKeys = {
  NFTITEM__ADDRESS: "nftitem-address",
  // NFTITEM__WEB3_SIGNATURE: "nftitem-web3-signature",
  // NFTITEM__REFERRAL_CODE: "nftitem-referral-code",
};

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /referrals GET");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
    });

    const rawAddress = formattedEvent.headers[headerKeys.NFTITEM__ADDRESS];

    const { address } = getValidatedValues({
      rawAddress,
    });

    const results = await getReferralData({
      address,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_al3434tpwdbub",
      },
      results
    );

    console.log(
      "the Lambda /referrals GET - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(`error in Lambda /referrals GET function: ${err}`);

    return handleError(err);
  }
};

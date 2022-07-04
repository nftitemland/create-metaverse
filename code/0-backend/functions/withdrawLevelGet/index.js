"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
  user: { getWithdrawLevelData },
  // user: {
  // },
  // beginningDragonProtection,
} = require("compute-utils");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
// const doWithdraw = require("./doWithdraw");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /withdraw-level GET");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    // const rawWithdrawAddress = formattedEvent.body.withdrawAddress;
    // const rawAmount = formattedEvent.body.amount;

    const { address, nToken } = getValidatedValues({
      rawAddress,
      rawNToken,
    });

    await authorizeUser({
      address,
      nToken,
    });

    const results = await getWithdrawLevelData({
      address,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_al2323w3sdlsd23sjahdbub",
      },
      results
    );

    console.log(
      "the Lambda /withdraw-level GET - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(`error in Lambda /withdraw-level GET function: ${err}`);

    return handleError(err);
  }
};

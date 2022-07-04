"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
} = require("compute-utils");

const getRecentBattles = require("./getRecentBattles");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /battle/recent GET");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];

    const { address, nToken } = getValidatedValues({
      rawAddress,
      rawNToken,
    });

    await authorizeUser({
      address,
      nToken,
    });

    const results = await getRecentBattles({
      address,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_3043423jsqg38469",
      },
      results
    );

    console.log(
      "the Lambda /battle/recent GET - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(`error in Lambda /battle/recent GET function: ${err}`);

    return handleError(err);
  }
};

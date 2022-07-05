"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  // authorizeUser,
} = require("compute-utils");

const getProfiles = require("./getProfiles");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
// const addLoginToken = require("./addLoginToken");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/profiles GET");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      // shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    // const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    // const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    const rawMode = formattedEvent.queryStringParameters.mode;

    const { address, mode } = getValidatedValues({
      rawAddress,
      rawMode,
    });

    // await authorizeUser({
    //   address,
    //   nToken,
    // });

    const results = await getProfiles({
      address,
      mode,
    });
    // await addLoginToken({
    //   address,
    // });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_3023jjhg3923wqg38469",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/profiles GET - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(
      `error in Lambda /expansive-world/profiles GET function: ${err}`
    );

    return handleError(err);
  }
};

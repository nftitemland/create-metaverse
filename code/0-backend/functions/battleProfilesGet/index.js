"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
} = require("compute-utils");

const getProfiles = require("./getProfiles");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/battle-profiles GET");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    const rawPag = formattedEvent.queryStringParameters.pag;

    const { address, nToken, pag } = getValidatedValues({
      rawAddress,
      rawNToken,
      rawPag,
      // rawMode,
    });

    await authorizeUser({
      address,
      nToken,
    });

    const results = await getProfiles({
      address,
      pag,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_3023jjdsdshg3923wqg38469",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/battle-profiles GET - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(
      `error in Lambda /expansive-world/battle-profiles GET function: ${err}`
    );

    return handleError(err);
  }
};

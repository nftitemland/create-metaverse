"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
  // beginningDragonProtection,
} = require("compute-utils");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
const getCharacters = require("./getCharacters");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /characters GET");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      // shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    const rawPag = formattedEvent.queryStringParameters.pag;
    const rawMode = formattedEvent.queryStringParameters.mode;

    const { address, nToken, pag, mode } = getValidatedValues({
      rawAddress,
      rawNToken,
      rawPag,
      rawMode,
    });

    await authorizeUser({
      address,
      nToken,
    });

    const results = await getCharacters({
      address,
      pag,
      mode,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_509824lw3sdlsd23sjahdbub",
      },
      results
    );

    console.log(
      "the Lambda /characters GET - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(`error in Lambda /characters GET function: ${err}`);

    return handleError(err);
  }
};

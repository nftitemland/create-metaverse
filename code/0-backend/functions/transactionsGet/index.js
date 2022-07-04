"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
} = require("compute-utils");

const getTransactions = require("./getTransactions");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
// const addLoginToken = require("./addLoginToken");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/transactions GET");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      // shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    const rawPag = formattedEvent.queryStringParameters.pag;

    // const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    // const rawMode = formattedEvent.queryStringParameters.mode;

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

    const results = await getTransactions({
      address,
      pag,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_3023jlllsdsqg38469",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/transactions GET - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(
      `error in Lambda /expansive-world/transactions GET function: ${err}`
    );

    return handleError(err);
  }
};

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
const setCharacter = require("./setCharacter");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /characters POST");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    const rawType = formattedEvent.body.type;
    const rawId = formattedEvent.body.id;

    const { address, nToken, type, id } = getValidatedValues({
      rawAddress,
      rawNToken,
      rawType,
      rawId,
    });

    await authorizeUser({
      address,
      nToken,
    });

    const results = await setCharacter({
      address,
      type,
      id,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_al2323w3sdlsd23sjahdbub",
      },
      results
    );

    console.log(
      "the Lambda /characters POST - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(`error in Lambda /characters POST function: ${err}`);

    return handleError(err);
  }
};

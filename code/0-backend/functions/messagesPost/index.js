"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
} = require("compute-utils");

// const updateUserData = require("./updateUserData");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
const addMessage = require("./addMessage");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/messages POST");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      // shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    const rawMessage = formattedEvent.body.message;

    const { address, nToken, message } = getValidatedValues({
      rawAddress,
      rawNToken,
      rawMessage,
    });

    await authorizeUser({
      address,
      nToken,
    });

    const results = await addMessage({
      address,
      message,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_324lkealweiwqg38469",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/messages POST - " +
        "function executed successfully: " +
        stringify({ responseData })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(
      `error in Lambda /expansive-world/messages POST function: ${err}`
    );

    return handleError(err);
  }
};

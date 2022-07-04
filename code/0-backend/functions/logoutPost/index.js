"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
} = require("compute-utils");

const getValidatedValues = require("./getValidatedValues");
const signOutLoginToken = require("./signOutLoginToken");

const version = "megamonkey3";
console.log("Lamb Lamb version:", version);

// const addLoginToken = require("./addLoginToken");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/logout POST");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetBodyFromEvent: false,
      // shouldGetPathParametersFromEvent: true,
      // shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];

    const { address, nToken } = getValidatedValues({
      rawAddress,
      rawNToken,
    });

    const { loginToken } = await authorizeUser({
      address,
      nToken,
    });

    const results = await signOutLoginToken({
      address,
      loginToken,
    });
    // await addLoginToken({
    //   address,
    // });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_725lkeajklj2q18723",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/logout POST - " +
        "function executed successfully: " +
        stringify({ responseData })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(
      `error in Lambda /expansive-world/logout POST function: ${err}`
    );

    return handleError(err);
  }
};

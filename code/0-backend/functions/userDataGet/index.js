"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
  getUserData,
} = require("compute-utils");

// const getUserData = require("./getUserData");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
// const getFormattedResults = require("../../../../../../../../.web3Experiments/getFormattedResults");
// const addLoginToken = require("./addLoginToken");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/user-data GET");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      // shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    // const rawLandClaimMode = formattedEvent.queryStringParameters.landClaimMode;
    const argonTest = formattedEvent.headers.argonomega === "6asdSDfAs42-2";

    const {
      address,
      nToken,
      //   landClaimMode
    } = getValidatedValues({
      rawAddress,
      rawNToken,
      // rawLandClaimMode,
    });

    await authorizeUser({
      address,
      nToken,
    });

    // GOING TO GET USER DATA 2 IN REACT STATE
    const results = await getUserData({
      address,
      // landClaimMode,
    });
    // await addLoginToken({
    //   address,
    // });

    // const formattedResults = getFormattedResults({
    //   landClaimMode,
    //   results,
    //   address,
    // });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_324lkealweiwqg38469",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/user-data GET - " +
        "function executed successfully: " +
        stringify({
          responseData: argonTest ? responseData : Object.keys(responseData),
        })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(
      `error in Lambda /expansive-world/user-data GET function: ${err}`
    );

    return handleError(err);
  }
};

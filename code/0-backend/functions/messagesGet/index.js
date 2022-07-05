"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  // constants: { httpHeaderKeys },
  beginningDragonProtection,
} = require("compute-utils");

// const updateUserData = require("./updateUserData");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");
const getMessages = require("./getMessages");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/messages GET");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      // shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    // const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    // const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    const rawStartTime = formattedEvent.queryStringParameters.startTime;
    const rawEndTime = formattedEvent.queryStringParameters.endTime;
    const rawPag = formattedEvent.queryStringParameters.pag;
    // const rawPublic = formattedEvent.body.public;
    // const rawVisibility = formattedEvent.body.visibility;

    const {
      // address, nToken,

      startTime,
      endTime,
      pag,
    } = getValidatedValues({
      // rawAddress,
      // rawNToken,
      rawStartTime,
      rawEndTime,
      rawPag,
    });

    await beginningDragonProtection({
      dragonId: `messages_get_${Buffer.from(
        formattedEvent.data.ipAddress
        // "234.232.12.12"
      ).toString("base64")}`,
      maxRatePerPeriod: 15,
      period: 5000,
    });

    // await authorizeUser({
    //   address,
    //   nToken,
    // });

    const results = await getMessages({
      // address,
      startTime,
      endTime,
      pag,
    });

    // const results = await updateUserData({
    //   address,
    //   username,
    //   miniGameState,
    //   switchPublicMode,
    //   visibility,
    // });
    // await addLoginToken({
    //   address,
    // });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_524lweimnksjahdbhub",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/messages GET - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(
      `error in Lambda /expansive-world/messages GET function: ${err}`
    );

    return handleError(err);
  }
};

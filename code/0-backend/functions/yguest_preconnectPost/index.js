"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  // constants: { httpHeaderKeys },
  // authorizeUser,
  // beginningDragonProtection,
} = require("compute-utils");

const getValidatedValues = require("./getValidatedValues");
const doPreconnectTasks = require("./doPreconnectTasks");

const version = "megamonkey1";

// if (!process.env.DEBUG_DO_LOG) {
//   console.log = () => {};
// }

console.log("Lamb Lamb version:", version);

exports.handler = async (event2) => {
  console.log(`Event: ${stringify(event2)}`);

  try {
    console.log("running Lambda /yguest/preconnect POST");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event2,
      shouldGetBodyFromEvent: true,
      // shouldGetPathParametersFromEvent: true,
      shouldGetQueryStringParametersFromEvent: true,
    });

    const ipAddress = formattedEvent.data.ipAddress;

    // const rawOrigin = formattedEvent
    const rawOrigin = formattedEvent.headers.origin;

    getValidatedValues({
      rawOrigin,
    });

    await doPreconnectTasks({
      ipAddress,
    });

    const results = {};

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_23ss3ssdswfdsaqww",
      },
      results
    );

    console.log(
      "the Lambda /yguest/preconnect POST - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.error(`error in Lambda /yguest/preconnect POST function: ${err}`);
    console.error(err);

    return handleError(err);
  }
};

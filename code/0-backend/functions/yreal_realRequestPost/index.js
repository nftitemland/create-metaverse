"use strict";

const {
  lambda: {
    // getFormattedApiEvent,
    getResponse,
    handleError,
  },
  stringify,
  // constants: { httpHeaderKeys },
  // authorizeUser,
  // beginningDragonProtection,
} = require("compute-utils");

const version = "megamonkey1";

if (!process.env.DEBUG_DO_LOG) {
  console.log = () => {};
}

console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");

const handleRequest = require("./handleRequest");

exports.handler = async (event2) => {
  console.log(`Event: ${stringify(event2)}`);

  try {
    console.log("running Lambda /yreal/real-request POST");

    const queryStringParameters = event2.queryStringParameters || {};
    const requestContext = event2.requestContext || {};
    const headers = event2.headers || {};
    const rawBody = event2.body || "";

    const rawAddress = queryStringParameters.a;
    const rawPartyLoginToken = queryStringParameters.p;
    // OR
    const rawGuestId = queryStringParameters.g;
    const rawGoogleToken = queryStringParameters.gt;

    // const rawUserId = queryStringParameters.u;
    const rawEventType = requestContext.eventType;
    const rawConnectionId = requestContext.connectionId;
    const rawOrigin = headers.Origin;

    const ipAddress =
      (requestContext.identity &&
        typeof requestContext.identity.sourceIp === "string" &&
        requestContext.identity.sourceIp) ||
      null;

    const {
      address,
      partyLoginToken,
      eventType,
      connectionId,
      messageKey,
      messageValue,
      userId,
      isGuestConnect,
    } = await getValidatedValues({
      rawAddress,
      rawPartyLoginToken,
      rawEventType,
      rawConnectionId,
      rawBody,
      rawOrigin,
      rawGuestId,
      rawGoogleToken,
      ipAddress,
      // rawUserId,
    });

    const results = await handleRequest({
      address,
      partyLoginToken,
      eventType,
      connectionId,
      messageKey,
      messageValue,
      userId,
      isGuestConnect,
      ipAddress,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_23ss3wfdsaqww",
      },
      results
    );

    console.log(
      "the Lambda /yreal/real-request POST - " +
        "function executed successfully: " +
        stringify({ responseData: Object.keys(responseData) })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.error(`error in Lambda /yreal/real-request POST function: ${err}`);
    console.error(err);

    return handleError(err);
  }
};

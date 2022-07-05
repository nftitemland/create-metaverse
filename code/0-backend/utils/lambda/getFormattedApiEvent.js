"use strict";

const stringify = require("../stringify");

const getParsedBodySafely = Object.freeze(({ rawEvent }) => {
  try {
    const body = JSON.parse(rawEvent.body);

    return body;
  } catch (err) {
    console.log("getParsedBodySafely - error parsing body:", err);

    return {};
  }
});

module.exports = Object.freeze(
  ({
    rawEvent,
    shouldGetBodyFromEvent = false,
    shouldGetPathParametersFromEvent = false,
    shouldGetQueryStringParametersFromEvent = false,
  }) => {
    console.log("running getFormattedApiEvent");

    const formattedApiEvent = {
      headers: rawEvent.headers,
      data: {
        ipAddress: rawEvent.requestContext.http.sourceIp,
        requestContext: rawEvent.requestContext,
      },
    };

    if (shouldGetBodyFromEvent) {
      formattedApiEvent.body = getParsedBodySafely({ rawEvent });
    }

    if (shouldGetPathParametersFromEvent) {
      formattedApiEvent.pathParameters = rawEvent.pathParameters;
    }

    if (shouldGetQueryStringParametersFromEvent) {
      formattedApiEvent.queryStringParameters =
        rawEvent.queryStringParameters || {};
    }

    console.log(
      "getFormattedApiEvent executed successfully, got formattedApiEvent:",
      stringify(formattedApiEvent)
    );

    return formattedApiEvent;
  }
);

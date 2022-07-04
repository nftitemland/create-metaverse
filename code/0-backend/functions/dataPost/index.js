"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  // ethereum: { verifySignatureV2 },
  sendSNS,
} = require("compute-utils");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive/data POST");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetBodyFromEvent: true,
    });

    const rawSubject = formattedEvent.body.subject;
    const rawMessage = formattedEvent.body.message;

    const { subject, message } = getValidatedValues({
      rawSubject,
      rawMessage,
    });

    await sendSNS({
      subject,
      message,
    });

    const responseData = {
      subject,
      message,
      // TEMP RESPONSE

      poiPassTechnical: "ppt_298787675",
    };

    console.log(
      "the Lambda /expansive/data POST - " +
        "function executed successfully: " +
        stringify({ responseData })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(`error in Lambda /expansive/data POST function: ${err}`);

    return handleError(err);
  }
};

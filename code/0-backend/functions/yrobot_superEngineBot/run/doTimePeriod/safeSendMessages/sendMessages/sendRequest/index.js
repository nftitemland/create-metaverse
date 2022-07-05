"use strict";

const {
  realtime: { updateWebsocketApi },
} = require("compute-utils");

const BAD_REQUEST_EXCEPTION = "BadRequestException";
const GONE_EXCEPTION = "GoneException";

const MESSAGE_TYPE_MESSAGES = "MESSAGE_TYPE_MESSAGES";

module.exports = async ({ connectionId, messageData }) => {
  const message = JSON.stringify({
    type: MESSAGE_TYPE_MESSAGES,
    message: messageData,
  });

  try {
    await updateWebsocketApi({
      message,
      connectionId,
    });
  } catch (err) {
    const isNotExpectedError = !(
      (err && err.code && err.code.includes(BAD_REQUEST_EXCEPTION)) ||
      (err && err.message && err.message.includes("Invalid connectionId")) ||
      (err && err.code && err.code.includes(GONE_EXCEPTION))
    );

    if (isNotExpectedError) {
      console.log("unexpected message in sendRequest:", err);

      throw err;
    }
  }
};

"use strict";

const {
  realtime: {
    updateWebsocketApi,
    //connectionPoolHObjToObj
  },
} = require("compute-utils");

// const getFormattedRealtimeData = require("./getFormattedRealtimeData");

const BAD_REQUEST_EXCEPTION = "BadRequestException";
const GONE_EXCEPTION = "GoneException";

const MESSAGE_TYPE_PARTY_DATA = "MESSAGE_TYPE_PARTY_DATA";

module.exports = async ({ connectionId, messageData }) => {
  const message = JSON.stringify({
    type: MESSAGE_TYPE_PARTY_DATA,
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

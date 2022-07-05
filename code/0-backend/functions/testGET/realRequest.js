"use strict";

// require("dotenv").config();

const {
  realtime: { updateWebsocketApi },
  stringify,
} = require("compute-utils");

module.exports = async ({ connectionId }) => {
  const message = "DE MONKEY DOO WHAT SEE";

  console.log("Sending real message: " + stringify({ message }));

  console.log("TTT:", Date.now());

  await updateWebsocketApi({
    message,
    connectionId,
  });

  console.log("Send real message success");
};

"use strict";

const { sendData } = require("compute-utils");

const handleMetadata = require("./handleMetadata");

exports.handler = Object.freeze(async (event) => {
  console.log("💦Running DB Metadata Listener");

  try {
    // throw new Error("MONKEY POWER ERR");
    await handleMetadata({
      event,
    });

    console.log("💦🐉DB Metadata Listener executed successfully");
  } catch (err) {
    console.log("💦🍣error in DB Metadata Listener:", err);

    try {
      await sendData({
        subject: "dbListenerMetadata Error",
        message: `The Error Message: ${err.message}`,
      });
    } catch (innerError) {
      console.log(
        `💦🍣Double error in DB Metadata Listener: ${innerError.message}`
      );
    }
  }
});

"use strict";

const {
  stringify,
  sendData,
  constants: {
    environment: { isProductionMode },
  },
  delay,
} = require("compute-utils");
const run = require("./run");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

exports.handler = async (event) => {
  console.log(
    "running yrobot superEngine, here's the omega event:",
    stringify({
      event,
      time: new Date().toTimeString(),
    })
  );

  try {
    await run();
  } catch (err) {
    console.log("yrobot superEngine error:", err);

    let secondAwaitRunOcurred = false;

    if (
      err &&
      err.message &&
      typeof err.message === "string" &&
      (err.message.includes("Connection timeout") ||
        err.message.includes("Connection") ||
        err.message.includes("timeout"))
    ) {
      console.log(
        "connection timeout error, running super engine again in a second"
      );

      await delay(1000);

      try {
        await run();
        secondAwaitRunOcurred = true;
      } catch (err) {
        console.log("superEngine crazy second error in second await run:", err);
      }
    }

    try {
      if (isProductionMode) {
        await sendData({
          subject: "yrobot superEngine Error",
          message: `The Error Message: ${err.message}, secondAwaitRunOcurred: ${secondAwaitRunOcurred}`,
        });
      }
    } catch (innerError) {
      console.log(
        `💦🐻Double error in y robot superEngine: ${innerError.message}`
      );
    }

    throw err;
  }

  console.log("yrobot superEngine executed successfully:", stringify({}));
};

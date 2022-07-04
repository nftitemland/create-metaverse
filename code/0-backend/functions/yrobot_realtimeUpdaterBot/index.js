"use strict";

const {
  stringify,
  sendData,
  constants: {
    environment: { isProductionMode },
  },
} = require("compute-utils");
const realtimeUpdate = require("./realtimeUpdate");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

exports.handler = async (event) => {
  console.log(
    "running yrobot realtimeUpdater, here's the omega event:",
    stringify({
      event,
      time: new Date().toTimeString(),
    })
  );

  // if (
  //   !process.env.MORALIS_X_API_KEY ||
  //   !process.env.WITHDRAWS_MONEY_HOLDER_ADDRESS
  // ) {
  //   throw new Error(
  //     "depositsBot: setup error: missing MORALIS_X_API_KEY " +
  //       "or WITHDRAWS_MONEY_HOLDER_ADDRESS"
  //   );
  // }

  try {
    await realtimeUpdate();
  } catch (err) {
    console.log("yrobot realtimeUpdate error:", err);

    try {
      if (isProductionMode) {
        await sendData({
          subject: "yrobot realtimeUpdater Error",
          message: `The Error Message: ${err.message}`,
        });
      }
    } catch (innerError) {
      console.log(`💦🐻Double error in y real robot: ${innerError.message}`);
    }

    throw err;
  }

  console.log("yrobot realtimeUpdater executed successfully:", stringify({}));
};

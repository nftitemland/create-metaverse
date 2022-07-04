"use strict";

const {
  stringify,
  sendData,
  constants: {
    environment: { isProductionMode },
  },
} = require("compute-utils");
const run = require("./run");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

exports.handler = async (event) => {
  console.log(
    "running yrobot disco, here's the omega event:",
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
    await run();
  } catch (err) {
    console.log("yrobot disco error:", err);

    try {
      if (isProductionMode) {
        await sendData({
          subject: "yrobot disco Error",
          message: `The Error Message: ${err.message}`,
        });
      }
    } catch (innerError) {
      console.log(`💦🐻Double error in y robot disco: ${innerError.message}`);
    }

    throw err;
  }

  console.log("yrobot disco executed successfully:", stringify({}));
};

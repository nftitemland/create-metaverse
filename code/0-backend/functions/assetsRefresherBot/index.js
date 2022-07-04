"use strict";

const { stringify, sendData } = require("compute-utils");
const refreshAssets = require("./refreshAssets");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

exports.handler = async (event) => {
  console.log(
    "running chronic asset updater, here is the omega event:",
    stringify(event)
  );

  const type = event.type;

  try {
    await refreshAssets({
      type,
    });
  } catch (err) {
    console.log("error in chronic asset updater:", err);

    try {
      await sendData({
        subject: "Chronic Asset Updater Error",
        message: `The Error: type -> ${type}, message -> ${err.message}`,
      });
    } catch (innerError) {
      console.log(
        `🌴🐲Double error in chronic asset updater: ${innerError.message}`
      );
    }
  }

  console.log("chronic asset updater executed successfully:", stringify({}));
};

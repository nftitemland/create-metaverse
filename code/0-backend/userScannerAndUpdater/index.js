"use strict";

const { argv } = require("yargs");

const isProductionMode = argv.mode === "production";

if (isProductionMode) {
  require("dotenv").config({ path: "./.env" });
} else {
  require("dotenv").config({ path: "./.staging.env" });
}

const { sendData } = require("compute-utils");
// const { tracks } = require("./localConstants");

// const track = argv.track || tracks.poi;

if (isProductionMode) {
  if (true || !!process.env.LOGF) {
    const writeToFile = require("./writeToFile");

    console.log = (...args) => {
      writeToFile(...args);
    };
  }
}

const MORALIS_X_API_KEY = process.env.MORALIS_X_API_KEY;

const scanAndUpdate = require("./scanAndUpdate");

const userScannerAndUpdater = async () => {
  try {
    if (!MORALIS_X_API_KEY) {
      throw new Error("scanAndUpdate: setup error: missing MORALIS_X_API_KEY");
    }
    await scanAndUpdate();

    console.log("SHOULD NOT GET HERE ABC1ZQ");
  } catch (err) {
    console.log("error in beast alt updating:", err.message, err.data, err);

    if (isProductionMode) {
      sendData({
        subject: "UserScannerAndUpdater",
        message: `Error in UserScannerAndUpdater: ${
          err.message || "unknown error"
        }`,
      });
    }

    console.log("waiting 15 mins");

    setTimeout(() => {
      userScannerAndUpdater();
    }, 1000 * 60 * 15);
  }
};

userScannerAndUpdater();

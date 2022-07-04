"use strict";

const axios = require("axios");
// const nodeQueryString = require("querystring");

const {
  constants: {
    google: {
      captcha: { verifyUrl },
    },
  },
  stringify,
} = require("compute-utils");

// const invalidGrecaptchaBypassHeaderKeyValues = Object.freeze([
//   "0",
//   "null",
//   "undefined",
// ]);

// const grecaptchaBypassHeaderKeyValueIsValid =
//   !!bypassHeaderKeyValue &&
//   !invalidGrecaptchaBypassHeaderKeyValues.includes(bypassHeaderKeyValue);

module.exports = async ({
  rawGoogleCode,
  ipAddress,
  expectedAction = "submit",
}) => {
  console.log(
    "running verifyGoogleCode with the following values: " +
      stringify({
        rawGoogleCode,
        ipAddress,
        expectedAction,
      })
  );

  // if (
  //   !isProductionMode &&
  //   process.env.SHOULD_NOT_CONSIDER_GOOGLE_CODE_IN_STAGING_MODE === "yes"
  // ) {
  //   console.log(
  //     "verifyGoogleCode executed successfully - " +
  //       "SHOULD_NOT_CONSIDER_GOOGLE_CODE_IN_STAGING_MODE " +
  //       "🌞 staging bypass mode 🌞"
  //   );

  //   return {
  //     isHumanScore: 69.22,
  //     isHumanTime: 54321,
  //   };
  // }

  const googleCodeIsInvalid = !(
    !!rawGoogleCode &&
    typeof rawGoogleCode === "string" &&
    rawGoogleCode.length > 2 &&
    rawGoogleCode.length < 10000
  );

  if (googleCodeIsInvalid) {
    const err = new Error("invalid Google code provided");
    err.bulltrue = true;
    err.statusCode = 400;
    throw err;
  }

  try {
    const queryString = new URLSearchParams({
      secret: process.env.GRECAPTCHA_SECRET_KEY,
      response: rawGoogleCode,
      remoteip: ipAddress,
    }).toString();

    const response = await axios.post(verifyUrl, queryString, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(
      "verifyGoogleCode - response data from Google verification: " +
        stringify(response.data)
    );

    const { success, score, action, challenge_ts } = response.data;

    if (!success || action !== expectedAction) {
      const err = new Error("could not verify Google code");
      err.bulltrue = true;
      err.statusCode = 400;
      throw err;
    }

    console.log("verifyGoogleCode executed successfully");

    return {
      isHumanScore: score,
      isHumanTime: challenge_ts,
    };
  } catch (err) {
    console.log("error in verifyGoogleCode:", err);

    const error = new Error("invalid googleCode provided");
    error.bulltrue = true;
    error.statusCode = 400;
    throw error;
  }
};

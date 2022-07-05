"use strict";

const stringify = require("./stringify");

const {
  api: { baseUrl },
} = require("./constants");

const axios = require("axios");

const dataUrl = `${baseUrl}/expansive-world/data`;

const sendData = async ({ subject, message }) => {
  console.log(
    "👑🐸▶️Running sendData with the following values: " +
      stringify({
        subject,
        message,
      })
  );

  try {
    await axios({
      method: "post",
      url: dataUrl,
      data: {
        subject,
        message,
      },
    });
  } catch (err) {
    console.log(
      "[NON-BREAKING-ERROR] sendData failed, error in sending data:",
      err
    );
    return;
  }

  console.log("👑🐸✅ sendData executed successfully");
};

module.exports = Object.freeze(sendData);

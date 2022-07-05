"use strict";

const { stringify } = require("compute-utils");

module.exports = ({ rawSubject, rawMessage }) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawSubject,
      rawMessage,
    })
  );

  if (!rawSubject || typeof rawSubject !== "string" || rawSubject.length > 90) {
    const error = new Error("invalid subject");
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  if (
    !rawMessage ||
    typeof rawMessage !== "string" ||
    rawMessage.length > 1000
  ) {
    const error = new Error(`invalid message`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const values = {
    subject: rawSubject,
    message: rawMessage,
  };

  console.log(
    "getValidatedValues executed successfully, " +
      "Got Validated Values: " +
      stringify(values)
  );

  return values;
};

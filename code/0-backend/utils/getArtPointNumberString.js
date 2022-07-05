"use strict";

const exactMath = require("exact-math");

module.exports = (amount) => {
  if (!amount && !["0", 0].includes(amount)) {
    throw new Error(
      `getArtPointNumberString error: invalid input amount: ${amount}`
    );
  }

  const artPointNumberString = exactMath.round(amount, -2, {
    returnString: true,
  });

  return artPointNumberString;
};

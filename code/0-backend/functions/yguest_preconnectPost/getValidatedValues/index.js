"use strict";

const {
  stringify,
  // validation: { getNTokenV1IfIsValid },
  constants: {
    environment: { isProductionMode },
  },
} = require("compute-utils");
// const ethUtil = require("ethereumjs-util");

// const verifyGoogleCode = require("./verifyGoogleCode");

// const allowedGuestIdCharacters = "GUEST_abcdefghijklmnopqrstuvwxyz1234567890";

const allowedProdConnectOrigins = [
  process.env.PREPROD_WEBSITE_URL || "xx67432-5223_762",
  "https://www.nftitemland.com",
  // "http://localhost:3000",
];

// const getGameX = (x) => {
//   x = Number(x);
//   if (typeof x !== "number" || Number.isNaN(x)) {
//     return 0;
//   } else {
//     const isHyperWorldX =
//       x >= limits.MIN_HYPER_WORLD_X && x <= limits.MAX_HYPER_WORLD_X;
//     if (!isHyperWorldX) {
//       if (x < limits.MIN_X) {
//         return 0;
//       } else if (x > limits.MAX_X) {
//         return limits.MAX_X;
//       }
//     }
//   }

//   return x;
// };

// const getGameY = (y) => {
//   y = Number(y);
//   if (typeof y !== "number" || Number.isNaN(y)) {
//     return 0;
//   } else {
//     const isHyperWorldY =
//       y >= limits.MIN_HYPER_WORLD_HEIGHT && y <= limits.MAX_HYPER_WORLD_HEIGHT;
//     if (!isHyperWorldY) {
//       if (y < limits.MIN_Y) {
//         return 0;
//       } else if (y > limits.MAX_Y) {
//         return limits.MAX_Y;
//       }
//     }
//   }

//   return y;
// };

module.exports = async ({
  rawOrigin,

  // rawUserId,
}) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawOrigin,
    })
  );

  if (isProductionMode) {
    if (!allowedProdConnectOrigins.includes(rawOrigin)) {
      throw new Error("Invalid request origin");
    }
  }

  const values = {};

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

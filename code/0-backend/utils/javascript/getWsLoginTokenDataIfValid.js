"use strict";

const {
  misc: { XENA },
} = require("../constants");

module.exports = (rawWsLoginToken) => {
  if (typeof rawWsLoginToken !== "string") {
    return null;
  }

  const splitWsLoginToken = rawWsLoginToken.split(XENA);

  if (splitWsLoginToken.length !== 2) {
    return null;
  }

  const [websocketLoginTokenId, expiry] = splitWsLoginToken;

  if (websocketLoginTokenId.length < 3) {
    return null;
  }

  const numberExpiry = Number(expiry);

  if (Number.isNaN(numberExpiry) || Date.now() > numberExpiry) {
    return null;
  }

  return {};
};

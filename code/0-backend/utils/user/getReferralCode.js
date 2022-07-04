"use strict";

// const getUUID = require("../javascript/getUUID");

const getHashedText = require("../javascript/getHashedText");

const salt = process.env.REFERRAL_CODE_SALT;

module.exports = ({ userId }) => {
  if (!salt || !userId) {
    return null;
  }

  return `nft_item_land_bonus_${getHashedText(`${userId}${salt}`).substring(
    0,
    8
  )}`;
};

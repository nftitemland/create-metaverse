"use strict";

const getArtPointNumberString = require("../getArtPointNumberString");

module.exports = (rawPointNumber) => {
  const artPointNumberString = getArtPointNumberString(rawPointNumber);

  const artPointNumberStringAsNumber = Number(artPointNumberString);

  if (Number.isNaN(artPointNumberStringAsNumber)) {
    return null;
  }

  return artPointNumberString;
};

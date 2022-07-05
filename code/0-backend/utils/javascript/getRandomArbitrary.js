"use strict";

module.exports = function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

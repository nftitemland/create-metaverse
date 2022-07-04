"use strict";

const {
  realtime: {
    limits: {
      // MAX_HYPER_WORLD_X,
      // MIN_HYPER_WORLD_X,
      // MAX_HYPER_WORLD_Y,
      // MIN_HYPER_WORLD_Y,
      MAX_WORLD_X,
      MIN_WORLD_X,
      MAX_WORLD_Y,
      MIN_WORLD_Y,
    },
  },
} = require("../constants");

const getGameX = (x) => {
  x = Number(x);
  if (typeof x !== "number" || Number.isNaN(x)) {
    return MIN_WORLD_X;
  } else {
    // const isHyperWorldX = x >= MIN_HYPER_WORLD_X && x <= MAX_HYPER_WORLD_X;
    // if (!isHyperWorldX) {
    if (x < MIN_WORLD_X) {
      return MIN_WORLD_X;
    } else if (x > MAX_WORLD_X) {
      return MAX_WORLD_X;
    }
    // }
  }

  return x;
};

const getGameY = (y) => {
  y = Number(y);
  if (typeof y !== "number" || Number.isNaN(y)) {
    return MIN_WORLD_Y;
  } else {
    // const isHyperWorldY = y >= MIN_HYPER_WORLD_Y && y <= MAX_HYPER_WORLD_Y;
    // if (!isHyperWorldY) {
    if (y < MIN_WORLD_Y) {
      return MIN_WORLD_Y;
    } else if (y > MAX_WORLD_Y) {
      return MAX_WORLD_Y;
    }
    // }
  }

  return y;
};

module.exports = {
  getGameX,
  getGameY,
};

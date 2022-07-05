"use strict";

const mapData = require("./mapData");

const getMapDatum = ({ x = 0, y = 0, crdX = 0, crdY = 0 }) => ({
  x,
  y,
  crdX,
  crdY,
  // coordKey: `${crdX}$${crdY}`,
});

const DEFAULT_MAP_DATUM = getMapDatum({});

module.exports = ({ x, y, crdX, crdY }) => {
  x = Number(x);
  y = Number(y);
  crdX = Number(crdX);
  crdY = Number(crdY);

  if (
    Number.isNaN(x) ||
    Number.isNaN(y) ||
    Number.isNaN(crdX) ||
    Number.isNaN(crdY)
  ) {
    return DEFAULT_MAP_DATUM;
  }

  const coordKey = `${crdX}$${crdY}`;

  const mapDatum = mapData.coordKeyToData[coordKey];

  if (!mapDatum) {
    return DEFAULT_MAP_DATUM;
  }

  if (x < 0) {
    x = 0;
  } else if (x > mapDatum.w) {
    x = mapDatum.w;
  }

  if (y < 0) {
    y = 0;
  } else if (y > mapDatum.h) {
    y = mapDatum.h;
  }

  return {
    x,
    y,
    crdX,
    crdY,
    // coordKey,
  };
};

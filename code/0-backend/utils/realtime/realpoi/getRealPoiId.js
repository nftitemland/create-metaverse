"use strict";

const getRealPoiId = ({ type, tag }) => {
  return `REALPOI_${type}_${tag}`;
};

module.exports = getRealPoiId;

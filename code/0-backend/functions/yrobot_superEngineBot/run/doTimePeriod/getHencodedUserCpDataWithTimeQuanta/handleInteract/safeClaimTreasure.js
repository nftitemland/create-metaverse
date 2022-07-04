"use strict";

const {
  redisTools: { redisStrObj },
  constants: {
    realtime: {
      commands: { INTERACT },
      realPoiInteractTags,
      realPoiInteractArgs,
      realPoiLvls,
      enchantmentTypeToEnchantmentNames: {
        CHARACTER: { BOI, GURR },
      },
    },
  },
  realtime: {
    realmap: { mapData },
    getEncodedCmdValue,
  },
} = require("compute-utils");

module.exports = ({ userId }) => {};

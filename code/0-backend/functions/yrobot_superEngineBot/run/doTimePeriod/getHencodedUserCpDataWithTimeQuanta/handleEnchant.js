"use strict";

const {
  stringify,
  redisTools: { redisStrObj },
  // constants: {
  //   environment: { isProductionMode },
  //   // realtime: { enchantmentTypeToEnchantmentNames },
  // },
  // realtime: {
  // coordTools: { getGameX, getGameY },
  // },
} = require("compute-utils");

// const DISTANCE_PER_S = isProductionMode ? 420 : 1600;
// const DISTANCE_PER_MS = DISTANCE_PER_S / 1000;

const enchantTypeToUserCpDataKey = {
  CHARACTER: "etC",
};

module.exports = ({ userId, userCpData, decodedCmdValue }) => {
  const userCpDataKey = enchantTypeToUserCpDataKey[decodedCmdValue.data.type];

  const newUserData = Object.assign({}, userCpData);

  if (userCpDataKey) {
    newUserData[userCpDataKey] = decodedCmdValue.data.enchantmentName;
  } else {
    console.log(
      "handleEnchant: unexpected command type - unexpected enchant key:",
      stringify({ userId, userCpData, time: new Date().toString() })
    );
  }

  delete newUserData.cmd;

  const hencodedUserCpDataWithTimeQuanta =
    redisStrObj.toRedisStrObj(newUserData);

  return hencodedUserCpDataWithTimeQuanta;
};

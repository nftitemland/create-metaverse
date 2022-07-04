"use strict";

const {
  redisTools: { redisStrObj },
  realtime: {
    realmap: { mapData },
  },
} = require("compute-utils");

const safeSendMapData = require("./safeSendMapData");

module.exports = ({
  // userId,
  userCpData,
  decodedCmdValue,
}) => {
  const coordKey = `${decodedCmdValue.data.x}$${decodedCmdValue.data.y}`;

  // TODO:MAPDATADYNAMIC Update to use dynamic get if not 0 0
  const coordData = mapData.coordKeyToData[coordKey];

  if (coordData) {
    safeSendMapData({
      connectionId: userCpData.cId,
      messageData: {
        [coordKey]: coordData,
      },
    });
  }

  const newUserCpData = Object.assign({}, userCpData);

  delete newUserCpData.cmd;

  const hencodedUserCpDataWithTimeQuanta =
    redisStrObj.toRedisStrObj(newUserCpData);

  return hencodedUserCpDataWithTimeQuanta;
};

"use strict";

const {
  redisTools: { redisStrObj },
  constants: {
    environment: { isProductionMode },
    realtime: {
      commands: { MOVE },
    },
  },
  realtime: {
    // coordTools: { getGameX, getGameY },
    // realmap: { getMapDataForUser },
    // connectionPoolHObjToObj,
    // getDecodedCmdValue,
    // updateUserConnectionPoolData,
    getEncodedCmdValue,
  },
} = require("compute-utils");

const DISTANCE_PER_S = isProductionMode ? 420 : 1600;
const DISTANCE_PER_MS = DISTANCE_PER_S / 1000;

// s = (1/T) * d = (1 / (1000MS))
const getSpeed = (period) => {
  const distancePerPeriod = period * DISTANCE_PER_MS;

  return distancePerPeriod;
};

module.exports = ({
  // userId,
  userCpData,
  cmdX,
  cmdY,
  crdX,
  crdY,
  // cp,
  // client,
  period,
}) => {
  const mapDataForUser = {
    x: Number(userCpData.x),
    y: Number(userCpData.y),
    crdX,
    crdY,
  };

  const userX = mapDataForUser.x;
  const userY = mapDataForUser.y;
  // const userY = getGameY(userCpData.y);

  const distancePerPeriod = getSpeed(period);

  let newUserX;

  if (Math.abs(userX - cmdX) <= distancePerPeriod) {
    newUserX = cmdX;
  } else if (userX > cmdX) {
    newUserX = userX - distancePerPeriod;
  } else {
    //if (userX < cmdX) {
    newUserX = userX + distancePerPeriod;
  }

  let newUserY;

  if (Math.abs(userY - cmdY) <= distancePerPeriod) {
    newUserY = cmdY;
  } else if (userY > cmdY) {
    newUserY = userY - distancePerPeriod;
  } else {
    //if (userY < cmdY) {
    newUserY = userY + distancePerPeriod;
  }
  // else {
  //   newUserY = cmdY;
  // }

  const newUserDataToAdd = Object.assign({}, userCpData, {
    x: newUserX,
    y: newUserY,
    crdX,
    crdY,
  });

  if (newUserX === cmdX && newUserY === cmdY) {
    delete newUserDataToAdd.cmd;
  } else if (typeof userCpData.cmd === "object") {
    newUserDataToAdd.cmd = getEncodedCmdValue(MOVE, {
      x: cmdX,
      y: cmdY,
      crdX,
      crdY,
    });
  }

  const hencodedUserCpDataWithTimeQuanta =
    redisStrObj.toRedisStrObj(newUserDataToAdd);

  return hencodedUserCpDataWithTimeQuanta;
};

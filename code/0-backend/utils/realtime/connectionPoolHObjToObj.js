"use strict";

const redisStrObj = require("../redisTools/redisStrObj");

const connectionPoolHObjToObj = (hObj) => {
  const userIdToUserConnectionPoolData = {};

  for (let i = 0; i < hObj.length; i = i + 2) {
    const userId = hObj[i];
    const strObj = hObj[i + 1];
    const userConnectionPoolData = redisStrObj.fromRedisStrObj(strObj);

    userIdToUserConnectionPoolData[userId] = userConnectionPoolData;
  }

  return userIdToUserConnectionPoolData;
};

module.exports = connectionPoolHObjToObj;

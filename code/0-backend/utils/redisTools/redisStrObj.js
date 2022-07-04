"use strict";

const {
  redis: { DEFAULT_REDIS_OBJECT_SEPARATOR },
} = require("../constants");

const KEY_VALUE_SEPARATOR = "@";

const getStrObjKeyValuePair = (key, value) => {
  return `${key}${KEY_VALUE_SEPARATOR}${value}`;
};

const toRedisStrObj = (obj, separator = DEFAULT_REDIS_OBJECT_SEPARATOR) => {
  let redisStrObj = "";

  // for (const key in obj) {
  //   const value = obj[key];
  // redisStrObj += `${key}${KEY_VALUE_SEPARATOR}${value}${separator}`;
  // }

  // redisStrObj = redisStrObj.substring(0, redisStrObj.length - separator.length);

  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const value = obj[key];
    redisStrObj += `${getStrObjKeyValuePair(key, value)}${separator}`;
  }

  const lastKey = keys[keys.length - 1];
  const lastValue = obj[lastKey];

  redisStrObj += getStrObjKeyValuePair(lastKey, lastValue);

  return redisStrObj;
};

const fromRedisStrObj = (
  redisStrObj,
  separator = DEFAULT_REDIS_OBJECT_SEPARATOR
) => {
  // if (!redisStrObj) {
  //   return null;
  // }

  const obj = {};

  const keyValuePairs = redisStrObj.split(separator);

  for (let i = 0; i < keyValuePairs.length; i++) {
    const [key, value] = keyValuePairs[i].split(KEY_VALUE_SEPARATOR);
    obj[key] = value;
  }

  return obj;
};

module.exports = {
  toRedisStrObj,
  fromRedisStrObj,
};

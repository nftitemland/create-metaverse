"use strict";

module.exports = (command, params) => {
  let encodedCmdValue = `${command}_`;

  const paramKeys = Object.keys(params);

  paramKeys.sort();

  for (let i = 0; i < paramKeys.length - 1; i++) {
    const paramKey = paramKeys[i];
    const paramValue = params[paramKey];

    encodedCmdValue += `${paramKey}$${paramValue}_`;
  }

  const lastParamKey = paramKeys[paramKeys.length - 1];
  const lastParamValue = params[lastParamKey];

  encodedCmdValue += `${lastParamKey}$${lastParamValue}`;

  return encodedCmdValue;
};

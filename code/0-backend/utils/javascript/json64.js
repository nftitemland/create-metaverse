"use strict";

const json64Encode = (obj) => {
  const stringObject = JSON.stringify(obj);

  const base64StringObject = Buffer.from(stringObject).toString("base64");

  return base64StringObject;
};

const json64Decode = (base64StringObject) => {
  const stringObject = Buffer.from(base64StringObject, "base64").toString(
    "ascii"
  );
  try {
    const obj = JSON.parse(stringObject);
    return obj;
  } catch (err) {
    console.log("json64Decode: error in parsing decoded value:", err);
    throw err;
  }
};

module.exports = {
  json64Encode,
  json64Decode,
};

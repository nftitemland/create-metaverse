"use strict";

const stringify = require("../stringify");
const getDatabaseEntry = require("../database/getDatabaseEntry");

const {
  aws: {
    database: {
      tableNames: { METADATA }, //, ASSETS },
    },
  },
} = require("../constants");

module.exports = async ({ key }) => {
  console.log(
    "🦒running dualDb add with the following values:",
    stringify({
      key,
    })
  );

  const data = await getDatabaseEntry({
    tableName: METADATA,
    value: key,
  });

  const responseValues = data;

  console.log(
    "🦒dualDb add executed successfully, " +
      "returning values: " +
      stringify(Object.keys(responseValues))
  );

  return responseValues;
};

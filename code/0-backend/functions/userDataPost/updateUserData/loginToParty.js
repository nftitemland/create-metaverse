"use strict";

const {
  stringify,
  database: { classicalUpdateDatabaseEntry },
  javascript: { getUUID, getHashedText },
  constants: {
    misc: { XENA },
    aws: {
      database: {
        tableNames: { USERS },
        tableNameToPartitionKey,
      },
    },
    redis: {
      hKeyPrefixes: { CP_ },
    },
    realtime: {
      limits: { MAXIMUM_USER_COUNT },
    },
  },
  // constants: {
  // redis: {
  //   hKeyPrefixes: { CP_ },
  // },
  // },
  redisTools: { getRedisClient },
} = require("compute-utils");

const LOGIN_EXPIRY_TIME = 1000 * 60 * 60 * 24;

const CONNECTION_POOL_KEY = `${CP_}1`;

module.exports = async ({ address }) => {
  console.log(
    "🧚‍♀️running loginToParty with the following values: " +
      stringify({
        address,
      })
  );

  const client = getRedisClient();

  await client.connect();

  const numberOfUsers = await client.sendCommand(["HLEN", CONNECTION_POOL_KEY]);

  console.log("current number of users:", numberOfUsers);

  if (numberOfUsers >= MAXIMUM_USER_COUNT) {
    // if (numberOfUsers >= 1) {
    const error = new Error(`Currently too many users in room.`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  const loginToPartyId = getUUID();

  const loginToPartyExpiryTime = Date.now() + LOGIN_EXPIRY_TIME;

  const loginPartyToken = `${loginToPartyId}${XENA}${loginToPartyExpiryTime}`;

  let updateExpression = "";
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  updateExpression += "SET #partyLoginToken = :partyLoginToken";
  expressionAttributeNames["#partyLoginToken"] = "partyLoginToken";
  expressionAttributeValues[":partyLoginToken"] =
    getHashedText(loginPartyToken);

  await classicalUpdateDatabaseEntry({
    tableName: USERS,
    key: tableNameToPartitionKey[USERS],
    value: address,
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  });

  const responseValues = {
    loginPartyToken,
  };

  console.log(
    "🧚‍♀️loginToParty executed successfully - " +
      "returning values: " +
      stringify(responseValues)
  );

  return responseValues;
};

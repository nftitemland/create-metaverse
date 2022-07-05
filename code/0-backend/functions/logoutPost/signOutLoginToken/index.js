"use strict";

const {
  stringify,
  database: { classicalUpdateDatabaseEntry },
  constants: {
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNameToSortKey,
        tableNames: { LOGIN_TOKENS },
      },
    },
  },
  sendData,
} = require("compute-utils");

module.exports = async ({ address, loginToken }) => {
  console.log(
    "running signOutLoginToken " +
      "with the following values: " +
      stringify({
        address,
        loginToken,
      })
  );

  let updateExpression = "";
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  updateExpression += "SET #signedOut = :signedOut";
  expressionAttributeNames["#signedOut"] = "signedOut";
  expressionAttributeValues[":signedOut"] = true;

  try {
    await classicalUpdateDatabaseEntry({
      tableName: LOGIN_TOKENS,
      key: tableNameToPartitionKey[LOGIN_TOKENS],
      value: address,
      sortKey: tableNameToSortKey[LOGIN_TOKENS],
      sortValue: loginToken[tableNameToSortKey[LOGIN_TOKENS]],
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    });
  } catch (err) {
    console.log("error in signing out user database update:", err);

    await sendData({
      subject: "LambdaSignOutLoginTokenError",
      message: "error in signing out user database update " + err.message,
    });

    throw err;
  }

  const results = {};

  console.log("signOutLoginToken executed successfully: " + stringify(results));

  return results;
};

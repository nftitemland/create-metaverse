"use strict";

const stringify = require("../stringify");
const searchDatabase = require("../database/searchDatabase");
const {
  aws: {
    database: {
      tableNames: { USERS },
      secondaryIndices: { userIdIndex },
    },
  },
} = require("../constants");

const getUserByUserId = async ({ userId }) => {
  console.log(
    `👷⏫Running getUserByUserId: ${stringify({
      userId,
    })}`
  );

  const searchDatabaseResults = await searchDatabase({
    searchParams: {
      TableName: USERS,
      IndexName: userIdIndex,
      Limit: 3,
      //   ScanIndexForward: true,
      KeyConditionExpression: `#userId = :userId`,
      ExpressionAttributeNames: {
        "#userId": "userId",
      },
      ExpressionAttributeValues: {
        ":userId": userId,
      },
      // ExclusiveStartKey: paginationValueToUse || undefined,
    },
  });

  let user = null;

  if (searchDatabaseResults.ultimateResults.length === 1) {
    user = searchDatabaseResults.ultimateResults[0];
  } else if (searchDatabaseResults.ultimateResults.length > 1) {
    throw new Error(
      "getUserByUserId safeguard error, multiple users with " +
        `userId: ${userId}`
    );
  }

  console.log(
    "🐸⏫getUserByUserId executed successfully, " +
      "here's the results: " +
      stringify(user ? Object.keys(user) : null)
  );

  return user;
};

module.exports = getUserByUserId;

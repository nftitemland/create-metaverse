"use strict";

const searchDatabase = require("./database/searchDatabase");
const stringify = require("./stringify");
const {
  aws: {
    database: {
      tableNames: { LOGIN_TOKENS },
    },
  },
  encryptionKeys: { LOGIN_ENCRYPTION_KEY_V1 },
} = require("./constants");
const getHashedText = require("./javascript/getHashedText");
const decrypt = require("./encryption/decrypt");
const ethUtil = require("ethereumjs-util");

const SEARCH_LIMIT = 5;

module.exports = Object.freeze(async ({ address, nToken }) => {
  console.log(
    "🐸🔐Running authorizeUser with the following values:",
    stringify({
      address,
      nToken,
    })
  );

  address = ethUtil.toChecksumAddress(address);

  const searchParams = {
    TableName: LOGIN_TOKENS,
    // IndexName: secondaryPartitionKeySecondarySortKeyIndex,
    Limit: SEARCH_LIMIT,
    ScanIndexForward: false,
    KeyConditionExpression: `#partitionKey = :partitionKey`,
    ExpressionAttributeNames: {
      "#partitionKey": "partitionKey",
    },
    ExpressionAttributeValues: {
      ":partitionKey": address,
    },
    // ExclusiveStartKey: paginationValueToUse || undefined,
  };

  const searchDbResults = await searchDatabase({
    searchParams,
  });

  const hashedNTokenFromRequest = getHashedText(nToken);

  for (const loginToken of searchDbResults.ultimateResults) {
    if (!loginToken.signedOut) {
      const hashedNTokenFromDB = decrypt(
        loginToken.encryptedHashedNToken,
        loginToken.iv,
        LOGIN_ENCRYPTION_KEY_V1
      );
      // Buffer.from(loginToken.iv);
      // console.log(`

      //   ${hashedNTokenFromRequest}

      //     MEGA LOG: ${JSON.stringify(
      //       {
      //         loginToken,
      //         hashedNTokenFromDB,
      //       },
      //       null,
      //       4
      //     )}

      // `);

      if (hashedNTokenFromDB === hashedNTokenFromRequest) {
        console.log(
          "🐸🔓authorizeUser executed successfully, " +
            "user is authorized, matching login token data:",
          stringify({
            partitionKey: loginToken.partitionKey,
            sortKey: loginToken.sortKey,
          })
        );
        return {
          loginToken,
        };
      }
    }
  }

  console.log("🦤❌authorizeUser failed, user is not authorized");

  const error = new Error("User is not authorized");
  error.statusCode = 400;
  error.bulltrue = true;
  throw error;
});

"use strict";

const { argv } = require("yargs");
// const fs = require("fs");

const isProductionMode = argv.mode === "production";

if (isProductionMode) {
  require("dotenv").config({ path: "./.env" });
} else {
  require("dotenv").config({ path: "./.staging.env" });
}

const {
  delay,
  //   runFunctionRecursively,
  stringify,
  database: {
    scanDatabase,
    //classicalUpdateDatabaseEntry
  },
  constants: {
    aws: {
      database: {
        // tableNameToPartitionKey,
        tableNames: { USERS },
      },
    },
    // users: {
    //   visibilities: { PUBLIC },
    // },
    transactions: {
      types: {
        // SWITCH_PROFILE_IS_PUBLIC,
        PIXIE_POWDER_BONUS,
        // SWITCH_PROFILE_ATTRIBUTE_VISIBLE,
        // SWITCH_BATTLE_MODE,
      },
    },
  },
  // getUserData,
  // constants: {},
  addTransactionAndUpdateUser,
  // delay,
  // addTransactionAndUpdateUser,
} = require("compute-utils");

// const uuid = require("uuid");
// const { argv } = require("yargs");

const SEARCH_LIMIT = 100;

// const reportsPath = isProductionMode
//   ? `${__dirname}/data/refCodeMapProduction.txt`
//   : `${__dirname}/data/refCodeMapStaging.txt`;

// const writeToFile = (...args) => {
//   const stream = fs.createWriteStream(reportsPath, {
//     flags: "a",
//   });

//   stream.write(`${args.join(" ")}\n`);

//   stream.end();
// };

// const ACTIONgetUserIdToBonusCodeMap = ({ address, referralCode }) => {
//   const textLine = `${address} -> ${referralCode}`;

//   writeToFile(textLine);
// };

// const ACTIONsetUserBattleModeToBeOn = async ({ address }) => {
//   await addTransactionAndUpdateUser({
//     address,
//     type: SWITCH_BATTLE_MODE,
//   });
// };

// const ACTIONsetUserToBePublic = async ({ address }) => {
//   await addTransactionAndUpdateUser({
//     address,
//     type: SWITCH_PROFILE_IS_PUBLIC,
//   });
// };

const ACTIONnoOp = async ({ address }) => {
  const type = PIXIE_POWDER_BONUS;

  // const value = 10000;

  await addTransactionAndUpdateUser({
    address,
    type,
    value: 0,
    metadata: {
      note: "noOpReset",
    },
    fullRefresh: true,
    searchRefresh: true,
    // dryRun: true,
    dryRun: false,
  });
};

let actionPerformCount = 0;

const action = async ({ user }) => {
  // if (actionPerformCount > 0) {
  //   throw new Error("Intentional Early Stop");

  // }

  // const userData = await getUserData({ address: user.partitionKey });

  // ACTIONgetUserIdToBonusCodeMap({
  //   address: user.partitionKey,
  //   referralCode: userData.referralCode,
  // });

  // let thereWasAnUpdate = false;

  // if (!user || !user.txDbCache || !user.txDbCache.battleMode) {
  //   await ACTIONsetUserBattleModeToBeOn({
  //     address: user.partitionKey,
  //   });

  //   thereWasAnUpdate = true;
  // }

  // if (user.secondaryPartitionKey !== PUBLIC) {
  //   await ACTIONsetUserToBePublic({
  //     address: user.partitionKey,
  //   });

  //   thereWasAnUpdate = true;
  // }

  // if (thereWasAnUpdate) {
  //   await delay(5000);
  // }

  await ACTIONnoOp({ address: user.partitionKey });

  await delay(4000);

  console.log(`
  
  
      ACTION LOG: ${JSON.stringify(
        {
          actionPerformCount,
        },
        null,
        4
      )}
  
  
  `);

  actionPerformCount++;
  // }

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         userData,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  // if (!user.userId) {
  //   await classicalUpdateDatabaseEntry({
  //     tableName: USERS,
  //     key: tableNameToPartitionKey[USERS],
  //     value: user.partitionKey,
  //     updateExpression: "SET #userId = :userId",
  //     expressionAttributeNames: {
  //       "#userId": "userId",
  //     },
  //     expressionAttributeValues: {
  //       ":userId": uuid.v4(),
  //     },
  //   });
  // }
};

const mainFunction = async () => {
  console.log(
    "running performActionOnAllUsers: " +
      stringify({
        time: new Date().toLocaleString(),
      })
  );

  let iterationCount = 0;
  let paginationValue;

  do {
    console.log(
      "🐼📈running iteration: " +
        stringify({
          time: new Date().toLocaleString(),
          iterationCount,
        })
    );

    const scanResults = await scanDatabase({
      // const { ultimateResults, paginationValue } = await scanDatabase({
      tableName: USERS,
      // expressionAttributeNames,
      // expressionAttributeValues,
      // filterExpression,
      // indexName,
      limit: SEARCH_LIMIT,
      // projectionExpression,
      exclusiveStartKey: paginationValue,
    });

    const ultimateResults = scanResults.ultimateResults;
    paginationValue = scanResults.paginationValue;

    for (const user of ultimateResults) {
      await action({ user });
    }

    iterationCount++;
    // await delay(250);
  } while (paginationValue);

  console.log("performActionOnAllUsers executed successfully" + stringify({}));
};

(async () => {
  try {
    await mainFunction();
  } catch (err) {
    console.log("error in update:", err);
  }
})();

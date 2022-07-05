"use strict";
const {
  // stringify,
  database: {
    conversionTools: { getJavascriptObjectFromDynamoDbObject },
  },
  constants: {
    transactions: {
      types: {
        // raffle,
        BATTLE_V1,
        BATTLE_V2,
      },
    },
  },
} = require("compute-utils");

const handleBattleEndTx = require("./handleBattleEndTx");
const handleBattleV2Instigation = require("./handleBattleV2Instigation");

const INSERT = "INSERT";

const getIfIsBattleWinTx = ({ transaction }) => {
  if (
    transaction.type === BATTLE_V1 &&
    typeof transaction.value === "object" &&
    !!transaction.value.victoryData
  ) {
    return true;
  }
  return false;
};

const getIfIsBattleV2Instigation = ({ transaction }) => {
  if (
    transaction.type === BATTLE_V2 &&
    typeof transaction.value === "object" &&
    transaction.value.instigator &&
    transaction.value.enemyAddress && // safeguard
    transaction.value.amount // safeguard
  ) {
    return true;
  }
  return false;
};

module.exports = async ({ event }) => {
  const records = event.Records;

  console.log("running handleTransactions with " + `${records.length} records`);

  for (const record of records) {
    if (record.eventName === INSERT) {
      const dynamoDbObject = record.dynamodb.NewImage;

      const transaction = getJavascriptObjectFromDynamoDbObject({
        dynamoDbObject,
      });

      if (
        getIfIsBattleWinTx({
          transaction,
        })
      ) {
        await handleBattleEndTx({
          transaction,
        });
      } else if (
        getIfIsBattleV2Instigation({
          transaction,
        })
      ) {
        await handleBattleV2Instigation({
          transaction,
        });
      }
    }
  }

  console.log("handleTransactions executed successfully👩🏿‍💻👨🏻‍💻👩🏼‍💻👨🏾‍💻👏🏿👏🏽👏");
};

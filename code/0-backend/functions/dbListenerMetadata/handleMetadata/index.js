"use strict";
const {
  // stringify,
  database: {
    conversionTools: { getJavascriptObjectFromDynamoDbObject },
  },
  constants: {
    transactions: {
      types: { BATTLE_V1_FIELD_REWARD, WITHDRAW_REQUEST, ASSETS_REFRESH_V2 },
    },
    metadata: {
      types: { DEPOSIT_V1 },
    },
    withdraws: {
      statuses: { PENDING },
    },
  },
  delay,
} = require("compute-utils");

const handleBattleFieldRewardsMetadata = require("./handleBattleFieldRewardsMetadata");
const handlePendingWithdrawMetadata = require("./handlePendingWithdrawMetadata");
const handlePendingDepositMetadata = require("./handlePendingDepositMetadata");
const handleAssetsRefreshV2Metadata = require("./handleAssetsRefreshV2Metadata");

const INSERT = "INSERT";
const MODIFY = "MODIFY";

const getIfIsBattleFieldRewardsMetadata = ({ metadata }) => {
  if (metadata.type === BATTLE_V1_FIELD_REWARD && metadata.paginationValue) {
    return true;
  }
  return false;
};

const getIfIsPendingWithdrawRequestMetadata = ({ metadata }) => {
  if (metadata.type === WITHDRAW_REQUEST && metadata.status === PENDING) {
    return true;
  }
  return false;
};

const getIfIsPendingDepositMetadata = ({ metadata }) => {
  if (metadata.type === DEPOSIT_V1 && metadata.status === PENDING) {
    return true;
  }
  return false;
};

const getIfIsUpdatingAssetDataV2 = ({ metadata }) => {
  if (metadata.type === ASSETS_REFRESH_V2 && !!metadata.cursor) {
    return true;
  }
  return false;
};

module.exports = async ({ event }) => {
  const records = event.Records;

  console.log("running handleMetadata with " + `${records.length} records`);

  for (const record of records) {
    const dynamoDbObject = record.dynamodb.NewImage;

    const metadata = getJavascriptObjectFromDynamoDbObject({
      dynamoDbObject,
    });

    if (
      [MODIFY, INSERT].includes(record.eventName) &&
      getIfIsBattleFieldRewardsMetadata({
        metadata,
      })
    ) {
      await handleBattleFieldRewardsMetadata({
        metadata,
      });
    } else if (
      record.eventName === INSERT &&
      getIfIsPendingWithdrawRequestMetadata({
        metadata,
      })
    ) {
      await handlePendingWithdrawMetadata({
        metadata,
      });
    } else if (
      record.eventName === INSERT &&
      getIfIsPendingDepositMetadata({
        metadata,
      })
    ) {
      await handlePendingDepositMetadata({
        metadata,
      });
    } else if (
      [MODIFY, INSERT].includes(record.eventName) &&
      getIfIsUpdatingAssetDataV2({
        metadata,
      })
    ) {
      await handleAssetsRefreshV2Metadata({
        metadata,
      });
    }
  }

  await delay(2500);

  console.log("handleMetadata executed successfully👩🏿‍💻👨🏻‍💻👩🏼‍💻👨🏾‍💻👏🏿👏🏽👏");
};

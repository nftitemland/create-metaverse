"use strict";

const {
  stringify,
  database: { searchDatabase },
  // encryption: { encrypt },
  constants: {
    // misc: { POI_SEPARATOR },
    aws: {
      database: {
        tableNames: { TRANSACTIONS },
        secondaryIndices: { partitionKeySecondarySortKeyIndex },
      },
    },
    transactions: {
      types: { STAKING_REWARD },
    },
    // timeReferences: { TIME_1, TIME_2 },
    // environment: { isProductionMode },
  },
  // addTransactionAndUpdateUser,
} = require("compute-utils");

// const updateMiniGame = require("./updateMiniGame");

const SEARCH_LIMIT = 250;
// const SEARCH_LIMIT = isProductionMode ? 50 : 10;

module.exports = async ({ address, startTime, endTime }) => {
  console.log(
    "🥩running getStakingRewards with the following values:",
    stringify({ address, startTime, endTime })
  );

  const responseValues = {
    stakingRewards: [],
  };

  let paginationValueToUse;
  let searchIterationCount = 0;

  do {
    console.log(
      `getStakingRewards search iteration: ${JSON.stringify({
        searchIterationCount,
        "Staking Reward Count:": responseValues.stakingRewards.length,
      })}`
    );
    searchIterationCount++;

    const searchDbResults = await searchDatabase({
      searchParams: {
        TableName: TRANSACTIONS,
        IndexName: partitionKeySecondarySortKeyIndex,
        Limit: SEARCH_LIMIT,
        ScanIndexForward: false,
        KeyConditionExpression:
          `#partitionKey = :partitionKey and ` +
          `#secondarySortKey between :startTime and :endTime`,
        FilterExpression: `#type = :type`,
        ExpressionAttributeNames: {
          "#partitionKey": "partitionKey",
          "#type": "type",
          "#secondarySortKey": "secondarySortKey",
        },
        ExpressionAttributeValues: {
          ":partitionKey": address,
          ":type": STAKING_REWARD,
          ":startTime": startTime,
          ":endTime": endTime,
        },
        ExclusiveStartKey: paginationValueToUse,
      },
    });

    const stakingRewards = searchDbResults.ultimateResults.map(
      (dbStakingReward) => {
        return {
          id: dbStakingReward.sortKey,
          time: dbStakingReward.secondarySortKey,
          value: dbStakingReward.value,
        };
      }
    );

    responseValues.stakingRewards.push(...stakingRewards);

    paginationValueToUse = searchDbResults.paginationValue;
  } while (paginationValueToUse);

  console.log(
    "🥩`getStakingRewards executed successfully, " +
      "returning values: " +
      stringify(Object.keys(responseValues))
  );

  return responseValues;
};

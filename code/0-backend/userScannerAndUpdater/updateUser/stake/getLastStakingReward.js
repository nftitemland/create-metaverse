"use strict";

const {
  stringify,
  delay,
  database: { searchDatabase },
  constants: {
    aws: {
      database: {
        tableNames: { TRANSACTIONS },
        secondaryIndices: { partitionKeySecondarySortKeyIndex },
      },
    },
    transactions: {
      types: { STAKING_REWARD },
    },
  },
} = require("compute-utils");

const searchLimit = 100;

module.exports = async ({ address, name }) => {
  console.log("running getLastStakingReward: " + stringify({ address, name }));

  const responseData = {
    lastStakingReward: null,
  };
  let paginationValueToUse;

  do {
    const searchDbResults = await searchDatabase({
      searchParams: {
        TableName: TRANSACTIONS,
        IndexName: partitionKeySecondarySortKeyIndex,
        Limit: searchLimit,
        ScanIndexForward: false,
        KeyConditionExpression: `#partitionKey = :partitionKey`,
        FilterExpression: "#type = :type",
        ExpressionAttributeNames: {
          "#partitionKey": "partitionKey",
          "#type": "type",
        },
        ExpressionAttributeValues: {
          ":partitionKey": address,
          ":type": STAKING_REWARD,
        },
        ExclusiveStartKey: paginationValueToUse || undefined,
      },
    });

    // if (searchDbResults.ultimateResults.length > 0) {
    //   for (const stakingRewardTx of searchDbResults.ultimateResults) {
    //     const stakingRewardTxName =
    //       (typeof stakingRewardTx.value === "object" &&
    //         Object.keys(stakingRewardTx.value).length > 0 &&
    //         stakingRewardTx.value.name) ||
    //       null;

    //     if (!stakingRewardTxName) {
    //       throw new Error(
    //         "getLastStakingReward: safeguard data corruption error: " +
    //           `staking tx missing name: ${JSON.stringify(
    //             stakingRewardTx,
    //             null,
    //             4
    //           )}`
    //       );
    //     }

    //     if (stakingRewardTxName === name) {
    //       responseData.lastStakingReward = stakingRewardTx;
    //     }
    //   }

    let i = 0;

    while (
      !responseData.lastStakingReward &&
      searchDbResults.ultimateResults[i]
    ) {
      const stakingRewardTx = searchDbResults.ultimateResults[i];

      const stakingRewardTxName =
        (typeof stakingRewardTx.value === "object" &&
          Object.keys(stakingRewardTx.value).length > 0 &&
          stakingRewardTx.value.name) ||
        null;

      if (!stakingRewardTxName) {
        throw new Error(
          "getLastStakingReward: safeguard data corruption error: " +
            `staking tx missing name: ${JSON.stringify(
              stakingRewardTx,
              null,
              4
            )}`
        );
      }

      // console.log(`

      //     ONE LOG: ${JSON.stringify(
      //       {
      //         i,
      //         stakingRewardTx,
      //         stakingRewardTxName,
      //         name,
      //         "stakingRewardTxName === name": stakingRewardTxName === name,
      //       },
      //       null,
      //       4
      //     )}

      // `);

      if (stakingRewardTxName === name) {
        responseData.lastStakingReward = stakingRewardTx;
      }

      i++;
    }

    // console.log(`

    //     MEGA LOG: ${JSON.stringify(
    //       {
    //         i,
    //         responseData,
    //       },
    //       null,
    //       4
    //     )}

    // `);

    // throw new Error("STOP NOW");

    paginationValueToUse = searchDbResults.paginationValue;

    if (!responseData.lastStakingReward && paginationValueToUse) {
      await delay(500);
    }
  } while (!responseData.lastStakingReward && paginationValueToUse);

  console.log(
    "getLastStakingReward executed successfully:",
    stringify({
      responseData,
    })
  );

  return responseData;
};

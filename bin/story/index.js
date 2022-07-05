"use strict";

const printStep = require("./printStep");
const subStepNames = require("./subStepNames");
const createDynamoDbTableStory = require("./createDynamoDbTableStory");

const STAGING_LC = "staging";
const PRODUCTION_LC = "production";

const stepData = [
  [
    {
      stepAction: () => {
        console.log("Create a folder on your computer where you want to work.");
      },
    },
    {
      stepAction: () => {
        console.log(
          "Go to that folder in your CLI and run `npm init`. " +
            "Then run `npm install create-metaverse`."
        );
      },
    },
    {
      stepAction: () => {
        console.log(
          "Go to the /node_modules/create-metaverse/code folder " +
            "to find the enchanted metaverse code. Assembly required. Env File Setup Required."
        );
      },
    },
  ],
  [
    {
      stepAction: () => {
        console.log("Create an AWS account or use your existing AWS account");
      },
    },
  ],
  [
    {
      stepAction: ({ stageSuffixLC }) => {
        console.log(`Create an SNS Topic nftitemland-data-${stageSuffixLC}`);
        console.log(
          "Subscribe to this SNS to get realtime data/error notifications " +
            "once your metaverse is set up."
        );
      },
    },
  ],
  [
    {
      stepAction: ({ stageSuffixLC }) => {
        createDynamoDbTableStory({
          stageSuffixLC,
          tableName: "users",
          partitionKey: "partitionKey",
          partitionKeyType: "String",
          gsiData: [
            {
              name: "secondaryPartitionKey-secondarySortKey-index",
              partitionKey: "secondaryPartitionKey",
              sortKey: "secondarySortKey",
              partitionKeyType: "String",
              sortKeyType: "Number",
            },
            {
              name: "userId-index",
              partitionKey: "userId",
              partitionKeyType: "String",
            },
          ],
        });
      },
    },

    {
      stepAction: ({ stageSuffixLC }) => {
        createDynamoDbTableStory({
          stageSuffixLC,
          tableName: "assets",
          partitionKey: "partitionKey",
          partitionKeyType: "String",
          gsiData: [
            {
              name: "ownerAddress-index",
              partitionKey: "ownerAddress",
              partitionKeyType: "String",
            },
          ],
        });
      },
    },

    {
      stepAction: ({ stageSuffixLC }) => {
        createDynamoDbTableStory({
          stageSuffixLC,
          tableName: "login-tokens",
          partitionKey: "partitionKey",
          partitionKeyType: "String",
          sortKey: "sortKey",
          sortKeyType: "Number",
        });
      },
    },

    {
      stepAction: ({ stageSuffixLC }) => {
        createDynamoDbTableStory({
          stageSuffixLC,
          tableName: "transactions",
          partitionKey: "partitionKey",
          partitionKeyType: "String",
          sortKey: "sortKey",
          sortKeyType: "String",
          gsiData: [
            {
              name: "partitionKey-secondarySortKey-index",
              partitionKey: "partitionKey",
              sortKey: "secondarySortKey",
              partitionKeyType: "String",
              sortKeyType: "Number",
            },
            {
              name: "type-secondarySortKey-index",
              partitionKey: "type",
              sortKey: "secondarySortKey",
              partitionKeyType: "String",
              sortKeyType: "Number",
            },
          ],
        });
      },
    },

    {
      stepAction: ({ stageSuffixLC }) => {
        createDynamoDbTableStory({
          stageSuffixLC,
          tableName: "queue",
          partitionKey: "partitionKey",
          partitionKeyType: "String",
          sortKey: "sortKey",
          sortKeyType: "Number",
        });
      },
    },

    {
      stepAction: ({ stageSuffixLC }) => {
        createDynamoDbTableStory({
          stageSuffixLC,
          tableName: "metadata",
          partitionKey: "partitionKey",
          partitionKeyType: "String",
          gsiData: [
            {
              name: "secondaryPartitionKey-secondarySortKey-index",
              partitionKey: "secondaryPartitionKey",
              sortKey: "secondarySortKey",
              partitionKeyType: "String",
              sortKeyType: "Number",
            },
          ],
        });
      },
    },
  ],
  [
    {
      stepAction: () => {
        console.log(`Deploy Lambda Function Policies, Script Provided`);
      },
    },
  ],
  [
    {
      stepAction: () => {
        console.log(`Deploy Lambda Function Roles, Script Provided`);
      },
    },
  ],
  [
    {
      stepAction: () => {
        console.log(`Deploy Lambda Functions, Script Provided`);
      },
    },
  ],
  [
    {
      stepAction: () => {
        console.log(`Deploy and Configure HTTP API Gateway`);
        console.log(`Attach Lambda Functions to HTTP API Gateway`);
      },
    },
  ],
  [
    {
      stepAction: () => {
        console.log(`Deploy and Configure Websocket API Gateway`);
        console.log(`Attach Lambda Functions to Websocket API Gateway`);
      },
    },
  ],

  [
    {
      stepAction: () => {
        console.log(
          `Create EventBridge Rules for the Following Lambda Functions`
        );
        console.log("Lambda: api_assetsRefresherV2_bot");
        console.log("Lambda: api_battleFieldRewards_bot");
        console.log("Lambda: api_deposits_bot");
        console.log("Lambda: api_yrobot_realtimeUpdater_bot");
        console.log("Lambda: api_yrobot_superEngine_bot");
        console.log("Lambda: api_yrobot_disco_bot");
      },
    },
  ],

  [
    {
      stepAction: () => {
        console.log(`Add Lambdas to DynamoDB Streams`);
        console.log("Lambda: api_dbListenerTransactions_bot");
        console.log("Lambda: api_dbListenerMetadata_bot");
      },
    },
  ],

  [
    {
      stepAction: () => {
        console.log(`Set Up AWS Amplify with Frontend Code`);
      },
    },
  ],

  [
    {
      stepAction: () => {
        console.log(
          `Execute userScannerAndUpdater to run daily NFT holder staking`
        );
      },
    },
  ],
];

const doStepComponent = (stepDatum, params) => {
  stepDatum.stepAction(params);
};

const doSteps = (params) => {
  for (let i = 0; i < stepData.length; i++) {
    const stepDatum = stepData[i];

    if (stepDatum.length === 1) {
      printStep(i + 1);
      doStepComponent(stepDatum[0], params);
    } else {
      printStep(i + 1);

      for (let j = 0; j < stepDatum.length; j++) {
        // printStep(i + 1, j + 1);
        printStep(i + 1, subStepNames[j]);
        doStepComponent(stepDatum[j], params);
      }
    }
  }
};

module.exports = ({ isProductionMode, stageName }) => {
  const modeLC = isProductionMode ? PRODUCTION_LC : STAGING_LC;
  let stageSuffixLC = `${modeLC}`;
  if (stageName) {
    stageSuffixLC += `-${stageName}`;
  }

  const params = {
    stageSuffixLC,
  };

  doSteps(params);
};

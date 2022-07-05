"use strict";

// TODO: load correct variables based on stage

const requiredEnvKeys = [
  "DB_TABLE_ARN_NFT_MINE",
  "DB_TABLE_ARN_ASSETS",
  "DB_TABLE_ARN_USERS",
  "DB_TABLE_ARN_LOGIN_TOKENS",
  "DB_TABLE_ARN_TRANSACTIONS",
  "DB_TABLE_ARN_QUEUE",
  "DB_TABLE_ARN_METADATA",
  "REALTIME_METAVERSE_WEBSOCKET_API_ARN",
  "SNS_OPERATOR_NOTIFICATIONS_ARN",
];

for (const key of requiredEnvKeys) {
  if (!process.env[key]) {
    throw new Error("missing required env key: " + key);
  }
}

module.exports = Object.freeze(
  ({
    // awsAccountNumber,
    // instancePrefix,
    // stageSuffix,
    // awsRegion,
    isProductionMode,
  }) => {
    const {
      API_WEBSOCKET,
      SNS_DATA,
      DB_LOGIN_TOKENS,
      DB_USERS,
      DB_QUEUE,
      DB_TRANSACTIONS,
      DB_ASSETS,
      DB_METADATA,
    } = isProductionMode
      ? {
          API_WEBSOCKET: process.env.REALTIME_METAVERSE_WEBSOCKET_API_ARN,
          SNS_DATA: process.env.SNS_OPERATOR_NOTIFICATIONS_ARN,
          DB_LOGIN_TOKENS: process.env.DB_TABLE_ARN_LOGIN_TOKENS,
          DB_USERS: process.env.DB_TABLE_ARN_USERS,
          DB_QUEUE: process.env.DB_TABLE_ARN_QUEUE,
          DB_TRANSACTIONS: process.env.DB_TABLE_ARN_TRANSACTIONS,
          DB_ASSETS: process.env.DB_TABLE_ARN_ASSETS,
          DB_METADATA: process.env.DB_TABLE_ARN_METADATA,
        }
      : {
          API_WEBSOCKET: process.env.REALTIME_METAVERSE_WEBSOCKET_API_ARN,
          SNS_DATA: process.env.SNS_OPERATOR_NOTIFICATIONS_ARN,
          DB_LOGIN_TOKENS: process.env.DB_TABLE_ARN_LOGIN_TOKENS,
          DB_USERS: process.env.DB_TABLE_ARN_USERS,
          DB_QUEUE: process.env.DB_TABLE_ARN_QUEUE,
          DB_TRANSACTIONS: process.env.DB_TABLE_ARN_TRANSACTIONS,
          DB_ASSETS: process.env.DB_TABLE_ARN_ASSETS,
          DB_METADATA: process.env.DB_TABLE_ARN_METADATA,
        };

    const permissionBlocks = {
      AUTH_ONLY: {
        Sid: "VitorxxxtentacionSEESEARCH",
        Effect: "Allow",
        Action: ["dynamodb:Query"],
        Resource: [DB_LOGIN_TOKENS],
      },
    };

    // const s =  2

    const policyData = [
      // {
      //   name: "user_altNftUpdate",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutorxxxtentacionzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:PutItem"],
      //         Resource: [DB_ASSETS],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "user_assetsNftUpdater",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutorxxxtentacionzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:UpdateItem"],
      //         Resource: [DB_ASSETS],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "user_userScannerAndUpdater",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutorxxxtentacionzqrt",
      //         Effect: "Allow",
      //         Action: [
      //           "dynamodb:UpdateItem",
      //           "dynamodb:Scan",
      //           "dynamodb:Query",
      //         ],
      //         Resource: [DB_ASSETS],
      //       },
      //       {
      //         Sid: "2Vi2sutorxxxtentac3ionzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_ASSETS}/index/ownerAddress-index`,
      //           `${DB_TRANSACTIONS}/index/partitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       {
      //         Sid: "3Vi2sutorxxxtentac3ionzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Scan"],
      //         Resource: [DB_USERS],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "user_commandCenter",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutorxxxtentacionzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Scan"],
      //         Resource: [DB_ASSETS],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "user_realtimeUpdater",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Effect: "Allow",
      //         Action: ["execute-api:ManageConnections"],
      //         Resource: [`${API_WEBSOCKET}/POST/@connections/{connectionId}`],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "user_deploy",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "VisualEditor0",
      //         Effect: "Allow",
      //         Action: [
      //           "lambda:CreateFunction",
      //           "lambda:UpdateFunctionCode",
      //           "iam:PassRole",
      //           "lambda:GetFunction",
      //           "lambda:UpdateFunctionConfiguration",
      //         ],
      //         Resource: [
      //           "arn:aws:lambda:us-east-1:69696969420:function:nft-item-api-1_api_test_get_staging",
      //           "arn:aws:lambda:us-east-1:69696969420:function:nft-item-api-1_api_data_post_staging",
      //           "arn:aws:lambda:us-east-1:69696969420:function:nft-item-api-1_api_login_post_staging",
      //           "arn:aws:lambda:us-east-1:69696969420:function:nft-item-api-1_api_logout_post_staging",
      //           "arn:aws:lambda:us-east-1:69696969420:function:nft-item-api-1_api_userData_get_staging",
      //           "arn:aws:lambda:us-east-1:69696969420:function:nft-item-api-1_api_userData_post_staging",
      //         ],
      //       },
      //       {
      //         Sid: "VisualEditor1",
      //         Effect: "Allow",
      //         Action: "iam:PassRole",
      //         Resource: [
      //           "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_test_get_staging",
      //           "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_data_post_staging",
      //           "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_login_post_staging",
      //           "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_logout_post_staging",
      //           "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_userData_get_staging",
      //           "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_userData_post_staging",
      //         ],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_data_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "VisuaasdgdsEditorxxxtentacion",
      //         Effect: "Allow",
      //         Action: ["sns:Publish"],
      //         Resource: [SNS_DATA],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_login_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "VisualEdasdastorxxxtentacion",
      //         Effect: "Allow",
      //         Action: ["dynamodb:PutItem"],
      //         Resource: [DB_LOGIN_TOKENS],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_userData_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Visutorxxxeqwqwtentacionz",
      //         Effect: "Allow",
      //         Action: ["dynamodb:PutItem", "dynamodb:GetItem"],
      //         Resource: [DB_USERS],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_userData_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Visutorxxxtentacionzcx",
      //         Effect: "Allow",
      //         Action: ["dynamodb:UpdateItem"],
      //         Resource: [DB_USERS],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_stakingRewards_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutorxxxtentacionzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_TRANSACTIONS}/index/partitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_characters_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutorxxxtensdtacionzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [`${DB_ASSETS}/index/ownerAddress-index`],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_characters_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutorxxxtenssdtacionzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem"],
      //         Resource: [DB_ASSETS],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_dbListenerTransactions_bot",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorxxxten2wsds2ssdtacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem"],
      //         Resource: [DB_USERS],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_battle_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorxxxten2wsds2ssdertetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem"],
      //         Resource: [DB_USERS],
      //       },
      //       {
      //         Sid: "Vi2sorxxxtedertsdsetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_USERS}/index/userId-index`,
      //           `${DB_TRANSACTIONS}/index/partitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_battleV2_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorsdertetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem"],
      //         Resource: [DB_USERS],
      //       },
      //       {
      //         Sid: "Vi2sorxteteteteertsdsetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_USERS}/index/userId-index`,
      //           `${DB_TRANSACTIONS}/index/partitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_battleProfiles_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorxxxtedertsdssdsetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_USERS}/index/secondaryPartitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_transactions_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorxxxtedertsdsssdssdsetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_TRANSACTIONS}/index/partitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_battleFieldRewards_bot",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorxxxtedertsdssdsssdssdsetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Scan"],
      //         Resource: [DB_USERS],
      //       },
      //       {
      //         Sid: "Vi2sorx232xxtedertsdssdssrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:PutItem"],
      //         Resource: [DB_METADATA],
      //       }, //,
      //       // permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_deposits_bot",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Visutorxxxeqwqsdsdwtentacionz",
      //         Effect: "Allow",
      //         Action: ["dynamodb:PutItem", "dynamodb:GetItem"],
      //         Resource: [DB_USERS],
      //       },
      //       {
      //         Sid: "Vi2sorx232xxtedererewrtsdssdssrt",
      //         Effect: "Allow",
      //         Action: [
      //           "dynamodb:GetItem",
      //           "dynamodb:UpdateItem",
      //           "dynamodb:PutItem",
      //         ],
      //         Resource: [DB_METADATA],
      //       }, //,
      //       // permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_battle_recent_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Visutorxxqsdsd2323wtentacionz",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_TRANSACTIONS}/index/partitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_dbListenerMetadata_bot",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorxxxtedertsdssdsssdssdsetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Scan"],
      //         Resource: [DB_USERS],
      //       },
      //       {
      //         Sid: "Vi2sorx232xxtedertsdssdssrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:UpdateItem"],
      //         Resource: [DB_METADATA],
      //       }, //,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_withdraws_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorxxxten2wsds2ssdertetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem"],
      //         Resource: [DB_USERS],
      //       },
      //       {
      //         Sid: "Vi2sorxxxtedertserdsetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_ASSETS}/index/ownerAddress-index`,
      //           `${DB_TRANSACTIONS}/index/partitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       {
      //         Sid: "Vi2sorxxxten2wsds2ssdesdsrtetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:PutItem"],
      //         Resource: [DB_METADATA],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_withdrawLevel_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorxxxtedertserdsetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [`${DB_ASSETS}/index/ownerAddress-index`],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_z_characters_uuid_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorxxxtedertserdsetacionrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem"],
      //         Resource: [DB_ASSETS],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      // name: "role_lambda_api_logout_post",
      // policy: {
      //   Version: "2012-10-17",
      //   Statement: [
      //     {
      //       Sid: "Vi2sutorxxxtentacionzqrt",
      //       Effect: "Allow",
      //       Action: ["dynamodb:UpdateItem"],
      //       Resource: [DB_LOGIN_TOKENS],
      //     },
      //     permissionBlocks.AUTH_ONLY,
      //   ],
      // },
      // },
      // {
      //   name: "role_lambda_api_profiles_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutorxxxtentacionzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_USERS}/index/secondaryPartitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       // permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_messages_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [permissionBlocks.AUTH_ONLY],
      //   },
      // },
      // {
      //   name: "role_lambda_api_messages_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "VFi232323232",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_TRANSACTIONS}/index/type-secondarySortKey-index`,
      //         ],
      //       },
      //       permissionBlocks.AUTH_ONLY,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_yreal_realRequest_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vissutossdsrxxxtonzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem"],
      //         // Resource: [`${DB_USERS}/index/userId-index`],
      //         Resource: [DB_USERS],
      //       },
      //       {
      //         Sid: "Vissut23232ossdsrxxxtonzqrt",
      //         Effect: "Allow",
      //         Action: ["execute-api:ManageConnections"],
      //         Resource: [`${API_WEBSOCKET}/POST/@connections/{connectionId}`],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_yrobot_disco_bot",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vissutxtonzqrt",
      //         Effect: "Allow",
      //         Action: ["execute-api:ManageConnections"],
      //         Resource: [`${API_WEBSOCKET}/DELETE/@connections/{connectionId}`],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_yrobot_realtimeUpdater_bot",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vissutxtzzzuuuuwwwonzqrt",
      //         Effect: "Allow",
      //         Action: ["execute-api:ManageConnections"],
      //         Resource: [`${API_WEBSOCKET}/POST/@connections/{connectionId}`],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_yrobot_superEngine_bot",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vissuzzz2wwew2txtzzzuuuuwwwonzqrt",
      //         Effect: "Allow",
      //         Action: ["execute-api:ManageConnections"],
      //         Resource: [`${API_WEBSOCKET}/TEMP`],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_yguest_preconnect_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vissuzzz2wwew2txtzzzuuuuwwwonzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem"],
      //         Resource: [DB_USERS + "_salt_placeholder"],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_referrals_post",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorx232xxtedererewrtsdssdssrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:UpdateItem"],
      //         Resource: [DB_USERS],
      //         //
      //       }, //,
      //       {
      //         Sid: "Vi2sossrx2wwww32xxtedererewrtsdssdssrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [`${DB_USERS}/index/userId-index`],
      //         //
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_referrals_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sorx232xxtedererewrtsdsdssdssdssrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem"],
      //         Resource: [DB_USERS],
      //       }, //,
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_ystatic_landElements_get",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vissuzzz2wwewzzzuuuuwwwonzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_METADATA}/index/secondaryPartitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "function_drq",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutorxxxtonzqrt",
      //         Effect: "Allow",
      //         Action: [
      //           "dynamodb:UpdateItem",
      //           "dynamodb:PutItem",
      //           "dynamodb:Query",
      //         ],
      //         Resource: [DB_QUEUE],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_assetsRefresher_bot",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "VFi232323232",
      //         Effect: "Allow",
      //         Action: ["dynamodb:UpdateItem"],
      //         Resource: [`${DB_ASSETS}`],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "role_lambda_api_assetsRefresherV2_bot",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "VFi232323232",
      //         Effect: "Allow",
      //         Action: ["dynamodb:UpdateItem"],
      //         Resource: [DB_ASSETS],
      //       },
      //       {
      //         Sid: "VFi2323232333432",
      //         Effect: "Allow",
      //         Action: ["dynamodb:PutItem"],
      //         Resource: [DB_METADATA],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "function_atauu",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi2sutosdsrxxxtonzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:PutItem"],
      //         Resource: [DB_TRANSACTIONS],
      //       },
      //       {
      //         Sid: "Vi22sutosdsrsdsdxxxtonzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [
      //           `${DB_TRANSACTIONS}/index/partitionKey-secondarySortKey-index`,
      //         ],
      //       },
      //       {
      //         Sid: "Vissutossdsrxxxtonzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:GetItem", "dynamodb:UpdateItem"],
      //         Resource: [DB_USERS],
      //       },
      //     ],
      //   },
      // },
      // {
      //   name: "function_getWithdrawLevelData",
      //   policy: {
      //     Version: "2012-10-17",
      //     Statement: [
      //       {
      //         Sid: "Vi22sutosdsrsdsdxxxtonzqrt",
      //         Effect: "Allow",
      //         Action: ["dynamodb:Query"],
      //         Resource: [`${DB_ASSETS}/index/ownerAddress-index`],
      //       },
      //     ],
      //   },
      // },
    ];

    return policyData;
  }
);

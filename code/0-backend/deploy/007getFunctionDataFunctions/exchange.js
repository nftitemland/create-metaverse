"use strict";

const nodePath = require("path");

const envSetNames = {
  testEnv: "testEnv",
  loginEnv: "loginEnv",
  addressObscureEnv: "addressObscureEnv",
  redisEnv: "redisEnv",
  moralisApiEnv: "moralisApiEnv",
  withdrawsMoneyHolderEnv: "withdrawsMoneyHolderEnv",
  moneyHolderAddressEnv: "moneyHolderAddressEnv",
  referralCode: "referralCode",
  debugDoLog: "debugDoLog",
  grecaptcha: "grecaptcha",
  yrobotRealtimeUpdater: "yrobotRealtimeUpdater",
  yrobotSuperEngine: "yrobotSuperEngine",
  preProdWebsiteUrl: "preProdWebsiteUrl",

  // debugTime: "debugTime",
  // refreshRate: "refreshRate",
  // runTime: "runTime",
};

const {
  testEnv,
  loginEnv,
  addressObscureEnv,
  redisEnv,
  moralisApiEnv,
  withdrawsMoneyHolderEnv,
  moneyHolderAddressEnv,
  referralCode,
  debugDoLog,
  grecaptcha,
  yrobotRealtimeUpdater,
  yrobotSuperEngine,
  preProdWebsiteUrl,
} = envSetNames;

const ROOT_PATH = nodePath.join(__dirname, "..", "functions");

module.exports = ({
  isProductionMode,
  environmentVariables: {
    TEST_ABC,
    LOGIN_ENCRYPTION_KEY_V1,
    NTOKEN_ENCRYPTION_KEY_V1,
    POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1,
    REDIS_URL,
    MORALIS_X_API_KEY,
    WITHDRAWS_MONEY_HOLDER_ADDRESS,
    WITHDRAWS_MONEY_HOLDER_MNEMONIC,
    REFERRAL_CODE_SALT,
    DEBUG_DO_LOG,
    DEBUG_TIME,
    REFRESH_RATE,
    RUN_TIME,
    DEBUG_TIME_SUPER_ENGINE,
    REFRESH_RATE_SUPER_ENGINE,
    RUN_TIME_SUPER_ENGINE,
    GRECAPTCHA_SECRET_KEY,
    PREPROD_WEBSITE_URL,
  },
}) => {
  const envSets = {
    [testEnv]: {
      TEST_ABC,
    },

    [loginEnv]: {
      LOGIN_ENCRYPTION_KEY_V1,
      NTOKEN_ENCRYPTION_KEY_V1,
    },

    [addressObscureEnv]: {
      POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1,
    },

    [redisEnv]: {
      REDIS_URL,
    },

    [moralisApiEnv]: {
      MORALIS_X_API_KEY,
    },

    [withdrawsMoneyHolderEnv]: {
      WITHDRAWS_MONEY_HOLDER_ADDRESS,
      WITHDRAWS_MONEY_HOLDER_MNEMONIC,
    },

    [moneyHolderAddressEnv]: {
      WITHDRAWS_MONEY_HOLDER_ADDRESS,
    },

    [referralCode]: {
      REFERRAL_CODE_SALT,
    },

    [debugDoLog]: {
      DEBUG_DO_LOG,
    },

    [yrobotRealtimeUpdater]: {
      DEBUG_TIME,
      REFRESH_RATE,
      RUN_TIME,
    },

    [yrobotSuperEngine]: {
      DEBUG_TIME_SUPER_ENGINE,
      REFRESH_RATE_SUPER_ENGINE,
      RUN_TIME_SUPER_ENGINE,
    },

    [grecaptcha]: {
      GRECAPTCHA_SECRET_KEY,
    },

    [preProdWebsiteUrl]: {
      PREPROD_WEBSITE_URL,
    },
  };

  const rawFunctionData = [
    {
      nickname: "GET/test",
      name: "api_test_get",
      folderName: "testGET",
      // path: `${ROOT_PATH}/testGET`,
      // pathsToInclude: [
      // "./routes/exchange/eUsers/POST",
      // "./sacredElementals/crypto/flamingoCrescent",
      // ],
      environmentVariables: {},
      envSets: [testEnv],
    },
    {
      nickname: "POST/data",
      name: "api_data_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_data_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_data_post_staging",
      folderName: "dataPost",
      environmentVariables: {},
      envSets: [testEnv],
    },

    {
      nickname: "POST/login",
      name: "api_login_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_login_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_login_post_staging",
      folderName: "loginPost",
      environmentVariables: {},
      envSets: [loginEnv],
    },

    {
      nickname: "POST/logout",
      name: "api_logout_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_logout_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_logout_post_staging",
      folderName: "logoutPOST",
      environmentVariables: {},
      envSets: [loginEnv],
    },

    {
      nickname: "GET/userData",
      name: "api_userData_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_userData_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_userData_get_staging",
      folderName: "userDataGet",
      environmentVariables: {},
      envSets: [loginEnv, moralisApiEnv, referralCode],
    },

    {
      nickname: "POST/userData",
      name: "api_userData_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_userData_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_userData_post_staging",
      folderName: "userDataPOST",
      environmentVariables: {},
      envSets: [loginEnv, moralisApiEnv, redisEnv],
      memory: 256,
    },

    {
      nickname: "GET/profiles",
      name: "api_profiles_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_profiles_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_profiles_get_staging",
      folderName: "profilesGET",
      environmentVariables: {},
      envSets: [],
    },

    {
      nickname: "POST/messages",
      name: "api_messages_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_messages_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_messages_post_staging",
      folderName: "messagesPOST",
      environmentVariables: {},
      envSets: [loginEnv],
    },

    {
      nickname: "GET/messages",
      name: "api_messages_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_messages_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_messages_get_staging",
      folderName: "messagesGET",
      environmentVariables: {},
      envSets: [loginEnv, addressObscureEnv, redisEnv],
    },

    {
      nickname: "GET/stakingRewards",
      name: "api_stakingRewards_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_stakingRewards_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_stakingRewards_get_staging",
      folderName: "stakingRewardsGet",
      environmentVariables: {},
      envSets: [loginEnv],
    },

    {
      nickname: "GET/characters",
      name: "api_characters_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_characters_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_characters_get_staging",
      folderName: "charactersGet",
      environmentVariables: {},
      envSets: [loginEnv, addressObscureEnv],
    },

    {
      nickname: "POST/characters",
      name: "api_characters_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_characters_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_characters_post_staging",
      folderName: "charactersPost",
      environmentVariables: {},
      envSets: [loginEnv],
    },

    {
      nickname: "POST/battle",
      name: "api_battle_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battle_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battle_post_staging",
      folderName: "battlePost",
      environmentVariables: {},
      envSets: [loginEnv],
      memory: 384,
    },

    {
      nickname: "POST/battleV2",
      name: "api_battleV2_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battleV2_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battleV2_post_staging",
      folderName: "battleV2Post",
      environmentVariables: {},
      envSets: [loginEnv],
      memory: 384,
    },

    {
      nickname: "GET/battleProfiles",
      name: "api_battleProfiles_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battleProfiles_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battleProfiles_get_staging",
      folderName: "battleProfilesGet",
      environmentVariables: {},
      envSets: [loginEnv, addressObscureEnv],
    },

    {
      nickname: "GET/battle/recent",
      name: "api_battle_recent_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battle_recent_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battle_recent_get_staging",
      folderName: "battleRecentGet",
      environmentVariables: {},
      envSets: [loginEnv],
    },

    {
      nickname: "GET/transactions",
      name: "api_transactions_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_transactions_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_transactions_get_staging",
      folderName: "transactionsGet",
      environmentVariables: {},
      envSets: [loginEnv, addressObscureEnv],
    },

    {
      nickname: "GET/withdrawLevel",
      name: "api_withdrawLevel_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_withdrawLevel_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_withdrawLevel_get_staging",
      folderName: "withdrawLevelGet",
      environmentVariables: {},
      envSets: [loginEnv],
    },

    {
      nickname: "POST/withdraws",
      name: "api_withdraws_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_withdraws_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_withdraws_post_staging",
      folderName: "withdrawsPost",
      environmentVariables: {},
      envSets: [loginEnv],
      memory: 256,
    },

    {
      nickname: "POST/referrals",
      name: "api_referrals_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_referrals_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_referrals_post_staging",
      folderName: "referralsPost",
      environmentVariables: {},
      envSets: [],
      memory: 128,
    },

    {
      nickname: "GET/referrals",
      name: "api_referrals_get",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_referrals_get"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_referrals_get_staging",
      folderName: "referralsGet",
      environmentVariables: {},
      envSets: [],
      memory: 128,
    },

    {
      nickname: "BOT/dbListenerTransactions",
      name: "api_dbListenerTransactions_bot",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_dbListenerTransactions_bot"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_dbListenerTransactions_bot_staging",
      folderName: "dbListenerTransactions",
      environmentVariables: {},
      envSets: [loginEnv],
      timeout: 60 * 5,
      memory: 256,
    },

    {
      nickname: "BOT/battleFieldRewards",
      name: "api_battleFieldRewards_bot",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battleFieldRewards_bot"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_battleFieldRewards_bot_staging",
      folderName: "battleFieldRewardsBot",
      environmentVariables: {},
      envSets: [],
      timeout: 60 * 5,
      memory: 256,
    },

    {
      nickname: "BOT/deposits",
      name: "api_deposits_bot",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_deposits_bot"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_deposits_bot_staging",
      folderName: "depositsBot",
      environmentVariables: {},
      envSets: [moneyHolderAddressEnv, moralisApiEnv],
      timeout: 60 * 5,
      memory: 256,
    },

    {
      nickname: "BOT/dbListenerMetadata",
      name: "api_dbListenerMetadata_bot",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_dbListenerMetadata_bot"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_dbListenerMetadata_bot_staging",
      folderName: "dbListenerMetadata",
      environmentVariables: {},
      envSets: [withdrawsMoneyHolderEnv, moralisApiEnv],
      timeout: 60 * 5 - 2,
      memory: 256,
    },

    {
      nickname: "BOT/assetsRefresher",
      name: "api_assetsRefresher_bot",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_assetsRefresher_bot"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_assetsRefresher_bot_staging",
      folderName: "assetsRefresherBOT",
      environmentVariables: {},
      envSets: [moralisApiEnv],
      memory: 256,
      timeout: 60 * 5,
    },

    {
      nickname: "BOT/assetsRefresherV2",
      name: "api_assetsRefresherV2_bot",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_assetsRefresherV2_bot"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_assetsRefresherV2_bot_staging",
      folderName: "assetsRefresherV2Bot",
      environmentVariables: {},
      envSets: [moralisApiEnv],
      memory: 256,
      timeout: 60 * 3,
    },

    {
      nickname: "yPOST/preconnect",
      name: "api_yguest_preconnect_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yguest_preconnect_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yguest_preconnect_post_staging",
      folderName: "yguest_preconnectPost",
      environmentVariables: {},
      envSets: [redisEnv, preProdWebsiteUrl],
      memory: 128,
    },

    {
      nickname: "yPOST/realRequest",
      name: "api_yreal_realRequest_post",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yreal_realRequest_post"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yreal_realRequest_post_staging",
      folderName: "yreal_realRequestPost",
      environmentVariables: {},
      envSets: [redisEnv, debugDoLog, grecaptcha, preProdWebsiteUrl],
      memory: 384,
      includeRealpoiMapData: true,
    },

    {
      nickname: "yBOT/realtimeUpdater",
      name: "api_yrobot_realtimeUpdater_bot",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yrobot_realtimeUpdater_bot"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yrobot_realtimeUpdater_bot_staging",
      folderName: "yrobot_realtimeUpdaterBot",
      environmentVariables: {},
      envSets: [redisEnv, yrobotRealtimeUpdater],
      memory: 160,
      timeout: 60 * 1.5,
    },

    {
      nickname: "yBOT/superEngine",
      name: "api_yrobot_superEngine_bot",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yrobot_superEngine_bot"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yrobot_superEngine_bot_staging",
      folderName: "yrobot_superEngineBot",
      environmentVariables: {},
      envSets: [redisEnv, yrobotSuperEngine],
      memory: 160,
      timeout: 60 * 3,
    },

    {
      nickname: "yBOT/disco",
      name: "api_yrobot_disco_bot",
      roleArn: isProductionMode
        ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yrobot_disco_bot"
        : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_yrobot_disco_bot_staging",
      folderName: "yrobot_discoBot",
      environmentVariables: {},
      envSets: [redisEnv],
      memory: 128,
      timeout: 60 * 1.5,
    },

    // {
    //   nickname: "yGET/landElements",
    //   name: "api_ystatic_landElements_get",
    //   roleArn: isProductionMode
    //     ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_ystatic_landElements_get"
    //     : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_ystatic_landElements_get_staging",
    //   folderName: "ystatic_landElements_get",
    //   environmentVariables: {},
    //   envSets: [],
    //   memory: 128,
    //   timeout: 30,
    // },

    {
      nickname: "zGET/items/uuid",
      name: "api_z_items_uuid_get",
      // roleArn: isProductionMode
      // ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_messages_get"
      // : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_messages_get_staging",
      folderName: "z_itemsUuidGet",
      environmentVariables: {},
      envSets: [],
    },

    {
      nickname: "zGET/flamin/uuid",
      name: "api_z_flamin_uuid_get",
      // roleArn: isProductionMode
      // ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_messages_get"
      // : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_messages_get_staging",
      folderName: "z_flaminUuidGet",
      environmentVariables: {},
      envSets: [],
    },

    {
      nickname: "zGET/characters/uuid",
      name: "api_z_characters_uuid",
      // roleArn: isProductionMode
      //   ? "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_z_characters_uuid_get"
      //   : "arn:aws:iam::69696969420:role/nft-item-api-1_lambda_api_z_characters_uuid_get_staging",
      folderName: "z_charactersUuidGet",
      environmentVariables: {},
      envSets: [],
    },
  ];

  for (const rawFunctionDatum of rawFunctionData) {
    rawFunctionDatum.environmentVariables.NFTMINE_ENV = isProductionMode
      ? "production"
      : "staging";

    if (!rawFunctionDatum.pathsToInclude) {
      rawFunctionDatum.pathsToInclude = [];
    }

    rawFunctionDatum.handler = `./lambdaFiles/${rawFunctionDatum.folderName}/index.handler`;
    rawFunctionDatum.path = `${ROOT_PATH}/${rawFunctionDatum.folderName}`;

    if (rawFunctionDatum.envSets) {
      rawFunctionDatum.envSets.forEach((envSetName) => {
        const envSet = envSets[envSetName];

        Object.assign(rawFunctionDatum.environmentVariables, envSet);
      });
    }
  }

  return rawFunctionData;
};

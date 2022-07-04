"use strict";

const staging = "staging";
const production = "production";

const validNftItemEnvs = Object.freeze([staging, production]);

const nftItemEnv = process.env.NFTITEM_ENV;

if (!validNftItemEnvs.includes(nftItemEnv)) {
  throw new Error(`invalid process.env.NFTITEM_ENV: ${nftItemEnv}`);
}

const isProductionMode = nftItemEnv === production;

console.log(
  `intializing constants in production mode: ${isProductionMode}\n` +
    `location: ${__dirname}`
);

const HYPER_WORLD_WIDTH_1 = 1000;
const HYPER_WORLD_HEIGHT_1 = 400;
const MAX_HYPER_WORLD_X = -1000000;
const MIN_HYPER_WORLD_X = MAX_HYPER_WORLD_X - HYPER_WORLD_WIDTH_1;
const MAX_HYPER_WORLD_Y = 0;
const MIN_HYPER_WORLD_Y = MAX_HYPER_WORLD_Y + HYPER_WORLD_HEIGHT_1;

const MAP_WIDTH_1 = 1400;
const MAP_HEIGHT_1 = 1400;
// const MAP_WIDTH_2 = MAP_HEIGHT_1;
const MAP_WIDTH_2 = 0;
// const MAP_HEIGHT_2 = MAP_HEIGHT_1;
const MAP_HEIGHT_2 = 0;
const MIN_WORLD_X = 0;
const MAX_WORLD_X = MIN_WORLD_X + MAP_WIDTH_1 + MAP_WIDTH_2;
const MIN_WORLD_Y = 0;
const MAX_WORLD_Y = MIN_WORLD_Y + Math.max(MAP_HEIGHT_1, MAP_HEIGHT_2);

// const enchantmentTypes = {
//   CHARACTER: "CHARACTER",
// };

const enchantmentTypeToEnchantmentNames = {
  // [enchantmentTypes.CHARACTER]: {
  CHARACTER: {
    BOI: "BOI",
    TARA: "TARA",
    GURR: "GURR",
    SQUR: "SQUR",
    MANGANESESTRATEGIST: "MANGANESESTRATEGIST",
    MANGANESE: "MANGANESE",
  },
};

const requiredEnvKeys = [
  "MORALIS_SERVER_URL",
  "MORALIS_APP_ID",
  "POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1",
  "LOGIN_ENCRYPTION_KEY_V1",
  "NTOKEN_ENCRYPTION_KEY_V1",
  "DB_TABLE_NAME_NFT_MINE",
  "DB_TABLE_NAME_ASSETS",
  "DB_TABLE_NAME_USERS",
  "DB_TABLE_NAME_LOGIN_TOKENS",
  "DB_TABLE_NAME_TRANSACTIONS",
  "DB_TABLE_NAME_QUEUE",
  "DB_TABLE_NAME_METADATA",
  "HTTP_API_BASE_URL",
  "REALTIME_METAVERSE_WEBSOCKET_API_BASE_URL",
];

for (const key of requiredEnvKeys) {
  if (!process.env[key]) {
    throw new Error("missing required env key: " + key);
  }
}

const {
  tableNames,
  serverUrl,
  appId,
  blockchain,
  contractAddress,
  apiBaseUrl,
  websocketApiBaseUrl,
} = isProductionMode
  ? {
      tableNames: Object.freeze({
        nftmine: process.env.DB_TABLE_NAME_NFT_MINE,
        assets: process.env.DB_TABLE_NAME_ASSETS,
        users: process.env.DB_TABLE_NAME_USERS,
        loginTokens: process.env.DB_TABLE_NAME_LOGIN_TOKENS,
        transactions: process.env.DB_TABLE_NAME_TRANSACTIONS,
        queue: process.env.DB_TABLE_NAME_QUEUE,
        metadata: process.env.DB_TABLE_NAME_METADATA,
      }),

      serverUrl: process.env.MORALIS_SERVER_URL || "https://fake.com",
      appId: process.env.MORALIS_APP_ID || "fakeAppId",
      blockchain: "mainnet",
      contractAddress: "0xd4D29A9ea76d6e31bD02Af1D02549A35DB08a30D",
      apiBaseUrl: process.env.HTTP_API_BASE_URL,
      websocketApiBaseUrl:
        process.env.REALTIME_METAVERSE_WEBSOCKET_API_BASE_URL,
    }
  : {
      tableNames: Object.freeze({
        nftmine: process.env.DB_TABLE_NAME_NFT_MINE,
        assets: process.env.DB_TABLE_NAME_ASSETS,
        users: process.env.DB_TABLE_NAME_USERS,
        loginTokens: process.env.DB_TABLE_NAME_LOGIN_TOKENS,
        transactions: process.env.DB_TABLE_NAME_TRANSACTIONS,
        queue: process.env.DB_TABLE_NAME_QUEUE,
        metadata: process.env.DB_TABLE_NAME_METADATA,
      }),

      serverUrl: process.env.MORALIS_SERVER_URL,
      appId: process.env.MORALIS_APP_ID,
      blockchain: "rinkeby",
      contractAddress: "0x5BbBd40bE357f77086A5fa5a7a1bf933d12aB697",
      apiBaseUrl: process.env.HTTP_API_BASE_URL,
      websocketApiBaseUrl:
        process.env.REALTIME_METAVERSE_WEBSOCKET_API_BASE_URL,
    };

const f = Object.freeze;

const PARTITION_KEY = "partitionKey";
const SORT_KEY = "sortKey";
const SECONDARY_SORT_KEY = "secondarySortKey";
const SECONDARY_PARTITION_KEY = "secondaryPartitionKey";

const WORLD_HEIGHT = 312;
const SQUARE_HEIGHT = 26;

const battleFieldAwardAdditiveRateConstant = 0.04166667; // 1 per day
const battleFieldAwardRateConstant = 0.00203; // 5% per day // legacy
// const battleValueMultiplierConstant = 0.0001; // 10000 to 1
// const battleValueMultiplierConstant = 0.001; // 1000 to 1
const battleValueMultiplierConstant = 0.0002; // 10000 to 2

module.exports = f({
  aws: {
    database: {
      tableNames: {
        NFTMINE: tableNames.nftmine,
        ASSETS: tableNames.assets,
        USERS: tableNames.users,
        LOGIN_TOKENS: tableNames.loginTokens,
        TRANSACTIONS: tableNames.transactions,
        QUEUE: tableNames.queue,
        METADATA: tableNames.metadata,
      },
      tableNameToPartitionKey: {
        [tableNames.nftmine]: PARTITION_KEY,
        [tableNames.users]: PARTITION_KEY,
        [tableNames.assets]: PARTITION_KEY,
        [tableNames.loginTokens]: PARTITION_KEY,
        [tableNames.transactions]: PARTITION_KEY,
        [tableNames.queue]: PARTITION_KEY,
        [tableNames.metadata]: PARTITION_KEY,
      },
      tableNameToSortKey: {
        [tableNames.nftmine]: SORT_KEY,
        [tableNames.loginTokens]: SORT_KEY,
        [tableNames.transactions]: SORT_KEY,
        [tableNames.queue]: SORT_KEY,
      },
      tableNameToSecondaryPartitionKey: {
        [tableNames.nftmine]: SECONDARY_PARTITION_KEY,
        [tableNames.transactions]: PARTITION_KEY,
      },
      tableNameToSecondarySortKey: {
        [tableNames.nftmine]: SECONDARY_SORT_KEY,
        [tableNames.transactions]: SECONDARY_SORT_KEY,
      },
      secondaryIndices: {
        ownerAddressIndex: "ownerAddress-index",
        partitionKeySecondarySortKeyIndex:
          "partitionKey-secondarySortKey-index",
        secondaryPartitionKeySecondarySortKeyIndex:
          "secondaryPartitionKey-secondarySortKey-index",
        typeSecondarySortKey: "type-secondarySortKey-index",
        userIdIndex: "userId-index",
      },
      dataTypes: {
        mintInitialization: "MINT_INITIALIZATION",
        MINT_INITIALIZATION: "MINT_INITIALIZATION",
        MINT_PROCESSING_1A: "MINT_PROCESSING_1A",
        MINT_SUCCESS: "MINT_SUCCESS",
        MINT_FAIL: "MINT_FAIL",
        MINT_FAIL_NOT_ENOUGH_MONEY: "MINT_FAIL_NOT_ENOUGH_MONEY",
        MINT_FAIL_ERROR: "MINT_FAIL_ERROR",
      },
      assetsMetadataKeys: {
        metadata_firstLandClaim: "metadata_firstLandClaim",
        metadata_landClaim: "metadata_landClaim",
        metadata_nftUpdateBot: "metadata_nftUpdateBot",
        metadata_userScannerAndUpdaterData:
          "metadata_userScannerAndUpdaterData",
        metadata_CrypDollLandClaim: "metadata_CrypDollLandClaim",
        metadata_PixieJarsLandClaim: "metadata_PixieJarsLandClaim",
      },
      assetsPrefixes: {
        asset_CustomPixieJars_: "asset_CustomPixieJars_",
        asset_CrypDolls_: "asset_CrypDolls_",
        asset_MintablePixieJars_: "asset_MintablePixieJars_",
        asset_PoiPois_: "asset_PoiPois_",
        asset_FantasticFlamingos_: "asset_FantasticFlamingos_",
        asset_UltraFlamingos_: "asset_UltraFlamingos_",
        asset_Lands_: "asset_Lands_",
        asset_LonelyFrog_: "asset_LonelyFrog_",
        asset_CryptoChicks_: "asset_CryptoChicks_",
        asset_GameCharacters_: "asset_GameCharacters_",
      },

      pureMetadataKeys: {
        depositsBotData: "depositsBotData",
      },

      pureMetadataPrefixes: {
        nftiltDeposits_: "nftiltDeposits_",
      },
    },
  },

  users: {
    visibilities: {
      PUBLIC: "PUBLIC",
      PRIVATE: "PRIVATE",
    },

    attributeVisibilities: {
      ADDRESS: "ADDRESS",
      ART_POINTS: "ART_POINTS",
      METAVERSE_PRESENT: "METAVERSE_PRESENT",
      USERNAME: "USERNAME",
      CHARACTER_PICTURE: "CHARACTER_PICTURE",
    },
  },

  transactions: {
    types: {
      ADD_MESSAGE_PUBLIC: "ADD_MESSAGE_PUBLIC",
      SWITCH_PROFILE_ATTRIBUTE_VISIBLE: "SWITCH_PROFILE_ATTRIBUTE_VISIBLE",
      SWITCH_PROFILE_IS_PUBLIC: "SWITCH_PROFILE_IS_PUBLIC",
      STAKING_RULES_SET: "STAKING_RULES_SET",
      STAKING_REWARD: "STAKING_REWARD",
      PIXIE_POWDER_BONUS: "PIXIE_POWDER_BONUS",
      CHARACTER_SELECT: "CHARACTER_SELECT",
      TRANSFER_ITEM: "TRANSFER_ITEM",
      SWITCH_BATTLE_MODE: "SWITCH_BATTLE_MODE",
      BATTLE_V1: "BATTLE_V1",
      BATTLE_V2: "BATTLE_V2",
      BATTLE_V1_REWARDS: "BATTLE_V1_REWARDS",
      BATTLE_V1_FIELD_REWARD: "BATTLE_V1_FIELD_REWARD",
      WITHDRAW_REQUEST: "WITHDRAW_REQUEST",
      WITHDRAW_PENDING: "WITHDRAW_PENDING",
      WITHDRAW_SUCCESSFUL: "WITHDRAW_SUCCESSFUL",
      DEPOSIT_V1: "DEPOSIT_V1",
      ASSETS_REFRESH_V2: "ASSETS_REFRESH_V2",
    },
  },

  httpHeaderKeys: {
    NFTITEM__ADDRESS: "nftitem-address",
    NFTITEM__NTOKEN: "nftitem-ntoken",
    NFTITEM__WEB3_SIGNATURE: "nftitem-web3-signature",
    NFTITEM__LOGIN_TOKEN: "nftitem-login-token",
    NFTITEM__MINI_GAME: "nftitem-mini-game",
  },

  api: {
    baseUrl: apiBaseUrl,
  },

  websocketApi: {
    baseUrl: websocketApiBaseUrl,
  },

  environment: {
    nftItemEnv,
    isProductionMode,
  },

  moralis: {
    serverUrl,
    appId,
    blockchain,
    contractAddress,
  },

  encryptionKeys: {
    LOGIN_ENCRYPTION_KEY_V1: process.env.LOGIN_ENCRYPTION_KEY_V1,
    NTOKEN_ENCRYPTION_KEY_V1: process.env.NTOKEN_ENCRYPTION_KEY_V1,
    POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1:
      process.env.POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1,
  },

  smartContractAddresses: {
    MINTABLE_PIXIE_JARS: "0xea508034fcc8eeff24bf43effe42621008359a2e",
    POI_POI_PROD_ONLY: "0xd4d29a9ea76d6e31bd02af1d02549a35db08a30d",
    POI_POI_STAGE: isProductionMode
      ? "0xd4d29a9ea76d6e31bd02af1d02549a35db08a30d"
      : "0x5BbBd40bE357f77086A5fa5a7a1bf933d12aB697",
    LAND: "0xd70292d3df1c7ee16d395469a3f0e7ba3824d355",
    ULTRA_FLAMINGO: "0xc3844c3aea8458e21bdeee7ba6ed328637fef8cb",
    LONELY_FROG: "0x549d38f104ac46d856c1b2bf2a20d170efdb2a8d",
    FANTASTIC_FLAMINGO: "0xc02abc6ae8f6123fce120ec32ba6298e2f020e59",
    CRYPTO_CHICKS: "0x1981cc36b59cffdd24b01cc5d698daa75e367e04",
    GAME_CHARACTERS: "0xba75108527c630a093ab4a4a569ddab2e2b8a8ba",
    NFTILT_TOKEN_ADDRESS_STAGING: "0x7Eb4AB5596C0DF745290471b02146399a0d6D357",
    NFTILT_TOKEN_ADDRESS: "0xeC8720aaFeD488436d48A391e2204276F47746F5",
  },

  misc: {
    POI_SEPARATOR: "-----Poi-----",
    GENESIS_ADDRESS: "0x0000000000000000000000000000000000000000",
    XENA: "XENA",
  },

  timeReferences: {
    TIME_1: 1,
    TIME_2: 29068563600000,
  },

  metaverseActions: {
    MOVE_UP: "MOVE_UP",
    MOVE_LEFT: "MOVE_LEFT",
    MOVE_RIGHT: "MOVE_RIGHT",
    MOVE_DOWN: "MOVE_DOWN",
  },

  metaverseValues: {
    WORLD_HEIGHT,
    SQUARE_HEIGHT,
    SPACE_COUNT_CONSTANT: WORLD_HEIGHT / SQUARE_HEIGHT - 1,
  },

  nftKeys: {
    POIPOI: "POIPOI",
    GIGA: "GIGA",
    HYPER: "HYPER",
    NORMAL: "NORMAL",
    DPS_DOGES: "DPS_DOGES",
    DPS_PUPPIES: "DPS_PUPPIES",
    CRYPDOLLS: "CRYPDOLLS",
    CUSTOM_PIXIES: "CUSTOM_PIXIES",
    PIXIEJARS: "PIXIEJARS",
    ULTRA_FLAMINS: "ULTRA_FLAMINS",
    FANTASTIC_FLAMINS: "FANTASTIC_FLAMINS",
    LANDS: "LANDS",
    LONELY_FROG_LAMBO_CLUB: "LONELY_FROG_LAMBO_CLUB",
    CRYPTO_CHICKS: "CRYPTO_CHICKS",
    GAME_CHARACTERS: "GAME_CHARACTERS",
  },

  dataTypes: {
    ASSETS_NFT_V2: "ASSETS_NFT_V2",
  },

  staking: {
    ruleNames: {
      PREMIER_PIXIE: "PREMIER_PIXIE",
    },
  },

  battle: {
    meta: {
      TIME_BEFORE_NEXT_MATCH: isProductionMode
        ? 1000 * 60 * 60 * 1
        : // : 1000 * 60 * 60 * 1,
          10000,
    },

    actions: {
      USER_ATTACK: "USER_ATTACK",
      ENEMY_USER_ATTACK: "ENEMY_USER_ATTACK",
    },

    battle: {
      MINIMUM_BATTLE_VALUE: 0.001,
      BATTLE_VALUE_MULTIPLIER_CONSTANT: battleValueMultiplierConstant,
    },

    rewards: {
      BATTLE_FIELD_AWARD_ADDITIVE_RATE: battleFieldAwardAdditiveRateConstant,
      BATTLE_FIELD_AWARD_RATE: battleFieldAwardRateConstant,
      MINIMUM_PIXIE_CRYSTAL_VALUE: 0.001,
    },
  },

  withdraws: {
    // GLOBAL_WITHDRAW_CONSTANT: isProductionMode ? 100 : 3,
    // GLOBAL_WITHDRAW_CONSTANT: 100,
    // GLOBAL_WITHDRAW_CONSTANT: 1.08,
    GLOBAL_WITHDRAW_CONSTANT: 111,
    MAXIMUM_WITHDRAW_LEVEL: 5,

    statuses: {
      PENDING: "PENDING",
      COMPLETE: "COMPLETE",
      // CANCELLED: 'CANCELLED'
    },
  },

  deposits: {
    statuses: {
      PENDING: "PENDING",
      COMPLETE: "COMPLETE",
    },
  },

  metadata: {
    types: {
      DEPOSIT_V1: "DEPOSIT_V1",
    },
  },

  google: {
    captcha: {
      verifyUrl: "https://www.google.com/recaptcha/api/siteverify",
    },
  },

  redis: {
    hKeyPrefixes: {
      CP_: "CP_",
    },

    lRListKeyPrefixes: {
      M_: "M_",
      Q_: "Q_",
    },

    DEFAULT_REDIS_OBJECT_SEPARATOR: "|",
  },

  realtime: {
    dbKeys: {
      REALTIME_CONNECTION_RECORD: "REALTIME_CONNECTION_RECORD",
      REALTIME_CONNECTION_RECORD_PROCESSED:
        "REALTIME_CONNECTION_RECORD_PROCESSED",
    },

    commands: {
      MOVE: "MOVE",
      DISCO: "DISCO",
      MSGRCPT: "MSGRCPT",
      CLAIM: "CLAIM",
      ENTER: "ENTER",
      ENCHANT: "ENCHANT",
      MAPCOORD: "MAPCOORD",
      INTERACT: "INTERACT",
    },

    limits: {
      MAXIMUM_USER_COUNT: 5,
      // MAXIMUM_USER_COUNT: 1,

      HYPER_WORLD_WIDTH_1,
      HYPER_WORLD_HEIGHT_1,
      MAX_HYPER_WORLD_X,
      MIN_HYPER_WORLD_X,
      MAX_HYPER_WORLD_Y,
      MIN_HYPER_WORLD_Y,

      MAP_WIDTH_1,
      MAP_HEIGHT_1,
      MAP_WIDTH_2,
      MAP_HEIGHT_2,
      MIN_WORLD_X,
      MAX_WORLD_X,
      MIN_WORLD_Y,
      MAX_WORLD_Y,
    },

    realPoiPrizeTypes: {
      MATIC: "MATIC",
    },

    realPoiObjDbTypes: {
      REALPOI_CHEST: "REALPOI_CHEST",
    },

    realPoiObjStates: {
      UNOPENED: 0,
      OPENED: 1,
    },

    realPoiLvls: {
      ELITE: 0,
      GIGA: 1,
      // HYPER: 2,
      MANGANESESTRATEGIST: 9,
      LOGGED_IN: 10,
      GUEST: 100,
    },

    realPoiComponentNames: {
      COUCH: "COUCH",
      DOOR: "DOOR",
      TUB: "TUB",
      BED: "BED",
      ZENPOND: "ZENPOND",
      FOUNTAIN: "FOUNTAIN",
      FLOWERPOT: "FLOWERPOT",
    },

    realPoiInteractArgs: {
      TUBBOI: "TUBBOI",
      TUBGURR: "TUBGURR",
      X: "X",
    },

    realPoiInteractTags: {
      FUNTUB: "FUNTUB",
      TREASURE_CHEST: "TREASURE_CHEST",
    },

    // const realPoiObjTypes = {
    //   CHEST: "CHEST",
    // };

    // enchantmentTypes,
    enchantmentTypeToEnchantmentNames,
  },

  nftTypes: {
    poiPoi: {
      NORMAL: "NORMAL",
      HYPER_RARE: "HYPER_RARE",
      GIGA_RARE: "GIGA_RARE",
      GURR: "GURR",
      ELITE_GURR: "ELITE_GURR",
    },
  },
});

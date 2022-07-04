"use strict";

const { argv } = require("yargs");

const isProductionMode = argv.mode === "production";

if (isProductionMode) {
  require("dotenv").config({ path: "./.env" });
} else {
  require("dotenv").config({ path: "./.staging.env" });
}

const {
  database: { classicalUpdateDatabaseEntry },
  javascript: { getNftPartitionKey },
  constants: {
    nftKeys: { POIPOI },
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNames: { ASSETS },
      },
    },
    smartContractAddresses: { POI_POI_PROD_ONLY },
  },
  stringify,
  delay,
} = require("compute-utils");

const nftTypes = {
  NORMAL: "NORMAL",
  HYPER_RARE: "HYPER_RARE",
  GIGA_RARE: "GIGA_RARE",
  GURR: "GURR",
  ELITE_GURR: "ELITE_GURR",
};

const { GIGA_RARE, HYPER_RARE, NORMAL, GURR, ELITE_GURR } = nftTypes;

const nftTypeToBattleBonus = {
  [NORMAL]: 100,
  [HYPER_RARE]: 600,
  [GIGA_RARE]: 800,
  [GURR]: 1000,
  [ELITE_GURR]: 1500,
};

const nftTypeToWithdrawLevel = {
  [NORMAL]: 5,
  [HYPER_RARE]: 10,
  [GIGA_RARE]: 13,
  [GURR]: 20,
  [ELITE_GURR]: 25,
};

const poiNftData = [
  {
    id: 1,
    nftType: GIGA_RARE,
  },
  {
    id: 2,
    nftType: GIGA_RARE,
  },
  {
    id: 3,
    nftType: GIGA_RARE,
  },
  {
    id: 4,
    nftType: GIGA_RARE,
  },
  {
    id: 5,
    nftType: HYPER_RARE,
  },
  {
    id: 6,
    nftType: HYPER_RARE,
  },
  {
    id: 7,
    nftType: GIGA_RARE,
  },
  {
    id: 8,
    nftType: GIGA_RARE,
  },
  {
    id: 9,
    nftType: GIGA_RARE,
  },
  {
    id: 10,
    nftType: GIGA_RARE,
  },
  {
    id: 11,
    nftType: NORMAL,
  },
  {
    id: 12,
    nftType: GIGA_RARE,
  },
  {
    id: 13,
    nftType: GIGA_RARE,
  },
  {
    id: 14,
    nftType: HYPER_RARE,
  },
  {
    id: 15,
    nftType: GIGA_RARE,
  },
  {
    id: 16,
    nftType: NORMAL,
  },
  {
    id: 17,
    nftType: HYPER_RARE,
  },
  {
    id: 18,
    nftType: GIGA_RARE,
  },
  {
    id: 19,
    nftType: GIGA_RARE,
  },
  {
    id: 20,
    nftType: GIGA_RARE,
  },
  {
    id: 21,
    nftType: GIGA_RARE,
  },
  {
    id: 22,
    nftType: HYPER_RARE,
  },
  {
    id: 23,
    nftType: NORMAL,
  },
  {
    // cybertruck evening
    id: 24,
    nftType: ELITE_GURR,
  },
  {
    // little black dress
    id: 25,
    nftType: ELITE_GURR,
  },
  {
    id: 26,
    nftType: NORMAL,
  },
  {
    id: 27,
    nftType: NORMAL,
  },
  {
    // cybertruck day
    id: 28,
    nftType: ELITE_GURR,
  },
  {
    id: 29,
    nftType: NORMAL,
  },
  {
    // VACAY
    id: 30,
    nftType: ELITE_GURR,
  },
  {
    id: 31,
    nftType: GIGA_RARE,
  },
  {
    // WE CAN DO IT
    id: 32,
    nftType: ELITE_GURR,
  },
  {
    // EMO ELONA
    id: 33,
    nftType: GIGA_RARE,
  },
  {
    id: 34,
    nftType: GIGA_RARE,
  },
  {
    id: 35,
    nftType: GIGA_RARE,
  },
  {
    id: 36,
    nftType: HYPER_RARE,
  },
  {
    id: 37,
    nftType: GIGA_RARE,
  },
  {
    id: 38,
    nftType: NORMAL,
  },
  {
    id: 39,
    nftType: GIGA_RARE,
  },
  {
    // picnic
    id: 40,
    nftType: ELITE_GURR,
  },

  {
    //heaven poi
    id: 41,
    nftType: ELITE_GURR,
  },

  {
    id: 42,
    nftType: GIGA_RARE,
  },

  {
    // NFT X to the mars
    id: 43,
    nftType: ELITE_GURR,
  },
];

const updatePoiNfts = async () => {
  for (const datum of poiNftData) {
    console.log("updatePoiNfts:", stringify(datum));

    if (!datum.nftType || !nftTypes[datum.nftType]) {
      throw new Error("missing/invalid NFT type: " + JSON.stringify(datum));
    }

    const updateExpression =
      "SET #battleBonus = :battleBonus, " +
      `#nftType = :nftType, ` +
      `#withdrawLevel = :withdrawLevel, ` +
      `#collectionKey = :collectionKey`;

    const expressionAttributeNames = {
      "#battleBonus": "battleBonus",
      "#nftType": "nftType",
      "#withdrawLevel": "withdrawLevel",
      "#collectionKey": "collectionKey",
    };

    const expressionAttributeValues = {
      ":battleBonus": nftTypeToBattleBonus[datum.nftType],
      ":nftType": datum.nftType,
      ":withdrawLevel": nftTypeToWithdrawLevel[datum.nftType],
      ":collectionKey": POIPOI,
    };

    // const conditionExpression = "#ownerAddress <> :ownerAddress";

    await classicalUpdateDatabaseEntry({
      tableName: ASSETS,
      key: tableNameToPartitionKey[ASSETS],
      value: getNftPartitionKey({
        tokenId: datum.id,
        tokenAddress: POI_POI_PROD_ONLY,
      }),
      // sortKey: tableNameToSortKey[NFTMINE],
      // sortValue: transactionId,
      //   conditionExpression,
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
      //   doNotErrorOnConditionalFail: true,
    });

    await delay(500);
  }
};

(async () => {
  try {
    await updatePoiNfts();
  } catch (err) {
    console.log("error in update Poi NFTs:", err);
  }
})();

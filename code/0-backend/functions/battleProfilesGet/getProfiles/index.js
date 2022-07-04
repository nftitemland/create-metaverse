"use strict";

const {
  stringify,
  encryption: { encrypt },
  database: { searchDatabase },
  battle: { getUserBattleHpValueData },
  constants: {
    environment: { isProductionMode },
    misc: { POI_SEPARATOR },
    aws: {
      database: {
        tableNames: { USERS },
        secondaryIndices: { secondaryPartitionKeySecondarySortKeyIndex },
      },
    },
    users: {
      visibilities: { PUBLIC },
      attributeVisibilities: { ADDRESS, USERNAME },
    },
    encryptionKeys: { POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1 },
  },
} = require("compute-utils");

const SEARCH_LIMIT = 100;
const BATCH_AMOUNT = isProductionMode ? 6 : 2;

module.exports = async ({ address, pag }) => {
  console.log(
    "running getProfiles " +
      "with the following values: " +
      stringify({
        address,
        pag,
      })
  );

  const battleUsers = [];

  let paginationValueToUse = pag;

  do {
    const searchResults = await searchDatabase({
      searchParams: {
        TableName: USERS,
        IndexName: secondaryPartitionKeySecondarySortKeyIndex,
        Limit: SEARCH_LIMIT,
        ScanIndexForward: false,
        KeyConditionExpression: `#secondaryPartitionKey = :secondaryPartitionKey`,
        // FilterExpression: "#partitionKey <> :userPartitionKey",
        ExpressionAttributeNames: {
          "#secondaryPartitionKey": "secondaryPartitionKey",
          // "#partitionKey": "partitionKey",
        },
        ExpressionAttributeValues: {
          ":secondaryPartitionKey": PUBLIC,
          // ":userPartitionKey": address,
        },
        ExclusiveStartKey: paginationValueToUse,
      },
    });

    const users = searchResults.ultimateResults;

    for (const user of users) {
      // if (user.txDbCache && user.txDbCache.battleMode) {
      battleUsers.push(user);
      // }
    }

    paginationValueToUse = searchResults.paginationValue;
  } while (paginationValueToUse && battleUsers.length < BATCH_AMOUNT);

  if (battleUsers.length > BATCH_AMOUNT) {
    battleUsers.length = BATCH_AMOUNT;
  }

  //   const profiles =  searchResults.  [];
  const profiles = battleUsers.map((user) => {
    const profile = {
      userId: user.userId,
      username: undefined,
      address: undefined,
      character: undefined,
      hp: undefined,
      // characterLevel: undefined,
    };

    if (user.visibilities) {
      if (user.visibilities[USERNAME]) {
        profile.username = user.username;
      }
      if (user.visibilities[ADDRESS]) {
        profile.address = user.partitionKey;
      }

      if (user.txDbCache) {
        profile.character = user.txDbCache.selectedCharacter;
      }
    }

    const userBattleHpValueData = getUserBattleHpValueData({ user });

    profile.hp = userBattleHpValueData.userBattleHpValue;

    return profile;
  });

  const results = {
    profiles,
  };

  if (profiles.length === BATCH_AMOUNT) {
    const lastBattleUser = battleUsers[battleUsers.length - 1];

    const rawPag = {
      partitionKey: lastBattleUser.partitionKey,
      secondaryPartitionKey: PUBLIC,
      secondarySortKey: lastBattleUser.secondarySortKey,
    };

    const { encryptedText, iv } = encrypt(
      JSON.stringify(rawPag),
      POWER_MAGNA_ADDRESS_OBSCURE_ENCRYPTION_KEY_V1
    );

    const pagKey = `${encryptedText}${POI_SEPARATOR}${iv.toString("base64")}`;

    results.pag = pagKey;
  } else {
    results.pag = null;
  }

  console.log(
    "getProfiles executed successfully, " +
      `obtained ${profiles.length} profiles`
  );

  return results;
};

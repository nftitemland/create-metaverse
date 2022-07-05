"use strict";

const { v4 } = require("uuid");
const stringify = require("../stringify");
const getDatabaseEntry = require("../database/getDatabaseEntry");
const {
  aws: {
    database: {
      tableNames: { USERS },
    },
  },
  users: { attributeVisibilities },
} = require("../constants");
const drq = require("../drq");
const getValidatedValues = require("./getValidatedValues");
const extractDataFromTxs = require("./extractDataFromTxs");
const addTransaction = require("./addTransaction");
const updateUser = require("./updateUser");

const getFreshTxDbCache = (userTxDbCache = {}) => {
  return Object.assign(
    {
      pixiePowder: 0,
      pixiePowderDataBonus: 0,
      // Custom PJS
      pixiePowderDataCustomPixieJars: 0,
      pixiePowderDataCustomPixieJarsNftCount: 0,
      // CrypDolls
      pixiePowderDataCrypDolls: 0,
      pixiePowderDataCrypDollsNftCount: 0,
      // PJs
      pixiePowderDataPixieJars: 0,
      pixiePowderDataPixieJarsNftCount: 0,
      // PoiPois
      pixiePowderPoiPois: 0,
      pixiePowderPoiPoisNftCount: 0,
      // Lands
      pixiePowderLands: 0,
      pixiePowderLandsNftCount: 0,
      // Ultra Flamin
      pixiePowderUltraFlamin: 0,
      pixiePowderUltraFlaminNftCount: 0,
      // Fantastic Flamingo
      pixiePowderFantasticFlamingo: 0,
      pixiePowderFantasticFlamingoNftCount: 0,
      // Lonely Frog
      pixiePowderLonelyFrog: 0,
      pixiePowderLonelyFrogNftCount: 0,
      // Crypto Chicks

      profileIsPublic: true,
      paginationValue: null,
      visibilities: {
        [attributeVisibilities.ADDRESS]: false,
        [attributeVisibilities.ART_POINTS]: false,
        [attributeVisibilities.USERNAME]: false,
        [attributeVisibilities.METAVERSE_PRESENT]: false,
        [attributeVisibilities.CHARACTER_PICTURE]: false,
      },

      // Battle
      battleMode: true,
      selectedCharacter: null,
      battleData: null,
      battleWinCount: 0,
      battleLoseCount: 0,
      battlePixiePowder: 0,
      battleFieldRewards: 0,

      // Withdraw/Deposit
      withdrawAmount: 0,
      depositAmount: 0,
    },
    userTxDbCache
  );
};

const getTxDbCache = ({ fullRefresh, user }) => {
  if (fullRefresh) {
    return getFreshTxDbCache();
  }

  if (user.txDbCache) {
    return getFreshTxDbCache(user.txDbCache);
  }

  return getFreshTxDbCache();
};

const addTransactionAndUpdateUserCore = async ({
  address,
  type,
  value,
  metadata,

  // Optional/Extra
  fullRefresh,
  searchRefresh,
  dryRun,
}) => {
  const user = await getDatabaseEntry({
    tableName: USERS,
    value: address,
  });

  if (!user) {
    throw new Error(`no user associated with address "${address}"`);
  }

  const txDbCache = getTxDbCache({
    fullRefresh,
    user,
  });

  const transactionId = v4();
  const operationTime = Date.now();

  const transactionToAdd = {
    partitionKey: address,
    sortKey: transactionId,
    secondarySortKey: operationTime,
    type,
    value,
  };

  if (metadata) {
    transactionToAdd.metadata = metadata;
  }

  await extractDataFromTxs({
    address,
    txDbCache,
    transactionToAdd,
    searchRefresh,
    fullRefresh,
  });

  txDbCache.paginationValue = {
    partitionKey: transactionToAdd.partitionKey,
    sortKey: transactionToAdd.sortKey,
    secondarySortKey: transactionToAdd.secondarySortKey,
  };

  await Promise.all([
    addTransaction({
      transactionToAdd,
      dryRun,
    }),
    updateUser({
      address,
      txDbCache,
      dryRun,
    }),
  ]);
};

module.exports = async (values) => {
  console.log(
    "📈🤠Running addTransactionAndUpdateUser with the following values:",
    stringify(values)
  );

  const { address, type, fullRefresh, searchRefresh, value, dryRun } =
    getValidatedValues(values);

  await drq({
    queueId: drq.getQueueId({
      name: "atauu",
      id: address,
    }),
    operation: async () => {
      await addTransactionAndUpdateUserCore({
        address,
        type,
        value,
        fullRefresh,
        searchRefresh,
        dryRun,
      });
    },
  });

  console.log("📈🤠addTransactionAndUpdateUser executed successfully");
};

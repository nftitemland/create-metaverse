"use strict";

const { argv } = require("yargs");

const isProductionMode = argv.mode === "production";

if (isProductionMode) {
  require("dotenv").config({ path: "./.env" });
} else {
  require("dotenv").config({ path: "./.staging.env" });
}

const {
  constants: {
    aws: {
      database: {
        // pureMetadataPrefixes: { nftiltDeposits_ },
        // pureMetadataKeys: { depositsBotData_ },
        tableNames: { METADATA },
      },
    },
    realtime: { realPoiPrizeTypes, realPoiObjDbTypes, realPoiObjStates },
  },
  stringify,
  database: { updateDatabaseEntry },
  realtime: {
    realpoi: { getRealPoiId },
  },
} = require("compute-utils");

const getChestId = (tag) => {
  return getRealPoiId({ type: realPoiObjDbTypes.REALPOI_CHEST, tag });
};

const addRealPoiObj = async ({ type, values }) => {
  //values = values || {}

  console.log(
    "Running addRealPoiObj with the following values:",
    stringify({
      type,
      values,
    })
  );

  switch (type) {
    case realPoiObjDbTypes.REALPOI_CHEST:
      await updateDatabaseEntry({
        tableName: METADATA,
        onlyAddDbEntryIfNotAlreadyExists: true,
        entry: {
          partitionKey: getChestId(values.tag),
          x: values.x || 200,
          y: values.y || 200,
          w: values.w || 75,
          h: values.h || 75,
          prizeAmount: values.prizeAmount || 0,
          prizeType: values.prizeType || realPoiPrizeTypes.MATIC,
          secondaryPartitionKey: realPoiObjDbTypes.REALPOI_CHEST,
          secondarySortKey: realPoiObjStates.UNOPENED,
        },
      });
      break;
    default:
      break;
  }

  // const { address, value } = addressData[0];
  // const address = "0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474";
  // const type = constants.transactions.types.TRANSFER_ITEM;
  // const value = 10000;

  console.log("addRealPoiObj executed successfully");
};

const addRealPoiObjWrapper = async () => {
  try {
    const chestData = {
      tag: "0a",
      x: 500,
      y: 150,
      w: 75,
      h: 75,
      prizeAmount: 0.2,
      prizeType: realPoiPrizeTypes.MATIC,
    };

    console.log(
      "addRealPoiObjWrapper: Running addRealPoiObj with the following values:",
      stringify({
        chestData,
      })
    );

    // const address = "0xCbE4Be414740cD1ba75133c5c0DB88f0E754E474";

    // const type = constants.transactions.types.TRANSFER_ITEM;

    // const value = 10000;

    await addRealPoiObj({
      type: realPoiObjDbTypes.REALPOI_CHEST,
      values: chestData,
    });

    console.log("addRealPoiObjWrapper: addRealPoiObj executed successfully");
  } catch (err) {
    console.log(
      "addRealPoiObjWrapper: error in addRealPoiObj:",
      err.message,
      err.data,
      err
    );
  }
};

addRealPoiObjWrapper();

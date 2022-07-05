"use strict";

const {
  // runFunctionRecursively,
  stringify,
  // database: { getDatabaseEntry, scanDatabase, classicalUpdateDatabaseEntry },
  constants: {
    aws: {
      database: {
        assetsPrefixes: {
          // asset_CustomPixieJars_,
          // asset_CrypDolls_,
          // asset_MintablePixieJars_,
          asset_PoiPois_,
          // asset_FantasticFlamingos_,
          asset_UltraFlamingos_,
          asset_Lands_,
          // asset_LonelyFrog_,
          // asset_CryptoChicks_,
        },
      },
    },
    nftKeys: {
      // CUSTOM_PIXIES,
      // CRYPDOLLS,
      // PIXIEJARS,
      POIPOI,
      LANDS,
      ULTRA_FLAMINS,
      // FANTASTIC_FLAMINS,
      // LONELY_FROG_LAMBO_CLUB,
      // CRYPTO_CHICKS,
    },
    // transactions: {
    //   types: { ADD_MESSAGE_PUBLIC },
    // },
  },
  delay,
  // addTransactionAndUpdateUser,
} = require("compute-utils");

const stake = require("./stake");

const nftData = [
  // {
  //   name: CUSTOM_PIXIES,
  //   assetPrefix: asset_CustomPixieJars_,
  //   // tokenAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
  // },
  // {
  //   name: CRYPDOLLS,
  //   assetPrefix: asset_CrypDolls_,
  //   // tokenAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
  // },

  // {
  //   name: PIXIEJARS,
  //   assetPrefix: asset_MintablePixieJars_,
  //   // tokenAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
  // },

  {
    name: POIPOI,
    assetPrefix: asset_PoiPois_,
  },

  {
    name: LANDS,
    assetPrefix: asset_Lands_,
  },

  {
    name: ULTRA_FLAMINS,
    assetPrefix: asset_UltraFlamingos_,
  },

  // {
  //   name: FANTASTIC_FLAMINS,
  //   assetPrefix: asset_FantasticFlamingos_,
  // },

  // {
  //   name: CRYPTO_CHICKS,
  //   assetPrefix: asset_CryptoChicks_,
  // },

  // {
  //   name: LONELY_FROG_LAMBO_CLUB,
  //   assetPrefix: asset_LonelyFrog_,
  // },
];

module.exports = async ({ user }) => {
  console.log(
    "🦆running updateUser" +
      stringify({
        user,
      })
  );

  for (const nftDatum of nftData) {
    if (!nftDatum.name || !nftDatum.assetPrefix) {
      throw new Error(
        "safeguard error: invalid nft datum: " + JSON.stringify(nftDatum)
      );
    }

    await stake({
      // tokenAddress: nftDatum.tokenAddress,
      name: nftDatum.name,
      address: user.partitionKey,
      assetPrefix: nftDatum.assetPrefix,
    });

    await delay(3200);
  }

  console.log(
    "🦆updateUser executed successfully, " +
      "returning values: " +
      stringify({})
  );
};

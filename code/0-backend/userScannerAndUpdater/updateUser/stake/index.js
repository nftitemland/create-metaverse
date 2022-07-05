"use strict";

const {
  stringify,
  addTransactionAndUpdateUser,
  constants: {
    transactions: {
      types: { STAKING_REWARD },
    },
    nftKeys,
  },
  getRoundedNumber,
} = require("compute-utils");

const getUserNfts = require("./getUserNfts");
const getLastStakingReward = require("./getLastStakingReward");

// const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_DAY_MOD = 1000 * 60 * 60 * 18;

const getPixieCrystals = ({ nftCount, name }) => {
  switch (name) {
    case nftKeys.POIPOI:
      return getRoundedNumber(4 * nftCount);
    case nftKeys.LANDS:
      return getRoundedNumber(1 * nftCount);
    case nftKeys.LONELY_FROG_LAMBO_CLUB:
    case nftKeys.ULTRA_FLAMINS:
      return getRoundedNumber(0.1 * nftCount);
    case nftKeys.CRYPTO_CHICKS:
      return getRoundedNumber(0.01 * nftCount);
    case nftKeys.PIXIEJARS:
    case nftKeys.CUSTOM_PIXIES:
    case nftKeys.CRYPDOLLS:
      return getRoundedNumber(0.005 * nftCount);
    case nftKeys.FANTASTIC_FLAMINS:
      // return getRoundedNumber(0.00000001 * nftCount);
      return getRoundedNumber(0.00001 * nftCount);

    default:
      throw new Error(`unexpected nft name: ${name}`);
  }
};

module.exports = async ({ name, address, assetPrefix }) => {
  console.log("🦆running stake" + stringify({ name, address, assetPrefix }));

  const userNftData = await getUserNfts({ address, assetPrefix });

  if (userNftData.nftCount > 0) {
    const { lastStakingReward } = await getLastStakingReward({
      address,
      name,
    });

    // console.log(`

    //     MEGA STAKING LOG: ${JSON.stringify(
    //       {
    //         lastStakingReward,
    //       },
    //       null,
    //       4
    //     )}

    // `);

    if (
      lastStakingReward &&
      // Date.now() < lastStakingReward.secondarySortKey + ONE_DAY
      Date.now() < lastStakingReward.secondarySortKey + ONE_DAY_MOD
      // Date.now() < lastStakingReward.secondarySortKey + 12
    ) {
      console.log(
        "🦆stake executed successfully,[NO-OP]" +
          "returning values: " +
          stringify({})
      );
      return;
    }

    await addTransactionAndUpdateUser({
      address,
      type: STAKING_REWARD,
      // fullRefresh: false,
      // searchRefresh: false,
      fullRefresh: true,
      searchRefresh: true,
      value: {
        name,
        nftCount: userNftData.nftCount,
        pixieCrystals: getPixieCrystals({
          nftCount: userNftData.nftCount,
          name,
        }),
      },
      // dryRun: true,
      dryRun: false,
    });

    return;
  }

  console.log(
    "🦆stake executed successfully, " + "returning values: " + stringify({})
  );
};

"use strict";

const {
  nftKeys: {
    CUSTOM_PIXIES,
    CRYPDOLLS,
    PIXIEJARS,
    POIPOI,
    LANDS,
    LONELY_FROG_LAMBO_CLUB,
    ULTRA_FLAMINS,
    FANTASTIC_FLAMINS,
    CRYPTO_CHICKS,
  },
  // users: {
  //   visibilities: { PUBLIC },
  // },
  transactions: {
    types: {
      ADD_MESSAGE_PUBLIC,
      SWITCH_PROFILE_ATTRIBUTE_VISIBLE,
      SWITCH_PROFILE_IS_PUBLIC,
      STAKING_RULES_SET,
      PIXIE_POWDER_BONUS,
      STAKING_REWARD,
      CHARACTER_SELECT,
      SWITCH_BATTLE_MODE,
      BATTLE_V1,
      BATTLE_V2,
      BATTLE_V1_REWARDS,
      BATTLE_V1_FIELD_REWARD,
      WITHDRAW_REQUEST,
      WITHDRAW_PENDING,
      WITHDRAW_SUCCESSFUL,
      DEPOSIT_V1,
    },
  },
} = require("../../constants");

const getRoundedNumber = require("../../getRoundedNumber");

const stakingRewardNameToKeyData = ({ name }) => {
  switch (name) {
    case CUSTOM_PIXIES:
      return {
        crystalCountKey: "pixiePowderDataCustomPixieJars",
        nftCountKey: "pixiePowderDataCustomPixieJarsNftCount",
      };
    case CRYPDOLLS:
      return {
        crystalCountKey: "pixiePowderDataCrypDolls",
        nftCountKey: "pixiePowderDataCrypDollsNftCount",
      };
    case PIXIEJARS:
      return {
        crystalCountKey: "pixiePowderDataPixieJars",
        nftCountKey: "pixiePowderDataPixieJarsNftCount",
      };
    case POIPOI:
      return {
        crystalCountKey: "pixiePowderPoiPois",
        nftCountKey: "pixiePowderPoiPoisNftCount",
      };
    case LANDS:
      return {
        crystalCountKey: "pixiePowderLands",
        nftCountKey: "pixiePowderLandsNftCount",
      };
    case ULTRA_FLAMINS:
      return {
        crystalCountKey: "pixiePowderUltraFlamin",
        nftCountKey: "pixiePowderUltraFlaminNftCount",
      };
    case FANTASTIC_FLAMINS:
      return {
        crystalCountKey: "pixiePowderFantasticFlamingo",
        nftCountKey: "pixiePowderFantasticFlamingoNftCount",
      };
    case LONELY_FROG_LAMBO_CLUB:
      return {
        crystalCountKey: "pixiePowderLonelyFrog",
        nftCountKey: "pixiePowderLonelyFrogNftCount",
      };
    case CRYPTO_CHICKS:
      return {
        crystalCountKey: "pixiePowderCryptoChicks",
        nftCountKey: "pixiePowderCryptoChicksNftCount",
      };
    default:
      throw new Error(
        `stakingRewardNameToKeyData error: invalid name: ${name}`
      );
  }
};

module.exports = ({ transaction, txDbCache }) => {
  switch (transaction.type) {
    case ADD_MESSAGE_PUBLIC:
    case STAKING_RULES_SET:
    case WITHDRAW_PENDING:
    case WITHDRAW_SUCCESSFUL:
      break;
    case SWITCH_PROFILE_ATTRIBUTE_VISIBLE:
      txDbCache.visibilities[transaction.value] =
        !txDbCache.visibilities[transaction.value];
      break;
    case SWITCH_PROFILE_IS_PUBLIC:
      // txDbCache.profileIsPublic = !txDbCache.profileIsPublic; legacy
      txDbCache.profileIsPublic = true;
      break;
    case PIXIE_POWDER_BONUS:
      txDbCache.pixiePowder = getRoundedNumber(
        txDbCache.pixiePowder + transaction.value
      );
      txDbCache.pixiePowderDataBonus = getRoundedNumber(
        txDbCache.pixiePowderDataBonus + transaction.value
      );
      break;
    case WITHDRAW_REQUEST:
      txDbCache.pixiePowder = getRoundedNumber(
        txDbCache.pixiePowder - transaction.value.amount
      );
      txDbCache.withdrawAmount = getRoundedNumber(
        txDbCache.withdrawAmount + transaction.value.amount
      );
      break;
    case BATTLE_V1_FIELD_REWARD:
      txDbCache.pixiePowder = getRoundedNumber(
        txDbCache.pixiePowder + transaction.value.amount
      );
      txDbCache.battleFieldRewards = getRoundedNumber(
        txDbCache.battleFieldRewards + transaction.value.amount
      );
      break;
    case DEPOSIT_V1:
      txDbCache.pixiePowder = getRoundedNumber(
        txDbCache.pixiePowder + transaction.value.totalDepositAmount
      );
      txDbCache.depositAmount = getRoundedNumber(
        txDbCache.depositAmount + transaction.value.totalDepositAmount
      );
      break;
    case STAKING_REWARD: {
      const { nftCountKey, crystalCountKey } = stakingRewardNameToKeyData({
        name: transaction.value.name,
      });

      txDbCache.pixiePowder = getRoundedNumber(
        txDbCache.pixiePowder + transaction.value.pixieCrystals
      );

      txDbCache[crystalCountKey] = getRoundedNumber(
        (txDbCache[crystalCountKey] || 0) + transaction.value.pixieCrystals
      );

      txDbCache[nftCountKey] = transaction.value.nftCount;
      break;
    }
    case CHARACTER_SELECT:
      txDbCache.selectedCharacter = transaction.value;
      break;
    case SWITCH_BATTLE_MODE:
      // txDbCache.battleMode = !txDbCache.battleMode; // legacy
      txDbCache.battleMode = true;
      break;

    case BATTLE_V2:
      if (transaction.value.amount > 0) {
        txDbCache.battleWinCount = txDbCache.battleWinCount + 1;
      } else {
        txDbCache.battleLoseCount = txDbCache.battleLoseCount + 1;
      }

      txDbCache.pixiePowder = getRoundedNumber(
        txDbCache.pixiePowder + transaction.value.amount
      );

      txDbCache.battlePixiePowder = getRoundedNumber(
        txDbCache.battlePixiePowder + transaction.value.amount
      );

      break;
    case BATTLE_V1:
      if (transaction.value.battleState.turn === 0) {
        txDbCache.battleData = {
          startPag: {
            partitionKey: transaction.partitionKey,
            sortKey: transaction.sortKey,
            secondarySortKey: transaction.secondarySortKey,
          },
          type: transaction.type,
          startData: transaction.value.battleStartData,
          state: transaction.value.battleState,
          battleId: transaction.value.battleId,
          enemyAddress: transaction.value.enemyAddress,
          userPixieCrystals: transaction.value.userPixieCrystals,
          enemyUserPixieCrystals: transaction.value.enemyUserPixieCrystals,
        };
        break;
      } else if (transaction.value.victoryData) {
        txDbCache.battleData = Object.assign({}, txDbCache.battleData, {
          state: transaction.value.battleState,
          victoryData: transaction.value.victoryData,
        });

        txDbCache.lastBattleData = Object.assign({}, txDbCache.battleData);
        break;
      }
      txDbCache.battleData = Object.assign({}, txDbCache.battleData, {
        state: transaction.value.battleState,
      });
      break;
    case BATTLE_V1_REWARDS:
      /*
        typeof rawValue.isWinner !== "boolean" ||
        typeof rawValue.isUser !== "boolean" ||
        typeof rawValue.battleValue !== "number"

        battleWinCount: 0,
        battleLoseCount: 0,
        battlePixiePowder: 0,
      */

      if (transaction.value.isWinner) {
        txDbCache.pixiePowder = getRoundedNumber(
          txDbCache.pixiePowder + transaction.value.battleValue
        );

        txDbCache.battlePixiePowder = getRoundedNumber(
          txDbCache.battlePixiePowder + transaction.value.battleValue
        );

        txDbCache.battleWinCount = txDbCache.battleWinCount + 1;
      } else {
        txDbCache.pixiePowder = getRoundedNumber(
          txDbCache.pixiePowder - transaction.value.battleValue
        );

        txDbCache.battlePixiePowder = getRoundedNumber(
          txDbCache.battlePixiePowder - transaction.value.battleValue
        );

        txDbCache.battleLoseCount = txDbCache.battleLoseCount + 1;
      }

      if (transaction.value.isUser) {
        txDbCache.battleData = null;
      }

      break;
    default:
      throw new Error(
        "invalid transaction type " +
          transaction.type +
          " for transaction " +
          JSON.stringify({
            address: transaction.partitionKey,
            txId: transaction.sortKey,
          })
      );
  }
};

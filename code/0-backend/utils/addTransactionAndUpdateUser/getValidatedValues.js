"use strict";

const ethUtil = require("ethereumjs-util");
const stringify = require("../stringify");
const {
  transactions,
  users: { attributeVisibilities },
  nftKeys,
  battle,
} = require("../constants");

const web3 = require("web3");

const MAX_MESSAGE_LENGTH = 140;

module.exports = (rawValues) => {
  console.log(
    "Running getValidatedValues with the following values:",
    stringify(rawValues)
  );

  const rawAddress = rawValues.address;
  const rawType = rawValues.type;
  const rawFullRefresh = !!rawValues.fullRefresh;
  const rawSearchRefresh = !!rawValues.searchRefresh;
  const rawValue = rawValues.value;
  const rawDryRun = !!rawValues.dryRun;
  const rawMetadata = rawValues.metadata;

  if (
    !rawAddress ||
    typeof rawAddress !== "string" ||
    rawAddress.length > 500
  ) {
    const error = new Error('missing "address" parameter');
    throw error;
  }

  if (!web3.utils.isAddress(rawAddress)) {
    const error = new Error(`invalid "address" provided ${rawAddress}`);
    throw error;
  }

  if (!rawType || typeof rawType !== "string" || rawType.length > 500) {
    const error = new Error('missing "type" parameter');
    throw error;
  }

  if (!["boolean", "undefined"].includes(typeof rawFullRefresh)) {
    const error = new Error('invalid "fullRefresh" parameter');
    throw error;
  }

  if (!["boolean", "undefined"].includes(typeof rawSearchRefresh)) {
    const error = new Error('invalid "searchRefresh" parameter');
    throw error;
  }

  if (!transactions.types[rawType]) {
    const error = new Error(`invalid "type" provided ${rawType}`);
    throw error;
  }

  const validatedValues = {
    address: ethUtil.toChecksumAddress(rawAddress),
    type: undefined,
    fullRefresh: rawFullRefresh,
    searchRefresh: rawSearchRefresh,
    value: undefined,
    dryRun: rawDryRun,
  };

  // validate type, value, and metadata
  switch (rawType) {
    case transactions.types.SWITCH_PROFILE_IS_PUBLIC:
    case transactions.types.SWITCH_BATTLE_MODE:
      break;
    case transactions.types.SWITCH_PROFILE_ATTRIBUTE_VISIBLE:
      if (!attributeVisibilities[rawValue]) {
        const error = new Error(
          `invalid visibility "value" ` + `provided ${rawValue}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;
    case transactions.types.ADD_MESSAGE_PUBLIC:
      if (
        !rawValue ||
        typeof rawValue !== "string" ||
        rawValue.length > MAX_MESSAGE_LENGTH
      ) {
        const error = new Error(
          `invalid visibility "value" ` + `provided ${rawValue}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;
    case transactions.types.STAKING_RULES_SET:
      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        Object.keys(rawValue).length !== 1 ||
        !rawValue.name ||
        typeof rawValue.name !== "string"
      ) {
        const error = new Error(
          `invalid staking rules provided ${JSON.stringify(rawValue)}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;
    case transactions.types.PIXIE_POWDER_BONUS:
      if (
        (!rawValue && rawValue !== 0) ||
        typeof rawValue !== "number" ||
        Number.isNaN(rawValue)
      ) {
        const error = new Error(
          `invalid Pixie Powder Bonus amount provided ${JSON.stringify(
            rawValue
          )}`
        );
        throw error;
      }
      if (
        !rawMetadata ||
        typeof rawMetadata !== "object" ||
        Object.keys(rawMetadata).length !== 1 ||
        !rawMetadata.note ||
        typeof rawMetadata.note !== "string"
      ) {
        const error = new Error(
          `invalid Pixie Powder Bonus metadata provided ${JSON.stringify(
            rawMetadata
          )}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;
    case transactions.types.STAKING_REWARD:
      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        Object.keys(rawValue).length !== 3 ||
        !rawValue.name ||
        typeof rawValue.name !== "string" ||
        !rawValue.nftCount ||
        typeof rawValue.nftCount !== "number" ||
        !rawValue.pixieCrystals ||
        typeof rawValue.pixieCrystals !== "number"
      ) {
        const error = new Error(
          `invalid Staking Rewards value provided: ${JSON.stringify(rawValue)}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;
    case transactions.types.CHARACTER_SELECT:
      if (rawValue !== null) {
        if (
          !rawValue ||
          typeof rawValue !== "object" ||
          Object.keys(rawValue).length !== 3 ||
          !rawValue.type ||
          !nftKeys[rawValue.type] ||
          !rawValue.id ||
          typeof rawValue.id !== "string" ||
          typeof rawValue.battleBonus !== "number"
        ) {
          const error = new Error(
            `invalid character select data provided: ${JSON.stringify(
              rawValue
            )}`
          );
          throw error;
        }
      }
      validatedValues.value = rawValue;
      break;

    case transactions.types.BATTLE_V2:
      /*
        {
          battleId,
          hasWon,
          amount: 1,
          enemyUserId: enemyUser.userId,
        }
      */

      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        Object.keys(rawValue).length !== 6 ||
        !rawValue.battleId ||
        typeof rawValue.battleId !== "string" ||
        !rawValue.enemyAddress ||
        typeof rawValue.enemyAddress !== "string" ||
        !rawValue.enemyUserId ||
        typeof rawValue.userId !== "string" ||
        !rawValue.userId ||
        typeof rawValue.enemyUserId !== "string" ||
        typeof rawValue.instigator !== "boolean" ||
        !rawValue.amount ||
        typeof rawValue.amount !== "number"
      ) {
        const error = new Error(
          `invalid battle v2 value provided: ${JSON.stringify(rawValue)}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;
    case transactions.types.BATTLE_V1:
      // Validation: basic
      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        (!rawValue.battleStartData && !rawValue.battleState)
      ) {
        const error = new Error(
          `invalid battlev1 data provided: ${JSON.stringify(rawValue)}`
        );
        throw error;
      }

      // Validation: Battle ID
      if (
        typeof rawValue.battleId !== "string" ||
        rawValue.battleId.length < 5
      ) {
        const error = new Error(
          `invalid battlev1 battle id provided: ${JSON.stringify(rawValue)}`
        );
        throw error;
      }

      // Validation: Battle state
      if (
        !rawValue.battleState ||
        Object.keys(rawValue.battleState).length !== 4 ||
        typeof rawValue.battleState !== "object" ||
        typeof rawValue.battleState.turn !== "number" ||
        typeof rawValue.battleState.damage !== "number" ||
        typeof rawValue.battleState.enemyDamage !== "number" ||
        typeof rawValue.battleState.isUserTurn !== "boolean"
      ) {
        const error = new Error(
          `invalid battlev1 battle state provided: ${JSON.stringify(rawValue)}`
        );
        throw error;
      }

      if (rawValue.battleState.turn === 0) {
        // Validation TURN 0: Battle Start Data

        /*
          userCharacterData: {
            selectedCharacter: user.selectedCharacter,
            characterLevel: userCharacterLevel,
          },
          enemyUserCharacterData: {
            selectedCharacter: enemyUser.selectedCharacter,
            characterLevel: enemyUserCharacterLevel,
          },
          userPixieCrystals: user.secondarySortKey,
          enemyUserPixieCrystals: user.secondarySortKey,
        */

        if (
          !rawValue.battleStartData ||
          typeof rawValue.battleStartData !== "object" ||
          Object.keys(rawValue.battleStartData).length !== 10 ||
          // typeof rawValue.battleStartData.battleId !== "string" ||
          typeof rawValue.battleStartData.battleValue !== "number" ||
          typeof rawValue.battleStartData.isFirst !== "boolean" ||
          typeof rawValue.battleStartData.hp !== "number" ||
          typeof rawValue.battleStartData.attack !== "number" ||
          typeof rawValue.battleStartData.enemyUserId !== "string" ||
          typeof rawValue.battleStartData.enemyHp !== "number" ||
          typeof rawValue.battleStartData.enemyAttack !== "number" ||
          typeof rawValue.battleStartData.userCharacterData !== "object" ||
          typeof rawValue.battleStartData.enemyUserCharacterData !== "object" ||
          typeof rawValue.battleStartData.loseAmount !== "number"
        ) {
          const error = new Error(
            `invalid battlev1 start data provided: ${JSON.stringify(rawValue)}`
          );
          throw error;
        }

        // Validation TURN 0: Enemy Address
        if (
          !rawValue.enemyAddress ||
          typeof rawValue.enemyAddress !== "string" ||
          rawValue.enemyAddress.length > 500
        ) {
          const error = new Error(
            'invalid battlev1 "enemy address" parameter provided'
          );
          throw error;
        }

        if (
          !rawValue.enemyAddress ||
          typeof rawValue.enemyAddress !== "string" ||
          rawValue.enemyAddress.length > 500
        ) {
          const error = new Error(
            'invalid battlev1 "enemy address" parameter provided'
          );
          throw error;
        }

        // Validation TURN 0: Key Data
        if (
          typeof rawValue.userPixieCrystals !== "number" ||
          typeof rawValue.enemyUserPixieCrystals !== "number"
        ) {
          const error = new Error("invalid battlev1 first turn data provided");
          throw error;
        }
      } else {
        // Validation PAST TURN 0: Turn Action
        if (
          typeof rawValue.turnActionData !== "object" ||
          Object.keys(rawValue.turnActionData).length !== 3 ||
          !battle.actions[rawValue.turnActionData.action] ||
          typeof rawValue.turnActionData.damage !== "number" ||
          typeof rawValue.turnActionData.attackOffsetMultiplier !== "number"
        ) {
          const error = new Error(
            `invalid battlev1 turn action data provided: ${JSON.stringify(
              rawValue
            )}`
          );
          throw error;
        }

        // Validation LAST TURN: Victory Data
        if (rawValue.victoryData) {
          if (
            typeof rawValue.victoryData !== "object" ||
            Object.keys(rawValue.victoryData).length !== 4 ||
            typeof rawValue.victoryData.winnerAddress !== "string" ||
            typeof rawValue.victoryData.winAmount !== "number" ||
            typeof rawValue.victoryData.loserAddress !== "string" ||
            typeof rawValue.victoryData.loseAmount !== "number"
          ) {
            const error = new Error(
              `invalid battlev1 victory data provided: ${JSON.stringify(
                rawValue
              )}`
            );
            throw error;
          }
        }
      }

      validatedValues.value = rawValue;
      break;
    case transactions.types.BATTLE_V1_REWARDS:
      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        Object.keys(rawValue).length !== 3 ||
        typeof rawValue.isWinner !== "boolean" ||
        typeof rawValue.isUser !== "boolean" ||
        typeof rawValue.battleValue !== "number"
      ) {
        const error = new Error(
          `invalid battle rewards data provided: ${JSON.stringify(rawValue)}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;

    case transactions.types.BATTLE_V1_FIELD_REWARD:
      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        Object.keys(rawValue).length !== 2 ||
        typeof rawValue.amount !== "number" ||
        typeof rawValue.awardRate !== "number"
      ) {
        const error = new Error(
          `invalid battle field rewards data provided: ${JSON.stringify(
            rawValue
          )}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;

    case transactions.types.WITHDRAW_REQUEST:
      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        Object.keys(rawValue).length !== 6 ||
        typeof rawValue.withdrawAddress !== "string" ||
        typeof rawValue.amount !== "number" ||
        rawValue.amount <= 0 ||
        typeof rawValue.totalWithdrawLevel !== "number" ||
        rawValue.totalWithdrawLevel <= 0 ||
        typeof rawValue.globalWithdrawConstant !== "number" ||
        rawValue.globalWithdrawConstant <= 0 ||
        typeof rawValue.totalWithdrawAmount !== "number" ||
        rawValue.totalWithdrawAmount <= 0 ||
        typeof rawValue.withdrawAddress !== "string" ||
        rawValue.withdrawAddress.length > 100 ||
        typeof rawValue.withdrawId !== "string" ||
        rawValue.withdrawId.length > 100
      ) {
        const error = new Error(
          `invalid withdraw request data provided: ${JSON.stringify(rawValue)}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;
    case transactions.types.WITHDRAW_PENDING:
      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        Object.keys(rawValue).length !== 1 ||
        typeof rawValue.withdrawId !== "string" ||
        rawValue.withdrawId.length > 100
      ) {
        const error = new Error(
          `invalid withdraw pending data provided: ${JSON.stringify(rawValue)}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;
    case transactions.types.WITHDRAW_SUCCESSFUL:
      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        Object.keys(rawValue).length !== 3 ||
        typeof rawValue.withdrawId !== "string" ||
        rawValue.withdrawId.length > 100 ||
        typeof rawValue.transactionId !== "string" ||
        rawValue.transactionId.length > 1000 ||
        typeof rawValue.metadata !== "object"
      ) {
        const error = new Error(
          `invalid withdraw successful data provided: ${JSON.stringify(
            rawValue
          )}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;

    case transactions.types.DEPOSIT_V1:
      if (
        !rawValue ||
        typeof rawValue !== "object" ||
        Object.keys(rawValue).length !== 5 ||
        typeof rawValue.amount !== "number" ||
        typeof rawValue.totalDepositAmount !== "number" ||
        typeof rawValue.globalWithdrawConstant !== "number" ||
        typeof rawValue.maximumWithdrawLevel !== "number" ||
        typeof rawValue.transactionHash !== "string"
      ) {
        const error = new Error(
          `invalid deposit data provided: ${JSON.stringify(rawValue)}`
        );
        throw error;
      }
      validatedValues.value = rawValue;
      break;

    default: {
      const error = new Error(`invalid "type" provided ${rawType}`);
      throw error;
    }
  }

  validatedValues.type = rawType;

  console.log(
    "📈🤠getValidatedValues executed successfully, " +
      "returning validated values: " +
      stringify(validatedValues)
  );

  return validatedValues;
};

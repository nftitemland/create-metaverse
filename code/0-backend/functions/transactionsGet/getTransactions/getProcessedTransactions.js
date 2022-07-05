"use strict";

const {
  constants: {
    transactions: {
      types: {
        BATTLE_V1,
        BATTLE_V1_REWARDS,
        BATTLE_V1_FIELD_REWARD,
        WITHDRAW_REQUEST,
        WITHDRAW_PENDING,
        WITHDRAW_SUCCESSFUL,
        DEPOSIT_V1,
        BATTLE_V2,
      },
    },
  },
  javascript: { getHashedText },
  // sendData,
} = require("compute-utils");

// const SEARCH_LIMIT = 100;
// const BATCH_AMOUNT = 2;

// const friendlyDisplayTypes = {
//   BATTLE_START: "Battle Start",
//   BATTLE_TURN: "Battle Turn",
//   BATTLE_END: "Battle End",
//   BATTLE_REWARD: "Battle Results",
//   BATTLE_FIELD_REWARD: "Battle Mode Activated Reward",
//   WITHDRAW_REQUEST: "Withdraw Request",
//   WITHDRAW_PENDING: "Withdraw Pending",
//   WITHDRAW_SUCCESSFUL: "Withdraw Successful",
// };

const friendlyDisplayTypes = {
  BATTLE_START: "Battle Start",
  BATTLE_TURN: "Battle Turn",
  BATTLE_END: "Battle Finished",
  BATTLE_REWARD: "Battle Results",
  BATTLE_FIELD_REWARD: "Battle Mode Live Reward",
  WITHDRAW_REQUEST: "Withdraw Request",
  WITHDRAW_PENDING: "Withdraw Pending",
  WITHDRAW_SUCCESSFUL: "Withdraw Successful",
  DEPOSIT_V1: "Deposit",
  BATTLE: "BATTLE",
};

module.exports = ({ address, transactions }) => {
  const txs = transactions.map((transaction) => {
    const tx = {
      id: getHashedText(transaction.sortKey),
      time: transaction.secondarySortKey,
      data: [],
    };

    switch (transaction.type) {
      case BATTLE_V2:
        tx.data.push(
          {
            key: "Type",
            value: friendlyDisplayTypes.BATTLE,
          },
          {
            key: "Winner",
            value: transaction.value.amount >= 0 ? "yes" : "no",
          },
          {
            key: "Battle Value",
            value: transaction.value.amount,
          },
          {
            key: "Enemy ID",
            value: transaction.value.enemyUserId,
          },
          {
            key: "Initiated Battle",
            value: transaction.value.instigator ? "yes" : "no",
          }
        );
        break;
      case BATTLE_V1:
        if (transaction.value.battleStartData) {
          tx.data.push(
            {
              key: "Type",
              value: friendlyDisplayTypes.BATTLE_START,
            },
            {
              // key: "Date Value",
              key: "Battle Value",
              value: transaction.value.battleStartData.battleValue,
            },
            {
              key: "User HP",
              value: transaction.value.battleStartData.hp,
            },
            {
              key: "Opponent HP",
              value: transaction.value.battleStartData.enemyHp,
            },
            {
              key: "User Attack",
              value: transaction.value.battleStartData.attack,
            },
            {
              key: "Opponent Attack",
              value: transaction.value.battleStartData.enemyAttack,
            }
          );
        } else if (transaction.value.victoryData) {
          tx.data.push(
            {
              key: "Type",
              value: friendlyDisplayTypes.BATTLE_END,
            },
            {
              key: "Turn",
              value: transaction.value.battleState.isUserTurn
                ? "User"
                : "Opponent",
            },
            {
              key: "Turn Number",
              value: transaction.value.battleState.turn,
            },
            {
              key: "Damage",
              value: transaction.value.battleState.damage,
            },
            {
              key: "Opponent Damage",
              value: transaction.value.battleState.enemyDamage,
            },
            {
              key: "Battle Results",
              value:
                transaction.value.victoryData.winnerAddress === address
                  ? "Win"
                  : "Lose",
            }
          );
        } else {
          tx.data.push(
            {
              key: "Type",
              value: friendlyDisplayTypes.BATTLE_TURN,
            },
            {
              key: "Turn",
              value: transaction.value.battleState.isUserTurn
                ? "User"
                : "Opponent",
            },
            {
              key: "Turn Number",
              value: transaction.value.battleState.turn,
            },
            {
              key: "Damage",
              value: transaction.value.battleState.damage,
            },
            {
              key: "Opponent Damage",
              value: transaction.value.battleState.enemyDamage,
            }
          );
        }
        break;
      case BATTLE_V1_REWARDS:
        tx.data.push(
          {
            key: "Type",
            value: friendlyDisplayTypes.BATTLE_REWARD,
          },
          {
            key: "Pixie Crystals",
            value:
              (transaction.value.isWinner ? 1 : -1) *
              transaction.value.battleValue,
          }
        );
        break;

      case BATTLE_V1_FIELD_REWARD:
        tx.data.push(
          {
            key: "Type",
            value: friendlyDisplayTypes.BATTLE_FIELD_REWARD,
          },
          {
            key: "Pixie Crystals",
            value: transaction.value.amount,
          }
        );
        break;
      case WITHDRAW_REQUEST:
        tx.data.push(
          {
            key: "Type",
            value: friendlyDisplayTypes.WITHDRAW_REQUEST,
          },
          {
            key: "Pixie Crystals",
            value: transaction.value.amount,
          },
          {
            key: "Withdraw Level",
            value: transaction.value.totalWithdrawLevel,
          },
          {
            key: "Global Withdraw Divisor",
            value: transaction.value.globalWithdrawConstant,
          },
          {
            key: "Total Withdraw Amount",
            value: transaction.value.totalWithdrawAmount,
          },
          {
            key: "Withdraw ID",
            value: transaction.value.withdrawId,
          }
        );
        break;
      case WITHDRAW_PENDING:
        tx.data.push(
          {
            key: "Type",
            value: friendlyDisplayTypes.WITHDRAW_PENDING,
          },
          {
            key: "Withdraw ID",
            value: transaction.value.withdrawId,
          }
        );
        break;
      case WITHDRAW_SUCCESSFUL:
        tx.data.push(
          {
            key: "Type",
            value: friendlyDisplayTypes.WITHDRAW_SUCCESSFUL,
          },
          {
            key: "Withdraw ID",
            value: transaction.value.withdrawId,
          },
          {
            key: "Polygon Transaction",
            value: transaction.value.transactionId,
          }
        );
        break;

      case DEPOSIT_V1:
        tx.data.push(
          {
            key: "Type",
            value: friendlyDisplayTypes.DEPOSIT_V1,
          },
          {
            key: "Pixie Crystals",
            value: transaction.value.totalDepositAmount,
          },
          {
            key: "Global Withdraw Constant",
            value: transaction.value.globalWithdrawConstant,
          },
          {
            key: "Maximum Withdraw Level",
            value: transaction.value.maximumWithdrawLevel,
          },
          {
            key: "Tokens Deposited",
            value: transaction.value.amount,
          },
          {
            key: "Transaction ID",
            value: transaction.value.transactionHash,
          }
        );
        break;

      default:
        throw new Error(`unexpected transaction type: ${transaction.type}`);
    }
    return tx;
  });

  return txs;
};

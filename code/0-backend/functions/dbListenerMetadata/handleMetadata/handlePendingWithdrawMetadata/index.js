"use strict";

const {
  stringify,
  database: { classicalUpdateDatabaseEntry },
  addTransactionAndUpdateUser,
  getRoundedNumber,
  constants: {
    environment: { isProductionMode },
    aws: {
      database: {
        tableNameToPartitionKey,
        tableNames: { METADATA },
      },
    },
    withdraws: {
      statuses: { COMPLETE },
    },
    transactions: {
      types: { WITHDRAW_PENDING, WITHDRAW_SUCCESSFUL },
    },
  },
  // user: { getUser },
  web3,
} = require("compute-utils");

const abi = require("./abi.json");

const HDWalletProvider = require("truffle-hdwallet-provider");

const { NFT_CONTRACT_ADDRESS, CHAIN_ID, POLYGON_NETWORK_URL } = isProductionMode
  ? {
      NFT_CONTRACT_ADDRESS: "0xeC8720aaFeD488436d48A391e2204276F47746F5",
      CHAIN_ID: 137,
      POLYGON_NETWORK_URL: "https://polygon-rpc.com/",
    }
  : {
      NFT_CONTRACT_ADDRESS: "0x7Eb4AB5596C0DF745290471b02146399a0d6D357",
      CHAIN_ID: 80001,
      POLYGON_NETWORK_URL: "https://rpc-mumbai.maticvigil.com",
    };

const MONEY_HOLDER_ADDRESS = process.env.WITHDRAWS_MONEY_HOLDER_ADDRESS;
const MNEMONIC = process.env.WITHDRAWS_MONEY_HOLDER_MNEMONIC;

if (
  !CHAIN_ID ||
  !POLYGON_NETWORK_URL ||
  !MNEMONIC ||
  !MONEY_HOLDER_ADDRESS ||
  !NFT_CONTRACT_ADDRESS
) {
  console.log(
    "Configuration Error: " +
      "Please set a mnemonic, Alchemy/Infura key, " +
      "owner, network, and contract address."
  );
  throw new Error(
    "Configuration Error: " +
      "Please set a mnemonic, Alchemy/Infura key, " +
      "owner, network, and contract address."
  );
}

module.exports = async ({ metadata }) => {
  console.log(
    "💰💰running handlePendingWithdrawMetadata with the following values:" +
      stringify({
        metadata,
      })
  );

  await addTransactionAndUpdateUser({
    address: metadata.secondaryPartitionKey,
    type: WITHDRAW_PENDING,
    value: {
      withdrawId: metadata.withdrawId,
    },
  });

  const provider = new HDWalletProvider(MNEMONIC, POLYGON_NETWORK_URL);

  const web3Instance = new web3(provider);

  const nftContract = new web3Instance.eth.Contract(abi, NFT_CONTRACT_ADDRESS);

  console.log(
    "performing mint:",
    stringify({
      // MNEMONIC,
      // NODE_API_KEY,
      // NFT_CONTRACT_ADDRESS,
      // ADDRESS,
      // ADDRESS_2,
    })
  );

  // throw new Error("TESST ERR");

  const cryptoAmount = getRoundedNumber(
    metadata.totalWithdrawAmount * 100000000
  );

  const sendResults = await nftContract.methods
    .transfer(metadata.withdrawAddress, cryptoAmount)
    .send({ from: MONEY_HOLDER_ADDRESS, chainId: CHAIN_ID });

  const updateExpression = "SET #status = :status";

  const expressionAttributeNames = {
    "#status": "status",
  };

  const expressionAttributeValues = {
    ":status": COMPLETE,
  };

  await classicalUpdateDatabaseEntry({
    tableName: METADATA,
    key: tableNameToPartitionKey[METADATA],
    value: metadata.partitionKey,
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  });

  await addTransactionAndUpdateUser({
    address: metadata.secondaryPartitionKey,
    type: WITHDRAW_SUCCESSFUL,
    value: {
      withdrawId: metadata.withdrawId,
      transactionId: sendResults.transactionHash,
      metadata: {
        blockHash: sendResults.blockHash,
        blockNumber: sendResults.blockNumber,
        cumulativeGasUsed: sendResults.cumulativeGasUsed,
        effectiveGasPrice: sendResults.effectiveGasPrice,
        gasUsed: sendResults.gasUsed,
        from: sendResults.from,
      },
    },
  });

  console.log("💰💰handlePendingWithdrawMetadata executed successfully");
};

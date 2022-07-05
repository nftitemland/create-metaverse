"use strict";

const axios = require("axios");

const {
  stringify,
  getRoundedNumber,
  getUserData,
  constants: {
    misc: { GENESIS_ADDRESS },
    environment: { isProductionMode },
    smartContractAddresses,
    aws: {
      database: {
        pureMetadataPrefixes: { nftiltDeposits_ },
        tableNames: { METADATA },
      },
    },
    metadata: {
      types: { DEPOSIT_V1 },
    },
    deposits: {
      statuses: { PENDING },
    },
  },
} = require("compute-utils");
const { updateDatabaseEntry } = require("compute-utils/database");

const ethUtil = require("ethereumjs-util");

const WITHDRAWS_MONEY_HOLDER_ADDRESS =
  process.env.WITHDRAWS_MONEY_HOLDER_ADDRESS;
const NFTILT_TOKEN_ADDRESS = isProductionMode
  ? smartContractAddresses.NFTILT_TOKEN_ADDRESS
  : smartContractAddresses.NFTILT_TOKEN_ADDRESS_STAGING;

const PAGE_SIZE = String(95);

const BASE_URL = `https://deep-index.moralis.io/api/v2`;
const MORALIS_X_API_KEY = process.env.MORALIS_X_API_KEY;

module.exports = async ({ cursor, lastBlockScanned }) => {
  console.log(
    "🐼📈running doProcessDeposits: " +
      stringify({
        lastBlockScanned,
        time: new Date().toLocaleString(),
        cursor,
      })
  );

  let newCursor = null;
  let newLastBlockScanned = lastBlockScanned;

  const qsParams = {
    chain: isProductionMode ? "polygon" : "mumbai",
    from_block: String(lastBlockScanned),
    limit: PAGE_SIZE,
  };

  if (cursor) {
    qsParams.cursor = cursor;
  }

  const querystring = new URLSearchParams(qsParams).toString();

  const url =
    `${BASE_URL}/${WITHDRAWS_MONEY_HOLDER_ADDRESS}` +
    `/erc20/transfers?${querystring}`;

  console.log(
    "Doing Moralis Request:",
    stringify({
      url,
    })
  );

  const results = await axios({
    method: "GET",
    url,
    headers: {
      "X-API-Key": MORALIS_X_API_KEY,
    },
  });

  const transactionData = results.data;

  console.log(
    "Moralis request success:",
    stringify({
      "Result Count": transactionData.result.length,
      status: transactionData.status,
    })
  );

  for (const result of transactionData.result) {
    if (
      ethUtil.toChecksumAddress(result.address) === NFTILT_TOKEN_ADDRESS &&
      ethUtil.toChecksumAddress(result.to_address) ===
        WITHDRAWS_MONEY_HOLDER_ADDRESS &&
      ![GENESIS_ADDRESS, WITHDRAWS_MONEY_HOLDER_ADDRESS].includes(
        ethUtil.toChecksumAddress(result.from_address)
      )
    ) {
      const fromAddress = ethUtil.toChecksumAddress(result.from_address);
      const partitionKey = `${nftiltDeposits_}${result.transaction_hash}`;
      const blockNumber = Number(result.block_number);
      const amount = getRoundedNumber(Number(result.value) / 100000000);

      console.log(
        "Processing deposit result:",
        stringify({
          fromAddress,
          status: transactionData.status,
          transactionHash: result.transaction_hash,
          blockNumber,
          amount,
        })
      );

      await getUserData({ address: fromAddress });

      await updateDatabaseEntry({
        tableName: METADATA,
        onlyAddDbEntryIfNotAlreadyExists: true,
        entry: {
          partitionKey,
          blockNumber,
          fromAddress,
          transactionHash: result.transaction_hash,
          amount,
          type: DEPOSIT_V1,
          status: PENDING,
        },
      });

      console.log("Deposit result processed successfully");
    }
  }

  newCursor = transactionData.cursor;

  if (transactionData.result.length > 0) {
    transactionData.result.sort((a, b) => {
      const blockNumberA = Number(a.block_number);
      const blockNumberB = Number(b.block_number);

      return blockNumberA - blockNumberB;
    });

    newLastBlockScanned = Number(
      transactionData.result[transactionData.result.length - 1].block_number
    );
  }

  const responseValues = {
    newCursor,
    newLastBlockScanned,
  };

  console.log(
    "getAndProcessDepositBatch executed successfully " +
      "returning values: " +
      stringify(responseValues)
  );

  return responseValues;
};

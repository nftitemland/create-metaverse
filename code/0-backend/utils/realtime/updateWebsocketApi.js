"use strict";

// const AWS = require("aws-sdk");
const { AWS } = require("../aws");

const {
  websocketApi: { baseUrl },
} = require("../constants");

// const { database } = require("../aws");

// const stringify = require("../stringify");

// const {
//   aws: {
//     database: { tableNameToPartitionKey, tableNameToSortKey },
//   },
// } = require("../constants");

let hasInited = false;

let apigwManagementApi = null;

module.exports = async ({ message, connectionId }) => {
  if (!hasInited) {
    apigwManagementApi = new AWS.ApiGatewayManagementApi({
      endpoint: baseUrl,
    });
  }

  await apigwManagementApi
    .postToConnection({ ConnectionId: connectionId, Data: message })
    .promise();
};

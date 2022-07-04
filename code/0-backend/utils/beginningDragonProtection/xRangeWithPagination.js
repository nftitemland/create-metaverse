"use strict";

const getIncrementedTimeKeyData = require("./getIncrementedTimeKeyData");

const xRangeWithPagination = async ({
  client,

  dragonId,

  queueName,

  startTime,
  endTime,

  paginationCount = "100",

  operationMatchCount = 0,
}) => {
  const xRangeResults = await client.sendCommand([
    "XRANGE",
    queueName,
    startTime,
    endTime,
    "COUNT",
    paginationCount,
  ]);

  xRangeResults.forEach((result) => {
    if (result[1][1] === dragonId) {
      operationMatchCount++;
    }
  });

  const lastTimeKey =
    !!xRangeResults[xRangeResults.length - 1] &&
    xRangeResults[xRangeResults.length - 1][0];

  if (!lastTimeKey || xRangeResults.length < paginationCount) {
    return operationMatchCount;
  }

  return await xRangeWithPagination({
    client,
    startTime: getIncrementedTimeKeyData({
      timeKey: lastTimeKey,
    }),
    endTime,

    queueName,
    paginationCount,
    operationMatchCount,

    dragonId,
    // results,
  });
};

module.exports = xRangeWithPagination;

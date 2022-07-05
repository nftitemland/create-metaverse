"use strict";

// const getOperationTime = require( './getOperationTime' );
const getIncrementedTimeKeyData = require("./getIncrementedTimeKeyData");

const xRangeWithPagination = async ({
  client,

  queueName,

  startTime,
  endTime,

  paginationCount = "2",

  results = [],
}) => {
  console.log(`
  
  
      MEGA 1: ${JSON.stringify(
        {
          queueName,
          startTime,
          endTime,
          paginationCount,
        },
        null,
        4
      )}
  
  
  `);

  const xRangeResults = await client.sendCommand([
    "XRANGE",
    queueName,
    startTime,
    endTime,
    "COUNT",
    paginationCount,
  ]);

  console.log(`
  
  
      MEGA 2: ${JSON.stringify(
        {
          xRangeResults,
        },
        null,
        4
      )}
  
  
  `);

  results.push(...xRangeResults);

  const lastTimeKey =
    !!xRangeResults[xRangeResults.length - 1] &&
    xRangeResults[xRangeResults.length - 1][0];

  if (!lastTimeKey || xRangeResults.length < paginationCount) {
    return results;
  }

  return await xRangeWithPagination({
    client,
    startTime: getIncrementedTimeKeyData({
      timeKey: lastTimeKey,
    }),
    endTime,

    queueName,
    paginationCount,

    results,
  });
};

module.exports = xRangeWithPagination;

"use strict";

const safeLTrim = async ({ client, queueId, maxQueueLengthMinusOne }) => {
  console.log("running safeLTrim");
  try {
    await client.sendCommand(["LTRIM", queueId, "0", maxQueueLengthMinusOne]);
    console.log("running safeLTrimExecutedSuccessfully");
  } catch (err) {
    console.log("error in safeLTrim", err);
  }
};

const consistentAddToRedisQueue = async ({
  client,
  value,
  queueId,
  maxQueueLengthMinusOne,
}) => {
  const cmd = JSON.stringify(value);
  await client.sendCommand(["LPUSH", queueId, cmd]);
  safeLTrim({ client, queueId, maxQueueLengthMinusOne });
};

module.exports = consistentAddToRedisQueue;

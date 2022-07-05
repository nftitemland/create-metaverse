"use strict";

const bluebird = require("bluebird");
const {
  realtime: { connectionPoolHObjToObj },
  delay,
  constants: {
    redis: {
      hKeyPrefixes: { CP_ },
    },
  },
} = require("compute-utils");

const getIfNeedToSendData = require("./getIfNeedToSendData");

const getFormattedRealtimeData = require("./getFormattedRealtimeData");

const sendRequest = require("./sendRequest");

const CONNECTION_POOL_KEY = `${CP_}1`;

module.exports = async ({ client, lastPartyCompareData }) => {
  const rawUserIdToUserConnectionPoolData = await client.sendCommand([
    "HGETALL",
    CONNECTION_POOL_KEY,
  ]);

  const userIdToUserConnectionPoolData = connectionPoolHObjToObj(
    rawUserIdToUserConnectionPoolData
  );

  const userIds = Object.keys(userIdToUserConnectionPoolData);

  if (userIds.length === 0) {
    await delay(2000);
  }

  const { partyCompareData, needToSendData } = getIfNeedToSendData({
    lastPartyCompareData,
    userIdToUserConnectionPoolData,
  });

  if (!needToSendData) {
    // console.log(`"💸CACHECAHE`);

    return lastPartyCompareData;
  }

  // console.log(`🐻"NO, WE NEWS SENS`);

  const messageData = getFormattedRealtimeData(userIdToUserConnectionPoolData);

  await bluebird.map(
    userIds,
    async (userId) => {
      const userConnectionPoolData = userIdToUserConnectionPoolData[userId];

      await sendRequest({
        connectionId: userConnectionPoolData.cId,
        messageData,
      });
    },
    { concurrency: 100 }
  );

  return partyCompareData;
};

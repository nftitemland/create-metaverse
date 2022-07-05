"use strict";

const sendMessages = require("./sendMessages");

module.exports = async ({
  client,
  userIds,
  userIdToUserConnectionPoolData,
}) => {
  try {
    await sendMessages({ client, userIds, userIdToUserConnectionPoolData });
  } catch (err) {
    console.log("error in send messages:", err);
  }
};

"use strict";

const { stringify } = require("compute-utils");

const {
  constants: { eventTypes },
} = require("../local");

const handleConnect = require("./handleConnect");
const handleGuestConnect = require("./handleGuestConnect");
const handleMessage = require("./handleMessage");
const handleDisconnect = require("./handleDisconnect");

module.exports = async ({
  address,
  partyLoginToken,
  eventType,
  connectionId,
  messageKey,
  messageValue,
  userId,
  isGuestConnect,
  ipAddress,
}) => {
  console.log(
    "running handleRequest with the following values: " +
      stringify({
        address,
        partyLoginToken,
        eventType,
        connectionId,
        messageKey,
        messageValue,
        userId,
        isGuestConnect,
        ipAddress,
      })
  );

  switch (eventType) {
    case eventTypes.CONNECT:
      if (isGuestConnect) {
        await handleGuestConnect({
          userId,
          connectionId,
          ipAddress,
        });
      } else {
        await handleConnect({
          address,
          partyLoginToken,
          connectionId,
        });
      }
      break;
    case eventTypes.MESSAGE:
      await handleMessage({
        messageKey,
        messageValue,
        connectionId,
        userId,
      });
      break;
    case eventTypes.DISCONNECT:
      await handleDisconnect({
        connectionId,
      });
      break;
    default:
      throw new Error(
        "handleRequest safeguard error: " +
          `invalid event type provided: ${eventType}`
      );
  }

  const responseValues = {};

  console.log(
    "handleRequest executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

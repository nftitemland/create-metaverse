"use strict";

const { stringify } = require("compute-utils");

const {
  constants: { messageKeys },
} = require("../../local");

// const handleAction = require("./handleAction");
// const handleDisplaceX = require("./handleDisplaceX");
const handleMove = require("./handleMove");
const handleText = require("./handleText");
const handleEnter = require("./handleEnter");
const handleEnchant = require("./handleEnchant");
const handleMapCoord = require("./handleMapCoord");
const handleInteract = require("./handleInteract");
// const handleClaim = require("./handleClaim");

module.exports = async ({ messageKey, messageValue, connectionId, userId }) => {
  console.log(
    "running handleMessage with the following values: " +
      stringify({
        messageKey,
        messageValue,
        connectionId,
        userId,
      })
  );

  switch (messageKey) {
    case messageKeys.MOVE:
      await handleMove({
        messageValue,
        connectionId,
        userId,
      });
      break;
    case messageKeys.TEXT:
      await handleText({
        messageValue,
        connectionId,
        userId,
      });
      break;
    case messageKeys.ENTER:
      await handleEnter({
        messageValue,
        connectionId,
        userId,
      });

      break;
    case messageKeys.INTERACT:
      await handleInteract({
        messageValue,
        connectionId,
        userId,
      });

      break;
    case messageKeys.ENCHANT:
      await handleEnchant({
        messageValue,
        connectionId,
        userId,
      });

      break;
    case messageKeys.MAPCOORD:
      await handleMapCoord({
        messageValue,
        connectionId,
        userId,
      });

      break;
    // TODO: handle claim
    // case messageKeys.CLAIM:
    //   await handleClaim({
    //     messageValue,
    //     connectionId,
    //     userId,
    //   });
    //   break;
    // case messageKeys.ACTION:
    //   await handleAction({
    //     messageValue,
    //     connectionId,
    //     userId,
    //   });
    //   break;
    // case messageKeys.DISPLACE_X:
    //   await handleDisplaceX({
    //     messageValue,
    //     connectionId,
    //     userId,
    //   });
    default:
      throw new Error(
        "safeguard error in handleMessage, should not get here, invalid " +
          ` message key provided: ${messageKey}`
      );
  }

  const responseValues = {};

  console.log(
    "handleMessage executed successfully, returning values: " +
      stringify({
        responseValues,
      })
  );

  return responseValues;
};

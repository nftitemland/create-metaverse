"use strict";

const {
  stringify,
  user: { getUser },
  javascript: { getHashedText },
  constants: {
    redis: {
      hKeyPrefixes: { CP_ },
      lRListKeyPrefixes: { M_, Q_ },
    },
    realtime: {
      commands,
      limits: {
        // HYPER_WORLD_WIDTH_1,
        // HYPER_WORLD_HEIGHT_1,
        MAX_HYPER_WORLD_X,
        MIN_HYPER_WORLD_X,
        MAX_HYPER_WORLD_Y,
        MIN_HYPER_WORLD_Y,

        // MAP_WIDTH_1,
        // MAP_HEIGHT_1,
        // MAP_WIDTH_2,
        // MAP_HEIGHT_2,
        MIN_WORLD_X,
        MAX_WORLD_X,
        MIN_WORLD_Y,
        MAX_WORLD_Y,
      },
    },
  },
} = require("compute-utils");

// const MAP_WIDTH_1 = 400;
// const MAP_HEIGHT_1 = 400;

// const MAX_HYPER_WORLD_X = MAX_HYPER_WORLD_X;
// const MIN_HYPER_WORLD_X = MAX_HYPER_WORLD_Y;
const MAX_HYPER_WORLD_HEIGHT = MAX_HYPER_WORLD_Y;
const MIN_HYPER_WORLD_HEIGHT = MIN_HYPER_WORLD_Y;

const authorizePartyUser = async ({ address, partyLoginToken }) => {
  console.log(
    "running authorizePartyUser with the following values: " +
      stringify({
        address,
        partyLoginToken,
      })
  );

  const user = await getUser({
    address,
  });

  const hashedPartyLoginTokenFromDb = user.partyLoginToken;

  const hashedPartyLoginTokenFromRequest = getHashedText(partyLoginToken);

  if (
    !hashedPartyLoginTokenFromDb ||
    hashedPartyLoginTokenFromDb !== hashedPartyLoginTokenFromRequest
  ) {
    console.log("authorizePartyUser error: unauthorized user");

    const error = new Error(`invalid realtime token provided`);
    error.statusCode = 400;
    error.bulltrue = true;
    throw error;
  }

  console.log("authorizePartyUser executed successfully");

  return {
    user,
  };
};

module.exports = {
  constants: {
    eventTypes: {
      CONNECT: "CONNECT",
      DISCONNECT: "DISCONNECT",
      MESSAGE: "MESSAGE",
      TEXT: "TEXT",
    },

    messageKeys: {
      ACTION: "ACTION",
      DISPLACE_X: "DISPLACE_X",
      TEXT: "TEXT",
      [commands.MOVE]: commands.MOVE,
      [commands.CLAIM]: commands.CLAIM,
      [commands.ENTER]: commands.ENTER,
      [commands.ENCHANT]: commands.ENCHANT,
      [commands.MAPCOORD]: commands.MAPCOORD,
      [commands.INTERACT]: commands.INTERACT,
    },

    actionValues: {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
      DISPLACE_X: "DISPLACE_X",
    },

    connectionPoolKeys: {
      CP_1: `${CP_}1`,
    },

    lRListKeys: {
      M_1: `${M_}1`,
      Q_1: `${Q_}1`,
    },

    limits: {
      MIN_X: MIN_WORLD_X,
      MAX_X: MAX_WORLD_X,
      MIN_Y: MIN_WORLD_Y,
      MAX_Y: MAX_WORLD_Y,
      MAX_TEXT_LENGTH: 50,

      MAX_HYPER_WORLD_X,
      MIN_HYPER_WORLD_X,
      MAX_HYPER_WORLD_HEIGHT,
      MIN_HYPER_WORLD_HEIGHT,

      MAX_QUEUE_LENGTH_MINUS_ONE: 500 - 1,
    },

    queueNames: {
      user_party_connect: "user_party_connect",
      global_party_connect: "global_party_connect",
    },

    queueKeys: {
      global: "global",
    },
  },

  authorizePartyUser,
};

"use strict";

// const bluebird = require("bluebird");
const {
  realtime: {
    // connectionPoolHObjToObj,
    disconnectConnection,
    // updateUserConnectionPoolData,
    // getEncodedCmdValue,
  },
  stringify,
  delay,
  constants: {
    redis: {
      hKeyPrefixes: { CP_ },
      lRListKeyPrefixes: { Q_ },
    },
    realtime: {
      commands: { DISCO },
    },
  },
  // constants: {
  //   realtime: {
  //     commands: { MOVE },
  //   },
  // },
} = require("compute-utils");

const BAD_REQUEST_EXCEPTION = "BadRequestException";
const GONE_EXCEPTION = "GoneException";

const CONNECTION_POOL_KEY = `${CP_}1`;
const Q_1 = `${Q_}1`;

// `cId@QtLINc8KoAMCF4A=|t@1650166734450|x@0|y@0|cmd@MOVE_x$3_y$6`;

module.exports = async ({
  userId,
  connectionId,
  client,
  onlyDisco = false,
}) => {
  console.log(
    `running disconnect on: ` +
      stringify({
        userId,
        connectionId,
        onlyDisco,
      })
  );

  try {
    await disconnectConnection({
      connectionId,
    });
  } catch (err) {
    const isNotExpectedError = !(
      (err && err.code && err.code.includes(BAD_REQUEST_EXCEPTION)) ||
      (err && err.message && err.message.includes("Invalid connectionId")) ||
      (err && err.code && err.code.includes(GONE_EXCEPTION))
    );

    if (isNotExpectedError) {
      console.log("unexpected message in sendRequest:", err);

      throw err;
    }
  }

  if (onlyDisco) {
    console.log(
      `disconnect, executed successfully: ` +
        stringify({
          userId,
          connectionId,
          onlyDisco,
        })
    );

    return;
  }

  await client.sendCommand(["HDEL", CONNECTION_POOL_KEY, userId]);

  const cmd = JSON.stringify({
    type: DISCO,
    userId,
    time: Date.now(),
  });

  await client.sendCommand(["LPUSH", Q_1, cmd]);

  await delay(200);

  await client.sendCommand(["HDEL", CONNECTION_POOL_KEY, userId]);

  await delay(500);

  await client.sendCommand(["HDEL", CONNECTION_POOL_KEY, userId]);

  console.log(
    `disconnect, executed successfully: ` +
      stringify({
        userId,
        connectionId,
      })
  );
};

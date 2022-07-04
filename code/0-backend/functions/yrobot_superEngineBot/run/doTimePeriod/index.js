"use strict";

const bluebird = require("bluebird");
const {
  realtime: {
    connectionPoolHObjToObj,
    //getEncodedCmdValue
  },
  // stringify,
  delay,
  constants: {
    realtime: {
      commands: { MOVE, MSGRCPT, DISCO, ENTER, ENCHANT, MAPCOORD, INTERACT },
    },
    redis: {
      hKeyPrefixes: { CP_ },
      lRListKeyPrefixes: { Q_ },
    },
  },
} = require("compute-utils");

const getHencodedUserCpDataWithTimeQuanta = require("./getHencodedUserCpDataWithTimeQuanta");
const removeIfActorIsBad = require("./removeIfActorIsBad");
const safeSendMessages = require("./safeSendMessages");

const CONNECTION_POOL_KEY = `${CP_}1`;
const QUEUE_KEY = `${Q_}1`;

const QUANTA_PER_PERIOD = 1;

const getRawCommands = async ({ client }) => {
  const commandMessageQueueLength = await client.sendCommand([
    "LLEN",
    QUEUE_KEY,
  ]);

  const rawCommands = await bluebird.map(
    Array.from(Array(commandMessageQueueLength).keys()),
    async () => {
      return client.sendCommand(["RPOP", QUEUE_KEY]);
    },
    { concurrency: 5 }
  );

  const rawCommands2 = rawCommands.filter((command) => command);

  rawCommands2.sort((cmdA, cmdB) => {
    return cmdA.time - cmdB.time;
  });

  return rawCommands2;
};

module.exports = async ({ client, period }) => {
  // console.log("TEMP doing time period");

  for (let i = 0; i < QUANTA_PER_PERIOD; i++) {
    /*
      get from mem

  */
    const [rawUserIdToUserConnectionPoolData, rawCommands] = await Promise.all([
      client.sendCommand(["HGETALL", CONNECTION_POOL_KEY]),
      getRawCommands({ client }),
    ]);

    const newUserIdToUserConnectionPoolData = connectionPoolHObjToObj(
      rawUserIdToUserConnectionPoolData
    );

    if (Object.keys(newUserIdToUserConnectionPoolData).length === 0) {
      await delay(2000);
    }

    let shouldSendMessages = false;

    for (const rawCommand of rawCommands) {
      const command = JSON.parse(rawCommand);

      if (newUserIdToUserConnectionPoolData[command.userId]) {
        switch (command.type) {
          case MAPCOORD:
          case ENTER:
          case ENCHANT:
          case INTERACT:
          case MOVE: {
            newUserIdToUserConnectionPoolData[command.userId].cmd = {
              command: command.type,
              data: command.value,
            };
            newUserIdToUserConnectionPoolData[command.userId].t = Date.now();
            newUserIdToUserConnectionPoolData[command.userId].cnt =
              Number(newUserIdToUserConnectionPoolData[command.userId].cnt) + 1;
            break;
          }
          case MSGRCPT: {
            newUserIdToUserConnectionPoolData[command.userId].cmd = {
              command: MSGRCPT,
              data: {
                updateOnly: true,
              },
            };
            newUserIdToUserConnectionPoolData[command.userId].t = Date.now();
            newUserIdToUserConnectionPoolData[command.userId].cnt =
              Number(newUserIdToUserConnectionPoolData[command.userId].cnt) + 1;
            shouldSendMessages = true;
            break;
          }
          case DISCO: {
            console.log(`
            
            
                MEGA LOG: ${JSON.stringify(
                  {
                    "DISCO:": command.userId,
                  },
                  null,
                  4
                )}
            
            
            `);

            const creationTime = Number(
              newUserIdToUserConnectionPoolData[command.userId].cT
            );

            const userWasNotJustCreated = Date.now() - creationTime > 1000 * 6;

            if (userWasNotJustCreated) {
              await client.sendCommand([
                "HDEL",
                CONNECTION_POOL_KEY,
                command.userId,
              ]);

              delete newUserIdToUserConnectionPoolData[command.userId];
            } else {
              console.log(`
              
              
                  MEGA LOG: ${JSON.stringify(
                    {
                      MEWUSER: "SAVAED",
                    },
                    null,
                    4
                  )}
              
              
              `);
            }

            break;
          }
          default:
            break;
        }
      }
    }

    const userIds = Object.keys(newUserIdToUserConnectionPoolData);

    if (shouldSendMessages) {
      safeSendMessages({
        client,
        userIds,
        userIdToUserConnectionPoolData: newUserIdToUserConnectionPoolData,
      });
    }

    const hSetCommands = ["HSET", CONNECTION_POOL_KEY];

    await bluebird.map(
      userIds,
      async (userId) => {
        const userCpData = newUserIdToUserConnectionPoolData[userId];

        if (userCpData) {
          const isBad = await removeIfActorIsBad({
            userId,
            userCpData,
          });

          if (!isBad && userCpData.cmd) {
            const hEncodedUserCpDataWithTimeQuanta =
              getHencodedUserCpDataWithTimeQuanta({
                userId,
                userCpData,
                newUserIdToUserConnectionPoolData,
                // cp: CONNECTION_POOL_KEY,
                // client,
                period,
              });

            if (hEncodedUserCpDataWithTimeQuanta) {
              hSetCommands.push(userId, hEncodedUserCpDataWithTimeQuanta);
            }
          }
        }
      },
      { concurrency: 100 }
    );

    if (hSetCommands.length > 2) {
      await client.sendCommand(hSetCommands);
    }
  }
};

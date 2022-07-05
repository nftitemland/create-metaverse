"use strict";

const { createClient } = require("redis");

const stringify = require("../stringify");
const xRangeWithPagination = require("./xRangeWithPagination");
const getIncrementedTimeKeyData = require("./getIncrementedTimeKeyData");

const RATE_LIMIT_Q = "RATE_LIMIT_Q";
const MAX_STREAM_LENGTH = "1000000";

const beginningDragonProtection = ({ dragonId, maxRatePerPeriod, period }) =>
  new Promise(async (resolve, reject) => {
    console.log(
      "🐲🔥🔥🔥🔥running beginningDragonProtection with the following values:",
      stringify({
        dragonId,
        maxRatePerPeriod,
        period,
      })
    );
    if (!process.env.REDIS_URL || !dragonId || !period) {
      const error = new Error(
        "beginningDragonProtection: missing setup data: " +
          JSON.stringify({
            redisUrl: !!process.env.REDIS_URL,
            dragonId: !!dragonId,
            maxRatePerPeriod: !!maxRatePerPeriod,
            period: !!period,
          })
      );
      return reject(error);
    }

    const client = createClient({
      url: process.env.REDIS_URL,
    });

    client.on("error", (err) => {
      console.log("beginningDragonProtection: Redis Client Error:", err);
      reject(err);
    });

    try {
      await client.connect();

      // XADD mystream MAXLEN ~ 1000 * ... entry fields here
      const operationTimeKey = await client.sendCommand([
        "xadd",
        RATE_LIMIT_Q,
        "MAXLEN",
        "~",
        MAX_STREAM_LENGTH,
        "*",
        "dragonId",
        dragonId,
      ]);

      const [operationTimeString] = operationTimeKey.split("-");

      const operationTime = Number(operationTimeString);

      const readStartTime = operationTime - period;

      const operationMatchCount = await xRangeWithPagination({
        client,
        startTime: `${readStartTime}-0`,
        endTime: getIncrementedTimeKeyData({
          timeKey: operationTimeKey,
          add: false,
        }),

        queueName: RATE_LIMIT_Q,
        dragonId,
      });

      console.log(
        "🐲🔥🔥🔥🔥beginningDragonProtection:",
        stringify({
          operationMatchCount,
          maxRatePerPeriod,
        })
      );

      if (operationMatchCount > maxRatePerPeriod) {
        console.log(
          "🦑🦑🦑beginningDragonProtection failed, too many requests:",
          stringify({})
        );

        const error = new Error("too many requests");
        error.bulltrue = true;
        return reject(error);
      }

      await client.quit();

      console.log(
        "🐲🔥🔥🔥🔥beginningDragonProtection successfully executed:",
        stringify({})
      );

      resolve();
    } catch (err) {
      console.log("beginningDragonProtection: error:", err);
      client.quit();

      reject(err);
    }
  });

// await client.xAdd(
//   RATE_LIMIT_Q,
//   "MAXLEN",
//   "~",
//   MAX_STREAM_LENGTH,
//   "*",
//   "dragonId",
//   dragonId
// );

// const readStartTime = Date.now() - period;
// // XREAD COUNT 2 STREAMS mystream writers 0-0 0-0
// // XREAD COUNT 2 STREAMS mystream writers 0-0 0-0
// const results = client.xRead(
//   "XREAD",
//   "COUNT",
//   100,
//   "STREAMS",
//   RATE_LIMIT_Q,
//   readStartTime
// );

//   console.log(`

//       MEGA LOG: ${JSON.stringify(
//         {
//           results,
//         },
//         null,
//         4
//       )}

//   `);

//   // XADD key [NOMKSTREAM] [MAXLEN|MINID [=|~] threshold [LIMIT count]] *|ID field value [field value ...]
// };

module.exports = beginningDragonProtection;

// const x = [
//   [
//     "RATE_LIMIT_Q",
//     [
//       ["1639471805196-0", ["dragonId", "testOmega1"]],
//       ["1639471807701-0", ["dragonId", "testOmega1"]],
//     ],
//   ],
// ];

// x[0][1]

// (async () => {
//   //   const client = ;

//   try {
//     await beginningDragonProtection({
//       dragonId: "pureTestDragon1",
//     });
//   } catch (error) {}
// })();

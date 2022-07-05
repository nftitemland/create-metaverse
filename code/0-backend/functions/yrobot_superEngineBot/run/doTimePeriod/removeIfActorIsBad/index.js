"use strict";

const {
  stringify,
  realtime: { disconnectConnection },
  sendData,
} = require("compute-utils");

// const sendMessages = require("./sendMessages");

const allowancePerSecond = 5;
// const allowancePerSecond = 1;
const allowancePerMillisecond = allowancePerSecond / 1000;

module.exports = async ({
  // client,
  userId,
  userCpData,
  // CONNECTION_POOL_KEY,
}) => {
  const rawCreationTime = Number(userCpData.cT) || Date.now();

  const creationTime = rawCreationTime - 1000 * 15;

  const timeSinceCreation = Date.now() - creationTime;

  const allowance = timeSinceCreation * allowancePerMillisecond;

  if (Number(userCpData.cnt) > allowance) {
    console.log(
      "user id " +
        userId +
        " will be banned: " +
        stringify({
          "userCpData.cnt": userCpData.cnt,
          allowance,
          time: new Date().toString(),
        })
    );

    try {
      await Promise.all([
        // client.sendCommand(["HDEL", CONNECTION_POOL_KEY, userId]),
        disconnectConnection({
          connectionId: userCpData.cId,
        }),
      ]);

      try {
        await sendData({
          subject: "yrobot security error",
          message: `The Error Message: ${JSON.stringify({
            userId,
            userCpData,
            timeSinceCreation,
            allowance,
          })}`,
        });
      } catch (err) {
        console.log("error in safe sending data:", err);
      }
    } catch (err) {
      console.log("error in banning:", err);
    }

    return true;
  }
};

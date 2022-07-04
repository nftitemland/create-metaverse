"use strict";

const getPartyCompareData = (userIdToUserConnectionPoolData) => {
  const partyCompareData = {};

  for (const userId in userIdToUserConnectionPoolData) {
    const userCpData = userIdToUserConnectionPoolData[userId];

    partyCompareData[userId] = {
      x: userCpData.x,
      y: userCpData.y,
      cmd: userCpData.cmd,
      etC: userCpData.etC,
      crdX: userCpData.crdX,
      crdY: userCpData.crdY,
    };
  }

  return partyCompareData;
};

const DATA_EXPIRY_TIME = 1000 * 45;

// const f =
module.exports = ({ lastPartyCompareData, userIdToUserConnectionPoolData }) => {
  const partyCompareDataUserData = getPartyCompareData(
    userIdToUserConnectionPoolData
  );

  if (Date.now() - lastPartyCompareData.time > DATA_EXPIRY_TIME) {
    // console.log(`

    //     MEGA LOG: ${JSON.stringify(
    //       {
    //         "REFRESHA:": Date.now(),
    //         "REFRESHA2:": new Date().toTimeString(),
    //       },
    //       null,
    //       4
    //     )}

    // `);

    return {
      partyCompareData: {
        time: Date.now(),
        userData: partyCompareDataUserData,
      },
      needToSendData: true,
    };
  }

  const lastUserIds = Object.keys(lastPartyCompareData.userData);
  const newUserIds = Object.keys(partyCompareDataUserData);

  if (lastUserIds.length !== newUserIds.length) {
    return {
      partyCompareData: {
        time: Date.now(),
        userData: partyCompareDataUserData,
      },
      needToSendData: true,
    };
  }

  for (const userId of lastUserIds) {
    if (!newUserIds.includes(userId)) {
      return {
        partyCompareData: {
          time: Date.now(),
          userData: partyCompareDataUserData,
        },
        needToSendData: true,
      };
    }

    for (const key of ["x", "y", "cmd", "etC", "crdX", "crdY"]) {
      if (
        partyCompareDataUserData[userId][key] !==
        lastPartyCompareData.userData[userId][key]
      ) {
        // console.log(`

        //     FAIL LOG: ${JSON.stringify(
        //       {
        //         userId,
        //         key,
        //         partyCompareDataK: partyCompareData[userId][key],
        //         lastPartyCompareDataK: lastPartyCompareData[userId][key],
        //       },
        //       null,
        //       4
        //     )}

        // `);

        return {
          partyCompareData: {
            time: Date.now(),
            userData: partyCompareDataUserData,
          },
          needToSendData: true,
        };
      }
    }
  }

  return { partyCompareData: null, needToSendData: false };
};

// console.log(`

//     MEGA LOG: ${JSON.stringify(
//       {
//         // f1: f({
//         //   lastPartyCompareData: {
//         //     userId_1: {
//         //       x: "2",
//         //       y: "44",
//         //       cmd: "xyz",
//         //     },
//         //   },
//         //   userIdToUserConnectionPoolData: {
//         //     userId_1: {
//         //       x: "2",
//         //       y: "44",
//         //       cmd: "xyz",
//         //     },
//         //   },
//         // }),

//         f2: f({
//           lastPartyCompareData: {
//             userId_1: {
//               x: "2",
//               y: "44",
//               cmd: "xyy",
//             },
//           },
//           userIdToUserConnectionPoolData: {
//             userId_1: {
//               x: "2",
//               y: "44",
//               cmd: "xyy",
//             },
//           },
//         }),
//       },
//       null,
//       4
//     )}

// `);

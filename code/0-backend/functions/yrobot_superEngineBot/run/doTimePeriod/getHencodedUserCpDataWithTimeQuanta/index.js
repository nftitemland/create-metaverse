"use strict";

// const bluebird = require("bluebird");
const {
  realtime: {
    // connectionPoolHObjToObj,
    getDecodedCmdValue,
    // updateUserConnectionPoolData,
    // getEncodedCmdValue,
  },
  stringify,
  // delay,
  //   constants: {
  //     redis: {
  //       hKeyPrefixes: { CP_ },
  //     },
  //   },
  // realtime: {
  //   // coordTools: { getGameX, getGameY },
  //   realmap: { getMapDataForUser },
  // },
  redisTools: { redisStrObj },
  constants: {
    realtime: {
      commands: { MOVE, ENTER, MSGRCPT, ENCHANT, MAPCOORD, INTERACT },
    },
  },
} = require("compute-utils");

const handleMove = require("./handleMove");
const handleEnchant = require("./handleEnchant");
const handleMapCoord = require("./handleMapCoord");
const handleInteract = require("./handleInteract");

// `cId@QtLINc8KoAMCF4A=|t@1650166734450|x@0|y@0|cmd@MOVE_x$3_y$6`;

module.exports = ({
  userId,
  userCpData,
  newUserIdToUserConnectionPoolData,
  // cp,
  // client,
  period,
}) => {
  const decodedCmdValue =
    typeof userCpData.cmd === "string"
      ? getDecodedCmdValue(userCpData.cmd)
      : userCpData.cmd;

  switch (decodedCmdValue.command) {
    case MOVE: {
      // const cmdX = getGameX(decodedCmdValue.data.x);

      // const cmdX = getGameX(decodedCmdValue.data.x);
      // const cmdY = getGameY(decodedCmdValue.data.y);
      const mapDataForUser = {
        x: Number(decodedCmdValue.data.x),
        y: Number(decodedCmdValue.data.y),
        crdX: Number(decodedCmdValue.data.crdX) || 0,
        crdY: Number(decodedCmdValue.data.crdY) || 0,
      };

      // if (Number.isNaN(cmdX) || Number.isNaN(cmdY)) {
      //   return;
      // }

      const newUserData = handleMove({
        userId,
        userCpData,
        // cmdX,
        // cmdY,
        // cp,
        // client,
        period,
        cmdX: mapDataForUser.x,
        cmdY: mapDataForUser.y,
        crdX: mapDataForUser.crdX,
        crdY: mapDataForUser.crdY,
      });

      return newUserData;
    }
    case ENTER: {
      // const cmdX = getGameX(decodedCmdValue.data.x);
      // const cmdY = getGameY(decodedCmdValue.data.y);

      const commandMapData = {
        x: Number(decodedCmdValue.data.x),
        y: Number(decodedCmdValue.data.y),
        crdX: Number(decodedCmdValue.data.crdX),
        crdY: Number(decodedCmdValue.data.crdY),
      };

      const newUserData = Object.assign({}, userCpData, commandMapData);

      delete newUserData.cmd;

      const hencodedUserCpDataWithTimeQuanta =
        redisStrObj.toRedisStrObj(newUserData);

      return hencodedUserCpDataWithTimeQuanta;
    }
    case MSGRCPT: {
      const newUserData = Object.assign({}, userCpData);

      delete newUserData.cmd;

      const hencodedUserCpDataWithTimeQuanta =
        redisStrObj.toRedisStrObj(newUserData);

      return hencodedUserCpDataWithTimeQuanta;
    }

    case INTERACT: {
      return handleInteract({
        userId,
        userCpData,
        decodedCmdValue,
        newUserIdToUserConnectionPoolData,
      });
    }
    case ENCHANT: {
      const hencodedUserCpDataWithTimeQuanta = handleEnchant({
        userId,
        userCpData,
        decodedCmdValue,
      });

      return hencodedUserCpDataWithTimeQuanta;
    }
    case MAPCOORD: {
      const hencodedUserCpDataWithTimeQuanta = handleMapCoord({
        userId,
        userCpData,
        decodedCmdValue,
      });

      return hencodedUserCpDataWithTimeQuanta;
    }
    default:
      console.log(
        "unexpected command type:",
        stringify({ userId, userCpData, time: new Date().toString() })
      );
      break;
  }

  return null;
};

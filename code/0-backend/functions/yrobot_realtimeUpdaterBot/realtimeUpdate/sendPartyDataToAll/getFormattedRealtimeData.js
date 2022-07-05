"use strict";

const {
  constants: {
    realtime: {
      realPoiLvls,
      commands: { MOVE, INTERACT },
      realPoiInteractTags: { FUNTUB },
      realPoiInteractArgs: { TUBBOI, TUBGURR },
    },
  },
  realtime: { getDecodedCmdValue },
  tempDb,
} = require("compute-utils");

module.exports = (userIdToUserConnectionPoolData) => {
  const formattedRealtimeData = {};

  for (const userId in userIdToUserConnectionPoolData) {
    const userCpData = userIdToUserConnectionPoolData[userId];

    formattedRealtimeData[userId] = {
      x: userCpData.x,
      y: userCpData.y,
      crdX: userCpData.crdX,
      crdY: userCpData.crdY,
      lvl: userCpData.lvl || realPoiLvls.GUEST,
    };

    if (userCpData.etC) {
      formattedRealtimeData[userId].etC = userCpData.etC;
    }

    if (userCpData[tempDb.typeToParams.AUX_NFT_1.userCpDataKey]) {
      formattedRealtimeData[userId][
        tempDb.typeToParams.AUX_NFT_1.userCpDataKey
      ] = userCpData[tempDb.typeToParams.AUX_NFT_1.userCpDataKey];
    }

    if (userCpData.cmd) {
      const decodedCmd = getDecodedCmdValue(userCpData.cmd);

      switch (decodedCmd.command) {
        case MOVE:
          formattedRealtimeData[userId].a = "true";
          break;
        case INTERACT: {
          switch (decodedCmd.data.tag) {
            case FUNTUB: {
              switch (decodedCmd.data.arg1) {
                case TUBBOI: {
                  formattedRealtimeData[userId].a = TUBBOI;
                  break;
                }
                case TUBGURR: {
                  formattedRealtimeData[userId].a = TUBGURR;
                  break;
                }
                default:
                  break;
              }
              break;
            }
            default:
              break;
          }
          break;
        }
        default:
          break;
      }

      // formattedRealtimeData[userId].a = userCpData.cmd;
    }
  }

  return formattedRealtimeData;

  // const strFormattedRealtimeData = JSON.stringify(formattedRealtimeData);

  // return strFormattedRealtimeData;
};

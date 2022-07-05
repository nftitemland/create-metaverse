"use strict";

const {
  redisTools: { redisStrObj },
  constants: {
    // environment: { isProductionMode },
    realtime: {
      commands: { INTERACT },
      realPoiInteractTags,
      realPoiInteractArgs,
      realPoiLvls,
      enchantmentTypeToEnchantmentNames: {
        CHARACTER: { BOI, GURR },
      },
    },
  },
  realtime: {
    realmap: { mapData },
    getEncodedCmdValue,
  },
} = require("compute-utils");

const removeCommand = (userCpData) => {
  const newUserDataToAdd = Object.assign({}, userCpData);
  delete newUserDataToAdd.cmd;
  const hencodedUserCpDataWithTimeQuanta =
    redisStrObj.toRedisStrObj(newUserDataToAdd);
  return hencodedUserCpDataWithTimeQuanta;
};

module.exports = ({
  userId,
  userCpData,
  decodedCmdValue,
  newUserIdToUserConnectionPoolData,
}) => {
  const stringCmd =
    typeof userCpData.cmd === "string"
      ? userCpData.cmd
      : getEncodedCmdValue(INTERACT, {
          crdX: decodedCmdValue.data.crdX,
          crdY: decodedCmdValue.data.crdY,
          tag: decodedCmdValue.data.tag,
          arg1: decodedCmdValue.data.arg1,
        });

  if (newUserIdToUserConnectionPoolData[userId].cmd === stringCmd) {
    // no op, preserve cmd
    const newUserDataToAdd = Object.assign({}, userCpData);
    const hencodedUserCpDataWithTimeQuanta =
      redisStrObj.toRedisStrObj(newUserDataToAdd);
    return hencodedUserCpDataWithTimeQuanta;
  }

  const coordKey = `${decodedCmdValue.data.crdX}$${decodedCmdValue.data.crdY}`;

  const coordKeyData = mapData.coordKeyToData[coordKey];

  if (!coordKeyData) {
    return removeCommand(userCpData);
  }

  const selectedComponent = coordKeyData.componentData.filter(
    (coordKeyDatum) => {
      return coordKeyDatum.tag === decodedCmdValue.data.tag;
    }
  )[0];

  if (!selectedComponent) {
    return removeCommand(userCpData);
  }

  switch (decodedCmdValue.data.tag) {
    case realPoiInteractTags.FUNTUB: {
      switch (decodedCmdValue.data.arg1) {
        case realPoiInteractArgs.TUBBOI: {
          if (Number(userCpData.lvl || 100) !== realPoiLvls.ELITE) {
            return removeCommand(userCpData);
          } else if (userCpData.etC !== BOI) {
            return removeCommand(userCpData);
          }
          break;
        }
        case realPoiInteractArgs.TUBGURR: {
          if (Number(userCpData.lvl || 100) > realPoiLvls.GIGA) {
            return removeCommand(userCpData);
          } else if (userCpData.etC !== GURR) {
            return removeCommand(userCpData);
          }
          break;
        }
      }

      for (const uId in newUserIdToUserConnectionPoolData) {
        if (uId !== userId) {
          const ucpData = newUserIdToUserConnectionPoolData[uId];
          if (ucpData.cmd === stringCmd) {
            return removeCommand(userCpData);
          }
        }
      }

      const newUserDataToAdd = Object.assign({}, userCpData, {
        x: selectedComponent.x,
        y: selectedComponent.y,
        cmd: stringCmd,
      });

      newUserIdToUserConnectionPoolData[userId] = newUserDataToAdd;

      const hencodedUserCpDataWithTimeQuanta =
        redisStrObj.toRedisStrObj(newUserDataToAdd);

      return hencodedUserCpDataWithTimeQuanta;
    }
    case realPoiInteractTags.TREASURE_CHEST: {
      const newUserDataToAdd = Object.assign({}, userCpData, {
        x: selectedComponent.x,
        y: selectedComponent.y,
      });

      delete newUserDataToAdd.cmd;

      newUserIdToUserConnectionPoolData[userId] = newUserDataToAdd;

      const hencodedUserCpDataWithTimeQuanta =
        redisStrObj.toRedisStrObj(newUserDataToAdd);

      return hencodedUserCpDataWithTimeQuanta;
    }
    default:
      return removeCommand(userCpData);
  }
};

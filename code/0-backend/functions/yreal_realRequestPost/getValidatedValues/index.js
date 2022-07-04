"use strict";

const {
  stringify,
  // validation: { getNTokenV1IfIsValid },
  web3,
  javascript: { getWsLoginTokenDataIfValid },
  // getRoundedNumber,
  // constants: {
  //   nftKeys: { POIPOI },
  // },
  realtime: {
    realmap: { getMapDataForUser, mapData },
  },
  constants: {
    environment: { isProductionMode },

    realtime: {
      enchantmentTypeToEnchantmentNames,
      realPoiInteractArgs,
      realPoiInteractTags,

      // realPoiComponentNames,
    },
  },
  tempDb,
} = require("compute-utils");
const ethUtil = require("ethereumjs-util");

const verifyGoogleCode = require("./verifyGoogleCode");

const allowedGuestIdCharacters = "GUEST_abcdefghijklmnopqrstuvwxyz1234567890";

const allowedProdConnectOrigins = [
  process.env.PREPROD_WEBSITE_URL || "xx67432-5223_762",
  "https://www.nftitemland.com",
  // "http://localhost:3000",
];
const {
  constants: {
    eventTypes,
    messageKeys,
    //actionValues,
    limits,
  },
} = require("../local");

const extendedETTEN = Object.assign(
  {},
  {
    CHARACTER: Object.assign({}, enchantmentTypeToEnchantmentNames.CHARACTER),
  }
);

const ephemeralTypes = Object.keys(tempDb.typeToParams);

for (const et of ephemeralTypes) {
  extendedETTEN.CHARACTER[et] = et;
}

module.exports = async ({
  rawAddress,
  rawPartyLoginToken,
  rawEventType,
  rawConnectionId,
  rawBody,
  rawOrigin,

  rawGuestId,
  rawGoogleToken,
  ipAddress,
  // rawUserId,
}) => {
  console.log(
    "getValidatedValues:",
    stringify({
      rawAddress,
      rawPartyLoginToken,
      rawEventType,
      rawConnectionId,
      rawBody,
      rawOrigin,
      // rawUserId,
      allowedProdConnectOrigins,
      ipAddress,
    })
  );

  if (typeof rawEventType !== "string" || !eventTypes[rawEventType]) {
    const error = new Error(`invalid event type provided: ${rawEventType}`);
    // error.statusCode = 400;
    // error.bulltrue = true;
    throw error;
  }

  if (!rawConnectionId || typeof rawConnectionId !== "string") {
    const error = new Error(
      `invalid connection id provided: ${rawConnectionId}`
    );
    // error.statusCode = 400;
    // error.bulltrue = true;
    throw error;
  }

  const values = {
    // address: checksumAddress,
    // partyLoginToken: rawPartyLoginToken,
    eventType: rawEventType,
    connectionId: rawConnectionId,
  };

  switch (values.eventType) {
    case eventTypes.CONNECT: {
      if (isProductionMode) {
        if (!allowedProdConnectOrigins.includes(rawOrigin)) {
          throw new Error("Invalid request origin");
        }
      }

      const isGuestMode = rawGuestId || rawGoogleToken;

      if (isGuestMode) {
        if (
          !rawGuestId ||
          typeof rawGuestId !== "string" ||
          rawGuestId.length !== 15
        ) {
          const error = new Error('missing "guest id" provided');
          // error.statusCode = 400;
          // error.bulltrue = true;
          throw error;
        }

        for (const char of rawGuestId) {
          if (!allowedGuestIdCharacters.includes(char)) {
            const error = new Error('missing "guest id" provided');
            throw error;
          }
        }

        if (!rawGoogleToken || typeof rawGoogleToken !== "string") {
          const error = new Error('missing "userId" parameter');
          // error.statusCode = 400;
          // error.bulltrue = true;
          throw error;
        }

        await verifyGoogleCode({
          rawGoogleCode: rawGoogleToken,
          ipAddress,
        });

        values.isGuestConnect = true;
        values.userId = rawGuestId;
      } else {
        if (
          !rawAddress ||
          typeof rawAddress !== "string" ||
          rawAddress.length > 500
        ) {
          const error = new Error('missing "address" parameter');
          // error.statusCode = 400;
          // error.bulltrue = true;
          throw error;
        }

        if (!web3.utils.isAddress(rawAddress)) {
          const error = new Error(`invalid "address" provided ${rawAddress}`);
          // error.statusCode = 400;
          // error.bulltrue = true;
          throw error;
        }

        if (!getWsLoginTokenDataIfValid(rawPartyLoginToken)) {
          const error = new Error(`invalid connection data provided`);
          // error.statusCode = 400;
          // error.bulltrue = true;
          throw error;
        }

        values.address = ethUtil.toChecksumAddress(rawAddress);
        values.partyLoginToken = rawPartyLoginToken;
      }
      break;
    }

    case eventTypes.MESSAGE: {
      if (!rawBody || typeof rawBody !== "string") {
        const error = new Error(`invalid message provided`);
        // error.statusCode = 400;
        // error.bulltrue = true;
        throw error;
      }

      const splitRawBody = rawBody.split("|");

      if (splitRawBody.length !== 3) {
        const error = new Error(`invalid message provided: ${rawBody}`);
        // error.statusCode = 400;
        // error.bulltrue = true;
        throw error;
      }

      let [rawUserId, rawMessageKey, rawMessageValue] = splitRawBody;

      console.log(`
      
      
          MEGAZ LOG: ${JSON.stringify(
            {
              rawUserId,
              rawMessageKey,
              rawMessageValue,
            },
            null,
            4
          )}
      
      
      `);

      if (!rawUserId) {
        const error = new Error(`invalid user id provided: ${rawUserId}`);
        // error.statusCode = 400;
        // error.bulltrue = true;
        throw error;
      }

      switch (rawMessageKey) {
        case messageKeys.MOVE: {
          // userId|MOVE|2@3
          rawMessageValue = rawMessageValue.split("@");

          if (rawMessageValue.length !== 4) {
            const error = new Error(`invalid message provided: ${rawBody}`);
            // error.statusCode = 400;
            // error.bulltrue = true;
            throw error;
          }

          let [x, y, crdX, crdY] = rawMessageValue;

          // let x = getGameX(rawX);
          // let y = getGameY(rawY);

          const mapData = getMapDataForUser({
            x,
            y,
            crdX,
            crdY,
          });

          // const // if (typeof x !== "number" || Number.isNaN(x)) {
          //   x = 0;
          // } else if (x < limits.MIN_X) {
          //   x = 0;
          // } else if (x > limits.MAX_X) {
          //   x = limits.MAX_X;
          // }

          // if (typeof y !== "number" || Number.isNaN(y)) {
          //   y = 0;
          // } else if (y < limits.MIN_Y) {
          //   y = 0;
          // } else if (y > limits.MAX_Y) {
          //   y = limits.MAX_Y;
          // }

          // const gameXValidationResults =

          // if (!gameXValidationResults.isValid) {
          //   throw new Error("invalid number provided");
          // }

          // x = gameXValidationResults.x;

          // const gameYValidationResults = getGameY(y);

          // if (!gameYValidationResults.isValid) {
          //   throw new Error("invalid number provided");
          // }

          // y = gameYValidationResults.y;

          //   typeof y !== "number" ||
          //   Number.isNaN(y) ||
          //   y < limits.MIN_Y ||
          //   y > limits.MAX_Y
          // ) {
          //   const error = new Error(`invalid message provided: ${rawBody}`);
          //   // error.statusCode = 400;
          //   // error.bulltrue = true;
          //   throw error;
          // }

          rawMessageValue = mapData;
          break;
        }

        case messageKeys.ENTER: {
          rawMessageValue = rawMessageValue.split("@");

          if (rawMessageValue.length !== 4) {
            const error = new Error(`invalid message provided: ${rawBody}`);
            // error.statusCode = 400;
            // error.bulltrue = true;
            throw error;
          }

          const [rawX, rawY, rawCrdX, rawCrdY] = rawMessageValue;

          const mapData = getMapDataForUser({
            x: rawX,
            y: rawY,
            crdX: rawCrdX,
            crdY: rawCrdY,
          });

          rawMessageValue = mapData;

          break;
        }

        case messageKeys.INTERACT: {
          rawMessageValue = rawMessageValue.split("@");

          if (rawMessageValue.length !== 4) {
            const error = new Error(`invalid message provided: ${rawBody}`);
            // error.statusCode = 400;
            // error.bulltrue = true;
            throw error;
          }

          const [rawCrdX, rawCrdY, rawTag, rawArg1] = rawMessageValue;

          const mapDataForUser = getMapDataForUser({
            x: 0,
            y: 0,
            crdX: rawCrdX,
            crdY: rawCrdY,
          });

          // if (!realPoiComponentNames[rawComponentName]) {
          // const error = new Error(`invalid message provided: ${rawBody}`);
          // throw error;
          // }

          const crdX = mapDataForUser.crdX;
          const crdY = mapDataForUser.crdY;

          const coordKeyData = mapData.coordKeyToData[`${crdX}$${crdY}`];

          if (!coordKeyData) {
            const error = new Error(
              `invalid message coordinate key provided: ${rawBody}`
            );
            throw error;
          }

          const selectedComponent = coordKeyData.componentData.filter(
            (componentDatum) => {
              return componentDatum.tag === rawTag;
            }
          )[0];

          if (!selectedComponent) {
            const error = new Error(`invalid message tag provided: ${rawBody}`);
            throw error;
          }

          switch (rawTag) {
            case realPoiInteractTags.FUNTUB: {
              if (
                ![
                  realPoiInteractArgs.TUBBOI,
                  realPoiInteractArgs.TUBGURR,
                ].includes(rawArg1)
              ) {
                const error = new Error(
                  `an invalid tub message arg was provided: ${rawBody}`
                );
                throw error;
              }
              break;
            }
            case realPoiInteractTags.TREASURE_CHEST: {
              if (![realPoiInteractArgs.X].includes(rawArg1)) {
                const error = new Error(
                  `an invalid treasure chest message arg was provided: ${rawBody}`
                );
                throw error;
              }
              break;
            }
            default: {
              const error = new Error(
                `an invalid message tag was provided: ${rawBody}`
              );
              throw error;
            }
          }

          rawMessageValue = {
            crdX,
            crdY,
            tag: rawTag,
            arg1: rawArg1,
          };

          break;
        }

        case messageKeys.TEXT: {
          if (rawMessageValue.length > limits.MAX_TEXT_LENGTH) {
            const error = new Error(`invalid message provided: ${rawBody}`);
            // error.statusCode = 400;
            // error.bulltrue = true;
            throw error;
          }

          rawMessageValue = rawMessageValue.trim();

          break;
        }
        case messageKeys.MAPCOORD: {
          rawMessageValue = rawMessageValue.split("@");

          if (rawMessageValue.length !== 2) {
            const error = new Error(`invalid message provided: ${rawBody}`);
            // error.statusCode = 400;
            // error.bulltrue = true;
            throw error;
          }

          // `USERID|MESSAGE|CHARACTER@BOI`

          const [xCoordString, yCoordString] = rawMessageValue;

          const x = Number(xCoordString);
          const y = Number(yCoordString);

          if (!Number.isInteger(x) || !Number.isInteger(y)) {
            const error = new Error(`invalid message provided: ${rawBody}`);
            // error.statusCode = 400;
            // error.bulltrue = true;
            throw error;
          }
          // if (rawMessageValue.length > limits.MAX_TEXT_LENGTH) {
          //   const error = new Error(`invalid message provided: ${rawBody}`);
          //   // error.statusCode = 400;
          //   // error.bulltrue = true;
          //   throw error;
          // }

          // rawMessageValue = rawMessageValue.trim();
          // extract Type and Value

          rawMessageValue = {
            x,
            y,
          };

          break;
        }
        case messageKeys.ENCHANT: {
          rawMessageValue = rawMessageValue.split("@");

          if (rawMessageValue.length !== 2) {
            const error = new Error(`invalid message provided: ${rawBody}`);
            // error.statusCode = 400;
            // error.bulltrue = true;
            throw error;
          }

          // `USERID|MESSAGE|CHARACTER@BOI`

          const [type, enchantmentName] = rawMessageValue;

          if (!extendedETTEN[type] || !extendedETTEN[type][enchantmentName]) {
            const error = new Error(`invalid message provided: ${rawBody}`);
            // error.statusCode = 400;
            // error.bulltrue = true;
            throw error;
          }
          // if (rawMessageValue.length > limits.MAX_TEXT_LENGTH) {
          //   const error = new Error(`invalid message provided: ${rawBody}`);
          //   // error.statusCode = 400;
          //   // error.bulltrue = true;
          //   throw error;
          // }

          // rawMessageValue = rawMessageValue.trim();
          // extract Type and Value

          rawMessageValue = {
            type,
            enchantmentName,
          };

          break;
        }
        // NOTE: TEMP -> COMPLETE CLAIM
        // case messageKeys.CLAIM: {
        //   if (!rawMessageValue || rawMessageValue.length > 100) {
        //     const error = new Error(`invalid message provided: ${rawBody}`);
        //     // error.statusCode = 400;
        //     // error.bulltrue = true;
        //     throw error;
        //   }
        //   break;
        // }
        // case messageKeys.ACTION: {
        //   if (!actionValues[rawMessageValue]) {
        //     const error = new Error(`invalid message provided: ${rawBody}`);
        //     // error.statusCode = 400;
        //     // error.bulltrue = true;
        //     throw error;
        //   }
        //   break;
        // }
        // case messageKeys.DISPLACE_X: {
        // rawMessageValue = Number(rawMessageValue);

        // if (
        //   typeof rawMessageValue !== "number" ||
        //   Number.isNaN(rawMessageValue) ||
        //   rawMessageValue < limits.MIN_X ||
        //   rawMessageValue > limits.MAX_X
        // ) {
        //   const error = new Error(`invalid message provided: ${rawBody}`);
        //   error.statusCode = 400;
        //   error.bulltrue = true;
        //   throw error;
        // }

        //   break;
        // }
        default: {
          const error = new Error(`invalid message provided: ${rawBody}`);
          // error.statusCode = 400;
          // error.bulltrue = true;
          throw error;
        }
      }

      values.userId = rawUserId;
      values.messageKey = rawMessageKey;
      values.messageValue = rawMessageValue;

      break;
    }
    case eventTypes.DISCONNECT:
      break;

    default: {
      const error = new Error(
        `SAFEGUARD ERROR: unexpected event type provided: ${rawEventType}`
      );
      throw error;
    }
  }

  console.log(
    "getValidatedValues executed successfully, " +
      "got Validated Values: " +
      stringify(values)
  );

  return values;
};

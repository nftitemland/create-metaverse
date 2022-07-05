import React, { useEffect, useState } from "react";
import { WEBSOCKET_API_BASE_URL } from "../../../constants";
// import delay from "../../../utils/delay";
import GameMap from "../GameMap";
// import { MAP_WIDTH, MAX_HYPER_WORLD_X, MIN_HYPER_WORLD_X } from "../local";
import DuringConnectZone from "./DuringConnectZone";
// import BackgroundMap from "../BackgroundMap";
// import { MAP_WIDTH } from "../local";
// { useEffect, useState } //  useEffect, useState
// import getWsLoginTokenDataIfValid from "../../utils/getWsLoginTokenDataIfValid";
// import ConnectDashboard from "./ConnectDashboard";
// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";

// const CHARACTER_UNIT_HALF_WIDTH = CHARACTER_UNIT_WIDTH / 2;
// const Space = ({ on = false }) => {
//   return (
//     <div
//       style={{
//         width: 20,
//         height: 20,
//         backgroundColor: on ? "black" : "white",
//       }}
//     ></div>
//   );
// };
const getCoordKeyFromUserCpData = ({ gameDatum }) => {
  const xCoord = gameDatum.crdX || "0";
  const yCoord = gameDatum.crdY || "0";

  const coordKey = `${xCoord}$${yCoord}`;

  return coordKey;
};

const WEBSOCKET_URL = WEBSOCKET_API_BASE_URL;

// const getUserMapLevel = ({ gameData, userId }) => {
//   const gameDatum = gameData?.[userId] || {
//     x: 0,
//     y: 0,
//   };

//   if (gameDatum.x >= MIN_HYPER_WORLD_X && gameDatum.x <= MAX_HYPER_WORLD_X) {
//     return 2;
//   }

//   if (gameDatum.x > MAP_WIDTH) {
//     return 1;
//   }

//   return 0;
// };

function ConnectZone({
  address,
  websocketLoginToken,
  setWebsocketLoginToken,
  userId,
  windowWidth,
  setErrorMode,
  stateWebsocket,
  setStateWebsocket,
  setDisconnectMode,
  updateDialogMode,
  grecaptchaToken,
  coordKeyToData,
  setCoordKeyToData,
}) {
  const [hasFirstLoaded, setHasFirstLoaded] = useState(false);
  const [isWebsocketConnected, setIsWebsocketConnected] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [messageData, setMessageData] = useState([]);

  const userIds = Object.keys(gameData || {});

  let selfPoiUserGameDatum;

  for (let i = 0; i < userIds.length; i++) {
    const userIdFromGameData = userIds[i];

    if (userIdFromGameData === userId) {
      selfPoiUserGameDatum = gameData[userId];
    }
  }

  let selfPoiCoordKey;

  if (selfPoiUserGameDatum) {
    selfPoiCoordKey = getCoordKeyFromUserCpData({
      gameDatum: selfPoiUserGameDatum,
    });
  }

  const selfPoiCoordData = coordKeyToData[selfPoiCoordKey];

  const crdX = selfPoiUserGameDatum?.crdX || 0;
  const crdY = selfPoiUserGameDatum?.crdY || 0;

  // const userMapLevel = 0;
  // getUserMapLevel({
  // const userMapLevel = getUserMapLevel({
  //   gameData,
  //   userId,
  // });

  // const [userX, setUserX] = useState(0);

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         userX,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  useEffect(() => {
    // if (true !== true) {
    //   return;
    // }

    if (hasFirstLoaded) {
      return;
    }

    setHasFirstLoaded(true);

    const urlSearchParamsParams = grecaptchaToken
      ? {
          g: userId,
          gt: grecaptchaToken,
        }
      : {
          a: address,
          p: websocketLoginToken,
        };

    const queryString = new URLSearchParams(urlSearchParamsParams).toString();

    const websocket = new WebSocket(`${WEBSOCKET_URL}?${queryString}`);

    setStateWebsocket(websocket);

    websocket.onopen = function (event) {
      console.log(`⚡️`);

      setIsWebsocketConnected(true);

      const messageToTriggerMessageLoad = `${userId}|TEXT|`;

      websocket.send(messageToTriggerMessageLoad);
    };

    // websocket.onmessage = function (event) {
    //   // console.log(`

    //   //     ON MESSAGE LOG: ${JSON.stringify(event.data, null, 4)}

    //   // `);
    //   // console.log("MESSAGE: " + new Date().toString());

    //   const gameData = JSON.parse(event.data);

    //   switch (gameData.type) {
    //     case "MESSAGE_TYPE_PARTY_DATA":
    //       setGameData(gameData.message);
    //       break;
    //     case "MESSAGE_TYPE_MESSAGES":
    //       setMessageData(gameData.message);

    //       // setTimeout(() => {
    //       const messageBox = document.getElementById("MessageBoxOmega");
    //       if (messageBox) {
    //         messageBox.scrollTo({
    //           top: 5000,
    //         });
    //       }
    //       // }, 800);
    //       // setGameData(gameData.message);
    //       break;
    //     case "MESSAGE_TYPE_MAP_COORD_DATA":
    //       const newCoordKeyToData = Object.assign(
    //         {},
    //         coordKeyToData,
    //         gameData.message
    //       );

    //       console.log(`

    //           NESGA FURTUI LOG: ${JSON.stringify(
    //             {
    //               coordKeyToData,
    //               newCoordKeyToData,
    //             },
    //             null,
    //             4
    //           )}

    //       `);

    //       setCoordKeyToData(newCoordKeyToData);

    //       const newCoordKey = Object.keys(gameData.message)[0];

    //       if (selfPoiCoordKey && newCoordKey !== selfPoiCoordKey) {
    //         setTimeout(() => {
    //           websocket.send(`${userId}|ENTER|0$0$0$0`);
    //         }, 1000);
    //       }
    //       break;

    //     default:
    //       break;
    //   }
    // };

    websocket.onerror = (err) => {
      console.log("loading error:", err);

      setErrorMode("Error in connecting to Land Party");
    };

    websocket.onclose = function (event) {
      console.log(`🐻`);

      setIsWebsocketConnected(false);
      setWebsocketLoginToken(null);
      setDisconnectMode("Disconnected from Land Party");
    };

    // websocket.close

    // setTimeout(() => {
    //   websocket.send("MONKEY OH WOW");
    // }, 2000);

    // setTimeout(() => {
    //   websocket.close();
    // }, 5000);
  }, [
    address,
    websocketLoginToken,
    setWebsocketLoginToken,
    hasFirstLoaded,
    setErrorMode,
    setStateWebsocket,
    userId,
    setDisconnectMode,
    grecaptchaToken,
  ]);

  useEffect(() => {
    if (!stateWebsocket) {
      return;
    }

    const handleMessage = function (event) {
      // console.log(`

      //     ON MESSAGE LOG: ${JSON.stringify(event.data, null, 4)}

      // `);
      // console.log("MESSAGE: " + new Date().toString());

      const gameData = JSON.parse(event.data);

      switch (gameData.type) {
        case "MESSAGE_TYPE_PARTY_DATA":
          setGameData(gameData.message);
          break;
        case "MESSAGE_TYPE_MESSAGES":
          setMessageData(gameData.message);

          // setTimeout(() => {
          const messageBox = document.getElementById("MessageBoxOmega");
          if (messageBox) {
            messageBox.scrollTo({
              top: 5000,
            });
          }
          // }, 800);
          // setGameData(gameData.message);
          break;
        case "MESSAGE_TYPE_MAP_COORD_DATA":
          const newCoordKeyToData = Object.assign(
            {},
            coordKeyToData,
            gameData.message
          );

          setCoordKeyToData(newCoordKeyToData);

          const newCoordKey = Object.keys(gameData.message)[0];

          if (selfPoiCoordKey && newCoordKey !== selfPoiCoordKey) {
            setTimeout(() => {
              stateWebsocket.send(`${userId}|ENTER|0$0$0$0`);
            }, 1000);
          }
          break;

        default:
          break;
      }
    };

    stateWebsocket.onmessage = handleMessage;

    return () => {
      if (stateWebsocket) {
        stateWebsocket.onmessage = () => {};
      }
    };
  }, [
    coordKeyToData,
    selfPoiCoordKey,
    setCoordKeyToData,
    stateWebsocket,
    userId,
  ]);

  useEffect(() => {
    if (!isWebsocketConnected || gameData) {
      return;
    }

    const t = setInterval(() => {
      const userIdToTriggerMessageLoad = `${userId}|MOVE|0@0@${1}@${1}`;

      stateWebsocket.send(userIdToTriggerMessageLoad);
    }, 2000);

    return () => {
      clearInterval(t);
    };
  }, [gameData, isWebsocketConnected, stateWebsocket, userId]);

  const [timeoutTime] = useState(Date.now() + 15000);

  const isGreatGameMode = isWebsocketConnected && gameData && stateWebsocket;

  useEffect(() => {
    const t = setTimeout(() => {
      if (isWebsocketConnected && stateWebsocket && !gameData) {
        stateWebsocket.close();

        setErrorMode("Unexpected issue in loading Land Party");
      }

      // }, 15000);
    }, timeoutTime - Date.now());

    return () => {
      clearInterval(t);
    };
  }, [
    setErrorMode,
    stateWebsocket,
    gameData,
    isWebsocketConnected,
    timeoutTime,
  ]);

  // useEffect(() => {
  //   const x = userX * CHARACTER_UNIT_WIDTH;
  //   const halfWindowWidth = window.innerWidth / 2;
  //   const x0 = CHARACTER_UNIT_HALF_WIDTH + x - halfWindowWidth;
  //   const mappy = document.getElementById("BackgroundMap");
  //   if (mappy) {
  //     mappy.scrollTo({
  //       left: x0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [userX]);

  // console.log(`

  //     GAME DATA LOG: ${JSON.stringify(
  //       {
  //         gameData,
  //         t: typeof gameData,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  if (isGreatGameMode) {
    return (
      <GameMap
        gameData={gameData}
        stateWebsocket={stateWebsocket}
        userId={userId}
        windowWidth={windowWidth}
        messageData={messageData}
        // userMapLevel={userMapLevel}
        updateDialogMode={updateDialogMode}
        coordKeyToData={coordKeyToData}
        setCoordKeyToData={setCoordKeyToData}
        setErrorMode={setErrorMode}
        selfPoiCoordData={selfPoiCoordData}
        crdX={crdX}
        crdY={crdY}
        selfPoiCoordKey={selfPoiCoordKey}
        selfPoiUserGameDatum={selfPoiUserGameDatum}
      />
    );
  }

  return (
    <DuringConnectZone
      windowWidth={windowWidth}
      setErrorMode={setErrorMode}
      stateWebsocket={stateWebsocket}
      isWebsocketConnected={isWebsocketConnected}
    />
  );
}

export default ConnectZone;

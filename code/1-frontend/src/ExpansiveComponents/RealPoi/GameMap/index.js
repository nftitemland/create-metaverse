import React, { useState, useEffect } from "react";
import BackgroundMap from "../BackgroundMap";
// import { MAP_WIDTH, MAP_HEIGHT } from "../local";

import "./GameCharacter.css";
import MessageDashboard from "../MessageDashboard";
import handleMapClick from "./handleMapClick";
import EnchantmentSection from "../EnchantmentSection";
import getGameCharacters from "./getGameCharacters";
import MapFederalResources from "./MapFederalResources";
import usaTestModifications from "./usaTestModifications";

// const getCoordKeyFromUserCpData = ({ gameDatum }) => {
//   const xCoord = gameDatum.crdX || "0";
//   const yCoord = gameDatum.crdY || "0";

//   const coordKey = `${xCoord}$${yCoord}`;

//   return coordKey;
// };

// crdX, crdY,

const minScalar = 0.5;

function GameMap({
  gameData,
  stateWebsocket,
  userId,
  windowWidth,
  messageData,
  // userMapLevel,
  updateDialogMode,
  coordKeyToData,
  setCoordKeyToData,
  setErrorMode,

  selfPoiCoordData,
  crdX,
  crdY,
  selfPoiCoordKey,
  selfPoiUserGameDatum,
}) {
  const [loadCounter, setLoadCounter] = useState(null);

  // const [stateCoordKey, setStateCoordKey] = useState(null);
  // const [coordKeyToData, setCoordKeyToData] = useState({});

  useEffect(() => {
    if (!selfPoiCoordData) {
      const i = setInterval(() => {
        const message = `${userId}|MAPCOORD|${crdX}@${crdY}`;

        try {
          stateWebsocket.send(message);
        } catch (err) {
          console.log("error in sending action:", err);
        }

        setLoadCounter(loadCounter + 1);
        if (loadCounter > 10) {
          setErrorMode("error in loading map data");

          stateWebsocket.close();
          return;
        }
      }, 500);

      return () => {
        clearInterval(i);
      };
    } else {
      setLoadCounter(0);
    }
  }, [
    userId,
    stateWebsocket,
    selfPoiCoordData,
    coordKeyToData,
    selfPoiCoordKey,
    setCoordKeyToData,
    loadCounter,
    setErrorMode,
    crdX,
    crdY,
  ]);

  if (!selfPoiCoordData || !selfPoiCoordData.w || !selfPoiCoordData.h) {
    return null;
  }
  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         selfPoiCoordData,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  let s = windowWidth / selfPoiCoordData.w;

  if (windowWidth > 1300) {
    s = 1;
  } else if (s > 1) {
    s = 1;
  } else {
    // s = s - 0.05;
    s = s - 0.025;

    if (s < minScalar) {
      s = minScalar;
    }
  }

  let w0 = selfPoiCoordData.w;
  let h0 = selfPoiCoordData.h;
  // let w0 = MAP_WIDTH;
  // let h0 = MAP_HEIGHT;
  let w1 = w0 * s;
  let h1 = h0 * s;

  const { gameCharacters, selfPoiData, tubCoordKeyToData } = getGameCharacters(
    gameData,
    userId,
    s,
    selfPoiCoordKey
  );

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         selfPoiData,
  //         gameData,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         w0,
  //         h0,
  //         s,
  //         w1,
  //         h1,
  //         selfPoiData,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         gameData,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  //

  // if (takenXSpaces.has(4)) {
  //   console.log("T:", Date.now());
  // }
  const isMobileMode = windowWidth > 900;

  if (
    2 === 1 + 0 &&
    selfPoiCoordData?.componentData &&
    crdY === "-59595967323"
  ) {
    // if (1 === 1 + 0 && selfPoiCoordData?.componentData) {
    usaTestModifications({
      crdX,
      crdY,
      selfPoiCoordData,
    });
  }

  return (
    <div
      style={{
        width: "100%",
        // height: 300,
        // backgroundColor: "pink",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="BackgroundMap22"
        style={{
          marginTop: windowWidth < 800 ? 25 : 50,
          // width: windowWidth > 1400 ? undefined : "100%",
          // width: windowWidth > w0 ? undefined : "100%",
          width: windowWidth >= w0 ? "unset" : "100%",
          // width: "100%",
          // height: 300,
          // backgroundColor: "pink",
          overflowX: "scroll",
          // touchAction: "pan-x",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BackgroundMap
          userId={userId}
          gameData={gameData}
          marginBottom={0}
          // userMapLevel={userMapLevel}
          w1={w1}
          h1={h1}
          handleClick={({
            //x, y,

            // pageX,
            pageY,
            // backgroundMapScrollLeft,
            world1Position,

            rawX,
            rawY,
          }) => {
            // console.log(`

            //     MEGA LOG: ${JSON.stringify(
            //       {
            //         rawX,
            //         rawX2: rawX / s,
            //         rawY,
            //         rawY2: rawY / s,
            //       },
            //       null,
            //       4
            //     )}

            // `);

            let scaledRawX = rawX / s;
            let scaledRawY = rawY / s;

            // return;

            // let xOffset = getXOffset(userMapLevel);

            // const handleClickX =
            //   pageX - world1Position.x + backgroundMapScrollLeft + xOffset;

            // const handleClickY =
            //   pageY - world1Position.y + (selfPoiData.yShift || 0);

            // let teleportPadOffset = userMapLevel === 1 ? -100 : 0;

            let characterWidthOffset = (selfPoiData.width * s) / 2;
            // let characterWidthOffset = 0;
            let characterHeightOffset = (selfPoiData.height * s) / 2;
            // let characterHeightOffset = 0;

            // const minX = userMapLevel === 2 ? MIN_HYPER_WORLD_X : 0;
            const minX = 0;
            const maxX = w0;

            const minY = 0;
            const maxY = h0;

            // const rawX = handleClickX + teleportPadOffset;

            // let newX = rawX - characterWidthOffset;
            let newX =
              scaledRawX - characterWidthOffset + selfPoiData.getXShift(s);

            if (newX < minX) {
              newX = minX;
            } else if (newX > maxX) {
              newX = maxX;
            }

            let newY =
              scaledRawY - characterHeightOffset + selfPoiData.getYShift(s);

            if (newY < minY) {
              newY = minY;
            } else if (newY > maxY) {
              newY = maxY;
            }

            handleMapClick({
              rawX,
              rawY,
              x: newX,
              y: newY,
              stateWebsocket,
              userId,
              updateDialogMode,
              crdX: selfPoiUserGameDatum.crdX || 0,
              crdY: selfPoiUserGameDatum.crdY || 0,
            });
          }}
          // _handleCmdEnter={({ x, y }) => {
          //   if (!stateWebsocket) {
          //     return;
          //   }

          //   const message = `${userId}|ENTER|${x}@${y}${ }`;

          //   try {
          //     stateWebsocket.send(message);
          //   } catch (err) {
          //     console.log("error in sending action:", err);
          //   }
          // }}
        >
          <MapFederalResources
            stateWebsocket={stateWebsocket}
            userId={userId}
            selfPoiCoordData={selfPoiCoordData}
            s={s}
            selfPoiUserGameDatum={selfPoiUserGameDatum}
            tubCoordKeyToData={tubCoordKeyToData}
            selfPoiCoordKey={selfPoiCoordKey}
          />
          {gameCharacters}
        </BackgroundMap>
      </div>
      <div
        style={{
          marginTop: isMobileMode ? 25 : 25,
          // width: windowWidth > 1400 ? undefined : "100%",
          // width: windowWidth > MAP_WIDTH ? undefined : "100%",
          // height: 300,
          // backgroundColor: "pink",

          width: "100%",
          maxWidth: 1000,
          display: "flex",
          flexDirection: isMobileMode ? "row-reverse" : "column",
          justifyContent: "space-around",
          alignItems: isMobileMode ? "flex-start" : "center",
        }}
      >
        <MessageDashboard
          // updateStatus={updateStatus}
          // address={address}
          stateWebsocket={stateWebsocket}
          userId={userId}
          // setIsLoading={setIsLoading}
          // isLoading={isLoading}
          // setWebsocketLoginToken={setWebsocketLoginToken}
          windowWidth={windowWidth}
          messageData={messageData}
        />

        <EnchantmentSection
          stateWebsocket={stateWebsocket}
          userId={userId}
          selfPoiData={selfPoiData}
        />
      </div>
    </div>
  );
}

export default GameMap;

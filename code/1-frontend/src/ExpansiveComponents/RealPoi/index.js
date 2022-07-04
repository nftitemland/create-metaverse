import React, { useState, useEffect } from "react"; //  useEffect, useState
import getWsLoginTokenDataIfValid from "../../utils/getWsLoginTokenDataIfValid";
import PreconnectDashboard from "./PreconnectDashboard";
import MessageDashboard from "./MessageDashboard";
import ConnectZone from "./ConnectZone";
import GameMap from "./GameMap";
import DuringConnectZone from "./ConnectZone/DuringConnectZone";
// import CharacterSelect from "./CharacterSelect";

// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";
const getGuestId = () => {
  const idPart = (
    "000000000" + Math.random().toString(36).substring(2, 9)
  ).slice(-9);

  const guestId = `GUEST_${idPart}`;

  return guestId;
};

function RealPoi({
  updateStatus,
  address,
  userData,
  setIsLoading,
  isLoading,
  windowWidth,
  updateDialogMode,
  grecaptchaToken,
}) {
  const [
    userId,

    //setUserId
  ] = useState(grecaptchaToken ? getGuestId() : userData.userId);
  const [errorMode, setErrorMode] = useState(false);
  const [disconnectMode, setDisconnectMode] = useState(false);
  const [websocketLoginToken, setWebsocketLoginToken] = useState(
    null
    // `asdasdsasXENA${Date.now() + 1000 * 60 * 60}`
  );
  const [stateWebsocket, setStateWebsocket] = useState(null);
  const [coordKeyToData, setCoordKeyToData] = useState({});

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         userId,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  useEffect(() => {
    return () => {
      if (stateWebsocket) {
        stateWebsocket.close();
      }
    };
  }, [stateWebsocket]);

  useEffect(() => {
    if (errorMode && stateWebsocket && stateWebsocket.close) {
      stateWebsocket.close();
    }
  }, [errorMode, stateWebsocket]);

  if (errorMode || disconnectMode) {
    let keyText = "";

    if (errorMode) {
      keyText += "Land Party: " + errorMode || "failed to load";
    } else if (disconnectMode) {
      keyText += "User disconnected from Land Party";
    }

    return (
      <div
        style={{
          marginTop: 50,
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
          style={{
            // marginTop: 50,
            // position: "relative",
            // top: -120,
            // width: 150,
            maxWidth: "90%",
            height: 75,

            // borderRadius: 20,

            // marginBottom: 50,
            // backgroundColor: "grey",
            color: "white",

            fontFamily: `"Amaranth", sans-serif`,
            // paddingTop: 5,
            fontSize: 20,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {keyText}
        </div>

        <button
          style={{
            // marginTop: 50,
            position: "relative",
            marginTop: 124,
            width: 150,
            height: 75,

            borderRadius: 20,

            // marginBottom: 50,
            backgroundColor: "blue",
            color: "white",

            fontFamily: `"Amaranth", sans-serif`,
            // paddingTop: 5,
            fontSize: 20,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            window.location.reload();
          }}
        >
          {"Reload"}
        </button>
      </div>
    );
  }

  if (1 !== 1 + 0) {
    // if (1 === 1 + 0) {
    return (
      <GameMap
        gameData={{
          [userId]: {
            x: 100,
            // x: -1000500,
            y: 0,
          },

          userId_2: {
            x: 200,
            y: 50,
          },
        }}
        stateWebsocket={null}
        userId={userId}
        windowWidth={windowWidth}
        messageData={[]}
        userMapLevel={0}
        updateDialogMode={updateDialogMode}
      />
    );
  }

  const hasValidToken =
    (websocketLoginToken && getWsLoginTokenDataIfValid(websocketLoginToken)) ||
    grecaptchaToken;

  if (!hasValidToken) {
    if (1 !== 1 + 0) {
      // if (1 === 1 + 0) {
      return (
        <div
          style={{
            // marginTop: 50,
            // position: "relative",
            // top: -120,
            // width: 150,
            // maxWidth: "90%",
            // height: 75,

            // borderRadius: 20,

            // marginBottom: 50,
            // backgroundColor: "grey",
            // color: "white",

            // fontFamily: `"Amaranth", sans-serif`,
            // paddingTop: 5,
            // fontSize: 20,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <CharacterSelect /> */}

          <div
            style={{
              // marginTop: 50,
              // position: "relative",
              // top: -120,
              backgroundColor: "blue",
              width: 150,
              // maxWidth: "90%",
              height: 75,
            }}
          ></div>

          <MessageDashboard
            updateStatus={updateStatus}
            userId={userId}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            // setWebsocketLoginToken={setWebsocketLoginToken}
            windowWidth={windowWidth}
            messageData={[]}
          />
        </div>
      );
    } else if (1 !== 1 + 0) {
      return <DuringConnectZone windowWidth={windowWidth} />;
    }

    return (
      <PreconnectDashboard
        updateStatus={updateStatus}
        address={address}
        userId={userId}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setWebsocketLoginToken={setWebsocketLoginToken}
        windowWidth={windowWidth}
        setErrorMode={setErrorMode}
      />
    );
  }

  return (
    <ConnectZone
      address={address}
      websocketLoginToken={websocketLoginToken}
      setWebsocketLoginToken={setWebsocketLoginToken}
      userId={userId}
      windowWidth={windowWidth}
      setErrorMode={setErrorMode}
      stateWebsocket={stateWebsocket}
      setStateWebsocket={setStateWebsocket}
      setDisconnectMode={setDisconnectMode}
      updateDialogMode={updateDialogMode}
      grecaptchaToken={grecaptchaToken}
      coordKeyToData={coordKeyToData}
      setCoordKeyToData={setCoordKeyToData}
    />
  );

  // return (
  //   <div
  //     style={{
  //       marginTop: 50,
  //       width: "100%",
  //       // height: 300,,
  //       backgroundColor: "green",

  //       display: "flex",
  //       flexDirection: "column",
  //       justifyContent: "flex-start",
  //       alignItems: "center",
  //     }}
  //   >
  // <div
  //   style={{
  //     // marginTop: 40,
  //     width: 320,
  //     height: 320,
  //     backgroundColor: "peru",

  //     display: "flex",
  //     flexDirection: "row",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   }}
  // >
  //   <Space />
  //   <Space />
  //   <Space on={true} />
  //   <Space />
  //   <Space />
  // </div>
  // </div>
  // );
}

export default RealPoi;

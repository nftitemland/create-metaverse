import React, { useState, useEffect } from "react"; //  useEffect, useState

// import getWsLoginTokenDataIfValid from "../../utils/getWsLoginTokenDataIfValid";
// import { NULL_ADDRESS, NULL_USER_ID, API_BASE_URL } from "../../constants";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";
// import BackgroundMap from "./BackgroundMap";
// import { MAP_WIDTH } from "./local";
// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";
import "./MessageDashboard.css";

const WIDTH = 250;
const EXPAND_BUTTON_HEIGHT = 33;

const MessageDashboard = ({
  stateWebsocket,
  // updateStatus,
  userId,
  // setIsLoading,
  // isLoading,
  // setWebsocketLoginToken,
  windowWidth,
  messageData,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [largeMode, setLargeMode] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (!hasLoaded) {
      setHasLoaded(true);
      const messageBox = document.getElementById("MessageBoxOmega");

      messageBox.scrollTo({
        top: 5000,
      });
    }
  }, [hasLoaded]);

  const messageElementsData = [];

  const messagesDataLastIndex = messageData.length - 1;

  const messageMarginAmount = 16;

  for (let i = messagesDataLastIndex; i >= 0; i--) {
    const messageDatum = messageData[i];

    const messageElement = (
      <div
        key={`message${messageDatum.time}`}
        className={i === 0 ? "SmoothieChangeShapeFirst" : "SmoothieChangeShape"}
        // key={"" + index}
        // className={`element element-${el}` + ` index-${el}`}
        style={{
          position: "relative",
          marginTop: i !== messagesDataLastIndex ? messageMarginAmount : 0,
          marginBottom: i === 0 ? messageMarginAmount : 0,
          width: "70%",
          // marginLeft: 14,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 5,
          // height: 40,
          // borderRadius: 15,
          backgroundColor: "white",
          textAlign: "left",
          color: "black",

          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "flex-start",
          // alignItems: "center",
          fontFamily: '"Tajawal", sans-serif',
          // wordBreak: "break-all",
          overflowWrap: "break-word",
        }}
      >
        {messageDatum.message}
      </div>
    );

    // messageElement.testMonkey = i;

    messageElementsData.push({
      monkeyIndex: messageDatum.time,
      messageElement,
    });
  }

  const me2 = messageElementsData.map((datum, index) => {
    const el = datum.messageElement;
    // const monkeyIndex = datum.monkeyIndex;

    // const baseCn =
    //   index === messageElementsData.length - 1 ? "elementFirst" : "element";
    // const className =
    //   `${baseCn} element-` + String(monkeyIndex) + " index-" + String(index);

    // console.log(`

    //       MEGA LOG: ${JSON.stringify(
    //         {
    //           className,
    //         },
    //         null,
    //         4
    //       )}

    //   `);

    return (
      // <div key={"" + index} className={className}>
      el
      // </div>
    );
  });

  const widthToUse = windowWidth < 750 ? WIDTH : WIDTH + 250;

  return (
    <div
      className={"SmoothieChangeShape"}
      style={{
        marginTop: 50,
        // width: MAP_WIDTH,
        width: widthToUse,
        // backgroundColor: "teal",

        display: "block",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "flex-start",
      }}
    >
      <button
        style={{
          display: "block",
          position: "relative",
          // top: 40,
          // marginTop: 10,
          left: widthToUse - EXPAND_BUTTON_HEIGHT,
          width: EXPAND_BUTTON_HEIGHT,
          height: EXPAND_BUTTON_HEIGHT,
          backgroundColor: "darkblue",
          zIndex: 500,

          // alignSelf: "flex-end",

          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
        }}
        onClick={() => {
          setLargeMode(!largeMode);

          if (largeMode) {
            setTimeout(() => {
              const messageBox = document.getElementById("MessageBoxOmega");

              if (messageBox) {
                messageBox.scrollTo({
                  top: 5000,
                });
              }
            }, 1000);
          }
        }}
      ></button>
      <div
        style={{
          position: "relative",
          top: -EXPAND_BUTTON_HEIGHT,
          // marginTop: 50,
          // width: MAP_WIDTH,
          // backgroundColor: "pink",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          id={"MessageBoxOmega"}
          className={"SmoothieChangeShape"}
          style={{
            // marginTop: 50,
            height: largeMode ? 420 : 100,
            width: widthToUse,
            // height: "90%",
            display: "block",
            backgroundColor: "black",
            overflow: "scroll",

            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          {/* <div
          style={{
            // marginTop: 50,
            width: "90%",
            height: "90%",
            // borderRadius: 15,
            backgroundColor: "darkblue",

            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-around",
            // alignItems: "center",
            overflow: "scroll",
          }}
        > */}
          {me2}
          {/* </div> */}
        </div>
        <div
          style={{
            // marginTop: 50,
            width: widthToUse,
            // height: 130,
            backgroundColor: "black",

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              // marginLeft: 20,
              width: "70%",
              height: 40,
              // backgroundColor: "purple",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              style={{
                marginTop: 5,
                // marginBottom: 5,
                width: "100%",
                height: 40,
                backgroundColor: "white",
                resize: "none",
                fontFamily: '"Tajawal", sans-serif',
                fontSize: 18,
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                boxSizing: "border-box",
                border: "none",
                borderRadius: 10,
              }}
              onChange={(event) => {
                const newText = event.target.value;

                if (newText.length > 50) {
                  return;
                }

                setInputText(newText);
              }}
              value={inputText}
            ></input>
          </div>
          <div
            style={{
              // marginTop: 10,
              height: 40,
              width: "27%",
              // 10: 80,
              // backgroundColor: "white",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                // marginTop: 10,
                width: "100%",
                height: 60,
                borderRadius: 10,
                backgroundColor: "darkblue",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontFamily: '"Amaranth", sans-serif',
              }}
              onClick={() => {
                if (!inputText) {
                  return;
                }

                const message = `${userId}|TEXT|${inputText}`;

                // const message = ;
                // console.log(`

                //     MEGA LOG: ${JSON.stringify(
                //       {
                //         message: message.trim(),
                //       },
                //       null,
                //       4
                //     )}

                // `);
                stateWebsocket.send(message.trim());

                setInputText("");
              }}
            >
              {"Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDashboard;

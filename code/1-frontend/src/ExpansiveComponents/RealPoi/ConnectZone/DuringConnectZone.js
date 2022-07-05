import React, {
  //useEffect,
  useState,
} from "react";
// import { WEBSOCKET_API_BASE_URL } from "../../../constants";
import BackgroundMap from "../BackgroundMap";
// import GameMap from "../GameMap";
import { MAP_WIDTH } from "../local";
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

// const WEBSOCKET_URL = WEBSOCKET_API_BASE_URL;

function DuringConnectZone({ windowWidth }) {
  const [
    message,
    //   setMessage
  ] = useState("");

  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     setMessage("Unexpected issue in loading Land Party");
  //     // }, 15000);
  //   }, 10000);

  //   return () => {
  //     clearTimeout(t);
  //   };
  // }, []);

  return (
    <div
      style={{
        marginTop: 50,
        width: windowWidth > MAP_WIDTH ? undefined : "100%",
        // height: 300,
        // backgroundColor: "pink",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BackgroundMap black={true}></BackgroundMap>
      {message && (
        <>
          <div
            style={{
              // marginTop: 50,
              position: "relative",
              top: -400,
              width: "100%",
              height: 75,

              // borderRadius: 20,

              // marginBottom: 50,
              backgroundColor: "grey",
              color: "white",

              fontFamily: `"Amaranth", sans-serif`,
              // paddingTop: 5,
              fontSize: 20,
              textAlign: "center",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {message}
          </div>
          <button
            style={{
              // marginTop: 50,
              position: "relative",
              top: -350,
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
            {"Reload page"}
          </button>
        </>
      )}
      <div
        style={{
          // marginTop: 50,
          position: "relative",
          top: -120,
          width: 150,
          height: 75,

          borderRadius: 20,

          // marginBottom: 50,
          backgroundColor: "grey",
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
        {"Loading"}
      </div>
    </div>
  );
}

export default DuringConnectZone;

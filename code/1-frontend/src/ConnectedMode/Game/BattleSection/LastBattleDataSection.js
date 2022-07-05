import React from "react"; //  useEffect, useState
// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";

const LastBattleDataSection = ({ userData }) => {
  return (
    <div
      style={{
        // marginTop: 40,
        width: "100%",
        height: 40,
        backgroundColor: "pink",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userData.lastBattleData ? (
        <div
          style={{
            // marginTop: 40,
            width: "100%",
            height: "100%",
            backgroundColor: "blue",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      ) : (
        <div
          style={{
            // marginTop: 40,
            width: "100%",
            height: "100%",
            backgroundColor: "grey",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      )}
    </div>
  );
};

export default LastBattleDataSection;

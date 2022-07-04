import React from "react"; //  useEffect, useState
// import { MAP_WIDTH, MAP_HEIGHT } from "../local";
// import getPosition from "../../../utils/getPosition";

// import getWsLoginTokenDataIfValid from "../../utils/getWsLoginTokenDataIfValid";
// import { NULL_ADDRESS, NULL_USER_ID, API_BASE_URL } from "../../constants";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";

// const BACKGROUND_WIDTH = MAP_WIDTH;

const World0 = ({ marginBottom = 150, black, w1, h1 }) => {
  // const world0Width = BACKGROUND_WIDTH + 100;

  return (
    <div
      id={"World1"}
      style={{
        marginTop: 25,
        marginBottom,
        height: h1,
        width: w1,
        backgroundColor: "#00021f",
        // backgroundColor: "#F6D047",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",

        borderBlockColor: "darkblue",
        borderWidth: 2,
        borderStyle: "solid",
        borderRight: "darkblue",
        borderRightWidth: "3px",
        borderRightStyle: "solid",

        borderLeft: "darkblue",
        borderLeftWidth: "3px",
        borderLeftStyle: "solid",
      }}
    ></div>
  );
};

export default World0;

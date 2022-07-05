import React, { useEffect } from "react"; //  useEffect, useState
// import {
//   // MAP_WIDTH,
//   // MAP_HEIGHT,
//   // MAP_WIDTH_1,
//   // MAP_WIDTH_2,
//   // MIN_HYPER_WORLD_X,
//   // MAX_HYPER_WORLD_X,
//   // TOTAL_MAP_WIDTH,
//   // CHARACTER_UNIT_WIDTH,
// } from "../local";
import getPosition from "../../../utils/getPosition";
import "./BackgroundMap.css";
import World0 from "./World0";

// import getWsLoginTokenDataIfValid from "../../utils/getWsLoginTokenDataIfValid";
// import { NULL_ADDRESS, NULL_USER_ID, API_BASE_URL } from "../../constants";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";

// const BACKGROUND_WIDTH = MAP_WIDTH;

// const getXOffset = (userMapLevel) => {
//   if (userMapLevel === 2) {
//     return MIN_HYPER_WORLD_X;
//   } else if (userMapLevel === 1) {
//     return MAP_WIDTH;
//   }

//   return 0;
// };

const BackgroundMap = ({
  black = false,
  marginBottom = 150,
  children,
  handleClick,
  // _handleCmdEnter,
  userId,
  gameData,
  // userMapLevel,
  w1 = "100%",
  h1 = 20,
}) => {
  useEffect(() => {
    if (!handleClick) {
      return;
    }

    const _handleClick = (event) => {
      // console.log("Handle Click:", event.offsetX, event.offsetY);

      // console.log(event.target);
      // console.log("e:", event);
      // let world1 = document.getElementById("World1");
      // const world1Core = document.getElementById("World1Core");

      // world1 = world1Core || world1;

      // const backgroundMap = document.getElementById("BackgroundMap");

      // console.log("ID:", event.target.id);
      // console.log("class:", event.target.className);

      if (
        ["World1"].includes(event.target.id) ||
        event.target.className === "GameCharacterImage"
      ) {
        // if ([world1, world1Core].includes(event.target)) {
        // let xOffset = getXOffset(userMapLevel);
        let xOffset = 0;

        const world1 = document.getElementById("World1");
        // const backgroundMap = document.getElementById("BackgroundMap");
        const backgroundMap = document.getElementById("BackgroundMap");

        const world1Position = getPosition(world1);

        const handleClickX =
          event.pageX - world1Position.x + backgroundMap.scrollLeft + xOffset;

        const handleClickY = event.pageY - world1Position.y;

        // let characterWidthOffset = CHARACTER_UNIT_WIDTH / 2;
        // let characterHeightOffset = CHARACTER_UNIT_WIDTH / 2;

        // const minX = userMapLevel === 2 ? MIN_HYPER_WORLD_X : 0;
        // const maxX =
        //   userMapLevel === 2
        //     ? MAX_HYPER_WORLD_X - CHARACTER_UNIT_WIDTH
        //     : TOTAL_MAP_WIDTH - CHARACTER_UNIT_WIDTH;

        // let newX = rawX - characterWidthOffset;

        // if (newX < minX) {
        //   newX = minX;
        // } else if (newX > maxX) {
        //   newX = maxX;
        // }

        handleClick({
          rawX: handleClickX,
          rawY: handleClickY,
          pageX: event.pageX,
          pageY: event.pageY,
          // backgroundMapScrollLeft: backgroundMap.scrollLeft,
          world1Position: world1Position,

          // x: newX,
          // y: handleClickY - characterHeightOffset,
        });
      }
      // }
    };

    window.addEventListener("click", _handleClick);

    return () => {
      window.removeEventListener("click", _handleClick);
    };
  }, [handleClick]);

  let mainElement = null;

  mainElement = (
    <World0 marginBottom={marginBottom} black={black} w1={w1} h1={h1} />
  );

  return (
    <div
      id={"BackgroundMap"}
      className={"BackgroundMapCls"}
      style={{
        // maxWidth: "80%",
        width: "100%",
        // overflowX: "scroll",
        // overflowY: "clip",
        // overflowY: "-moz-hidden-unscrollable",
        // height: MAP_HEIGHT,

        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {mainElement}
      <div
        style={{
          position: "relative",
          top: -h1,
          width: w1,
          height: 0,

          //   backgroundColor: "black",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundMap;

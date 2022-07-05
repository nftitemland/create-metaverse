import React from "react"; //  useEffect, useState

// import getWsLoginTokenDataIfValid from "../../utils/getWsLoginTokenDataIfValid";
// import { NULL_ADDRESS, NULL_USER_ID, API_BASE_URL } from "../../constants";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";
// import { MAP_WIDTH } from "./local";
// import delay from "../../utils/delay";

// const WIDTH = 250;
// const EXPAND_BUTTON_HEIGHT = 33;

//
/*
  Get Left Button, Get Right Button, Get Select 
*/

const triangleWidth = 40;
const triangleWidth2 = 25;

const ButtonCore = ({
  index,
  setIndex,
  optionKeys,
  borderWidth,
  borderColor,
  decrement = false,
}) => {
  return (
    <button
      style={{
        // // marginLeft
        // // width: 50,
        // // height: 50,
        // // marginRight: 20,
        // // height: "100%",
        backgroundColor: "orange",
        // // backgroundColor: "rgb(7, 11, 34)",
        // backgroundColor: "orange",
        // // backgroundColor: "pink",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        // // width: 0,
        // // marginRight: 20,
        // height: 0,
        // borderStyle: "solid",
        // borderWidth,
        // borderColor,
      }}
      onClick={() => {
        let newIndex = (index + (decrement ? -1 : 1)) % optionKeys.length;

        if (newIndex < 0) {
          newIndex = newIndex + optionKeys.length;
        }

        setIndex(newIndex);
      }}
    >
      <div
        style={{
          // marginLeft
          // width: 50,
          // height: 50,
          // marginRight: 20,
          // height: "100%",
          // backgroundColor: "rgb(7, 11, 34)",
          backgroundColor: "orange",
          // backgroundColor: "pink",
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "space-around",
          // alignItems: "center",
          width: 0,
          // marginRight: 20,
          height: 0,
          borderStyle: "solid",
          borderWidth,
          borderColor,
        }}
      ></div>
    </button>
  );
};

const RightButton = ({ index, setIndex, optionKeys }) => {
  return (
    <ButtonCore
      index={index}
      setIndex={setIndex}
      optionKeys={optionKeys}
      borderColor="transparent transparent transparent #007bff"
      borderWidth={`${triangleWidth2}px 0 ${triangleWidth2}px ${triangleWidth}px`}
    />
  );
};

const LeftButton = ({ index, setIndex, optionKeys }) => {
  return (
    <ButtonCore
      decrement={true}
      index={index}
      setIndex={setIndex}
      optionKeys={optionKeys}
      borderColor="transparent #007bff transparent transparent"
      borderWidth={`${triangleWidth2}px ${triangleWidth}px ${triangleWidth2}px 0`}
    />
  );
};

export { LeftButton, RightButton };

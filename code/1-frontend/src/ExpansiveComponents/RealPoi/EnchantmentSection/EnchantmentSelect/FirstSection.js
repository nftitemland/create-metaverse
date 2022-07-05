import React from "react"; //  useEffect, useState

// import { LeftButton, RightButton } from "./LeftAndRightButtons";

const FirstSection = ({ name }) => {
  return (
    <div
      style={{
        width: "30%",
        // height: "100%",
        height: 100,
        backgroundColor: "lightblue",

        alignSelf: "flex-start",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // width: "100%",
          // height: "100%",
          // backgroundColor: "lightblue",,
          fontFamily: `"Amaranth", sans-serif`,
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default FirstSection;

import React from "react";

const CONTENT_ELEMENT_WIDTH = 300;

const CoolButtonSection = ({ label, onClick, disabled }) => {
  return (
    <div
      style={{
        width: CONTENT_ELEMENT_WIDTH,
        // height: 75,
        // backgroundColor: "blue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 75,
          backgroundColor: disabled ? "lightgrey" : "#E4609E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: disabled ? "unset" : "pointer",
          userSelect: disabled ? "unset" : "none",
        }}
        onClick={() => {
          if (disabled) {
            return;
          }

          onClick();
        }}
      >
        <div
          style={{
            width: "90%",
            // height: 60,
            backgroundColor: "unset",
            borderStyle: "unset",

            // color: "white",
            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
            // fontFamily: `"Tajawal", sans-serif`,
            fontSize: 20,
            color: "black",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          // value={1}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export default CoolButtonSection;

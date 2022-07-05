import React from "react";

const TitleSection = ({
  titleText = "",
  height = 60,
  width = "100%",
  argClassName,
  backgroundColor = "black",
  marginTop = 0,
  marginBottom = 0,
}) => {
  return (
    <div
      className={argClassName}
      style={{
        width,
        height,
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop,
        marginBottom,
        // zIndex: 99,
      }}
    >
      <div
        style={{
          //   width: "100%",
          //   height: 60,
          //   backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // marginLeft: 14,
          // marginBottom: 6,
          fontSize: 24,
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
          }}
        >
          {titleText}
        </div>
      </div>
    </div>
  );
};

export default TitleSection;

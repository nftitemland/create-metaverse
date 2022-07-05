import React from "react";

const TitleSection = ({
  titleText = "",
  height = 60,
  width = "100%",
  textBoxWidth = "unset",
  argClassName,
  backgroundColor = "black",
  fontSize = 24,
  marginLeft = 14,
  textAlign = "left",
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
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <div
        className="DoNotCloseSelectedLandData"
        style={{
          width: textBoxWidth,
          // width: "100%",
          //   height: 60,
          //   backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft,
          marginBottom: 6,
          fontSize,
        }}
      >
        <div
          className="DoNotCloseSelectedLandData"
          style={{
            width: textBoxWidth,
            color: "white",
            textAlign,
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

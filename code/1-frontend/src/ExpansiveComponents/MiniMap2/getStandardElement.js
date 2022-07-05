const backgroundColorToReservedBackgroundColor = {
  black: "peru",
  darkblue: "teal",
  red: "red",
};

const getStandardElement = ({
  backgroundColor,
  reserved,
  text,
  textColor = "white",
  squareWidth,
  triplePseudoElement = null,
  doublePseudoElement = null,
  pseudoElement = null,
  testCoords = null,
}) => {
  // const showTestCoords = true;
  const showTestCoords = false;

  return (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,
        backgroundColor: reserved
          ? backgroundColorToReservedBackgroundColor[backgroundColor]
          : backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {triplePseudoElement && (
        <div
          style={{
            position: "absolute",
            // top: 0,
            // left: 0,
            width: squareWidth,
            height: squareWidth,
            zIndex: 55,
            // backgroundColor: "pink",
            // opacity: 0.5,
          }}
        >
          {triplePseudoElement}

          {/* <div
            style={{
              position: "relative",
              // width: "100%",
              // height: "100%",
              // backgroundColor: "red",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          ></div> */}
        </div>
      )}

      {doublePseudoElement && (
        <div
          style={{
            position: "absolute",
            // top: 0,
            // left: 0,
            width: squareWidth,
            height: squareWidth,
            // backgroundColor: "pink",
            // opacity: 0.5,
          }}
        >
          {doublePseudoElement}

          {/* <div
            style={{
              position: "relative",
              // width: "100%",
              // height: "100%",
              // backgroundColor: "red",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          ></div> */}
        </div>
      )}

      {!!showTestCoords && (
        <div
          style={{
            position: "absolute",
            // top: 0,
            // left: 0,
            width: squareWidth,
            height: squareWidth,
            // backgroundColor: "pink",
            // opacity: 0.5,
          }}
        >
          <div
            style={{
              position: "relative",
              // width: "100%",
              // height: "100%",
              // backgroundColor: "red",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              fontSize: 11,
            }}
          >
            {testCoords}
          </div>
        </div>
      )}

      {!!pseudoElement && (
        <div
          style={{
            position: "absolute",
            // top: 0,
            // left: 0,
            width: squareWidth,
            height: squareWidth,
            // backgroundColor: "pink",
            // opacity: 0.5,
            userSelect: "none",
          }}
        >
          {pseudoElement}

          {/* <div
            style={{
              position: "relative",
              // width: "100%",
              // height: "100%",
              // backgroundColor: "red",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          ></div> */}
        </div>
      )}

      {text && (
        <div
          style={{
            fontFamily: `"Amaranth", sans-serif`,

            fontSize: 16,
            color: textColor,
            userSelect: "none",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default getStandardElement;

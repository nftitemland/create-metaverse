import getStandardElement from "./getStandardElement";

const getExpansiveElement = ({
  backgroundColor,
  onTouch = () => {},
  squareWidth,
  xSize = 1,
  ySize = 1,
  text = null,
  doublePseudoElement = null,
  triplePseudoElement = null,
  pseudoElementClassName,
}) => {
  return getStandardElement({
    backgroundColor: "black",
    squareWidth,
    doublePseudoElement,
    triplePseudoElement,
    pseudoElement: (
      <div
        className={pseudoElementClassName}
        onClick={onTouch}
        style={{
          width: squareWidth * xSize,
          height: squareWidth * ySize,
          backgroundColor,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // : "center",
        }}
      >
        {text && (
          <div
            className={pseudoElementClassName}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // : "center",
            }}
          >
            <div
              className={pseudoElementClassName}
              style={{
                fontFamily: `"Amaranth", sans-serif`,
                color: "white",
              }}
            >
              {text}
            </div>
          </div>
        )}
      </div>
    ),
  });
};

export default getExpansiveElement;

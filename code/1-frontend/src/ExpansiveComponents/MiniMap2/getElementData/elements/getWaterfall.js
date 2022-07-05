// import getExpansiveElement from "../../getExpansiveElement";
import getStandardElement from "../../getStandardElement";

const Droplet = ({
  squareWidth,
  animeTime,
  animeTimeOffset,
  mod = 0,
  // mod2 = 0,
  // mod3 = 0,
}) => {
  let dropletVisible = false;

  if (animeTime % mod === animeTimeOffset) {
    dropletVisible = true;
  }

  return (
    <div
      style={{
        height: squareWidth,
        width: squareWidth,
        backgroundColor: dropletVisible ? "#1784bf" : "rgb(0, 99, 154)",
        // backgroundColor: "rgb(0, 99, 154)",

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    ></div>
  );
};

// INTENDED FOR ROW ONLY
const getWaterfall = ({
  squareWidth,
  w,
  h,
  animeTime,
  animeTimeOffset = 0,
}) => {
  // const modCompare1 = 7;
  // const modCompare2 = 8;
  // const modCompare3 = 9;

  // const modCompare1 = 20;
  const modCompare1 = 6;
  // const modCompare2 = 3;
  // const modCompare3 = 4;

  return getStandardElement({
    backgroundColor: "black",
    squareWidth,
    pseudoElement: (
      <div
        style={{
          height: squareWidth * h,
          width: squareWidth * w,
          // backgroundColor: "rgb(0, 99, 154)",

          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Droplet
          squareWidth={squareWidth}
          animeTime={animeTime}
          mod={modCompare1}
          animeTimeOffset={animeTimeOffset}
          // mod2={modCompare2}
          // mod3={modCompare3}
        />
        <Droplet
          squareWidth={squareWidth}
          animeTime={animeTime}
          mod={modCompare1}
          animeTimeOffset={animeTimeOffset}
          // mod2={modCompare2}
          // mod3={modCompare3}
        />
        <Droplet
          squareWidth={squareWidth}
          animeTime={animeTime}
          mod={modCompare1}
          animeTimeOffset={animeTimeOffset}
          // mod2={modCompare2}
          // mod3={modCompare3}
        />
        <Droplet
          squareWidth={squareWidth}
          animeTime={animeTime}
          mod={modCompare1}
          animeTimeOffset={animeTimeOffset}
          // mod2={modCompare2}
          // mod3={modCompare3}
        />
        <Droplet
          squareWidth={squareWidth}
          animeTime={animeTime}
          mod={modCompare1}
          animeTimeOffset={animeTimeOffset}
          // mod2={modCompare2}
          // mod3={modCompare3}
        />
        <Droplet
          squareWidth={squareWidth}
          animeTime={animeTime}
          mod={modCompare1}
          animeTimeOffset={animeTimeOffset}
          // mod2={modCompare2}
          // mod3={modCompare3}
        />
        <Droplet
          squareWidth={squareWidth}
          animeTime={animeTime}
          mod={modCompare1}
          animeTimeOffset={animeTimeOffset}
          // mod2={modCompare2}
          // mod3={modCompare3}
        />
        <Droplet
          squareWidth={squareWidth}
          animeTime={animeTime}
          mod={modCompare1}
          animeTimeOffset={animeTimeOffset}
          // mod2={modCompare2}
          // mod3={modCompare3}
        />
      </div>
    ),
  });

  // getStandardElement;

  // return getExpansiveElement({
  //   backgroundColor:
  //     animeTime % 4 === 0 ? "white" : "rgb(0, 99, 154)",
  //   squareWidth,
  //   xSize: w,
  //   ySize: h,
  // });
};

export default getWaterfall;

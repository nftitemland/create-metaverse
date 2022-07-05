// import colorData from "./colorData";
import BuildingSite from "./common/BuildingSite";

import { getStandardElement } from "../mapTools";

// import getExpansiveElement from "../getExpansiveElement";
// import getStandardElement from "../getStandardElement";
// import getMountain from "./elements/getMountain";
// import getSnow from "./elements/getSnow";
// import getTree from "./elements/getTree";
// import getWaterfall from "./elements/getWaterfall";
// import getInfoCard from "./elements/getInfoCard";

// const YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR = "yellow";

// const {
// YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
// ROYAL_GUARD_LANDS_BACKGROUND_COLOR,
// WATER,
// } = colorData;

// const selectedLandColor = "#21c1d1";

// const getRoad = ({ squareWidth, w, h, red = false }) => {
//   return getExpansiveElement({
//     backgroundColor: red ? "darkred" : YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
//     squareWidth,
//     xSize: w,
//     ySize: h,
//   });
// };

// const getWater = ({ squareWidth, w, h }) => {
//   return getExpansiveElement({
//     backgroundColor: "#005280",
//     squareWidth,
//     xSize: w,
//     ySize: h,
//     // text: "DONT WORRY IT WON'T BE TOO MUCH",
//   });
// };

// const yScrollLevel = 21;

// const Y_SCROLL_CONSTANT = 22;
// const SECONDARY_Y_OFFSET = 5;

const getWarzoneOneData = ({
  // mobileMode,
  // landsData,
  squareWidth,
  currentlySelected,
  setCurrentlySelected,
  // windowHeight,
  // selectedLandData,
  // setSelectedLandData,
  // m,
  // n,
  // updateDialogMode,
  // setNftPreviewDialogData,
}) => {
  // const scrollOffset = (windowHeight > 775 ? -13 : 0) + Y_SCROLL_CONSTANT;

  const elementData = {
    // "12-12": {
    //   element: getWaterfall({
    //     backgroundColor: "blue",
    //     squareWidth,
    //     w: 8,
    //     h: 8,
    //   }),
    // },
    "5-5": {
      element: (
        <BuildingSite
          squareWidth={squareWidth}
          currentlySelected={currentlySelected}
          setCurrentlySelected={setCurrentlySelected}
          id={1}
        />
      ),
    },

    "10-5": {
      element: (
        <BuildingSite
          squareWidth={squareWidth}
          currentlySelected={currentlySelected}
          setCurrentlySelected={setCurrentlySelected}
          id={2}
        />
      ),
    },

    "15-5": {
      element: (
        <BuildingSite
          squareWidth={squareWidth}
          currentlySelected={currentlySelected}
          setCurrentlySelected={setCurrentlySelected}
          id={3}
        />
      ),
    },

    "20-5": {
      element: (
        <BuildingSite
          squareWidth={squareWidth}
          currentlySelected={currentlySelected}
          setCurrentlySelected={setCurrentlySelected}
          id={4}
        />
      ),
    },

    "5-8": {
      element: getStandardElement({
        backgroundColor: "purple",
        // backgroundColor: any;
        squareWidth,
        // pseudoElement?: any;
      }),
    },

    "0-49": {
      element: getStandardElement({
        backgroundColor: "purple",
        // backgroundColor: any;
        squareWidth,
        // pseudoElement?: any;
      }),
    },

    "49-49": {
      element: getStandardElement({
        backgroundColor: "purple",
        // backgroundColor: any;
        squareWidth,
        // pseudoElement?: any;
      }),
    },
  };

  return elementData;
};

export default getWarzoneOneData;

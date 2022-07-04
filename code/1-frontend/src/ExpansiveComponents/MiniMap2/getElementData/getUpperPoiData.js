import colorData from "./colorData";
import getStandardElement from "../getStandardElement";

const {
  ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
  DIAMOND_LANDS_BACKGROUND_COLOR,
  ROYAL_GUARD_LANDS_BACKGROUND_COLOR,
  YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
} = colorData;

const getUpperPoiData = ({ landsData, squareWidth }) => {
  const elementData = {
    "1-2": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 7,
        reserved: landsData[7],
      }),
    },
    "2-2": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 8,
        reserved: landsData[8],
      }),
    },
    "3-2": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 9,
        reserved: landsData[9],
      }),
    },
    "4-2": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 10,
        reserved: landsData[10],
      }),
    },
    "5-2": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 11,
        reserved: landsData[11],
      }),
    },
    "6-2": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 12,
        reserved: landsData[12],
      }),
    },
    "7-2": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 13,
        reserved: landsData[13],
      }),
    },
    "7-3": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 14,
        reserved: landsData[14],
      }),
    },
    "7-4": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 15,
        reserved: landsData[15],
      }),
    },
    "7-5": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 16,
        reserved: landsData[16],
      }),
    },
    "7-6": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 17,
        reserved: landsData[17],
      }),
    },
    "7-7": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 18,
        reserved: landsData[18],
      }),
    },
    "6-7": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 19,
        reserved: landsData[19],
      }),
    },
    "5-7": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 20,
        reserved: landsData[20],
      }),
    },
    "4-7": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 21,
        reserved: landsData[21],
      }),
    },
    "3-7": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 22,
        reserved: landsData[22],
      }),
    },
    "2-7": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 23,
        reserved: landsData[23],
      }),
    },
    "1-7": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 24,
        reserved: landsData[24],
      }),
    },
    "1-6": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 25,
        reserved: landsData[25],
      }),
    },
    "1-5": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 26,
        reserved: landsData[26],
      }),
    },
    "1-4": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: ROYAL_GUARD_LANDS_BACKGROUND_COLOR,
        text: 27,
        textColor: "darkblue",
        reserved: landsData[27],
      }),
    },
    "3-4": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 3,
        reserved: landsData[3],
      }),
    },
    "4-4": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 1,
        reserved: landsData[1],
      }),
    },
    "5-4": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 5,
        reserved: landsData[5],
      }),
    },
    "3-5": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 4,
        reserved: landsData[4],
      }),
    },
    "4-5": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 2,
        reserved: landsData[2],
      }),
    },
    "5-5": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 6,
        reserved: landsData[6],
      }),
    },
    "0-3": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "1-3": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "2-3": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "3-3": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "4-3": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "5-3": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "6-3": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "2-4": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "2-5": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "2-6": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "3-6": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "4-6": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "5-6": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "6-6": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "6-5": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "6-4": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
  };

  return elementData;
};

export default getUpperPoiData;

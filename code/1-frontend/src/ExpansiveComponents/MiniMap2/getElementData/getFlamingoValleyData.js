import colorData from "./colorData";
// import getStandardElement from "../getStandardElement";
import getExpansiveElement from "../getExpansiveElement";
import getStandardElement from "../getStandardElement";
import getMountain from "./elements/getMountain";
import getSnow from "./elements/getSnow";
import getTree from "./elements/getTree";
import getWaterfall from "./elements/getWaterfall";
import getInfoCard from "./elements/getInfoCard";
import {
  nftClaimData,
  nftPreviewDialogData,
  // PJS_OPENSEA_LINK,
} from "./nftData";
import { areaNames } from "../../../constants";

const {
  YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
  // ROYAL_GUARD_LANDS_BACKGROUND_COLOR,
  // WATER,
} = colorData;

const selectedLandColor = "#21c1d1";

const getFlamingoHome = ({
  squareWidth,
  propertyNumber,
  setSelectedLandData,
  doublePseudoElement,
  landIsSelected,
  selectedLandData,
  isClaimed,
  isClaimedSelf,
}) => {
  let backgroundColor;

  if (landIsSelected) {
    backgroundColor = selectedLandColor;
  } else if (isClaimedSelf) {
    backgroundColor = "teal";
  } else if (isClaimed) {
    backgroundColor = "darkred";
  } else {
    backgroundColor = "#4B0082";
  }

  return getExpansiveElement({
    pseudoElementClassName: "RealEstate_FlamingoHome",
    backgroundColor,
    squareWidth,
    xSize: 1,
    ySize: 1,
    text: String(propertyNumber),
    onTouch: () => {
      if (selectedLandData.propertyNumber === propertyNumber) {
        setSelectedLandData({
          propertyNumber: null,
          area: null,
        });
      } else {
        setSelectedLandData({
          propertyNumber,
          area: areaNames.FLAMINGO_VALLEY,
        });
      }
    },
    doublePseudoElement,
  });
};

const getRoad = ({ squareWidth, w, h, red = false }) => {
  return getExpansiveElement({
    backgroundColor: red ? "darkred" : YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
    squareWidth,
    xSize: w,
    ySize: h,
  });
};

const getWater = ({ squareWidth, w, h }) => {
  return getExpansiveElement({
    backgroundColor: "#005280",
    squareWidth,
    xSize: w,
    ySize: h,
    // text: "DONT WORRY IT WON'T BE TOO MUCH",
  });
};

// const nftPreviewData = {
//   ultraFlamingo: {
//     name: "UltraFlamingo",
//     link: "https://opensea.io/collection/ultraflamin",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/ultraflaminpixeltech/1.png",
//   },

//   dogeX: {
//     name: "DogeX",
//     // note: "2 per house",
//     link: "https://opensea.io/collection/officialdogex",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/dogex9049.png",
//   },

//   huskyCompany: {
//     name: "Husky Company",
//     link: "https://opensea.io/collection/huskycompany",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/huskyPoi.png",
//   },

//   flamingo: {
//     name: "Flamingo",
//     note: "Need 2 per house",
//     link: "https://opensea.io/collection/fantastic-flamingo",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/flamingo5685.png",
//   },

//   poiPoi: {
//     name: "PoiPoi",
//     // note: "2 per house",
//     link: "https://opensea.io/collection/nftitem",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_30.png",
//   },
// };

// const nftClaimData = {
//   flamingo: {
//     name: "Flamingo",
//     link: "https://opensea.io/collection/ultraflamin",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/ultraflaminpixeltech/1.png",
//   },
//   huskyCompany: {
//     name: "Husky",
//     link: "https://opensea.io/collection/huskycompany",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/huskyPoi.png",
//   },

//   poiPoi: {
//     name: "PoiPoi",
//     link: "https://opensea.io/collection/nftitem",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_30.png",
//   },
// };

const yScrollLevel = 21;

const Y_SCROLL_CONSTANT = 22;
const SECONDARY_Y_OFFSET = 5;

const getFlamingoValleyData = ({
  mobileMode,
  landsData,
  squareWidth,
  windowHeight,
  animeTime,
  selectedLandData,
  setSelectedLandData,
  m,
  n,
  updateDialogMode,
  setNftPreviewDialogData,
}) => {
  const scrollOffset = (windowHeight > 775 ? -13 : 0) + Y_SCROLL_CONSTANT;

  const elementData = {
    "4-0": {
      element: getExpansiveElement({
        backgroundColor: "#024901",
        squareWidth,
        xSize: 6,
        ySize: 1,
      }),
    },
    "10-0": {
      element: getWaterfall({
        squareWidth,
        w: 8,
        h: 1,
        animeTime,
        animeTimeOffset: 1,
      }),
    },
    "18-0": {
      element: getExpansiveElement({
        backgroundColor: "#024901",
        squareWidth,
        xSize: 6,
        ySize: 1,
      }),
      //
    },
    "24-0": {
      element: getStandardElement({
        backgroundColor: "#5b6900",
        // backgroundColor: any;
        squareWidth,
        // pseudoElement?: any;
      }),
    },

    "25-0": {
      element: getExpansiveElement({
        backgroundColor: "#024901",
        squareWidth,
        xSize: 3,
        ySize: 1,
      }),
    },

    "10-1": {
      element: getWater({
        squareWidth,
        w: 8,
        h: 2,
      }),
    },

    "11-3": {
      element: getWater({
        // backgroundColor: "#005280",
        squareWidth,
        w: 6,
        h: 8,
        // text: "DONT WORRY IT WON'T BE TOO MUCH",
      }),
    },

    "11-12": {
      element: getWater({
        // backgroundColor: "#005280",
        squareWidth,
        w: 6,
        h: 2,
        // text: "DONT WORRY IT WON'T BE TOO MUCH",
      }),
    },

    "24-1": {
      element: getRoad({
        squareWidth,
        w: 1,
        h: 13,
      }),
    },

    "17-11": {
      element: getRoad({
        squareWidth,
        w: 7,
        h: 1,
      }),
    },

    "11-11": {
      element: getExpansiveElement({
        backgroundColor: "darkgoldenrod",
        squareWidth,
        xSize: 6,
        ySize: 1,
      }),
    },

    "25-13": {
      element: getMountain({
        squareWidth,
        w: 3,
        h: 1,
      }),
    },
    "26-12": {
      element: getMountain({
        squareWidth,
        w: 2,
        h: 1,
      }),
    },
    "27-1": {
      element: getMountain({
        squareWidth,
        w: 1,
        h: 11,
      }),
    },

    "2-1": {
      element: getMountain({
        squareWidth,
        w: 2,
        h: 2,
      }),
    },

    "0-1": {
      element: getSnow({
        squareWidth,
        w: 1,
        h: 2,
      }),
    },

    "0-3": {
      element: getSnow({
        squareWidth,
        w: 2,
        h: 4,
      }),
    },

    "1-7": {
      element: getSnow({
        squareWidth,
        w: 1,
        h: 2,
      }),
    },

    "2-8": {
      element: getSnow({
        squareWidth,
        w: 1,
        h: 1,
      }),
    },

    "0-13": {
      element: getSnow({
        squareWidth,
        w: 1,
        h: 1,
      }),
    },

    "2-9": {
      element: getSnow({
        squareWidth,
        w: 1,
        h: 5,
      }),
    },

    "1-12": {
      element: getSnow({
        squareWidth,
        w: 1,
        h: 2,
      }),
    },

    "3-11": {
      element: getSnow({
        squareWidth,
        w: 1,
        h: 3,
      }),
    },

    "4-13": {
      element: getSnow({
        squareWidth,
        w: 1,
        h: 1,
      }),
    },

    "3-3": {
      element: getExpansiveElement({
        squareWidth,
        xSize: 1,
        ySize: 4,
        backgroundColor: "#6b4f4f",
      }),
    },

    "3-4": {
      element: getMountain({
        squareWidth,
        w: 1,
        h: 4,
      }),
    },

    "2-3": {
      element: getMountain({
        squareWidth,
        w: 1,
        h: 1,
      }),
    },

    "3-8": {
      element: getMountain({
        squareWidth,
        w: 1,
        h: 6,
      }),
    },

    "6-13": {
      element: getMountain({
        squareWidth,
        w: 3,
        h: 1,
      }),
    },
    "5-12": {
      element: getMountain({
        squareWidth,
        w: 2,
        h: 1,
      }),
    },
    "4-11": {
      element: getMountain({
        squareWidth,
        w: 2,
        h: 1,
      }),
    },
    "4-10": {
      element: getMountain({
        squareWidth,
        w: 1,
        h: 1,
      }),
    },
    "1-0": {
      element: getMountain({
        squareWidth,
        w: 3,
        h: 1,
      }),
    },

    "0-0": {
      element: getTree({
        squareWidth,
        w: 1,
        h: 1,
      }),
    },

    "1-1": {
      element: getTree({
        squareWidth,
        w: 1,
        h: 2,
      }),
    },
    "2-4": {
      element: getTree({
        squareWidth,
        w: 1,
        h: 4,
      }),
    },
    "4-12": {
      element: getTree({
        squareWidth,
        w: 1,
        h: 1,
      }),
    },
    "5-13": {
      element: getTree({
        squareWidth,
        w: 1,
        h: 1,
      }),
    },
    "0-7": {
      element: getTree({
        squareWidth,
        w: 1,
        h: 6,
      }),
    },
    "1-9": {
      element: getTree({
        squareWidth,
        w: 1,
        h: 3,
      }),
    },

    "8-11": {
      element: getRoad({
        squareWidth,
        w: 3,
        h: 1,
      }),
    },

    "8-3": {
      element: getRoad({
        squareWidth,
        w: 1,
        h: 8,
      }),
    },

    "4-3": {
      element: getRoad({
        squareWidth,
        w: 4,
        h: 1,
      }),
    },

    // "27-12": {
    //   element: getStandardElement({
    //     backgroundColor: "black",
    //     text: "46",
    //     textColor: "white",
    //     // backgroundColor: any;
    //     squareWidth,
    //     // pseudoElement?: any;
    //   }),
    // },
  };

  const houseData = [
    {
      location: "23-2",
      houseNumber: 38,
      infoCardCoordsOffset: {
        xOffset: -1,
        // yOffset: 0,
        yOffset: -8 + SECONDARY_Y_OFFSET - 1,
      },
      xScroll: 10,
      yScroll: yScrollLevel,
    },
    {
      location: "25-2",
      houseNumber: 39,
      infoCardCoordsOffset: {
        xOffset: -3,
        // yOffset: 0,
        yOffset: -8 + SECONDARY_Y_OFFSET - 1,
      },
      xScroll: 10,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },
    {
      location: "23-4",
      houseNumber: 40,
      infoCardCoordsOffset: {
        xOffset: -1,
        // yOffset: -2,
        yOffset: -10 + SECONDARY_Y_OFFSET + 1,
      },
      xScroll: 10,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },
    {
      location: "25-4",
      houseNumber: 41,
      infoCardCoordsOffset: {
        xOffset: -3,
        yOffset: -10 + SECONDARY_Y_OFFSET + 1,
        // yOffset: -2,
      },
      xScroll: 10,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },
    {
      location: "17-3",
      houseNumber: 69,
      infoCardCoordsOffset: {
        xOffset: -1,
        yOffset: -9 + SECONDARY_Y_OFFSET,
      },
      nftPreviewDialogDatum: [nftPreviewDialogData.poiPoi],
      nftClaimData: nftClaimData.poiPoi,
      xScroll: 4,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },
    {
      location: "25-6",
      houseNumber: 43,
      infoCardCoordsOffset: {
        xOffset: -3,
        // yOffset: -4,
        yOffset: -12 + SECONDARY_Y_OFFSET + 3,
      },
      xScroll: 10,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },
    {
      location: "23-6",
      houseNumber: 44,
      infoCardCoordsOffset: {
        xOffset: -1,
        yOffset: -12 + SECONDARY_Y_OFFSET + 3,
        // yOffset: -4,
      },
      xScroll: 10,
      yScroll: yScrollLevel,
      // yScroll: 9,
      // nftPreviewDialogDatum: [
      //   nftPreviewData.huskyCompany,
      //   nftPreviewData.poiPoi,
      // ],
      // nftClaimData: nftClaimData.huskyCompany,
    },
    {
      location: "23-8",
      houseNumber: 46,
      infoCardCoordsOffset: {
        xOffset: -1,
        yOffset: 1,
      },
      xScroll: 10,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },
    {
      location: "25-8",
      houseNumber: 45,
      infoCardCoordsOffset: {
        xOffset: -3,
        yOffset: 1,
      },
      xScroll: 10,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },
    // {
    //   location: "23-10",
    //   houseNumber: 46,
    //   infoCardCoordsOffset: {
    //     xOffset: -1,
    //     yOffset: 0,
    //   },
    // },
    {
      location: "25-10",
      houseNumber: 47,
      infoCardCoordsOffset: {
        xOffset: -3,
        yOffset: -1,
      },
      nftPreviewDialogDatum: [
        nftPreviewDialogData.poiPoi,
        // nftPreviewData.huskyCompany,
      ],
      nftClaimData: nftClaimData.poiPoi,
      xScroll: 10,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },

    {
      location: "23-10",
      houseNumber: 48,
      infoCardCoordsOffset: {
        xOffset: -1,
        yOffset: -1,
      },
      xScroll: 10,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },
    {
      location: "23-12",
      houseNumber: 49,
      infoCardCoordsOffset: {
        xOffset: -1,
        yOffset: -3,
      },
      xScroll: 10,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },

    {
      location: "21-10",
      houseNumber: 50,
      infoCardCoordsOffset: {
        xOffset: 1,
        yOffset: -1,
      },
      xScroll: 8,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },

    {
      location: "21-12",
      houseNumber: 51,
      infoCardCoordsOffset: {
        xOffset: 1,
        yOffset: -3,
      },
      xScroll: 8,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },

    {
      location: "19-10",
      houseNumber: 52,
      infoCardCoordsOffset: {
        xOffset: 3,
        yOffset: -1,
      },
      xScroll: 8,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },

    {
      location: "19-12",
      houseNumber: 53,
      infoCardCoordsOffset: {
        xOffset: 3,
        yOffset: -3,
      },
      xScroll: 8,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },

    {
      location: "17-10",
      houseNumber: 54,
      infoCardCoordsOffset: {
        xOffset: 5,
        yOffset: -1,
      },
      nftPreviewDialogDatum: [
        nftPreviewDialogData.poiPoi,
        // nftPreviewData.huskyCompany,
      ],
      nftClaimData: nftClaimData.poiPoi,
      xScroll: 8,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },

    {
      location: "17-12",
      houseNumber: 55,
      infoCardCoordsOffset: {
        xOffset: 5,
        yOffset: -3,
      },
      // nftPreviewDialogDatum: [nftPreviewData.huskyCompany],
      // nftClaimData: nftClaimData.huskyCompany,
      nftPreviewDialogDatum: [
        // nftPreviewData.poiPoi,
        nftPreviewDialogData.poiPoi,
        // nftPreviewData.huskyCompany,
      ],
      nftClaimData: nftClaimData.poiPoi,
      xScroll: 8,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },

    {
      location: "10-10",
      houseNumber: 56,
      infoCardCoordsOffset: {
        xOffset: 0,
        yOffset: -1,
      },
      nftPreviewDialogDatum: [
        // nftPreviewData.huskyCompany,
        // nftPreviewData.poiPoi,
        nftPreviewDialogData.poiPoi,
      ],
      nftClaimData: nftClaimData.poiPoi,
      xScroll: 7,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },

    {
      location: "10-12",
      houseNumber: 57,
      infoCardCoordsOffset: {
        xOffset: 0,
        yOffset: -3,
      },
      nftPreviewDialogDatum: [nftPreviewDialogData.poiPoi],
      nftClaimData: nftClaimData.poiPoi,
      xScroll: 7,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },

    {
      location: "7-9",
      // location: "7-9",
      houseNumber: 59,
      infoCardCoordsOffset: {
        xOffset: 3,
        yOffset: 0,
      },
      xScroll: 7,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },

    {
      location: "9-9",
      houseNumber: 58,
      infoCardCoordsOffset: {
        xOffset: 1,
        yOffset: 0,
      },
      xScroll: 7,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },

    {
      location: "7-8",
      houseNumber: 61,
      infoCardCoordsOffset: {
        xOffset: 3,
        yOffset: 1,
      },
      xScroll: 7,
      yScroll: yScrollLevel,
      // yScroll: 9,
      // nftPreviewDialogDatum: [
      //   nftPreviewData.huskyCompany,
      //   nftPreviewData.poiPoi,
      // ],
      // nftClaimData: nftClaimData.huskyCompany,
    },

    {
      location: "9-8",
      houseNumber: 60,
      infoCardCoordsOffset: {
        xOffset: 1,
        yOffset: 1,
      },
      xScroll: 7,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },

    {
      location: "7-7",
      houseNumber: 63,
      infoCardCoordsOffset: {
        xOffset: 3,
        yOffset: -13 + SECONDARY_Y_OFFSET + 4,
        // yOffset: 0,
      },
      xScroll: 7,
      yScroll: yScrollLevel,
      // yScroll: 9,
      // nftPreviewDialogDatum: [
      //   nftPreviewData.huskyCompany,
      //   nftPreviewData.poiPoi,
      // ],
      // nftClaimData: nftClaimData.huskyCompany,
    },

    {
      location: "9-7",
      houseNumber: 62,
      infoCardCoordsOffset: {
        xOffset: 1,
        // yOffset: -5,
        yOffset: -13 + SECONDARY_Y_OFFSET + 4,
        // yOffset: 0,
      },
      xScroll: 7,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },

    {
      location: "7-6",
      houseNumber: 65,
      infoCardCoordsOffset: {
        xOffset: 3,
        // yOffset: 0,
        yOffset: -12 + SECONDARY_Y_OFFSET + 3,
        // yOffset: -4,
      },
      xScroll: 7,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },

    {
      location: "9-6",
      houseNumber: 64,
      infoCardCoordsOffset: {
        xOffset: 1,
        // yOffset: -4,
        yOffset: -12 + SECONDARY_Y_OFFSET + 3,
        // yOffset: 0,
      },
      xScroll: 7,
      yScroll: yScrollLevel,
      // yScroll: 9,
    },

    {
      location: "7-5",
      houseNumber: 67,
      infoCardCoordsOffset: {
        xOffset: 3,
        // yOffset: -3,
        yOffset: -11 + SECONDARY_Y_OFFSET + 2,
      },
      xScroll: 7,
      yScroll: yScrollLevel,
      // yScroll: 9,/
    },

    {
      location: "9-5",
      houseNumber: 66,
      infoCardCoordsOffset: {
        xOffset: 1,
        yOffset: -11 + SECONDARY_Y_OFFSET + 2,
        // yOffset: -3,
      },
      xScroll: 7,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },

    // {
    //   location: "7-4",
    //   houseNumber: 67,
    // },

    {
      location: "9-4",
      houseNumber: 68,
      infoCardCoordsOffset: {
        xOffset: 1,
        yOffset: -10 + SECONDARY_Y_OFFSET + 1,
        // yOffset: -2,
        // yOffset: 0,
      },
      xScroll: 7,
      // yScroll: 9,
      yScroll: yScrollLevel,
    },

    // {
    //   location: "6-2",
    //   houseNumber: 69,
    //   infoCardCoordsOffset: {
    //     xOffset: 1,
    //     yOffset: -7,
    //   },
    //   nftPreviewDialogDatum: [nftPreviewData.poiPoi],
    //   nftClaimData: nftClaimData.poiPoi,
    // },
  ];

  // for (const datum of houseData) {
  //   elementData[datum.location] = {
  //     element: getStandardElement({
  //       backgroundColor: "#4B0082",
  //       squareWidth,
  //       text: String(datum.houseNumber),
  //     }),
  //   };

  // }

  for (const datum of houseData) {
    const landIsSelected =
      selectedLandData.area === areaNames.FLAMINGO_VALLEY &&
      selectedLandData.propertyNumber === datum.houseNumber;

    const thisLandsData = landsData?.[datum.houseNumber]?.data;

    const flamingoHomeData = {
      // backgroundColor: "#4B0082",
      squareWidth,
      propertyNumber: datum.houseNumber,
      setSelectedLandData,
      // doublePseudoElement: ,
      landIsSelected,
      selectedLandData,
      isClaimed: !!thisLandsData,
      isClaimedSelf: !!thisLandsData && typeof thisLandsData === "object",
    };

    /*
  squareWidth,
  propertyNumber,
  setSelectedLandData,
  doublePseudoElement,
  landIsSelected,
  selectedLandData,
    */
    //   {
    //   setSelectedLandData,
    //   squareWidth,
    //   propertyNumber: datum.propertyNumber,
    //   selectedLandData,
    //   landIsSelected,
    // };

    if (landIsSelected) {
      const infoCardCoordsOffset = datum.infoCardCoordsOffset || {
        xOffset: 0,
        yOffset: 0,
      };

      const [x, y] = datum.location.split("-");

      const infoCard = getInfoCard({
        mobileMode,
        propertyName: "House",
        nftClaimData: datum.nftClaimData || nftClaimData.flamingo,
        setSelectedLandData,
        squareWidth,
        propertyNumber: datum.houseNumber,
        coords: {
          x,
          y,
          m,
          n,
        },
        coordsCustomOffset: infoCardCoordsOffset,
        updateDialogMode,
        setNftPreviewDialogData,
        nftPreviewDialogDatum: datum.nftPreviewDialogDatum || [
          nftPreviewDialogData.ultraFlamingo,
          nftPreviewDialogData.flamingo,
          nftPreviewDialogData.pixieJarsRaw,
          nftPreviewDialogData.crypDollsRaw,
          nftPreviewDialogData.dpsGeneral,
          nftPreviewDialogData.poiPoi,
        ],
        xScroll: datum.xScroll,
        yScroll: datum.yScroll + scrollOffset,
      });

      flamingoHomeData.doublePseudoElement = infoCard;
    }

    elementData[datum.location] = {
      element: getFlamingoHome(flamingoHomeData),
    };
  }

  return elementData;
};

export default getFlamingoValleyData;
/*

const getFlamingoHome = ({
  squareWidth,
  propertyNumber,
  setSelectedLandData,
  doublePseudoElement,
  landIsSelected,
  selectedLandData,
}) => {
  return getExpansiveElement({
    pseudoElementClassName: "RealEstate_FlamingoHome",
    backgroundColor: landIsSelected ? selectedLandColor : "black",
    squareWidth,
    xSize: 1,
    ySize: 1,
    text: String(propertyNumber),
    onTouch: () => {
      if (selectedLandData.propertyNumber === propertyNumber) {
        setSelectedLandData({
          propertyNumber: null,
          area: null,
        });
      } else {
        setSelectedLandData({
          propertyNumber,
          area: areaNames.FLAMINGO_VALLEY,
        });
      }
    },
    doublePseudoElement,
  });
};*/

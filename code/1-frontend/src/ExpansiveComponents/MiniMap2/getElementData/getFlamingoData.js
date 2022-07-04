import colorData from "./colorData";
// import getStandardElement from "../getStandardElement";
import getExpansiveElement from "../getExpansiveElement";
import getMountain from "./elements/getMountain";
import getTree from "./elements/getTree";
import getHighSlope from "./elements/getHighSlope";
import getWaterfall from "./elements/getWaterfall";
import getInfoCard from "./elements/getInfoCard";
import {
  CRYPDOLLS_OPENSEA_LINK,
  nftClaimData,
  nftPreviewDialogData,
  // PJS_OPENSEA_LINK,
} from "./nftData";
import { areaNames } from "../../../constants";

const {
  YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
  // ROYAL_GUARD_LANDS_BACKGROUND_COLOR,
  WATER,
} = colorData;

const selectedLandColor = "#21c1d1";

// const DPS_PUPPIES_OPENSEA_LINK =
//   "https://opensea.io/collection/doge-pound-puppies-real";
// const PJS_OPENSEA_LINK = "https://opensea.io/collection/pixiejars";
// const CRYPDOLLS_OPENSEA_LINK =
//   "https://opensea.io/collection/crypdollsofficial";

// const nftClaimData = {
//   crypDolls: {
//     name: "CrypDolls",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/nftitemdoll.jpeg",
//     openSeaLink: CRYPDOLLS_OPENSEA_LINK,
//   },

//   crypDolls2: {
//     name: "CrypDolls",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/solDol.jpeg",
//     openSeaLink: CRYPDOLLS_OPENSEA_LINK,
//   },

//   crypDolls3: {
//     name: "CrypDolls",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/crypDollsTDP.PNG",
//     openSeaLink: CRYPDOLLS_OPENSEA_LINK,
//   },

//   crypDolls4: {
//     name: "CrypDolls",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/crypdolls_nftitemland.jpeg",
//     openSeaLink: CRYPDOLLS_OPENSEA_LINK,
//   },

//   pixieJars: {
//     name: "Pixie Jars",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/PJnftitem.png",
//     openSeaLink: PJS_OPENSEA_LINK,
//   },

//   pixieJars2: {
//     name: "Pixie Jars",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/PJ3.png",
//     openSeaLink: PJS_OPENSEA_LINK,
//   },

//   pixieJars3: {
//     name: "Pixie Jars",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/PJ4.png",
//     openSeaLink: PJS_OPENSEA_LINK,
//   },

//   pixieJars4: {
//     name: "Pixie Jars",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/pixiejars_nftItemland.jpeg",
//     openSeaLink: PJS_OPENSEA_LINK,
//   },

//   dpsPuppies: {
//     name: "DPS Puppy",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/foreverpuppers.png",
//     openSeaLink: DPS_PUPPIES_OPENSEA_LINK,
//   },

//   dpsPuppiesSlime: {
//     name: "DPS Puppy",
//     image:
//       "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slimepuppy.png",
//     openSeaLink: DPS_PUPPIES_OPENSEA_LINK,
//   },
// };

// const nftPreviewDialogData = {
//   dpsPuppies: {
//     name: nftClaimData.dpsPuppies.name,
//     link: nftClaimData.dpsPuppies.openSeaLink,
//     image: nftClaimData.dpsPuppies.image,
//   },

//   dpsPuppiesSlime: {
//     name: nftClaimData.dpsPuppies.name,
//     link: nftClaimData.dpsPuppies.openSeaLink,
//     image: nftClaimData.dpsPuppiesSlime.image,
//   },

//   crypDolls: {
//     name: nftClaimData.crypDolls.name,
//     note: `(or Giga-Rare PoiPoi)`,
//     link: nftClaimData.crypDolls.openSeaLink,
//     image: nftClaimData.crypDolls.image,
//   },

//   crypDolls2: {
//     name: nftClaimData.crypDolls2.name,
//     note: `(or Giga-Rare PoiPoi)`,
//     link: nftClaimData.crypDolls.openSeaLink,
//     image: nftClaimData.crypDolls2.image,
//   },

//   crypDolls3: {
//     name: nftClaimData.crypDolls3.name,
//     note: `(or Giga-Rare PoiPoi)`,
//     link: nftClaimData.crypDolls.openSeaLink,
//     image: nftClaimData.crypDolls3.image,
//   },

//   crypDolls4: {
//     name: nftClaimData.crypDolls4.name,
//     note: `(or Giga-Rare PoiPoi)`,
//     link: nftClaimData.crypDolls.openSeaLink,
//     image: nftClaimData.crypDolls4.image,
//   },

//   pixieJars: {
//     name: nftClaimData.pixieJars.name,
//     note: `(or Hyper/Giga-Rare PoiPoi)`,
//     link: nftClaimData.pixieJars.openSeaLink,
//     image: nftClaimData.pixieJars.image,
//   },

//   pixieJars2: {
//     name: nftClaimData.pixieJars2.name,
//     note: `(or Hyper/Giga-Rare PoiPoi)`,
//     link: nftClaimData.pixieJars2.openSeaLink,
//     image: nftClaimData.pixieJars2.image,
//   },

//   pixieJars3: {
//     name: nftClaimData.pixieJars3.name,
//     note: `(or Hyper/Giga-Rare PoiPoi)`,
//     link: nftClaimData.pixieJars3.openSeaLink,
//     image: nftClaimData.pixieJars3.image,
//   },

//   pixieJars4: {
//     name: nftClaimData.pixieJars4.name,
//     note: `(or Hyper/Giga-Rare PoiPoi)`,
//     link: nftClaimData.pixieJars4.openSeaLink,
//     image: nftClaimData.pixieJars4.image,
//   },
// };

const Y_SCROLL_CONSTANT = 22;

const boutiqueHomeData = [
  {
    coords: { x: 21, y: 10 },
    propertyNumber: 34,
    nftClaimData: nftClaimData.pixieJars,
    nftPreviewDialogDatum: nftPreviewDialogData.pixieJars,
    xScroll: 7,
    yScroll: 3,
  },
  {
    coords: { x: 21, y: 14 },
    propertyNumber: 35,
    nftClaimData: nftClaimData.pixieJars2,
    nftPreviewDialogDatum: nftPreviewDialogData.pixieJars2,
    xScroll: 7,
    yScroll: 3,
  },

  {
    coords: { x: 21, y: 18 },
    propertyNumber: 36,
    nftClaimData: nftClaimData.pixieJars3,
    nftPreviewDialogDatum: nftPreviewDialogData.pixieJars3,
    xScroll: 7,
    yScroll: 3,
  },

  {
    coords: { x: 21, y: 22 },
    propertyNumber: 37,
    nftClaimData: nftClaimData.pixieJars4,
    nftPreviewDialogDatum: nftPreviewDialogData.pixieJars4,
    xScroll: 7,
    yScroll: 3,
  },
];
const largeHomeData = [
  {
    coords: { x: 12, y: 2 },
    propertyNumber: 28,
    nftClaimData: nftClaimData.crypDolls,
    nftPreviewDialogDatum: nftPreviewDialogData.crypDolls,
    xScroll: 3,
    yScroll: 2,
  },
  {
    coords: { x: 7, y: 2 },
    propertyNumber: 29,
    nftClaimData: nftClaimData.crypDolls2,
    nftPreviewDialogDatum: nftPreviewDialogData.crypDolls2,
    xScroll: 3,
    yScroll: 2,
  },

  {
    coords: { x: 2, y: 7 },
    propertyNumber: 30,
    nftClaimData: nftClaimData.crypDolls3,
    nftPreviewDialogDatum: nftPreviewDialogData.crypDolls3,
    xScroll: 2,
    yScroll: 2,
  },

  {
    coords: { x: 2, y: 12 },
    propertyNumber: 31,
    nftClaimData: nftClaimData.crypDolls4,
    nftPreviewDialogDatum: nftPreviewDialogData.crypDolls4,
    xScroll: 2,
    yScroll: 2,
  },

  {
    coords: { x: 2, y: 17 },
    propertyNumber: 32,
    nftClaimData: nftClaimData.dpsPuppies,
    nftPreviewDialogDatum: nftPreviewDialogData.dpsPuppies,
    xScroll: 2,
    yScroll: 2,
  },

  {
    coords: { x: 2, y: 22 },
    propertyNumber: 33,
    nftClaimData: nftClaimData.dpsPuppiesSlime,
    nftPreviewDialogDatum: nftPreviewDialogData.dpsPuppiesSlime,
    xScroll: 2,
    yScroll: 2,
  },
];

const getInfoCardCoordsOffset = ({ propertyNumber }) => {
  switch (propertyNumber) {
    case 28:
      return {
        xOffset: -5,
        yOffset: 3,
      };
    case 29:
      return {
        xOffset: 0,
        yOffset: 3,
      };
    case 30:
      return {
        xOffset: 3,
        yOffset: 0,
      };
    case 31:
      return {
        xOffset: 3,
        yOffset: -5,
      };
    case 32:
      return {
        xOffset: 3,
        yOffset: 5,
      };
    case 33:
      return {
        xOffset: 3,
        yOffset: 0,
      };
    case 34:
      return {
        xOffset: -1,
        yOffset: 0,
      };
    case 35:
      return {
        xOffset: -1,
        yOffset: -4,
      };
    case 36:
      return {
        xOffset: -1,
        yOffset: 7,
      };
    case 37:
      return {
        xOffset: -1,
        yOffset: 3,
      };
    default:
      return {
        xOffset: 0,
        yOffset: 0,
      };
  }
};

const getBoutiqueHome = ({
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
    // backgroundColor = "orange";
    backgroundColor = "teal";
  } else if (isClaimed) {
    backgroundColor = "darkred";
  } else {
    backgroundColor = "black";
  }

  return getExpansiveElement({
    pseudoElementClassName: "RealEstate_LargeHome",
    backgroundColor,
    squareWidth,
    xSize: 2,
    ySize: 2,
    text: String(propertyNumber),
    onTouch: () => {
      if (String(selectedLandData.propertyNumber) === propertyNumber) {
        setSelectedLandData({
          propertyNumber: null,
          area: null,
        });
      } else {
        setSelectedLandData({
          propertyNumber,
          area: areaNames.FLAMINGO_LAND,
        });
      }
    },
    doublePseudoElement,
  });
};

const getLargeHome = ({
  squareWidth,
  propertyNumber,
  setSelectedLandData,
  doublePseudoElement,
  landIsSelected,
  selectedLandData,
  isClaimed,
  isClaimedSelf,
  //[selectedLandData],
}) => {
  let backgroundColor;

  if (landIsSelected) {
    backgroundColor = selectedLandColor;
  } else if (isClaimedSelf) {
    // backgroundColor = "orange";
    backgroundColor = "teal";
  } else if (isClaimed) {
    backgroundColor = "darkred";
  } else {
    backgroundColor = "black";
  }

  return getExpansiveElement({
    pseudoElementClassName: "RealEstate_Mansion",
    onTouch: () => {
      if (selectedLandData.propertyNumber === propertyNumber) {
        setSelectedLandData({
          propertyNumber: null,
          area: null,
        });
      } else {
        setSelectedLandData({
          propertyNumber,
          area: areaNames.FLAMINGO_LAND,
        });
      }
    },
    backgroundColor,
    squareWidth,
    xSize: 3,
    ySize: 3,
    text: String(propertyNumber),
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

const get42Bg = ({ landsData, selectedLandData }) => {
  if (String(selectedLandData?.propertyNumber) === "42") {
    return "rgb(33, 193, 209)";
  } else if (landsData[42]?.data?.address) {
    return "teal";
  } else if (landsData[42]?.data) {
    return "darkred";
  }

  return "black";
};

const getFlamingoData = ({
  mobileMode,
  windowWidth,
  landsData,
  squareWidth,
  animeTime,
  m,
  n,
  selectedLandData,
  setSelectedLandData,
  updateDialogMode,
  setNftPreviewDialogData,
}) => {
  const elementData = {
    "26-3": {
      element: getRoad({ squareWidth, w: 2, h: 1 }),
    },
    "26-4": {
      element: getRoad({ squareWidth, w: 1, h: 5 }),
    },
    "22-8": {
      element: getRoad({ squareWidth, w: 4, h: 1 }),
    },
    "24-9": {
      element: getRoad({ squareWidth, w: 1, h: 19 }),
    },

    "24-28": {
      element: getExpansiveElement({
        squareWidth,
        xSize: 1,
        ySize: 1,
        backgroundColor: "rgb(124, 143, 2)",
      }),
    },

    "7-7": {
      element: getRoad({ squareWidth, red: true, w: 16, h: 1 }),
    },

    "7-8": {
      element: getRoad({ squareWidth, red: true, w: 1, h: 16 }),
    },

    "8-5": {
      element: getRoad({ squareWidth, red: true, w: 1, h: 2 }),
    },

    "13-5": {
      element: getRoad({ squareWidth, red: true, w: 1, h: 2 }),
    },

    "5-8": {
      element: getRoad({ squareWidth, red: true, w: 2, h: 1 }),
    },

    "5-13": {
      element: getRoad({ squareWidth, red: true, w: 2, h: 1 }),
    },

    "5-18": {
      element: getRoad({ squareWidth, red: true, w: 2, h: 1 }),
    },

    "5-23": {
      element: getRoad({ squareWidth, red: true, w: 2, h: 1 }),
    },

    "10-10": {
      element: getExpansiveElement({
        backgroundColor: WATER,
        squareWidth,
        xSize: 8,
        ySize: 7,
      }),
    },
    "10-17": {
      element: getExpansiveElement({
        backgroundColor: WATER,
        squareWidth,
        xSize: 2,
        ySize: 4,
      }),
    },
    "16-17": {
      element: getExpansiveElement({
        backgroundColor: WATER,
        squareWidth,
        xSize: 2,
        ySize: 4,
      }),
    },

    "10-21": {
      element: getExpansiveElement({
        backgroundColor: WATER,
        squareWidth,
        xSize: 8,
        ySize: 7,
      }),
    },

    "12-16": {
      element: getExpansiveElement({
        backgroundColor: "darkgreen",
        squareWidth,
        xSize: 4,
        ySize: 1,
      }),
    },

    "12-17": {
      element: getExpansiveElement({
        pseudoElementClassName: "RealEstate_LargeHome",
        // backgroundColor: landIsSelected ? selectedLandColor : "black",
        backgroundColor: get42Bg({ landsData, selectedLandData }),
        squareWidth,
        xSize: 4,
        ySize: 3,
        text: String(42),
        onTouch: () => {
          if (String(selectedLandData.propertyNumber) === "42") {
            setSelectedLandData({
              propertyNumber: null,
              area: null,
            });
          } else {
            setSelectedLandData({
              propertyNumber: "42",
              area: areaNames.FLAMINGO_LAND,
            });
          }
        },
        doublePseudoElement:
          String(selectedLandData.propertyNumber) === "42" &&
          getInfoCard({
            xScroll: 12,
            yScroll: 5 + Y_SCROLL_CONSTANT,
            mobileMode,
            propertyName: "Paris Hilton Island Mansion",
            propertyNameFontSize: 16,
            nftClaimData: {
              name: "Pixies & Dolls",
              image:
                "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/PJnftitem.png",
              openSeaLink: CRYPDOLLS_OPENSEA_LINK,
            },
            nftPreviewDialogDatum: {
              // name: nftClaimData.pixieJars.name,
              name: "CrypDolls",
              // note:
              //   windowWidth > 700
              //     ? `Requires holding a combined total of 5 pixies and dolls`
              //     : undefined,
              link: nftClaimData.crypDolls.openSeaLink,
              image:
                "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/parishiltonIsland.jpeg",
            },
            setSelectedLandData,
            propertyNumber: String(42),
            squareWidth,
            coords: { x: 12, y: 18, m, n },
            updateDialogMode,
            setNftPreviewDialogData,
            coordsCustomOffset: {
              xOffset: 4,
              yOffset: 3,
            },
          }),
      }),
    },

    "12-20": {
      element: getExpansiveElement({
        backgroundColor: "darkgreen",
        squareWidth,
        xSize: 4,
        ySize: 1,
      }),
    },

    "1-27": {
      element: getMountain({
        squareWidth,
        w: 3,
        h: 1,
      }),
    },

    "0-26": {
      element: getMountain({
        squareWidth,
        w: 2,
        h: 1,
      }),
    },

    "0-25": {
      element: getMountain({
        squareWidth,
        w: 1,
        h: 1,
      }),
    },

    "0-27": {
      element: getTree({
        squareWidth,
        w: 1,
        h: 2,
      }),
    },

    "1-28": {
      element: getMountain({
        squareWidth,
        w: 3,
        h: 1,
      }),
    },

    "4-28": {
      element: getHighSlope({
        squareWidth,
        w: 6,
        h: 1,
      }),
    },

    "10-28": {
      element: getWaterfall({
        squareWidth,
        w: 8,
        h: 1,
        animeTime,
      }),
    },

    "18-28": {
      element: getHighSlope({
        squareWidth,
        w: 6,
        h: 1,
      }),
    },

    "25-28": {
      element: getHighSlope({
        squareWidth,
        w: 3,
        h: 1,
      }),
    },
  };

  for (const datum of boutiqueHomeData) {
    const landIsSelected =
      selectedLandData.area === areaNames.FLAMINGO_LAND &&
      selectedLandData.propertyNumber === datum.propertyNumber;

    const thisLandsData = landsData?.[datum.propertyNumber]?.data;

    const landData = {
      setSelectedLandData,
      squareWidth,
      propertyNumber: datum.propertyNumber,
      landIsSelected,
      selectedLandData,
      isClaimed: !!thisLandsData,
      isClaimedSelf: !!thisLandsData && typeof thisLandsData === "object",
    };

    const infoCardCoordsOffset = getInfoCardCoordsOffset({
      propertyNumber: datum.propertyNumber,
    });

    if (landIsSelected) {
      landData.doublePseudoElement = getInfoCard({
        mobileMode,
        propertyName: "Large Home",
        nftClaimData: datum.nftClaimData,
        nftPreviewDialogDatum: datum.nftPreviewDialogDatum,
        setSelectedLandData,
        propertyNumber: datum.propertyNumber,
        squareWidth,
        coords: { x: datum.coords.x, y: datum.coords.y, m, n },
        updateDialogMode,
        setNftPreviewDialogData,
        coordsCustomOffset: infoCardCoordsOffset,
        xScroll: datum.xScroll,
        yScroll: datum.yScroll + Y_SCROLL_CONSTANT,
      });
    }

    elementData[`${datum.coords.x}-${datum.coords.y}`] = {
      element: getBoutiqueHome(landData),
    };
  }

  for (const datum of largeHomeData) {
    // const doublePseudoElement =

    const landIsSelected =
      selectedLandData.area === areaNames.FLAMINGO_LAND &&
      selectedLandData.propertyNumber === datum.propertyNumber;

    const thisLandsData = landsData?.[datum.propertyNumber]?.data;

    const largeHomeData = {
      setSelectedLandData,
      squareWidth,
      propertyNumber: datum.propertyNumber,
      selectedLandData,
      landIsSelected,
      isClaimed: !!thisLandsData,
      isClaimedSelf: !!thisLandsData && typeof thisLandsData === "object",
    };

    if (landIsSelected) {
      const infoCardCoordsOffset = getInfoCardCoordsOffset({
        propertyNumber: datum.propertyNumber,
      });

      const infoCard = getInfoCard({
        mobileMode,
        propertyName: [32, 33].includes(datum.propertyNumber)
          ? "Rare Mansion"
          : "Mansion",
        nftClaimData: datum.nftClaimData,
        setSelectedLandData,
        squareWidth,
        propertyNumber: datum.propertyNumber,
        coords: {
          x: datum.coords.x,
          y: datum.coords.y,
          m,
          n,
        },
        coordsCustomOffset: infoCardCoordsOffset,
        updateDialogMode,
        setNftPreviewDialogData,
        nftPreviewDialogDatum: datum.nftPreviewDialogDatum,
        xScroll: datum.xScroll,
        yScroll: datum.yScroll + Y_SCROLL_CONSTANT,
      });

      largeHomeData.doublePseudoElement = infoCard;
    }

    // const infoCardsOffset = getInfoCardCoordsOffset({
    //   propertyNumber,
    // });

    elementData[`${datum.coords.x}-${datum.coords.y}`] = {
      element: getLargeHome(largeHomeData),
    };
  }

  return elementData;
};

export default getFlamingoData;

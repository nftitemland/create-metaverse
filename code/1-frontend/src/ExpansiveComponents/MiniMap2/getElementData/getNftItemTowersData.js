// import colorData from "./colorData";
// import { ReactComponent as PixelSun } from "./elementSvgs/SunVector1.svg";
// import { ReactComponent as PixelMoon } from "./elementSvgs/PixelMoon1.svg";
// import { ReactComponent as PixelTree } from "./elementSvgs/PixelTree1.svg";
// import { ReactComponent as HalfPixelTree } from "./elementSvgs/HalfPixelTree2.svg";
// import { ReactComponent as LeftHalfPixelTree } from "./elementSvgs/LeftHalfPixelTree1.svg";
import getStandardElement from "../getStandardElement";
import getExpansiveElement from "../getExpansiveElement";
// import getMountain from "./elements/getMountain";
// import getTree from "./elements/getTree";
// import getHighSlope from "./elements/getHighSlope";
// import getWaterfall from "./elements/getWaterfall";
import getInfoCard from "./elements/getInfoCard";
import {
  nftClaimData,
  nftPreviewDialogData,
  // PJS_OPENSEA_LINK,
} from "./nftData";
import { areaNames } from "../../../constants";
// import getRandomIntInclusive from "../../../utils/getRandomIntInclusive";

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

const Y_SCROLL_CONSTANT = 22;

const getBg = ({ landsData, selectedLandData, propertyNumber }) => {
  if (String(selectedLandData?.propertyNumber) === String(propertyNumber)) {
    return "rgb(33, 193, 209)";
  } else if (landsData[propertyNumber]?.data?.address) {
    return "teal";
  } else if (landsData[propertyNumber]?.data) {
    return "darkred";
  }

  return "black";
};

const getPropertyNumberToNftData = ({ mobileMode }) => {
  const variableCords = mobileMode
    ? {
        y: {
          80: -5,
          81: -4,
          82: -3,
          83: -2,
          84: -1,
          85: 0,
          86: 1,
          95: -4,
          96: -2,
          97: 0,
          // 80: -9,
          // 81: -8,
          // 82: -7,
          // 83: -6,
          // 84: -5,
          // 85: -4,
          // 86: -3,
          // 95: -8,
          // 96: -6,
          // 97: -4,
        },
      }
    : {
        y: {
          80: -5,
          81: -4,
          82: -3,
          83: -2,
          84: -1,
          85: 0,
          86: 1,
          95: -4,
          96: -2,
          97: 0,
        },
      };

  return {
    71: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 1,
      },
    },
    72: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 2,
      },
    },
    73: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 3,
      },
    },
    74: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 4,
      },
    },
    75: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 5,
      },
    },
    76: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 6,
      },
    },
    77: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 7,
      },
    },
    78: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 8,
      },
    },
    79: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 9,
      },
    },
    80: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 10,
        // yOffset: variableCords.y[8],
      },
    },
    81: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        // yOffset: -8,
        yOffset: variableCords.y[81],
      },
    },

    82: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: variableCords.y[82],
      },
    },

    83: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        // yOffset: -6,
        yOffset: variableCords.y[83],
      },
    },
    84: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: variableCords.y[84],
      },
    },
    85: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        // yOffset: -4,
        yOffset: variableCords.y[85],
      },
    },

    86: {
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: variableCords.y[86],
      },
    },

    90: {
      pixieFirst: true,
      cardImage:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ291.png",
      // dialogImage1:
      //   "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ291.png",
      dialogImage2:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/cake.jpeg",
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 1,
      },
    },
    91: {
      pixieFirst: true,
      cardImage:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/pj180.png",
      // dialogImage1:
      //   "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/pj180.png",
      dialogImage2:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/alice.jpeg",
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 3,
      },
    },

    92: {
      cardImage:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/BTCbull.jpeg",
      // dialogImage1:
      //   "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/BTCbull.jpeg",
      dialogImage2:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ4.png",
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 5,
      },
    },

    93: {
      cardImage:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/solDol.jpeg",
      // dialogImage1:
      //   "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/solDol.jpeg",
      dialogImage2:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ3.png",
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 7,
      },
    },
    94: {
      pixieFirst: true,
      cardImage:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ199.png",
      // dialogImage1:
      //   "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ199.png",
      dialogImage2:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/doll43.jpeg",
      coordsSpecialCustomOffset: {
        xOffset: 0,
        yOffset: 9,
      },
    },

    95: {
      pixieFirst: true,
      cardImage:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ200.png",
      // dialogImage1:
      //   "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ200.png",
      dialogImage2:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/doge.jpeg",
      coordsSpecialCustomOffset: {
        xOffset: 0,
        // yOffset: -8,
        yOffset: variableCords.y[95],
      },
    },

    96: {
      // cardImage: getRandomIntInclusive(0, 1)
      //   ? "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/celsius.jpeg"
      //   : "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/binancedoll.jpeg",
      cardImage:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/polygon.jpeg",
      dialogImage2:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ292.png",
      coordsSpecialCustomOffset: {
        xOffset: 0,
        // yOffset: -6,
        yOffset: variableCords.y[96],
      },
    },
    97: {
      cardImage:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/deez.jpeg",
      // dialogImage1:
      //   "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/deez.jpeg",
      dialogImage2:
        "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/pixie278.png",
      coordsSpecialCustomOffset: {
        xOffset: 0,
        // yOffset: -5,
        yOffset: variableCords.y[97],
      },
    },
  };
};

const Tree = ({
  squareWidth,
  right = -1,
  half = false,
  leftHalf = false,
  mainGroundColor,
}) => {
  const treeComponentType = half ? (leftHalf ? "left_" : "right_") : "";

  return getStandardElement({
    squareWidth,
    backgroundColor: mainGroundColor,
    // backgroundColor: "pink",
    pseudoElement: (
      <div
        style={{
          position: "absolute",
          right: squareWidth * right,
          // zIndex: 0,
          userSelect: "none",
        }}
      >
        <TreeImg
          // style={{
          width={squareWidth * 2}
          height={squareWidth * 2}
          type={treeComponentType}
          // height: squareWidth * 2,
          // }}
        />
      </div>
    ),
  });
};

const SunMoonImg = ({ type = "sun", width }) => {
  return (
    <img
      alt={type}
      style={{
        width,
        // height
      }}
      src={`https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/${type}_1.png`}
    ></img>
  );
};

const TreeImg = ({ type = "", height, width }) => {
  return (
    <img
      alt={type}
      style={{
        height,
        userSelect: "none",
        width,
        // height
      }}
      src={`https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/tree_${type}1.png`}
    ></img>
  );
};

const getNftItemTowersData = ({
  mobileMode,
  windowWidth,
  windowHeight,
  landsData,
  squareWidth,
  // animeTime,
  m,
  n,
  selectedLandData,
  setSelectedLandData,
  updateDialogMode,
  setNftPreviewDialogData,
  mainGroundColor,
}) => {
  let SunOrMoon;
  let sunMoonDim;
  let sunMoonLeft;

  if (mainGroundColor === "darkblue") {
    SunOrMoon = ({ width }) => {
      return <SunMoonImg width={width} type="moon" />;
    };
    sunMoonDim = 3 * squareWidth;
    sunMoonLeft = -squareWidth * 2.5;
  } else {
    SunOrMoon = ({ width }) => {
      return <SunMoonImg width={width} type="sun" />;
    };
    // SunOrMoon = PixelSun;
    sunMoonDim = 4 * squareWidth;
    sunMoonLeft = -squareWidth * 3;
  }

  const scrollOffset = (windowHeight > 775 ? -16 : 0) + Y_SCROLL_CONSTANT;

  const elementData = {
    // "1-1": {
    //   element: getRoad({ squareWidth, w: 2, h: 1 }),
    // },
    "0-27": {
      element: getExpansiveElement({
        squareWidth,
        xSize: 28,
        ySize: 3,
        backgroundColor: "green",
      }),
    },

    "26-1": {
      element: getStandardElement({
        squareWidth,
        backgroundColor: mainGroundColor,
        // backgroundColor: "pink",
        pseudoElement: (
          <div
            style={{
              position: "absolute",
              left: sunMoonLeft,
            }}
          >
            <SunOrMoon width={sunMoonDim} height={sunMoonDim} />
          </div>
        ),
      }),
    },

    "0-25": {
      element: (
        <Tree
          squareWidth={squareWidth}
          right={-1}
          mainGroundColor={mainGroundColor}
        />
      ),
    },

    "3-25": {
      element: (
        <Tree
          squareWidth={squareWidth}
          right={-1}
          mainGroundColor={mainGroundColor}
        />
      ),
    },

    "6-25": {
      element: (
        <Tree
          squareWidth={squareWidth}
          right={-1}
          mainGroundColor={mainGroundColor}
        />
      ),
    },

    "9-25": {
      element: (
        <Tree squareWidth={squareWidth} mainGroundColor={mainGroundColor} />
      ),
    },

    "12-25": {
      element: (
        <Tree squareWidth={squareWidth} mainGroundColor={mainGroundColor} />
      ),
    },

    "15-25": {
      element: (
        <Tree squareWidth={squareWidth} mainGroundColor={mainGroundColor} />
      ),
    },
    "18-25": {
      element: (
        <Tree squareWidth={squareWidth} mainGroundColor={mainGroundColor} />
      ),
    },

    // "19-25": {
    //   element: <Tree squareWidth={squareWidth} right={-2} />,
    // },

    "21-25": {
      element: (
        <div
          onClick={() => {
            if (String(selectedLandData.propertyNumber) === "90") {
              setSelectedLandData({
                propertyNumber: null,
                area: null,
              });
            } else {
              setSelectedLandData({
                propertyNumber: "90",
                area: areaNames.PROMO,
              });
            }
          }}
        >
          <Tree
            squareWidth={squareWidth}
            half={true}
            mainGroundColor={mainGroundColor}
          />
        </div>
      ),
    },

    "24-25": {
      element: (
        <Tree squareWidth={squareWidth} mainGroundColor={mainGroundColor} />
      ),
    },

    "27-25": {
      element: (
        <Tree
          squareWidth={squareWidth}
          half
          leftHalf={true}
          mainGroundColor={mainGroundColor}
        />
      ),
    },

    // "25-2": {
    //   element: getExpansiveElement({
    //     squareWidth,
    //     xSize: 1,
    //     ySize: 2,
    //     backgroundColor: "yellow",
    //   }),
    // },

    // "24-4": {
    //   element: getExpansiveElement({
    //     squareWidth,
    //     xSize: 2,
    //     ySize: 1,
    //     backgroundColor: "yellow",
    //   }),
    // },

    // "4-4": {
    //   element: getExpansiveElement({
    //     backgroundColor: WATER,
    //     squareWidth,
    //     xSize: 1,
    //     ySize: 1,
    //   }),
    // },

    "3-8": {
      element: getExpansiveElement({
        pseudoElementClassName: "RealEstate_LargeHome",
        // backgroundColor: landIsSelected ? selectedLandColor : "black",
        backgroundColor: getBg({
          landsData,
          selectedLandData,
          propertyNumber: 87,
        }),
        squareWidth,
        xSize: 5,
        ySize: 2,
        text: String(87),
        onTouch: () => {
          if (String(selectedLandData.propertyNumber) === "87") {
            setSelectedLandData({
              propertyNumber: null,
              area: null,
            });
          } else {
            setSelectedLandData({
              propertyNumber: "87",
              area: areaNames.PROMO,
            });
          }
        },
        doublePseudoElement:
          String(selectedLandData.propertyNumber) === "87" &&
          getInfoCard({
            mobileMode,
            propertyName: "Puppy Penthouse",
            nftClaimData: {
              // name: nftClaimData.flamingo.name,
              name: "DPS Puppy",
              image: nftClaimData.dpsPuppies.image,
              openSeaLink: nftClaimData.dpsPuppies.link,
            },
            nftPreviewDialogDatum: [
              {
                // name: nftPreviewDialogData.dpsPuppies.name,
                name: "DPS Puppy",
                image: nftPreviewDialogData.dpsPuppies.image,
                link: nftPreviewDialogData.dpsPuppies.link,
              },
            ],
            setSelectedLandData,
            propertyNumber: String(87),
            squareWidth,
            coords: { x: 5, y: 4, m, n },
            updateDialogMode,
            setNftPreviewDialogData,
            coordsCustomOffset: {
              xOffset: 5,
              yOffset: -1,
            },
            xScroll: 4,
            yScroll: 47 + scrollOffset,
          }),
      }),
    },

    "3-6": {
      element: getExpansiveElement({
        pseudoElementClassName: "RealEstate_LargeHome",
        // backgroundColor: landIsSelected ? selectedLandColor : "black",
        backgroundColor: getBg({
          landsData,
          selectedLandData,
          propertyNumber: 88,
        }),
        squareWidth,
        xSize: 5,
        ySize: 2,
        text: String(88),
        onTouch: () => {
          if (String(selectedLandData.propertyNumber) === "88") {
            setSelectedLandData({
              propertyNumber: null,
              area: null,
            });
          } else {
            setSelectedLandData({
              propertyNumber: "88",
              area: areaNames.PROMO,
            });
          }
        },
        doublePseudoElement:
          String(selectedLandData.propertyNumber) === "88" &&
          getInfoCard({
            xScroll: 4,
            yScroll: 47 + scrollOffset,
            mobileMode,
            propertyName: "Puppy Penthouse",
            nftClaimData: {
              // name: nftClaimData.flamingo.name,
              name: "DPS Puppy",
              image: nftClaimData.dpsPuppiesSlime.image,
              openSeaLink: nftClaimData.dpsPuppies.link,
            },
            nftPreviewDialogDatum: [
              {
                // name: nftPreviewDialogData.dpsPuppies.name,
                name: "DPS Puppy",
                image: nftPreviewDialogData.dpsPuppiesSlime.image,
                link: nftPreviewDialogData.dpsPuppies.link,
              },
            ],
            setSelectedLandData,
            propertyNumber: String(88),
            squareWidth,
            coords: { x: 5, y: 6, m, n },
            updateDialogMode,
            setNftPreviewDialogData,
            coordsCustomOffset: {
              xOffset: 5,
              yOffset: 0,
            },
          }),
      }),
    },
    "2-4": {
      element: getExpansiveElement({
        pseudoElementClassName: "RealEstate_LargeHome",
        // backgroundColor: landIsSelected ? selectedLandColor : "black",
        backgroundColor: getBg({
          landsData,
          selectedLandData,
          propertyNumber: 89,
        }),
        squareWidth,
        xSize: 7,
        ySize: 2,
        text: String(89),
        onTouch: () => {
          if (String(selectedLandData.propertyNumber) === "89") {
            setSelectedLandData({
              propertyNumber: null,
              area: null,
            });
          } else {
            setSelectedLandData({
              propertyNumber: "89",
              area: areaNames.PROMO,
            });
          }
        },
        doublePseudoElement:
          String(selectedLandData.propertyNumber) === "89" &&
          getInfoCard({
            mobileMode,
            propertyName: "Doge Penthouse",
            nftClaimData: {
              // name: nftClaimData.flamingo.name,
              name: "DPS Doge",
              image:
                "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/dpsdoge9025.png",
              openSeaLink: nftClaimData.dpsPuppies.link,
            },
            nftPreviewDialogDatum: [
              {
                name: "DPS Doge",
                // name: nftPreviewDialogData.dpsPuppies.name,
                image:
                  "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/dpsdoge9025.png",
                link: nftPreviewDialogData.dpsPuppies.link,
              },
            ],
            setSelectedLandData,
            propertyNumber: String(89),
            squareWidth,
            coords: { x: 5, y: 4, m, n },
            updateDialogMode,
            setNftPreviewDialogData,
            coordsCustomOffset: {
              xOffset: 7,
              yOffset: 0,
            },
            xScroll: 4,
            // xScroll: 2,
            yScroll: 43 + scrollOffset,
          }),
      }),
    },
    "20-4": {
      element: getExpansiveElement({
        pseudoElementClassName: "RealEstate_LargeHome",
        // backgroundColor: landIsSelected ? selectedLandColor : "black",
        backgroundColor: getBg({
          landsData,
          selectedLandData,
          propertyNumber: 99,
        }),
        squareWidth,
        xSize: 2,
        ySize: 4,
        text: String(99),
        onTouch: () => {
          if (String(selectedLandData.propertyNumber) === "99") {
            setSelectedLandData({
              propertyNumber: null,
              area: null,
            });
          } else {
            setSelectedLandData({
              propertyNumber: "99",
              area: areaNames.PROMO,
            });
          }
        },
        doublePseudoElement:
          String(selectedLandData.propertyNumber) === "99" &&
          getInfoCard({
            mobileMode,
            propertyName: "Premier Pixie Penthouse",
            nftClaimData: {
              name: "Pixies and Dolls",
              image: nftClaimData.pixieJars.image,
              openSeaLink: nftClaimData.pixieJars.link,
            },
            nftPreviewDialogDatum: [
              {
                name: `Pixies Jars`, //nftPreviewDialogData.pixieJars.name,
                image: nftPreviewDialogData.pixieJars.image,
                link: nftPreviewDialogData.pixieJars.link,
              },
              {
                name: `CrypDolls`,
                image: nftPreviewDialogData.crypDolls.image,
                link: nftPreviewDialogData.crypDolls.link,
              },
            ],
            setSelectedLandData,
            propertyNumber: String(99),
            squareWidth,
            coords: { x: 20, y: 8, m, n },
            updateDialogMode,
            setNftPreviewDialogData,
            coordsCustomOffset: {
              xOffset: -1,
              yOffset: 0,
            },
            xScroll: 6,
            yScroll: 43 + scrollOffset,
          }),
      }),
    },

    "20-8": {
      element: getExpansiveElement({
        pseudoElementClassName: "RealEstate_LargeHome",
        // backgroundColor: landIsSelected ? selectedLandColor : "black",
        backgroundColor: getBg({
          landsData,
          selectedLandData,
          propertyNumber: 98,
        }),
        squareWidth,
        xSize: 2,
        ySize: 3,
        text: String(98),
        onTouch: () => {
          if (String(selectedLandData.propertyNumber) === "98") {
            setSelectedLandData({
              propertyNumber: null,
              area: null,
            });
          } else {
            setSelectedLandData({
              propertyNumber: "98",
              area: areaNames.PROMO,
            });
          }
        },
        doublePseudoElement:
          String(selectedLandData.propertyNumber) === "98" &&
          getInfoCard({
            mobileMode,
            propertyName: "Pixie Penthouse",
            nftClaimData: {
              name: "Pixies and Dolls",
              image:
                "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJNFTItemland.jpeg",
              openSeaLink: nftClaimData.pixieJars.link,
            },
            nftPreviewDialogDatum: [
              {
                name: `Pixie Jars`, //nftPreviewDialogData.pixieJars.name,
                image:
                  "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJNFTItemland.jpeg",
                link: nftPreviewDialogData.pixieJars.link,
              },
              {
                name: `CrypDolls`,
                image:
                  "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/dolls/nftitemland.jpeg",
                link: nftPreviewDialogData.crypDolls.link,
              },
            ],
            setSelectedLandData,
            propertyNumber: String(98),
            squareWidth,
            coords: { x: 20, y: 8, m, n },
            updateDialogMode,
            setNftPreviewDialogData,
            coordsCustomOffset: {
              xOffset: -1,
              yOffset: -3,
            },
            xScroll: 6,
            yScroll: 43 + scrollOffset,
          }),
      }),
    },
  };

  const propertyNumberToNftData = getPropertyNumberToNftData({
    mobileMode,
  });

  const lowI = 5;

  for (let i = lowI; i < lowI + 17; i++) {
    const x = 5;
    const y = i;

    const number = 70 + (i - lowI);

    const stringNumber = String(number);

    const yCoord = 31 - y;

    const nftData = propertyNumberToNftData[stringNumber] || {};

    const coordsSpecialCustomOffset = nftData.coordsSpecialCustomOffset || {
      xOffset: 0,
      yOffset: 0,
    };

    elementData[`5-${yCoord}`] = {
      element: getExpansiveElement({
        pseudoElementClassName: "RealEstate_FlamingoApts",
        // backgroundColor: landIsSelected ? selectedLandColor : "black",
        backgroundColor: getBg({
          landsData,
          selectedLandData,
          propertyNumber: number,
        }),
        squareWidth,
        xSize: 1,
        ySize: 1,
        text: stringNumber,
        onTouch: () => {
          if (String(selectedLandData.propertyNumber) === stringNumber) {
            setSelectedLandData({
              propertyNumber: null,
              area: null,
            });
          } else {
            setSelectedLandData({
              propertyNumber: number,
              area: areaNames.PROMO,
            });
          }
        },
        doublePseudoElement:
          String(selectedLandData.propertyNumber) === stringNumber &&
          getInfoCard({
            mobileMode,
            propertyName: `Flamingo Condo`,
            nftClaimData: {
              name: nftClaimData.flamingo.name,
              image: nftClaimData.flamingo.image,
              openSeaLink: nftClaimData.flamingo.link,
            },
            nftPreviewDialogDatum: [
              nftPreviewDialogData.ultraFlamingo,
              nftPreviewDialogData.flamingo,
            ],
            setSelectedLandData,
            propertyNumber: stringNumber,
            squareWidth,
            coords: { x, y: yCoord, m, n },
            updateDialogMode,
            setNftPreviewDialogData,
            coordsCustomOffset: {
              xOffset: 1 + coordsSpecialCustomOffset.xOffset,
              yOffset: 0 + coordsSpecialCustomOffset.yOffset,
            },
            xScroll: 2,
            yScroll: 50 + scrollOffset,
          }),
      }),
    };
  }

  for (let i = lowI; i < lowI + 8; i++) {
    const x = 20;
    const y = i * 2 - 5;

    const number = 90 + (i - lowI);

    const stringNumber = String(number);

    const yCoord = 30 - y;

    const nftData = propertyNumberToNftData[stringNumber];

    const coordsSpecialCustomOffset = nftData.coordsSpecialCustomOffset || {
      xOffset: 0,
      yOffset: 0,
    };

    elementData[`${x}-${yCoord}`] = {
      element: getExpansiveElement({
        pseudoElementClassName: "RealEstate_FlamingoApts",
        // backgroundColor: landIsSelected ? selectedLandColor : "black",
        backgroundColor: getBg({
          landsData,
          selectedLandData,
          propertyNumber: number,
        }),
        squareWidth,
        xSize: 2,
        ySize: 2,
        text: stringNumber,
        onTouch: () => {
          if (String(selectedLandData.propertyNumber) === stringNumber) {
            setSelectedLandData({
              propertyNumber: null,
              area: null,
            });
          } else {
            setSelectedLandData({
              propertyNumber: number,
              area: areaNames.PROMO,
            });
          }
        },
        doublePseudoElement:
          String(selectedLandData.propertyNumber) === stringNumber &&
          getInfoCard({
            mobileMode,
            propertyName: `Pixie Condo`,
            nftClaimData: {
              // name: nftClaimData.pixieJars.name,
              // name: `Pixie or CrypDoll`,
              name: `Multi-Option`,
              // image: nftClaimData.pixieJars.image,
              image: nftData.cardImage || nftClaimData.pixieJars.image,
              openSeaLink: nftClaimData.pixieJars.link,
            },
            nftPreviewDialogDatum: [
              {
                name: nftData.pixieFirst ? "Pixie Jars" : "CrypDoll",
                image:
                  nftData.cardImage || nftPreviewDialogData.pixieJars.image,
                link: nftPreviewDialogData.pixieJars.link,
              },
              {
                name: nftData.pixieFirst ? "CrypDolls" : `Pixie Jars`,
                image:
                  nftData.dialogImage2 || nftPreviewDialogData.crypDolls.image,
                link: nftPreviewDialogData.crypDolls.link,
              },
              {
                name: `10 Ultra Flamingos`,
                image: nftPreviewDialogData.ultraFlamingo.image,
                link: nftPreviewDialogData.ultraFlamingo.link,
              },
              {
                name: `16 Flamingos`,
                image: nftPreviewDialogData.flamingo.image,
                link: nftPreviewDialogData.flamingo.link,
              },
              {
                name: `Hyper/Giga-Rare PoiPoi`,
                image: nftPreviewDialogData.poiPoi.image,
                link: nftPreviewDialogData.poiPoi.link,
              },
            ],
            setSelectedLandData,
            propertyNumber: stringNumber,
            squareWidth,
            coords: { x, y: yCoord, m, n },
            updateDialogMode,
            setNftPreviewDialogData,
            coordsCustomOffset: {
              xOffset: -1 + coordsSpecialCustomOffset.xOffset,
              yOffset: 0 + coordsSpecialCustomOffset.yOffset,
            },
            xScroll: 6,
            yScroll: 50 + scrollOffset,
          }),
      }),
    };
  }

  return elementData;
};

export default getNftItemTowersData;

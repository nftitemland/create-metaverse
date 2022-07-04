// import colorData from "./colorData";
// import getStandardElement from "../getStandardElement";
import getExpansiveElement from "../getExpansiveElement";
// import HigherRealm from "./elements/HigherRealm";
// import { ReactComponent as HigherRealm } from "./HigherRealm6.svg";
// import getMountain from "./elements/getMountain";
// import getTree from "./elements/getTree";
// import getHighSlope from "./elements/getHighSlope";
// import getWaterfall from "./elements/getWaterfall";
import getInfoCard from "./elements/getInfoCard";
import {
  // CRYPDOLLS_OPENSEA_LINK,
  nftClaimData,
  nftPreviewDialogData,
  // PJS_OPENSEA_LINK,
} from "./nftData";
import { areaNames } from "../../../constants";

// const {
//   YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
//   // ROYAL_GUARD_LANDS_BACKGROUND_COLOR,
//   // WATER,
// } = colorData;

// const getRoad = ({ squareWidth, w, h, red = false }) => {
//   return getExpansiveElement({
//     backgroundColor: red ? "darkred" : YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
//     squareWidth,
//     xSize: w,
//     ySize: h,
//   });
// };

const Door = ({
  squareWidth,
  clickBoxX,
  clickBoxY,
  clickBoxW,
  clickBoxH,
  doorX,
  doorY,
  doorW,
  doorH,
  clickBoxBackground,
  selectedLandData,
  setSelectedLandData,
  propertyNumber,
  mobileMode,
  m,
  n,
  updateDialogMode,
  setNftPreviewDialogData,
  yScrollOffset,
  infoCardXOffset,
  infoCardYOffset,
  infoCardYScroll,
  infoCardXScroll,
  name,
  doorBackgroundColor,
}) => {
  const isSelected =
    selectedLandData.propertyNumber === propertyNumber &&
    selectedLandData.area === areaNames.HIGHER_REALM;

  return (
    <div
      onClick={() => {
        if (isSelected) {
          setSelectedLandData({
            propertyNumber: null,
            area: null,
          });
        } else {
          setSelectedLandData({
            propertyNumber: propertyNumber,
            area: areaNames.HIGHER_REALM,
          });
        }
      }}
      className={"RealEstate_Mansion"}
      style={{
        position: "absolute",
        top: squareWidth * clickBoxY,
        left: squareWidth * clickBoxX,
        width: squareWidth * clickBoxW,
        height: squareWidth * clickBoxH,
        backgroundColor: clickBoxBackground && "blue",
        opacity: clickBoxBackground && 0.5,
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <div
        className={"RealEstate_Mansion"}
        style={{
          position: "relative",
          top: squareWidth * doorY,
          left: squareWidth * doorX,
          width: squareWidth * doorW,
          height: squareWidth * doorH,
          backgroundColor: isSelected
            ? "rgb(33, 193, 209)"
            : doorBackgroundColor || "black",
          // opacity: 0.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <div
            style={{
              // position: "relative",
              // top: squareWidth * 7,
              // left: squareWidth * 5,
              fontFamily: `"Amaranth", sans-serif`,
              textAlign: "center",
              fontSize: 12,
            }}
          >
            {"202"}
          </div> */}
      </div>

      {isSelected && (
        <div>
          {getInfoCard({
            mobileMode,
            propertyName: name,
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
            propertyNumber: String(propertyNumber),
            squareWidth,
            coords: { x: clickBoxX, y: clickBoxX, m, n },
            updateDialogMode,
            setNftPreviewDialogData,
            coordsCustomOffset: {
              xOffset: infoCardXOffset,
              yOffset: infoCardYOffset,
              // xOffset: 10,
              // yOffset: 0,
            },
            xScroll: 6 + infoCardXScroll,
            yScroll: yScrollOffset + infoCardYScroll,
          })}
        </div>
      )}
    </div>
  );
};

const getLargeHome = ({
  squareWidth,
  m,
  n,
  doorData,
  selectedLandData,
  setSelectedLandData,
  mobileMode,
  updateDialogMode,
  setNftPreviewDialogData,
  yScrollOffset,
  // propertyNumber,
  // setSelectedLandData,
  // doublePseudoElement,
  // landIsSelected,
  // selectedLandData,
  // isClaimed,
  // isClaimedSelf,
  //[selectedLandData],
}) => {
  // get selected values

  const doors = [];

  for (const doorDatum of doorData) {
    doors.push(
      <Door
        key={doorDatum.id}
        squareWidth={squareWidth}
        clickBoxX={doorDatum.clickBoxX}
        clickBoxY={doorDatum.clickBoxY}
        clickBoxW={doorDatum.clickBoxW}
        clickBoxH={doorDatum.clickBoxH}
        doorX={doorDatum.doorX}
        doorY={doorDatum.doorY}
        doorW={doorDatum.doorW}
        doorH={doorDatum.doorH}
        clickBoxBackground={doorDatum.clickBoxBackground}
        selectedLandData={selectedLandData}
        setSelectedLandData={setSelectedLandData}
        propertyNumber={doorDatum.propertyNumber}
        mobileMode={mobileMode}
        m={m}
        n={n}
        updateDialogMode={updateDialogMode}
        setNftPreviewDialogData={setNftPreviewDialogData}
        yScrollOffset={yScrollOffset}
        infoCardXOffset={doorDatum.infoCardXOffset}
        infoCardYOffset={doorDatum.infoCardYOffset}
        infoCardYScroll={doorDatum.infoCardYScroll}
        infoCardXScroll={doorDatum.infoCardXScroll}
        name={doorDatum.name}
        doorBackgroundColor={doorDatum.doorBackgroundColor}
      />
    );
  }

  return getExpansiveElement({
    // pseudoElementClassName: "RealEstate_Mansion",
    onTouch: () => {
      // if (selectedLandData.propertyNumber === propertyNumber) {
      //   setSelectedLandData({
      //     propertyNumber: null,
      //     area: null,
      //   });
      // } else {
      //   setSelectedLandData({
      //     propertyNumber,
      //     area: areaNames.FLAMINGO_LAND,
      //   });
      // }
    },
    // backgroundColor,
    squareWidth,
    xSize: m,
    ySize: n,
    // text: String(propertyNumber),
    doublePseudoElement: (
      <div
        style={{
          backgroundColor: "black",
          height: n * squareWidth,
          width: m * squareWidth,
        }}
      >
        <img
          alt="Higher Realm"
          style={{
            userSelect: "none",
            height: n * squareWidth,
            width: m * squareWidth,
          }}
          src={
            "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/higher_realms_1.png"
          }
        ></img>
      </div>
      // <HigherRealm
      //   style={{
      // height: n * squareWidth,
      // width: m * squareWidth,
      //   }}
      // ></HigherRealm>
    ),
    triplePseudoElement: (
      <div
        style={{
          width: m * squareWidth,
          height: n * squareWidth,
          // backgroundColor: "black",
          // opacity: 0.5,
        }}
      >
        {doors}
      </div>
    ),
  });
};

const getHigherRealmData = ({
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
  yScrollOffset = 0,
}) => {
  const doorData = [
    {
      id: "FairytaleCastle",
      clickBoxX: 1,
      clickBoxY: 2,
      clickBoxW: 10,
      clickBoxH: 9,
      // clickBoxBackground: true,
      doorX: 4,
      doorY: 5,
      doorW: 1,
      doorH: 1,
      propertyNumber: 100,
      infoCardXOffset: 6,
      infoCardYOffset: -1,
      infoCardYScroll: -4,
      infoCardXScroll: mobileMode ? -4 : -6,
      name: "Fairytale Castle",
    },
    {
      id: "SugarFarm",
      clickBoxX: 2,
      clickBoxY: 12,
      clickBoxW: 5,
      clickBoxH: 4,
      // clickBoxBackground: true,
      doorX: 3,
      doorY: 3,
      doorW: 1,
      doorH: 1,
      propertyNumber: 101,
      infoCardXOffset: 3,
      infoCardYOffset: -4,
      infoCardYScroll: -4,
      infoCardXScroll: mobileMode ? -4 : -6,
      name: "Sugar Farm",
    },

    {
      id: "SpiceFarm",
      clickBoxX: 8,
      clickBoxY: 12,
      clickBoxW: 5,
      clickBoxH: 4,
      // clickBoxBackground: true,
      doorX: 3,
      doorY: 3,
      doorW: 1,
      doorH: 1,
      propertyNumber: 102,
      infoCardXOffset: 3,
      infoCardYOffset: -4,
      infoCardYScroll: -4,
      infoCardXScroll: mobileMode ? 0 : -6,
      name: "Spice Farm",
    },

    {
      id: "EverythingNiceFarm",
      clickBoxX: 14,
      clickBoxY: 12,
      clickBoxW: 5,
      clickBoxH: 4,
      // clickBoxBackground: true,
      doorX: 3,
      doorY: 3,
      doorW: 1,
      doorH: 1,
      propertyNumber: 103,
      infoCardXOffset: 8,
      infoCardYOffset: 0,
      infoCardYScroll: -4,
      infoCardXScroll: mobileMode ? 1 : -6,
      name: "Everything Nice Farm",
    },

    {
      id: "LuxuryHouse1",
      clickBoxX: 17,
      clickBoxY: 10,
      clickBoxW: 2,
      clickBoxH: 1,
      // clickBoxBackground: true,
      doorBackgroundColor: "unset",
      doorX: 0,
      doorY: 0,
      doorW: 2,
      doorH: 1,
      propertyNumber: 104,
      infoCardXOffset: 4,
      infoCardYOffset: -2,
      infoCardYScroll: -4,
      infoCardXScroll: mobileMode ? 1 : -6,
      name: "Luxury House",
    },

    {
      id: "LuxuryHouse2",
      clickBoxX: 20,
      clickBoxY: 10,
      clickBoxW: 2,
      clickBoxH: 1,
      // clickBoxBackground: true,
      doorBackgroundColor: "unset",
      doorX: 0,
      doorY: 0,
      doorW: 2,
      doorH: 1,
      propertyNumber: 105,
      infoCardXOffset: 1,
      infoCardYOffset: -2,
      infoCardYScroll: -4,
      infoCardXScroll: mobileMode ? 1 : -6,
      name: "Luxury House",
    },
  ];

  const elementData = {
    "0-0": {
      // element: getRoad({ squareWidth, w: 20, h: 10 }),
      element: getLargeHome({
        squareWidth,
        m,
        n,
        doorData,
        selectedLandData,
        setSelectedLandData,
        landsData,
        mobileMode,
        updateDialogMode,
        setNftPreviewDialogData,
        yScrollOffset,
      }),
    },
  };
  return elementData;
};

export default getHigherRealmData;

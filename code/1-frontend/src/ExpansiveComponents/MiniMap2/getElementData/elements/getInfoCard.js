// import getExpansiveElement from "../../getExpansiveElement";
import TitleSection from "../../../TitleSection";
// import { dialogModes } from "../../../../constants";
import React, { useEffect } from "react";
import getPosition from "../../../../utils/getPosition";

const getQuadrant = ({ x, y, m, n }) => {
  let quadrant = "";

  if (y > n / 2) {
    quadrant += "lower-";
  } else {
    quadrant += "upper-";
  }

  if (x > m / 2) {
    quadrant += "right";
  } else {
    quadrant += "left";
  }

  return quadrant;
};

const getOffsetCoords = ({
  quadrant,
  squareWidth,
  cardWidth,
  cardHeight,
  coordsCustomOffset: { xOffset = 0, yOffset = 0 } = {
    xOffset: 0,
    yOffset: 0,
  },
}) => {
  const offsetCoords = {
    top: yOffset * squareWidth,
    left: xOffset * squareWidth,
  };

  switch (quadrant) {
    // return {
    //   top: 0 + coordsCustomOffset.xOffset * squareWidth,
    //   left: 0 + coordsCustomOffset.yOffset * squareWidth,
    // };
    case "upper-right":
      offsetCoords.left += -cardWidth + squareWidth;
      break;
    case "lower-left":
      offsetCoords.top += -cardHeight + squareWidth;
      break;
    case "lower-right":
      offsetCoords.top += -cardHeight + squareWidth;
      offsetCoords.left += -cardWidth + squareWidth;
      break;
    case "upper-left":
    default:
      break;
  }

  return offsetCoords;
};

// const TITLE_HEIGHT = 40;

const InfoCard = ({
  mobileMode,
  cardHeight,
  cardWidth,
  offsetCoords,
  propertyNumber,
  titleHeight,
  setSelectedLandData,
  propertyName,
  propertyNameFontSize,
  landClaimMode,
  squareWidth,
  setNftPreviewDialogData,
  nftPreviewDialogDatum,
  updateDialogMode,
  nftClaimData,
  xScroll,
  yScroll,
}) => {
  useEffect(() => {
    const miniMap2 = document.getElementById("MiniMap2");
    // const mapInfoCard = document.querySelect(".MapInfoCard");

    if (
      miniMap2 &&
      typeof xScroll === "number" &&
      !Number.isNaN(xScroll) &&
      typeof yScroll === "number" &&
      !Number.isNaN(yScroll)
    ) {
      // const boundingRect = miniMap2.getBoundingClientRect();

      const miniMap2Position = getPosition(miniMap2);

      miniMap2.scrollTo({
        behavior: "smooth",
        left: squareWidth * (xScroll - 1),
        // top: squareWidth * (yScroll - 1),
        // top: 222,
      });

      window.scrollTo({
        behavior: "smooth",
        // left: squareWidth * (xScroll - 1),
        // top: squareWidth * (yScroll - 1),
        top: miniMap2Position.y + squareWidth * (yScroll - 1),
      });

      // window.scrollTo({
      //   behavior: "smooth",
      //   top: boundingRect.top,
      // });
    }
  }, [xScroll, yScroll, squareWidth]);

  return (
    <>
      <div
        className={"MapInfoCard"}
        style={{
          position: "absolute",
          // top: squareWidth,
          width: cardWidth,
          height: cardHeight,
          // backgroundColor: "#070b22",
          // opacity: 0.5,
          zIndex: 4,
          ...offsetCoords,
        }}
      >
        <div
          className="DoNotCloseSelectedLandData"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="DoNotCloseSelectedLandData"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <TitleSection
              argClassName={"MapInfoCardTitleSection"}
              titleText={`Land ${propertyNumber}`}
              height={titleHeight}
              width={cardWidth * 0.8}
            />
            <div
              className="DoNotCloseSelectedLandData"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                // width: "20%",
                width: cardWidth * 0.2,
                height: titleHeight,
                backgroundColor: "black",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => {
                // setSelectedLandData({
                //   propertyNumber,
                //   area,
                // });
                setSelectedLandData({
                  propertyNumber: null,
                  area: null,
                });
              }}
            >
              <div
                className="DoNotCloseSelectedLandData"
                style={{
                  textAlign: "center",
                  // fontFamily: `"Amaranth", sans-serif`,
                  // fontFamily: `"Tajawal", sans-serif`,
                  fontFamily: `"Amaranth", sans-serif`,
                  fontSize: 20,
                  color: "white",
                }}
              >
                {"x"}
              </div>
            </div>
          </div>
          <div
            className="DoNotCloseSelectedLandData"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",

              backgroundColor: "#070b22",

              height: cardHeight - titleHeight,
              width: "100%",
            }}
          >
            <div
              className="DoNotCloseSelectedLandData"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",

                // backgroundColor: "green",
                // backgroundColor: "blue",

                // height: "100%",
                // width: bottomSectionWidthLeft,
                width: "100%",
              }}
            >
              <div
                className="DoNotCloseSelectedLandData"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",

                  // height: squareWidth * 2,
                  // width: squareWidth * 6,
                }}
              >
                <div
                  className="DoNotCloseSelectedLandData"
                  style={{
                    width: "100%",
                    // height: "100%",
                    alignSelf: "center",
                    // opacity: 0.6,

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: propertyNameFontSize,
                  }}
                >
                  {propertyName}
                </div>
              </div>
              <div
                style={{
                  width: 50,
                  // height: ,
                }}
              ></div>

              {landClaimMode && (
                <div
                  className="DoNotCloseSelectedLandData"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",

                    // backgroundColor: "green",

                    height: squareWidth * 2,
                    width: squareWidth * 6,
                  }}
                >
                  <div
                    className="DoNotCloseSelectedLandData"
                    style={{
                      width: "100%",
                      // height: "100%",
                      alignSelf: "center",

                      textAlign: "left",
                      // opacity: 0.6,
                      fontSize: 14,

                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {"Claimed as Airdrop"}
                    <br />
                    {"January 15th 2022"}
                  </div>
                </div>
              )}
            </div>
            {/* <div
              className="DoNotCloseSelectedLandData"
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                alignItems: "center",

                // backgroundColor: "pink",

                width: "100%",
                // height: "100%",
                // width: bottomSectionWidthRight,
              }}
            >
              {false && (
                <div
                  className="DoNotCloseSelectedLandData"
                  style={
                    {
                      // display: "flex",
                      // justifyContent: "center",
                      // flexDirection: "row",
                      // alignItems: "center",
                      // backgroundColor: "beige",
                      // borderRadius: 5,
                      // height: "90%",
                      // height: 20,
                      // width: "90%",
                      // width: 20,
                    }
                  }
                >
                  {landClaimMode ? "Requires Holding" : "Claimed With"}
                </div>
              )}
              <div
                className="DoNotCloseSelectedLandData"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",

                  // backgroundColor: "black",

                  borderRadius: 5,

                  // height: "90%",
                  // width: "90%",
                }}
              >
                <img
                  onClick={() => {
                    // if (true) {
                    //   return;
                    // }

                    setNftPreviewDialogData(nftPreviewDialogDatum);

                    updateDialogMode(dialogModes.NFT_PREVIEW);
                  }}
                  className="NoDragElement"
                  alt="required NFT"
                  // src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_3.png"
                  src={nftClaimData.image}
                  style={{
                    borderRadius: 5,
                    userSelect: "none",
                    width: mobileMode ? 180 : 230,
                    height: mobileMode ? 180 : 230,
                  }}
                ></img>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const getInfoCard = ({
  mobileMode,
  propertyName,
  propertyNameFontSize = 19,
  nftClaimData,
  squareWidth,
  coords,
  propertyNumber,
  setSelectedLandData,
  area,
  updateDialogMode,
  setNftPreviewDialogData,
  nftPreviewDialogDatum,
  coordsCustomOffset,
  x,
  y,
  xScroll,
  yScroll,
}) => {
  let cardHeightMultiplier;
  let cardWidthMultiplier;

  // if (mobileMode) {
  //   cardHeightMultiplier = 20;
  //   cardWidthMultiplier = 15;
  // } else {
  cardHeightMultiplier = 5;
  cardWidthMultiplier = 12;
  // }

  const quadrant = getQuadrant(coords);
  const cardHeight = cardHeightMultiplier * squareWidth;
  const cardWidth = cardWidthMultiplier * squareWidth;

  const offsetCoords = getOffsetCoords({
    quadrant,
    squareWidth,
    cardHeight,
    cardWidth,
    coordsCustomOffset,
  });

  // const titleHeight = cardHeight * 0.2;
  const titleHeight = 36;

  // const bottomSectionWidthLeft = cardWidth * 0.6;
  // const bottomSectionWidthRight = cardWidth - bottomSectionWidthLeft;

  // const landClaimMode = false;
  const landClaimMode = false;

  return (
    <InfoCard
      xScroll={xScroll}
      yScroll={yScroll}
      mobileMode={mobileMode}
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      offsetCoords={offsetCoords}
      propertyNumber={propertyNumber}
      titleHeight={titleHeight}
      setSelectedLandData={setSelectedLandData}
      propertyName={propertyName}
      propertyNameFontSize={propertyNameFontSize}
      landClaimMode={landClaimMode}
      squareWidth={squareWidth}
      setNftPreviewDialogData={setNftPreviewDialogData}
      nftPreviewDialogDatum={nftPreviewDialogDatum}
      updateDialogMode={updateDialogMode}
      nftClaimData={nftClaimData}
    />
  );
};

export default getInfoCard;

import React from "react";
// import MiniMap from "../../../ExpansiveComponents/MiniMap";
// import Legend from "../../../ExpansiveComponents/MiniMap/Legend";
// import MetaMaskBox from "./MetaMaskBox";
// import refreshUserData from "../../api/refreshUserData";
// import { getNTokenData } from "../../utils/nToken";
// import updateLand from "./updateLand";
// import CoolButtonSection from "./CoolButtonSection";
// import { dialogModes } from "../../../constants";

// import TitleSection from "../TitleSection";

const landClaimTokenKeys = {
  DPS_PUPPIES: "DPS_PUPPIES",
  DPS_DOGES: "DPS_DOGES",
  CRYPDOLLS: "CRYPDOLLS",
  PIXIEJARS: "PIXIEJARS",
  CUSTOM_PIXIES: "CUSTOM_PIXIES",
  FANTASTIC_FLAMINS: "FANTASTIC_FLAMINS",
  ULTRA_FLAMINS: "ULTRA_FLAMINS",
  // OPENSEA_STORE_1: "OPENSEA_STORE_1",
  GIGA: "GIGA",
  HYPER: "HYPER",
  NORMAL: "NORMAL",
};

const orderedLandClaimTokenKeys = [
  landClaimTokenKeys.GIGA,
  landClaimTokenKeys.HYPER,
  landClaimTokenKeys.NORMAL,
  landClaimTokenKeys.DPS_DOGES,
  landClaimTokenKeys.DPS_PUPPIES,
  landClaimTokenKeys.CRYPDOLLS,
  landClaimTokenKeys.CUSTOM_PIXIES,
  landClaimTokenKeys.PIXIEJARS,
  landClaimTokenKeys.ULTRA_FLAMINS,
  landClaimTokenKeys.FANTASTIC_FLAMINS,
];

const nftTokenData = {
  NFT_ITEM_LAND: {
    name: "NFT Item Land",
  },
  DPS_PUPPIES: {
    name: "DPS Puppies",
  },
  DPS_DOGES: {
    name: "DPS Doges",
  },
  CRYPDOLLS: {
    name: "CrypDolls",
  },
  CUSTOM_PIXIES: {
    name: "Custom Pixie Jars",
  },
  PIXIEJARS: {
    name: "Pixie Jars",
  },
  FANTASTIC_FLAMINS: {
    name: "Fantastic Flamingos",
  },
  ULTRA_FLAMINS: {
    name: "UltraFlamin Flamingos",
  },
  // OPENSEA_STORE_ETH_1: {
  //   name: "OpenSea Store",
  // },
  GIGA: {
    name: "Giga-Rare PoiPois",
  },
  HYPER: {
    name: "Hyper-Rare PoiPois",
  },
  NORMAL: {
    name: "Normal PoiPois",
  },
};

const getLandKeyIfKeyHasAlreadyBeenClaimed = ({
  metaverseLandData,
  landTokenKey,
  tokenId,
}) => {
  for (const landKey in metaverseLandData) {
    const metaverseLandDatum = metaverseLandData[landKey];

    for (const datum of metaverseLandDatum?.data?.tokenData || []) {
      if (
        String(datum.tokenId) === String(tokenId) &&
        datum.tokenType === landTokenKey
      ) {
        return landKey;
      }
    }
  }
  return null;
};

const getTokenDisplayString = ({ tokenId, isLargeTokenIdMode }) => {
  const stringTokenId = String(tokenId);

  if (isLargeTokenIdMode) {
    return `${stringTokenId.substring(0, 4)}...${stringTokenId.substring(
      stringTokenId.length - 4
    )}`;
  }

  return String(tokenId).substring(0, 10);
};

const LandTokenDataDisplay = ({ landData, metaverseLandData = {} }) => {
  const landTokenDataDisplayData = [];

  for (const landTokenKey of orderedLandClaimTokenKeys) {
    // console.log(`

    //     MEGA LOG: ${JSON.stringify(
    //       {
    //         landTokenKey,
    //       },
    //       null,
    //       4
    //     )}

    // `);

    // const metaverseLandDataForToken = metaverseLandData[landTokenKey];

    const landTokenDatum = nftTokenData[landTokenKey];

    const userLandTokenData = landData?.[landTokenKey]?.tokenData || [];

    // userLandTokenData.sort((a, b) => {
    //   if (typeof Number(a.tokenId) === "number" && !Number.isNaN(a.tokenId)) {
    //     return Number(a.tokenId) < Number(b.tokenId);
    //   }

    //   return a.tokenId < b.tokenId;
    // });

    const tokens = userLandTokenData.map((userLandTokenDatum, index) => {
      const landKey = getLandKeyIfKeyHasAlreadyBeenClaimed({
        metaverseLandData,
        landTokenKey,
        tokenId: userLandTokenDatum.tokenId,
      });

      const isLargeTokenIdMode = userLandTokenDatum.tokenId.length > 10;

      return (
        <div
          key={`${landTokenKey}-${userLandTokenDatum.tokenId}-${index}`}
          style={{
            // backgroundColor: "yellow",
            // width: "100%",
            width: "100%",
            // height: 60,
            backgroundColor: landKey ? "#4d536e" : "#C6EBE0",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              marginLeft: 10,
              width: isLargeTokenIdMode ? 170 : 120,
              backgroundColor: landKey ? "#4d536e" : "#C6EBE0",

              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                // width: "100%",
                // width: "100%",
                // height: 40,
                marginTop: 5,
                marginBottom: 5,
                // marginLeft: 14,
                fontFamily: `"Tajawal", sans-serif`,
                // backgroundColor: keyHasAlreadyBeenClaimed ? "#4d536e" : "#C6EBE0",
                color: landKey ? "white" : "black",
                // marginBottom: 5,
              }}
            >
              {getTokenDisplayString({
                tokenId: userLandTokenDatum.tokenId,
                isLargeTokenIdMode,
              })}
            </div>
            {landKey && (
              <div
                style={{
                  // width: "100%",
                  // width: "100%",
                  // height: 40,
                  // marginTop: 5,
                  // marginBottom: 5,
                  // marginLeft: 14,
                  // backgroundColor: keyHasAlreadyBeenClaimed ? "#4d536e" : "#C6EBE0",
                  // marginBottom: 5,
                  // marginLeft: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "teal",
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    marginTop: 3,
                    marginBottom: 1,
                    marginLeft: 4,
                    marginRight: 4,
                    // width: 100,
                    fontFamily: `"Tajawal", sans-serif`,
                    color: landKey ? "white" : "black",
                  }}
                >
                  {`Land ${landKey}`}
                </div>
              </div>
            )}
          </div>
          <div
            key={landTokenKey}
            style={{
              backgroundColor: "darkgrey",
              // width: "100%",
              width: "100%",
              height: 1,
            }}
          />
        </div>
      );
    });

    landTokenDataDisplayData.push(
      <div
        key={`${landTokenKey}`}
        style={{
          // backgroundColor: "yellow",
          // width: "100%",
          width: "100%",
          // height: 60,
          // height: 42,

          // display: "flex",
          backgroundColor: "#212746",
          // marginTop: ,
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            marginTop: 5,
            backgroundColor: "#212746",
            // marginBottom: 1,
            height: 50,
            // marginTop: 2,
            // backgroundColor: "black",
            // height: 32,
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "96%",
              marginTop: 5,
              backgroundColor: "#212746",
              // marginBottom: 1,
              // height: 60,
              // marginLeft: 5,
              marginBottom: 3,
              fontFamily: `"Tajawal", sans-serif`,
              // backgroundColor: "black",
              // height: 32,
              color: "white",
            }}
          >
            {landTokenDatum.name}
          </div>
        </div>
        {tokens}
      </div>
    );
  }

  return landTokenDataDisplayData;
};

export default LandTokenDataDisplay;

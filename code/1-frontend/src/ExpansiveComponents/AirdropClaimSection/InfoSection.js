// import React, { useEffect, useState } from "react";
// import "./LandsPromoSection.css";
// import MiniMap from "../../../ExpansiveComponents/MiniMap";
// import Legend from "../../../ExpansiveComponents/MiniMap/Legend";
// import MetaMaskBox from "./MetaMaskBox";
// import refreshUserData from "../../api/refreshUserData";
// import { getNTokenData } from "../../utils/nToken";
// import updateLand from "./updateLand";
// import CoolButtonSection from "./CoolButtonSection";
// import { dialogModes } from "../../../constants";

// import TitleSection from "../TitleSection";

// const CONTENT_ELEMENT_WIDTH = 300;
// const REDEEM_TIME = 1640448000000; //11am dec 25 2021

// const Spacer = ({ height = 20 }) => {
//   return (
//     <div
//       style={{
//         width: 20,
//         height,
//       }}
//     />
//   );
// };

// const STANDARD_SPACER_HEIGHT = 44;

// const dLandsData = {
//   1: false,
//   2: false,
//   3: false,
//   4: false,
//   5: false,
//   6: false,
//   7: false,
//   8: false,
//   9: false,
//   10: false,
//   11: false,
//   12: false,
//   13: false,
//   14: false,
//   15: false,
//   16: false,
//   17: false,
//   18: false,
//   19: false,
//   20: false,
//   21: false,
//   22: false,
//   23: false,
//   24: false,
//   25: false,
//   26: false,
//   27: false,
// };

// const landClaimData = {
//   landsData: dLandsData,
//   claimedLand: 5,
//   // claimedLand: undefined,
// };

const getInfoSectionData = ({
  userData,
  userDataLandClaim,
  isTrialMode,
  AIRDROP_EDIT_MODE_END_TIME,
}) => {
  if (userDataLandClaim && userDataLandClaim?.airdropEditEndTime) {
    const date = new Date(
      isTrialMode
        ? AIRDROP_EDIT_MODE_END_TIME
        : userDataLandClaim.airdropEditEndTime
    );

    const time = `${date.toLocaleTimeString()}, ${date.toDateString()}`;

    return {
      text: `Airdrop claim edit time ends ${time}.`,
    };
  }

  if (userData) {
    return {
      text: "--",
    };
  }

  return {
    text: "Connect to MetaMask and Login to Claim 3D Metaverse Airdrop",
    onClick: () => {
      const flamingoMinter = document.querySelector(".MidFashionStyleBar");

      if (flamingoMinter) {
        flamingoMinter.scrollIntoView({
          // top: 0,
          behavior: "smooth",
        });
      }
    },
    style: {
      cursor: "pointer",
    },
  };
};

const InfoSection = ({
  userData,
  userDataLandClaim,
  AIRDROP_EDIT_MODE_END_TIME,
  isTrialMode,
}) => {
  const {
    text,
    onClick,
    style = {},
  } = getInfoSectionData({
    userData,
    userDataLandClaim,
    AIRDROP_EDIT_MODE_END_TIME,
    isTrialMode,
  });
  return (
    <div
      style={{
        backgroundColor: "#C6EBE0",
        // width: "100%",
        width: 300,
        // height: 60,

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      onClick={onClick}
    >
      <div
        style={{
          marginTop: 5,
          width: "90%",
          // backgroundColor: "yellow",
          fontFamily: `"Tajawal", sans-serif`,
          textAlign: "left",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default InfoSection;

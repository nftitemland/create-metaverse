import React from "react";
// import { nftKeys } from "../../../../constants";

// import MyProfileManager from "../../MyAccountV2/MyProfileManager";
// import "./CharacterSection.css";
// import TxDisplaySection from "../../ExpansiveComponents/TxDisplaySection";

// import RealPoi from "./RealPoi";
// import BattleSection from "./BattleSection";
// import HeroineSection from "./HeroineSection";
// import PropertyDisplayer from "./PropertyDisplayer";
// import MyAccountV3 from "./MyAccountV3";

function GlobalWithdrawConstantDisplay({ globalWithdrawMultiplier }) {
  // const withdraw

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // width: "100%",
            height: 30,
            textAlign: "left",
            color: "white",
            // backgroundColor: "black",
            fontFamily: `"Amaranth", sans-serif`,
            paddingLeft: 10,
            fontSize: 19,
          }}
        >
          Global Withdraw Constant
        </div>
        <div
          style={{
            // marginTop: 20,
            width: "100%",
            // height: 20,
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              // marginTop: 20,
              width: "50%",
              height: 20,
              marginLeft: 25,
              backgroundColor: "darkblue",
              // fontFamily: `"Amaranth", sans-serif`,
              textAlign: "left",
              color: "white",
              paddingLeft: 10,
              paddingTop: 10,
              fontFamily: `"Tajawal", sans-serif`,
              paddingBottom: 10,
            }}
          >
            {globalWithdrawMultiplier}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalWithdrawConstantDisplay;

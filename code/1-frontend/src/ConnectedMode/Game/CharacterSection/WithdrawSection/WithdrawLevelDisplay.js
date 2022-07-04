import React from "react";
import { nftKeys } from "../../../../constants";

// import MyProfileManager from "../../MyAccountV2/MyProfileManager";
// import "./CharacterSection.css";
// import TxDisplaySection from "../../ExpansiveComponents/TxDisplaySection";

// import RealPoi from "./RealPoi";
// import BattleSection from "./BattleSection";
// import HeroineSection from "./HeroineSection";
// import PropertyDisplayer from "./PropertyDisplayer";
// import MyAccountV3 from "./MyAccountV3";

const nftKeyToNftName = {
  [nftKeys.POIPOI]: "Ether Gurrs",
  [nftKeys.GAME_CHARACTERS]: "Hunnies",
  [nftKeys.ULTRA_FLAMINS]: "Basic Item",
};

const AssetData = ({ withdrawLevelNftDatum }) => {
  return (
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
          // width: "50%",
          paddingRight: 10,
          height: 20,
          marginLeft: 25,
          backgroundColor: "darkblue",
          // fontFamily: `"Amaranth", sans-serif`,
          textAlign: "left",
          color: "white",
          paddingLeft: 10,
          fontFamily: `"Tajawal", sans-serif`,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {`${nftKeyToNftName[withdrawLevelNftDatum.type]}: ${
          withdrawLevelNftDatum.amount
        }x`}
      </div>
    </div>
  );
};

function WithdrawLevelDisplay({
  withdrawLevelNftData,
  maximumWithdrawLevel,
  totalWithdrawLevel,
}) {
  // const withdraw

  const elements = [];

  let counter = 0;

  for (const withdrawLevelNftDatum of withdrawLevelNftData) {
    counter++;
    elements.push(
      <AssetData
        key={`keyA${counter}`}
        withdrawLevelNftDatum={withdrawLevelNftDatum}
      />
    );
  }

  //   const elements = [
  // z  ];

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
          Asset Level Withdraw Data
        </div>
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
          alignItems: "center",
        }}
      >
        {elements}
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
            // width: "50%",
            height: 20,
            marginLeft: 25,
            backgroundColor: "darkblue",
            // fontFamily: `"Amaranth", sans-serif`,
            textAlign: "left",
            color: "white",
            paddingLeft: 10,
            paddingRight: 10,
            fontFamily: `"Tajawal", sans-serif`,
            paddingTop: 13,
            paddingBottom: 10,
          }}
        >
          {`Total Withdraw Level: ${totalWithdrawLevel}x ${
            totalWithdrawLevel >= maximumWithdrawLevel ? "(max)" : ""
          }`}
        </div>
      </div>
    </div>
  );
}

export default WithdrawLevelDisplay;

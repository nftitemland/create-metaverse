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
const allowedInputCharacters = "1234567890.";

function WithdrawAmountInput({ withdrawAmountInput, setWithdrawAmountInput }) {
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
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
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
          {"Pixie Crystal Withdraw Amount"}
          <span
            style={{
              color: "red",
            }}
          >
            *
          </span>
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
          <input
            style={{
              // marginTop: 20,
              width: "50%",
              height: 20,
              marginLeft: 25,
              backgroundColor: "blue",
              // fontFamily: `"Amaranth", sans-serif`,
              textAlign: "left",
              color: "white",
              paddingLeft: 10,
              paddingTop: 15,
              fontFamily: `"Tajawal", sans-serif`,
              paddingBottom: 10,
              border: "none",
              fontSize: 18,
            }}
            onChange={(e) => {
              const newText = e.target.value.trim();

              if (newText === "") {
                return setWithdrawAmountInput("");
              }

              if (newText.length > 20) {
                return;
              }

              if ((newText.match(/\./g) || []).length > 1) {
                return;
              }

              for (const char of newText) {
                if (!allowedInputCharacters.includes(char)) {
                  return;
                }
              }

              setWithdrawAmountInput(newText);
            }}
            value={withdrawAmountInput}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default WithdrawAmountInput;

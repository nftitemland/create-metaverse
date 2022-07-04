import React from "react";
// import { fonts } from "../../../../constants";
import getRoundedNumber from "../../../../../utils/getRoundedNumber";
// import getR
// import MyProfileManager from "../../MyAccountV2/MyProfileManager";
// import "./CharacterSection.css";
// import TxDisplaySection from "../../ExpansiveComponents/TxDisplaySection";
import { ReactComponent as CopyLogo } from "./copylogo2.svg";
// import RealPoi from "./RealPoi";
// import BattleSection from "./BattleSection";
// import HeroineSection from "./HeroineSection";
// import PropertyDisplayer from "./PropertyDisplayer";
// import WithdrawLevelDisplay from "./WithdrawLevelDisplay";
// import GlobalWithdrawConstantDisplay from "./GlobalWithdrawConstantDisplay";
// import WithdrawAmountInput from "./WithdrawAmountInput";
// import TotalWithdrawAmountDisplay from "./TotalWithdrawAmountDisplay";
// import WithdrawAddressInput from "./WithdrawAddressInput";
// import DoWithdrawSection from "./DoWithdrawSection";
// import loadWithdrawLevel from "./loadWithdrawLevel";

// const nftKeyToNftName = {
//   [nftKeys.POIPOI]: "Gurr and PoiPoi",
// };
// const getTotalWithdrawAmount = ({
//   globalWithdrawConstant,
//   totalWithdrawLevel,
//   withdrawAmountInput,
// }) => {
//   const withdrawAmountInputAsNumber = Number(withdrawAmountInput);

//   if (
//     withdrawAmountInputAsNumber &&
//     !Number.isNaN(withdrawAmountInputAsNumber)
//   ) {
//     const totalWithdrawAmount = getRoundedNumber(
//       (totalWithdrawLevel * withdrawAmountInput) / globalWithdrawConstant
//     );

//     return totalWithdrawAmount.toString();
//   }

//   return "";
// };
const DEPOSIT_ADDRESS = "0xD687054205fd603AE14396feC8677E31943eF262";
const allowedInputCharacters = "1234567890.";

const TitleSection = () => {
  return (
    <div
      className="CharacterSection"
      style={{
        width: "100%",
      }}
    >
      <div className="TopSection">
        <div className="LeftPart LoggedIn">
          <div className="TextMeta">
            <div className="Text LoggedIn">{"Deposit $NFTILT"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getPixieCrystalAmount = ({
  depositsAmountInput,
  globalWithdrawConstant,
  maximumWithdrawLevel,
}) => {
  const depositsAmountInputNumber = Number(depositsAmountInput);

  if (Number.isNaN(depositsAmountInputNumber)) {
    return "";
  }

  const pixieCrystalAmount = getRoundedNumber(
    (depositsAmountInputNumber * globalWithdrawConstant) / maximumWithdrawLevel
  );

  return `${pixieCrystalAmount} Pixie Crystals`;
};

function DepositsSection({
  globalWithdrawConstant,
  maximumWithdrawLevel,
  depositsAmountInput,
  setDepositsAmountInput,
  updateStatus,
}) {
  const pixieCrystalAmount = getPixieCrystalAmount({
    depositsAmountInput,
    globalWithdrawConstant,
    maximumWithdrawLevel,
  });

  // const withdraw

  // const totalWithdrawAmount = getTotalWithdrawAmount({
  //   globalWithdrawConstant: withdrawLevelData.globalWithdrawConstant,
  //   totalWithdrawLevel: withdrawLevelData.totalWithdrawLevel,
  //   withdrawAmountInput,
  // });

  return (
    <div
      style={{
        marginTop: 120,
        marginBottom: 50,
        width: 320,
        // height: 200,
        // backgroundColor: "green",
      }}
    >
      <TitleSection />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          // height: 200,
          backgroundColor: "#212746",
          // backgroundColor: "black",
        }}
      >
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            width: "85%",
            textAlign: "center",
            fontFamily: `"Tajawal", sans-serif`,
            color: "white",
            // height: 200,
            // backgroundColor: "#212746",
          }}
        >
          <span style={{ fontFamily: `"Amaranth", sans-serif`, fontSize: 20 }}>
            Deposit NFT Item Land Tokens ($NFTILT) to get Pixie Crystals
          </span>
          {/* <br />
          <br />
          {`Process time: Deposit will appear within 1-5 minutes`} */}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          // height: 200,
          backgroundColor: "#212746",
          // backgroundColor: "black",
        }}
      >
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 22,
            padding: 20,
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
            color: "white",
            // height: 200,
            backgroundColor: "#070b22",
          }}
        >
          {"Deposit Calculator"}
        </div>

        <div
          style={{
            marginTop: 10,
            marginBottom: 5,
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            width: "100%",
            textAlign: "center",
            fontFamily: `"Tajawal", sans-serif`,
            color: "white",
            // height: 200,
            // backgroundColor: "#212746",
          }}
        >
          {"You send:"}
        </div>
        <div
          style={{
            // marginTop: 20,
            // marginBottom: 20,
            marginTop: 6,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            // textAlign: "center",
            // fontFamily: `"Amaranth", sans-serif`,
            // color: "white",
            // height: 200,
            // backgroundColor: "#212746",
          }}
        >
          <input
            style={{
              paddingTop: 20,
              paddingLeft: 20,
              paddingBottom: 20,
              paddingRight: 15,
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              // width: "100%",
              // textAlign: "center",
              fontFamily: `"Tajawal", sans-serif`,
              color: "white",
              backgroundColor: "blue",
              fontSize: 18,
              // height: 200,
              // backgroundColor: "lightgrey",
              textAlign: "right",
              border: "none",
            }}
            value={depositsAmountInput}
            onChange={(e) => {
              const newText = e.target.value.trim();

              if (newText === "") {
                return setDepositsAmountInput("");
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

              setDepositsAmountInput(newText);
            }}
            // value={globalWithdrawConstant}
          ></input>
          <div
            style={{
              paddingTop: 20,
              paddingRight: 20,
              paddingBottom: 20,
              paddingLeft: 12,
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              // width: "100%",
              // textAlign: "center",
              fontFamily: `"Amaranth", sans-serif`,
              color: "white",
              // backgroundColor: "darkblue",
              fontSize: 18,
              // height: 200,
              // backgroundColor: "lightgrey",
              textAlign: "right",
              border: "none",
            }}
          >
            $NFTILT
          </div>
        </div>
        <div
          style={{
            // marginTop: 20,
            // marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            // textAlign: "center",
            // fontFamily: `"Amaranth", sans-serif`,
            // color: "white",
            // height: 200,
            // backgroundColor: "#212746",
          }}
        >
          <div
            style={{
              marginTop: 10,
              marginBottom: 10,
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              width: "80%",
              textAlign: "center",
              fontFamily: `"Tajawal", sans-serif`,
              color: "white",
              wordBreak: "break-word",
              // height: 200,
              // backgroundColor: "#212746",
            }}
          >
            {"to Polygon address:"}
          </div>

          <div
            style={{
              marginTop: 10,
              marginBottom: 5,
              paddingTop: 14,
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              // height: 200,
              width: "86%",
              backgroundColor: "darkblue",
              cursor: "pointer",
            }}
            onClick={() => {
              if (typeof navigator?.clipboard?.writeText === "function") {
                navigator.clipboard.writeText(DEPOSIT_ADDRESS);

                updateStatus("Deposit Address Copied✅", 2);
              }
            }}
          >
            <div>
              <CopyLogo
                style={{
                  width: 25,
                  borderColor: "white",
                }}
              />
            </div>

            <div
              style={{
                // marginTop: 10,
                // marginBottom: 5,
                // paddingTop: 14,
                // paddingBottom: 10,
                // paddingLeft: 10,
                // paddingRight: 10,
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                width: "80%",
                textAlign: "center",
                fontFamily: `"Tajawal", sans-serif`,
                color: "white",
                wordBreak: "break-word",
                // height: 200,
                // backgroundColor: "darkblue",
              }}
            >
              {DEPOSIT_ADDRESS}
            </div>
          </div>

          <div
            style={{
              marginTop: 18,
              marginBottom: 0,
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              width: "80%",
              textAlign: "center",
              fontFamily: `"Tajawal", sans-serif`,
              color: "white",
              wordBreak: "break-word",
              // height: 200,
              // backgroundColor: "#212746",
            }}
          >
            {"then: "}
          </div>
          <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              paddingTop: 20,
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 20,
              minWidth: "82%",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              fontSize: 22,
              // width: 220, .
              textAlign: "center",
              fontFamily: `"Amaranth", sans-serif`,
              color: "white",
              backgroundColor: "darkblue",
              // height: 200,
            }}
          >
            {pixieCrystalAmount}
          </div>

          <div
            style={{
              marginTop: 6,
              marginBottom: 20,
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              width: "75%",
              textAlign: "center",
              fontFamily: `"Tajawal", sans-serif`,
              color: "white",
              // height: 200,
              // backgroundColor: "#212746",
            }}
          >
            {"will be added to your account within a couple minutes."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepositsSection;

import React from "react";

// import getRoundedNumber from "../../../../../utils/getRoundedNumber";
// import { nftKeys } from "../../../../constants";

// import MyProfileManager from "../../MyAccountV2/MyProfileManager";
// import "./CharacterSection.css";
// import TxDisplaySection from "../../ExpansiveComponents/TxDisplaySection";

// import RealPoi from "./RealPoi";
// import BattleSection from "./BattleSection";
// import HeroineSection from "./HeroineSection";
// import PropertyDisplayer from "./PropertyDisplayer";
// import MyAccountV3 from "./MyAccountV3";
import doWithdraw from "./doWithdraw";

function GlobalWithdrawMultiplierDisplay({
  amount,
  withdrawAddress,
  address,
  isLoading,
  setIsLoading,
  updateStatus,
  setWithdrawAmountInput,
}) {
  const buttonDisabled = isLoading || !withdrawAddress || !amount;

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
            marginTop: 25,
            alignSelf: "center",
            width: 175,
            height: 60,
            backgroundColor: buttonDisabled ? "darkblue" : "BLUE",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            cursor: buttonDisabled ? "unset" : "pointer",
          }}
          onClick={async () => {
            if (buttonDisabled) {
              return;
            }

            try {
              setIsLoading(true);

              await doWithdraw({
                amount,
                withdrawAddress,
                address,
              });

              updateStatus("Pixie Crystal withdraw request successful");

              setWithdrawAmountInput("");

              setIsLoading(false);
            } catch (err) {
              console.log("error in withdraw:", err);
              const errorMessage =
                err?.response?.data?.message || err.message || "error";
              updateStatus(errorMessage);
              setIsLoading(false);
            }
          }}
        >
          <div
            style={{
              alignSelf: "center",
              width: "100%",
              textAlign: "center",
              // backgroundColor: "darkblue",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              fontFamily: `"Amaranth", sans-serif`,
              color: "white",
            }}
          >
            Withdraw
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalWithdrawMultiplierDisplay;

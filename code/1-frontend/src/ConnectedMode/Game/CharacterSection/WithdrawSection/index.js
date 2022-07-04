import React, { useState, useEffect } from "react";
// import { nftKeys } from "../../../../constants";
import getRoundedNumber from "../../../../utils/getRoundedNumber";

// import MyProfileManager from "../../MyAccountV2/MyProfileManager";
// import "./CharacterSection.css";
// import TxDisplaySection from "../../ExpansiveComponents/TxDisplaySection";

// import RealPoi from "./RealPoi";
// import BattleSection from "./BattleSection";
// import HeroineSection from "./HeroineSection";
// import PropertyDisplayer from "./PropertyDisplayer";
import WithdrawLevelDisplay from "./WithdrawLevelDisplay";
import GlobalWithdrawConstantDisplay from "./GlobalWithdrawConstantDisplay";
import WithdrawAmountInput from "./WithdrawAmountInput";
import TotalWithdrawAmountDisplay from "./TotalWithdrawAmountDisplay";
import WithdrawAddressInput from "./WithdrawAddressInput";
import DoWithdrawSection from "./DoWithdrawSection";
import loadWithdrawLevel from "./loadWithdrawLevel";
import DepositsSection from "./DepositsSection";
// const nftKeyToNftName = {
//   [nftKeys.POIPOI]: "Gurr and PoiPoi",
// };
const getTotalWithdrawAmount = ({
  globalWithdrawConstant,
  totalWithdrawLevel,
  withdrawAmountInput,
}) => {
  const withdrawAmountInputAsNumber = Number(withdrawAmountInput);

  if (
    withdrawAmountInputAsNumber &&
    !Number.isNaN(withdrawAmountInputAsNumber)
  ) {
    const totalWithdrawAmount = getRoundedNumber(
      (totalWithdrawLevel * withdrawAmountInput) / globalWithdrawConstant
    );

    return totalWithdrawAmount.toString();
  }

  return "";
};

const TitleSection = ({ firstLoadHasFinished }) => {
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
            <div className="Text LoggedIn">
              {firstLoadHasFinished
                ? "Withdraw to MetaMask"
                : "Withdraws and Deposits"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function WithdrawSection({
  isLoading,
  setIsLoading,
  address,
  updateStatus,
  withdrawLevelData,
  setWithdrawLevelData,
}) {
  const [firstLoadHasStarted, setFirstLoadHasStarted] = useState(false);
  const [firstLoadHasFinished, setFirstLoadHasFinished] = useState(false);
  const [loadingErrorMessage, setLoadingErrorMessage] = useState(null);
  // const [withdrawLevelData, setWithdrawLevelData] = useState(null);
  const [noteIsShown, setNoteIsShown] = useState(false);
  const [withdrawAmountInput, setWithdrawAmountInput] = useState("");
  const [withdrawAddressInput, setWithdrawAddressInput] = useState(
    // "0x647B7C8282A238B6C3A190f478Cf1C92ad77c4a7"
    address
  );
  const [depositsAmountInput, setDepositsAmountInput] = useState(
    // "0x647B7C8282A238B6C3A190f478Cf1C92ad77c4a7"
    "1"
  );

  useEffect(() => {
    if (!firstLoadHasStarted) {
      setFirstLoadHasStarted(true);

      if (withdrawLevelData) {
        return;
      }

      new Promise(async (resolve) => {
        try {
          // const withdrawLevelNftData = [
          //   {
          //     type: nftKeys.POIPOI,
          //     amount: 5,
          //   },
          // ];

          // const withdrawLevelDataTemp = {
          //   assetLevelData: withdrawLevelNftData,
          //   totalWithdrawLevel: 5,
          //   globalWithdrawConstant: 2,
          // };
          const loadedWithdrawLevelData = (
            await loadWithdrawLevel({
              address,
            })
          ).data;

          setWithdrawLevelData(loadedWithdrawLevelData);
          setFirstLoadHasFinished(true);
        } catch (err) {
          const errorMessage =
            err?.response?.data?.message || err.message || "error";
          setLoadingErrorMessage(errorMessage);
        }

        resolve();
      });
    }
  }, [firstLoadHasStarted, address, setWithdrawLevelData, withdrawLevelData]);

  if (!withdrawLevelData || loadingErrorMessage) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",

          marginTop: 20,
          marginBottom: 50,
          width: "100%",
          // height: 200,
          // backgroundColor: "#212746",
          backgroundColor: "black",
        }}
      >
        <TitleSection firstLoadHasFinished={firstLoadHasFinished} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            // marginTop: 20,
            // marginBottom: 50,
            width: "100%",
            // height: 200,
            backgroundColor: "#212746",
            // backgroundColor: "black",
          }}
        >
          <div
            style={{
              textAlign: "left",
              color: "white",
              // backgroundColor: "black",
              fontFamily: `"Amaranth", sans-serif`,
              paddingLeft: 10,
              fontSize: 19,
            }}
          >
            {loadingErrorMessage ? loadingErrorMessage : `Loading...`}
          </div>
        </div>
      </div>
    );
  }

  // const withdraw

  const totalWithdrawAmount = getTotalWithdrawAmount({
    globalWithdrawConstant: withdrawLevelData.globalWithdrawConstant,
    totalWithdrawLevel: withdrawLevelData.totalWithdrawLevel,
    withdrawAmountInput,
  });

  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 50,
        width: 320,
        // height: 200,
        // backgroundColor: "green",
      }}
    >
      <TitleSection firstLoadHasFinished={firstLoadHasFinished} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          // height: 200,
          // backgroundColor: "#212746",
          backgroundColor: "black",
        }}
      >
        <WithdrawLevelDisplay
          withdrawLevelNftData={withdrawLevelData.assetLevelData}
          maximumWithdrawLevel={withdrawLevelData.maximumWithdrawLevel}
          totalWithdrawLevel={withdrawLevelData.totalWithdrawLevel}
        />

        <WithdrawAmountInput
          withdrawAmountInput={withdrawAmountInput}
          setWithdrawAmountInput={setWithdrawAmountInput}
        />

        <GlobalWithdrawConstantDisplay
          globalWithdrawMultiplier={withdrawLevelData.globalWithdrawConstant}
        />

        <TotalWithdrawAmountDisplay totalWithdrawAmount={totalWithdrawAmount} />

        <WithdrawAddressInput
          withdrawAddressInput={withdrawAddressInput}
          setWithdrawAddressInput={setWithdrawAddressInput}
        />
        <DoWithdrawSection
          isLoading={isLoading}
          address={address}
          setIsLoading={setIsLoading}
          amount={withdrawAmountInput}
          withdrawAddress={withdrawAddressInput}
          updateStatus={updateStatus}
          setWithdrawAmountInput={setWithdrawAmountInput}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            marginTop: 20,
            // height: 50,
            backgroundColor: "black",
            userSelect: "none",
          }}
          onClick={() => {
            setNoteIsShown(!noteIsShown);
          }}
        >
          <div
            style={{
              fontFamily: `"Tajawal", sans-serif`,
              width: "96%",
              marginTop: 7,
              marginBottom: 7,
              height: 140,
              // backgroundColor: "black",
              color: "white",
            }}
          >
            {noteIsShown ? (
              <>
                Info: 1 withdraw is allowed per 12 hours. Withdraws are sent to
                the requested address ASAP. Transactions failed due to network
                errors will be sent when possible. See "Diary" for withdraw
                progress info.
              </>
            ) : (
              "Info >"
            )}
          </div>
        </div>
        <DepositsSection
          globalWithdrawConstant={withdrawLevelData.globalWithdrawConstant}
          depositsAmountInput={depositsAmountInput}
          setDepositsAmountInput={setDepositsAmountInput}
          maximumWithdrawLevel={withdrawLevelData.maximumWithdrawLevel}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  );
}

export default WithdrawSection;

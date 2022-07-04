import { useState, useEffect } from "react";
import { dialogModes, NULL_ADDRESS } from "../../../../constants";
import connectMetaMask from "../../../../MidFashionStyleBar/ConnectButton/init";
import refreshExistingDiscountCodeData from "./refreshExistingDiscountCodeData";
import setReferralCodeDb from "./setReferralCodeDb";

const getDiscountAppliedText = ({ isMobileMode, existingDiscountCodeData }) => {
  if (existingDiscountCodeData?.referralCode) {
    return `${existingDiscountCodeData.discountPercentage}% Discount Code Applied`;
  }

  if (!existingDiscountCodeData) {
    return "-";
  }

  return isMobileMode ? "No Discount Code" : "No Discount Code Applied";
};

const ReferralSection = ({
  address,
  isMobileMode,
  discountCode,
  setDiscountCode,
  existingDiscountCodeData,
  setExistingDiscountCodeData,
  provider,
  isLoading,
  setIsLoading,

  updateStatus,
  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,
  updateDialogMode,
}) => {
  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         existingDiscountCodeData,
  //       },
  //       null,
  //       4
  //     )}
  //     `);
  /*   MEGA LOG: {
    "existingDiscountCodeData": {
        "poiPassTechnical": "ppt_al3434tpwdbub",
        "referralCode": "e47c5a69-bba5-4611-82cb-c0a8a7d477fd",
        "userId": 
        discountPercentage
        "earningsPercentageData": {
            "name": "Giga Earn",
            "percentage": 80
        }
    }*/
  // `);

  const [hasFirstLoadStartedYet, setHasFirstLoadStartedYet] = useState(false);

  useEffect(() => {
    if (existingDiscountCodeData && !hasFirstLoadStartedYet) {
      setHasFirstLoadStartedYet(true);
      return;
    }

    if (!hasFirstLoadStartedYet && address !== NULL_ADDRESS) {
      setHasFirstLoadStartedYet(true);

      // if (1 + 1 === 2) {
      //   return;
      // }

      new Promise(async (resolve, reject) => {
        await refreshExistingDiscountCodeData({
          setExistingDiscountCodeData,
          address,
        });
        resolve();
      });
    }
  }, [
    hasFirstLoadStartedYet,
    address,
    existingDiscountCodeData,
    setExistingDiscountCodeData,
  ]);

  const isNotConnectedYetMode = !provider || address === NULL_ADDRESS;

  const discountCodeButtonIsDisabled = !discountCode || isLoading;

  const thereIsExistingDiscountCodeData =
    existingDiscountCodeData?.referralCode;

  return (
    <div
      style={{
        marginTop: 35,
        // backgroundColor: "beige",
        // backgroundColor: "beige",
        width: 200,
        // height: 100,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: 35,
          backgroundColor: "darkblue",
          // backgroundColor: "beige",
          width: isMobileMode ? 180 : 200,
          paddingTop: 14,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 8,
          // paddingTop: 9.5,
          // paddingLeft: 10,
          // paddingRight: 10,
          borderRadius: 5,
          // height: 100,

          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "darkblue",
            width: "100%",

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "white",
              fontFamily: `"Amaranth", sans-serif`,
              width: "100%",
              marginBottom: 3,
            }}
          >
            {"Discount Code"}
          </div>

          <button
            style={{
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => {
              updateDialogMode(dialogModes.REFERRAL_INFO);
            }}
          >
            <div
              style={{
                color: "white",
                fontFamily: `"Amaranth", sans-serif`,
                width: 30,
                height: 30,
                fontSize: 22,
                backgroundColor: "black",
                borderRadius: "50%",
                marginBottom: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              {"i"}
            </div>
          </button>
        </div>

        <input
          // type={"number"}
          disabled={isNotConnectedYetMode || isLoading}
          placeholder="abcdefg-hijk-lmno-pqrs-tuvwxyznykyab"
          style={{
            width: "90%",
            // height: 70,
            fontFamily: `"Tajawal", sans-serif`,
            color: "black",
            backgroundColor: "white",

            textAlign: "left",
            fontSize: 18,
            border: "none",
            paddingTop: 14,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 8,
            // paddingTop: 9.5,
            // paddingLeft: 10,
            // paddingRight: 10,
            borderRadius: 5,
          }}
          onInput={(e) => {
            const newText = e.target.value;

            if (newText.length > 300) {
              return;
            }

            setDiscountCode(e.target.value);
          }}
          value={discountCode}
        />
        {isNotConnectedYetMode ? (
          <div
            style={{
              marginTop: 20,
              marginBottom: 5,
              // marginTop: 35,
              // backgroundColor: "beige",
              // backgroundColor: "beige",
              width: "100%",
              // height: 100,

              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <button
              style={{
                width: "90%",
                // height: 30,
                borderRadius: 4,
                paddingTop: 10,
                paddingBottom: 10,
                // backgroundColor: isLoading ? "#2a2c39" : "black",
                backgroundColor: "black",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontFamily: '"Amaranth", sans-serif',
                cursor: "pointer",
              }}
              // disabled={isLoading}
              onClick={() => {
                connectMetaMask({
                  setStatus: updateStatus,
                  setAddress,
                  setIsLoading,
                  setIsConnected,
                  setProvider,
                  setPermaNoMint,
                  setMetaMaskAddress,
                });
              }}
            >
              {"Connect MetaMask to Activate Discount Code"}
            </button>
          </div>
        ) : (
          <div
            style={{
              // marginTop: 35,
              // backgroundColor: "beige",
              // backgroundColor: "beige",
              width: "100%",
              // height: 100,

              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <button
              style={{
                marginTop: 10,
                width: "100%",
                height: 30,
                borderRadius: 10,
                backgroundColor: discountCodeButtonIsDisabled
                  ? "#2a2c39"
                  : "black",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontFamily: '"Amaranth", sans-serif',
                cursor: discountCodeButtonIsDisabled ? "unset" : "pointer",
              }}
              disabled={discountCodeButtonIsDisabled}
              onClick={() => {
                if (discountCodeButtonIsDisabled) {
                  return;
                }

                setReferralCodeDb({
                  discountCode,
                  provider,
                  address,
                  setExistingDiscountCodeData,
                  setIsLoading,
                  updateStatus,
                });
              }}
            >
              {"Activate Discount Code"}
            </button>

            <div
              // type={"number"}
              style={{
                width: "90%",
                // height: 70,
                fontFamily: `"Tajawal", sans-serif`,
                color: "black",
                backgroundColor: thereIsExistingDiscountCodeData
                  ? "lightgreen"
                  : "lightyellow",

                textAlign: "left",
                marginTop: 12,
                fontSize: 16,
                border: "none",
                paddingTop: 14,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 8,
                // paddingTop: 9.5,
                // paddingLeft: 10,
                // paddingRight: 10,
                borderRadius: 5,
              }}
            >
              {getDiscountAppliedText({
                isMobileMode,
                existingDiscountCodeData,
              })}

              <div
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "black",
                }}
              ></div>
              {thereIsExistingDiscountCodeData
                ? existingDiscountCodeData?.referralCode
                : "-"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralSection;

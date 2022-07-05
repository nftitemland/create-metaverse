import React, { useEffect, useState } from "react";
import "./LandsPromoSection.css";
import MiniMap from "../../../ExpansiveComponents/MiniMap";
import Legend from "../../../ExpansiveComponents/MiniMap/Legend";
// import MetaMaskBox from "./MetaMaskBox";
import refreshUserData from "../../../api/refreshUserData";
import { getNTokenData } from "../../../utils/nToken";
import updateLand from "./updateLand";
import CoolButtonSection from "./CoolButtonSection";
// import { dialogModes } from "../../../constants";

import TitleSection from "../../../ExpansiveComponents/TitleSection";

const CONTENT_ELEMENT_WIDTH = 300;
const REDEEM_TIME = 1640448000000; //11am dec 25 2021

const AddressInputSection = ({ polygonAddress, setPolygonAddress }) => {
  return (
    <div
      style={{
        width: CONTENT_ELEMENT_WIDTH,
        // height: 75,
        // backgroundColor: "blue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          //   height: 60,
          backgroundColor: "black",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          // marginLeft: 14,
          // marginBottom: 6,
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: "white",
            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
            marginLeft: 5,
            marginTop: 7,
            marginBottom: 4,
          }}
        >
          {"Polygon (MATIC) Address"}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 75,
          backgroundColor: "yellow",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          onChange={(event) => {
            const newText = event.target.value;

            if (newText.length > 500) {
              return;
            }

            setPolygonAddress(newText);
          }}
          style={{
            width: "90%",
            height: 60,
            backgroundColor: "unset",
            borderStyle: "unset",

            // color: "white",
            textAlign: "left",
            // fontFamily: `"Amaranth", sans-serif`,
            fontFamily: `"Tajawal", sans-serif`,
            fontSize: 16,
            color: "black",
          }}
          value={polygonAddress}
        />
      </div>
    </div>
  );
};

const HomeSelectSection = ({ land, setLand }) => {
  return (
    <div
      style={{
        width: CONTENT_ELEMENT_WIDTH,
        // height: 75,
        // backgroundColor: "blue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          //   height: 60,
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          // marginLeft: 14,
          // marginBottom: 6,
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: "white",
            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
            marginLeft: 5,
            marginTop: 7,
            marginBottom: 4,
          }}
        >
          {"Land Selector"}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 75,
          backgroundColor: "yellow",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          onChange={(event) => {
            const lands = event.target.value;

            if (lands.length > 2) {
              return;
            }

            for (const char in lands) {
              if (
                !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                  char
                )
              ) {
                return;
              }
            }

            setLand(lands);
          }}
          placeholder={"2-26"}
          className="NumberInput"
          // type="number"
          style={{
            width: "90%",
            // height: 60,
            backgroundColor: "unset",
            borderStyle: "unset",

            // color: "white",
            textAlign: "left",
            // fontFamily: `"Amaranth", sans-serif`,
            fontFamily: `"Tajawal", sans-serif`,
            fontSize: 20,
            color: "black",
          }}
          value={land || ""}
        />
      </div>
    </div>
  );
};

const Spacer = ({ height = 20 }) => {
  return (
    <div
      style={{
        width: 20,
        height,
      }}
    />
  );
};

const STANDARD_SPACER_HEIGHT = 44;

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

const LandPromoSection = ({
  updateDialogMode,
  address,
  userDataLandClaim = {},
  setUserDataLandClaim,
  isLoading,
  setIsLoading,
  updateStatus,
}) => {
  const [polygonAddress, setPolygonAddress] = useState("");
  const [land, setLand] = useState(undefined);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [secondaryCounter, setSecondaryCounter] = useState(0);
  const [firstLoad, setFirstLoad] = useState(false);
  const [legendIsVisible, setLegendIsVisible] = useState(false);

  useEffect(() => {
    if (!firstLoad) {
      // console.log("XXXX");

      const nTokenData = getNTokenData();

      refreshUserData({
        address,
        nToken: nTokenData.nToken,
        setUserData: setUserDataLandClaim,
        landClaimMode: true,
      });
    }
    setFirstLoad(true);
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());

      const newSecondaryCounter = secondaryCounter + 1;

      if (newSecondaryCounter % 4 === 0) {
        new Promise(async (resolve) => {
          const nTokenData = getNTokenData();

          await refreshUserData({
            address,
            nToken: nTokenData.nToken,
            setUserData: setUserDataLandClaim,
            landClaimMode: true,
          });
          resolve();
        });
      }

      setSecondaryCounter(newSecondaryCounter);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTime, secondaryCounter, setUserDataLandClaim, address, firstLoad]);

  const userSelectedLand = userDataLandClaim?.claimedLand;

  const timeUntilRedeem = Math.round((REDEEM_TIME - currentTime) / 1000);

  const thereIsStillTimeUntilRedeem = timeUntilRedeem > 0;

  const selectLandIsDisabled = isLoading || !land || !polygonAddress;

  return (
    <div className="LandsPromoSection">
      <TitleSection titleText="Lands Promo" />
      <Spacer height={25} />
      {
        <div
          style={{
            width: 300,
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              // width: 300,
              marginLeft: 10,
              marginTop: 9,
              marginBottom: 5,
              // backgroundColor: "black",
              fontFamily: `"Tajawal", sans-serif`,
              color: "white",
              fontSize: 14,
            }}
          >
            {"Promo Ends January 3rd 2022 at 11:59pm EST"}
          </div>
        </div>
      }
      <Spacer height={25} />
      <div
        style={{
          width: "100%",
          // height: 600,
          // backgroundColor: "green",
          backgroundColor: "#070b22",
          // backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <AddressInputSection
          polygonAddress={polygonAddress}
          setPolygonAddress={setPolygonAddress}
        />
        <Spacer height={STANDARD_SPACER_HEIGHT} />

        <HomeSelectSection land={land} setLand={setLand} />
        <Spacer height={STANDARD_SPACER_HEIGHT} />
        <>
          <MiniMap userLandsData={userDataLandClaim?.landsData || {}} />
          {legendIsVisible && (
            <>
              <div
                style={{
                  width: 10,
                  height: 8,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: "#178f29",
                  width: 300,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 6,
                  }}
                />
                <Legend />
                <div
                  style={{
                    width: 10,
                    height: 6,
                  }}
                />
              </div>

              <div
                style={{
                  width: 10,
                  height: 8,
                }}
              />
            </>
          )}
          <CoolButtonSection
            label={legendIsVisible ? "Hide Legend" : "View Legend"}
            disabled={isLoading}
            onClick={() => {
              // updateDialogMode(dialogModes.LANDS_PREVIEW);
              setLegendIsVisible(!legendIsVisible);
            }}
          />
        </>
        <Spacer height={STANDARD_SPACER_HEIGHT} />
        {thereIsStillTimeUntilRedeem ? (
          <div
            style={{
              backgroundColor: "yellow",
              // width: "100%",
              width: 300,
              height: 60,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "90%",
                backgroundColor: "yellow",
                fontFamily: `"Tajawal", sans-serif`,
                textAlign: "left",
              }}
            >
              {`Time until redeem: ${timeUntilRedeem}`}
            </div>
          </div>
        ) : (
          <CoolButtonSection
            label={"Select Land"}
            disabled={selectLandIsDisabled}
            onClick={async () => {
              try {
                setIsLoading(true);

                await updateLand({
                  address,
                  land,
                  setUserData: setUserDataLandClaim,
                  polygonAddress,
                });
                setIsLoading(false);
                // update(dialogModes.LANDS_PREVIEW);
              } catch (err) {
                setIsLoading(false);
                console.log("set lands error occurred:", err);

                const errorMessage =
                  err?.response?.data?.message || err.message || "error";

                updateStatus(errorMessage);
              }
            }}
          />
        )}
        <Spacer height={STANDARD_SPACER_HEIGHT} />
        <div
          style={{
            backgroundColor: "yellow",
            // width: "100%",
            width: 300,
            // height: 60,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
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
            {userSelectedLand
              ? `Redeemed land ${userSelectedLand}, land will be sent within a few days. There will be NFT land utility in January 2022. Happy New Year!🥳🎉🎊`
              : "No land redeemed."}
          </div>
          <div
            style={{
              marginBottom: 5,
              width: "90%",
              backgroundColor: "yellow",
              fontFamily: `"Tajawal", sans-serif`,
              textAlign: "left",
            }}
          >
            {userDataLandClaim?.claimEndTime
              ? `Claim end time: ${new Date(
                  userDataLandClaim.claimEndTime
                ).toLocaleString()}`
              : ""}
          </div>
          <div
            style={{
              marginBottom: 5,
              width: "90%",
              backgroundColor: "yellow",
              fontFamily: `"Tajawal", sans-serif`,
              textAlign: "left",
              wordBreak: "break-all",
            }}
          >
            {userDataLandClaim?.claimPolygonAddress
              ? `Claim Polygon Address: ${userDataLandClaim.claimPolygonAddress}.`
              : ""}
          </div>
        </div>
        <Spacer height={STANDARD_SPACER_HEIGHT} />
      </div>
    </div>
  );
};

export default LandPromoSection;

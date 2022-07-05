import React, { useEffect, useState } from "react";
import "./FlamingoLand.css";
// import MiniMap from "../../../ExpansiveComponents/MiniMap";
// import MetaMaskBox from "./MetaMaskBox";
import refreshUserData from "../../../api/refreshUserData";
import { getNTokenData } from "../../../utils/nToken";
import updateLand from "./updateLand";
import CoolButtonSection from "./CoolButtonSection";
import AddressInputSection from "./AddressInputSection";
import HomeSelectSection from "./HomeSelectSection";
import { dialogModes } from "../../../constants";

import TitleSection from "../../../ExpansiveComponents/TitleSection";

// const CONTENT_ELEMENT_WIDTH = 300;
const REDEEM_TIME = 1640448000000; //11am dec 25 2021

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

const FlamingoLand = ({
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
          // const nTokenData = getNTokenData();

          console.log("SIMULATION REFRESH");

          // await refreshUserData({
          //   address,
          //   nToken: nTokenData.nToken,
          //   setUserData: setUserDataLandClaim,
          //   landClaimMode: true,
          // });
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
    <div className="FlamingoLand">
      <TitleSection titleText="Flamingo Lands" />
      <Spacer height={25} />
      <div
        style={{
          width: "100%",
          // height: 600,
          // backgroundColor: "green",
          backgroundColor: "black",
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
          {/* <MiniMap userLandsData={userDataLandClaim?.landsData || {}} /> */}
          <CoolButtonSection
            label={"View Map"}
            disabled={isLoading}
            onClick={() => {
              updateDialogMode(dialogModes.LANDS_PREVIEW);
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

/*
    what's required:
      1. polygon address input
      2. land selection input
      3. live minimap 
      4. select button
      5. info
      6. cancel button/sent message      
*/

export default FlamingoLand;

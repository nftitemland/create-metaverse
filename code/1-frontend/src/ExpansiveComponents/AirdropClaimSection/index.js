import React, { useEffect, useState } from "react";
import "./LandsPromoSection.css";
// import MiniMap from "../../../ExpansiveComponents/MiniMap";
// import Legend from "../../../ExpansiveComponents/MiniMap/Legend";
// import MetaMaskBox from "./MetaMaskBox";
import refreshUserData from "../../api/refreshUserData";
import { getNTokenData } from "../../utils/nToken";
import updateLand from "./updateLand";
import CoolButtonSection from "./CoolButtonSection";
// import InfoSection from "./InfoSection";
import LandTokenDisplay from "./LandTokenDisplay";
// import { dialogModes } from "../../../constants";

import TitleSection from "../TitleSection";

const CONTENT_ELEMENT_WIDTH = 300;
// const REDEEM_TIME = 1640448000000; //11am dec 25 2021

const AIRDROP_TIME = 1642224600000;
const AIRDROP_TIME_EARLY_ACCESS = 1642172400000;
const AIRDROP_TIME_DATE = new Date(AIRDROP_TIME);
const AIRDROP_TIME_DATE_EARLY_ACCESS = new Date(AIRDROP_TIME_EARLY_ACCESS);

const AddressInputSection = ({
  polygonAddress,
  setPolygonAddress,
  isLoading,
  userData,
}) => {
  const disabled = !userData || isLoading;

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
          // backgroundColor: "rgb(7, 11, 34)",

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
          backgroundColor: "#C6EBE0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          disabled={disabled}
          placeholder="0xa2ca536B9FAcDf345344601e13b6178387CE9043"
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

const HomeSelectSection = ({ land, setLand, isLoading, userData }) => {
  const disabled = !userData || isLoading;
  return (
    <div
      style={{
        width: CONTENT_ELEMENT_WIDTH,
        // height: 75,
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
          // backgroundColor: "black",
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
          backgroundColor: "#C6EBE0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          disabled={disabled}
          onChange={(event) => {
            const lands = event.target.value;

            if (lands.length > 3) {
              return;
            }

            for (const char of lands) {
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
          placeholder={"28-69"}
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

const AIRDROP_EDIT_MODE_END_TIME = 1642168800000;

const AirdropClaimSection = ({
  // updateDialogMode,
  userData,
  address,
  userDataLandClaim = {},
  setUserDataLandClaim,
  isLoading,
  setIsLoading,
  updateStatus,
  windowWidth,
}) => {
  const [polygonAddress, setPolygonAddress] = useState(address || "");
  const [land, setLand] = useState(undefined);
  const [firstLoad, setFirstLoad] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [firstLoadError, setFirstLoadError] = useState(false);
  useEffect(() => {
    if (userData && !firstLoad) {
      setFirstLoad(true);
      // console.log("XXXX");
      const nTokenData = getNTokenData();

      new Promise(async (resolve) => {
        try {
          setIsFirstLoading(true);
          await refreshUserData({
            address,
            nToken: nTokenData?.nToken,
            setUserData: setUserDataLandClaim,
            landClaimMode: true,
            // argon: true,
          });
          setIsFirstLoading(false);
        } catch (err) {
          setFirstLoadError(true);
          // setIsFirstLoading(false);

          console.log("error in loading user land data:", err);
        }

        resolve();
      });
    }
  }, [setUserDataLandClaim, address, firstLoad, userData]);

  const timeUntilRedeem = 0;
  const thereIsStillTimeUntilRedeem = false;
  const selectLandIsDisabled = isLoading || !land || !polygonAddress;

  const isTrialMode = Date.now() < AIRDROP_EDIT_MODE_END_TIME;

  return (
    <div className="LandsPromoSectionZ">
      <TitleSection
        titleText={isTrialMode ? "Airdrop Claim • Trial Mode" : "Airdrop Claim"}
      />
      <Spacer height={25} />
      <AddressInputSection
        polygonAddress={polygonAddress}
        setPolygonAddress={setPolygonAddress}
        isLoading={isLoading}
        userData={userData}
      />
      <Spacer height={STANDARD_SPACER_HEIGHT} />
      <HomeSelectSection
        land={land}
        setLand={setLand}
        userData={userData}
        isLoading={isLoading}
      />
      <Spacer height={STANDARD_SPACER_HEIGHT} />
      {userData ? (
        thereIsStillTimeUntilRedeem ? (
          <div
            style={{
              backgroundColor: "#C6EBE0",
              width: "100%",
              // width: 300,
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
                backgroundColor: "#C6EBE0",
                fontFamily: `"Tajawal", sans-serif`,
                textAlign: "left",
              }}
            >
              {`Time until redeem: ${timeUntilRedeem}`}
            </div>
          </div>
        ) : (
          <CoolButtonSection
            label={"Select or Unselect Land "}
            disabled={selectLandIsDisabled}
            onClick={async () => {
              try {
                setIsLoading(true);

                await updateLand({
                  address,
                  land,
                  setUserData: setUserDataLandClaim,
                  polygonAddress,
                  updateStatus,
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
        )
      ) : (
        <></>
      )}
      <>
        <Spacer height={STANDARD_SPACER_HEIGHT} />
      </>

      <div
        style={{
          width: "100%",
          backgroundColor: "#070b22",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {userData && (
          <LandTokenDisplay
            isFirstLoading={isFirstLoading}
            userDataLandClaim={userDataLandClaim}
            firstLoadError={firstLoadError}
          />
        )}
        <Spacer height={STANDARD_SPACER_HEIGHT} />

        <div
          style={{
            width: "100%",
            // backgroundColor: "pink",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontFamily: `"Tajawal", sans-serif`,
              color: "white",
              fontSize: 16,
            }}
          >
            {isTrialMode ? "Pre-Airdrop Trial Mode" : "Airdrop"}
          </div>
        </div>

        <div
          style={{
            width: "93%",
            fontFamily: `"Tajawal", sans-serif`,
            textAlign: "left",
            color: "white",
            fontSize: 16,
            marginTop: 10,
          }}
        >
          {`Update Sunday January 16th: All lands have been claimed! Thank you to all that participated. You have until Monday January 17th at 10am EST to edit your choices. Claimed lands will be distributed by Tuesday. There will be another upcoming land claim early February.`}
        </div>

        <div
          style={{
            fontFamily: `"Tajawal", sans-serif`,
            textAlign: "center",
            color: "white",
            fontSize: 16,
            marginTop: 10,
          }}
        >
          {`-`}
        </div>
        {
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "93%",
                textAlign: "left",
                fontFamily: `"Tajawal", sans-serif`,
                color: "white",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              {`The airdrop for NFT metaverse lands starts at ${AIRDROP_TIME_DATE.toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              )} on ${AIRDROP_TIME_DATE.toDateString()}. The early access airdrop for PoiPoi, Doge Pound Studios, CrypDoll, and Pixie Jar holders starts at ${AIRDROP_TIME_DATE_EARLY_ACCESS.toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              )} on ${AIRDROP_TIME_DATE_EARLY_ACCESS.toDateString()}.`}
            </div>
            <div
              style={{
                fontFamily: `"Tajawal", sans-serif`,
                textAlign: "center",
                color: "white",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              {`-`}
            </div>
            <div
              style={{
                width: "93%",
                fontFamily: `"Tajawal", sans-serif`,
                textAlign: "left",
                color: "white",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              {`The airdrop will be with zero gas and fees. You will have up to three days to edit your airdrop claims after your first claim. Lands will be distributed to the requested Polygon wallets within a few days after. The 3D NFT Item metaverse is upcoming. The NFT lands claimed here will be in a 3D interactive world.`}
            </div>
          </div>
        }
        <Spacer height={25} />
      </div>
    </div>
  );
};

export default AirdropClaimSection;

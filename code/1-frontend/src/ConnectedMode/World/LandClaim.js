import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { getNTokenData } from "../../utils/nToken";
import refreshUserData from "../../api/refreshUserData";

// import Messages from "../Messages";
// import "./World.css";
// import { ReactComponent as MiniPoi } from "./MiniPoi.svg";

const REQUIRED_PIXIE_CRYSTAL_AMOUNT = 175;

const LandClaim = ({
  address,
  userData,
  isLoading,
  setIsLoading,
  updateStatus,
  setUserData,
}) => {
  //   const buttonIsDisabled = isLoading || userData.artPoints <= 0;

  const hasRequestedLandClaim = userData.landClaimLevel >= 1;
  // const buttonIsDisabled =
  //   isLoading ||
  //   (userData.artPoints < REQUIRED_PIXIE_CRYSTAL_AMOUNT ||
  //   userData.crypDollCount < REQUIRED_PIXIE_CRYSTAL_AMOUNT ||
  //   hasRequestedLandClaim;

  let buttonIsDisabled = false;
  let disabledReason = null;

  if (userData.artPoints < REQUIRED_PIXIE_CRYSTAL_AMOUNT) {
    buttonIsDisabled = true;
    disabledReason = "Require more Pixie Crystals🧚‍♀️";
  }

  if (
    userData.poiPoiCount > 0 ||
    userData.ultraFlaminCount > 0 ||
    userData.landsCount > 0
  ) {
    buttonIsDisabled = false;
    disabledReason = null;
  }

  if (isLoading) {
    buttonIsDisabled = true;
    disabledReason = null;
  }

  if (hasRequestedLandClaim) {
    buttonIsDisabled = true;
    disabledReason = null;
  }

  return (
    <div>
      <div
        style={{
          width: 320,
          height: 40,
          // backgroundColor: "rgb(53, 58, 83)",
          backgroundColor: "#070b22",
          // marginTop: 55,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              // width: "100%",
              textAlign: "left",
              marginLeft: 10,
              fontFamily: `"Amaranth", sans-serif`,
              color: "white",
            }}
          >
            {"Land Claim"}
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            width: 320,
            // height: 320,
            backgroundColor: "black",

            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              // height: 200,
              backgroundColor: "rgb(33, 39, 70)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "98%",
                marginTop: 12,
                // marginBottom: 10,
                // height: 180,
                backgroundColor: hasRequestedLandClaim ? "green" : "black",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="Sample Land Concept"
                style={{
                  marginTop: 10,
                  marginBottom: 10,

                  width: "96%",
                }}
                src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/NFTItemLandSampleHome1.png"
              />
            </div>
            <div
              style={{
                width: "98%",
                marginTop: 10,
                marginBottom: 10,
                // height: 180,
                backgroundColor: "black",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "95%",
                  marginTop: 10,
                  marginBottom: 10,

                  fontFamily: `"Tajawal", sans-serif`,
                  color: "white",
                  // height: 180,
                }}
              >
                {`Press the "Claim Land" button below by February 18th to ` +
                  "get a land airdrop. "}
                {
                  <>
                    <br />
                    <br />
                  </>
                }
                {`Having at least ${REQUIRED_PIXIE_CRYSTAL_AMOUNT} `}
                Pixie Crystals is required to claim land. Pixie Crystals are
                generated by staking your NFTs. Additionally, land can be
                claimed if your account has generated at least 1 staking reward
                from an NFT Item Land, Ultra Flamingo, Poi, PoiPoi, or Gurr NFT.
                {
                  <>
                    <br />
                    <br />
                  </>
                }
                Your NFT metaverse property will be sent to your account's
                address within a few days after the 18th.
              </div>
            </div>
            <div
              style={{
                width: "98%",
                marginTop: 10,
                marginBottom: 10,
                // height: 180,
                backgroundColor: buttonIsDisabled
                  ? hasRequestedLandClaim
                    ? "green"
                    : "grey"
                  : "black",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: buttonIsDisabled ? "unset" : "pointer",
              }}
              onClick={async () => {
                if (buttonIsDisabled) {
                  if (disabledReason) {
                    updateStatus(disabledReason);
                  }
                  return;
                }

                setIsLoading(true);

                try {
                  const nTokenData = getNTokenData();

                  await axios({
                    method: "POST",
                    url: `${API_BASE_URL}/expansive-world/user-data`,
                    headers: {
                      "nftitem-address": address,
                      "nftitem-ntoken": nTokenData.nToken,
                    },
                    // miniGameState: "END",
                    data: {
                      quickClaim: true,
                    },
                  });

                  await refreshUserData({
                    address,
                    nToken: nTokenData.nToken,
                    setUserData,
                  });

                  setIsLoading(false);

                  updateStatus("Land claim successful");
                } catch (err) {
                  setIsLoading(false);

                  const errorMessage =
                    err?.response?.data?.message || "Internal Server Error";
                  updateStatus("Error in land claim request: " + errorMessage);
                }
              }}
            >
              {hasRequestedLandClaim ? (
                <div
                  style={{
                    width: "98%",
                    marginTop: 10,
                    marginBottom: 10,

                    fontFamily: `"Amaranth", sans-serif`,
                    // backgroundColor: "green",
                    fontSize: "20",
                    userSelect: "none",
                    color: "white",
                    textAlign: "center",
                    // height: 180,
                  }}
                >
                  Land Claimed
                </div>
              ) : (
                <div
                  style={{
                    width: "98%",
                    marginTop: 10,
                    marginBottom: 10,

                    fontFamily: `"Amaranth", sans-serif`,
                    color: "yellow",
                    textAlign: "center",
                    fontSize: "20",
                    userSelect: "none",
                    // height: 180,
                  }}
                >
                  Claim Land
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          // width: "100%",
          width: 312,
          backgroundColor: "#070b22",
          // backgroundColor: "#353a53",
          // paddingRight: 10,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </div>
  );
};

export default LandClaim;
